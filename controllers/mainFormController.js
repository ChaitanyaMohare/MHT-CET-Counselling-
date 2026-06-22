const Student = require('../models/Student');
const CounsellingForm = require('../models/CounsellingForm');

exports.getMainForm = (req, res) => res.redirect('/thankyou');
exports.postMainForm = (req, res) => res.redirect('/thankyou');


exports.getThankYou = async (req, res) => {
  if (!req.session.studentId) return res.redirect('/');
  try {
    const student = await Student.findById(req.session.studentId);
    res.render('thankyou', {
      title: 'Thank You — MHT-CET Counselling',
      student
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};
