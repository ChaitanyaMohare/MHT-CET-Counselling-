const Student = require('../models/Student');
const { v4: uuidv4 } = require('uuid');

const PLAN_AMOUNTS = { Basic: 999, Pro: 1999, Premium: 4999 };

exports.getPayment = async (req, res) => {
  if (!req.session.studentId) return res.redirect('/packages');
  try {
    const student = await Student.findById(req.session.studentId);
    if (!student) return res.redirect('/packages');
    res.render('payment', {
      title: 'Payment — MHT-CET Counselling',
      student,
      amount: PLAN_AMOUNTS[student.selectedPlan] || student.planAmount
    });
  } catch (err) {
    console.error(err);
    res.redirect('/packages');
  }
};

// Simulate payment success (replace with real Cashfree webhook/redirect)
exports.paymentSuccess = async (req, res) => {
  if (!req.session.studentId) return res.redirect('/packages');
  try {
    const orderId = uuidv4();
    const paymentId = 'PAY_' + Date.now();

    await Student.findByIdAndUpdate(req.session.studentId, {
      paymentStatus: 'paid',
      paymentId,
      orderId
    });

    req.session.paymentDone = true;
    res.redirect('/main-form');
  } catch (err) {
    console.error(err);
    res.redirect('/payment');
  }
};

// Called by Cashfree webhook or redirect
exports.cashfreeWebhook = async (req, res) => {
  // In production: verify signature from Cashfree
  const { orderId, orderAmount, referenceId, txStatus } = req.body;
  if (txStatus === 'SUCCESS') {
    try {
      await Student.findOneAndUpdate(
        { orderId },
        { paymentStatus: 'paid', paymentId: referenceId }
      );
    } catch (err) {
      console.error('Webhook error:', err);
    }
  }
  res.status(200).send('OK');
};
