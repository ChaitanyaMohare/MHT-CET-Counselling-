const Student = require('../models/Student');

exports.getBasicInfo = (req, res) => {
  if (!req.session.selectedPlan) return res.redirect('/packages');
  res.render('basic-info', {
    title: 'Basic Information — MHT-CET Counselling',
    plan: req.session.selectedPlan,
    amount: req.session.planAmount,
    errors: [],
    formData: {}
  });
};

exports.postBasicInfo = async (req, res) => {
  if (!req.session.selectedPlan) return res.redirect('/packages');

  const {
    firstName, middleName, lastName, mobile, email,
    dob, gender, school, board, twelfthPercent, pcmPercent,
    cetPercentile, attempt, category, subCategory, domicile
  } = req.body;

  const errors = [];

  // Basic validation
  if (!firstName || !firstName.trim()) errors.push('First name is required');
  if (!lastName || !lastName.trim()) errors.push('Last name is required');
  if (!mobile || !/^[6-9]\d{9}$/.test(mobile.trim())) errors.push('Valid 10-digit mobile number is required');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.push('Valid email is required');
  if (!dob) errors.push('Date of birth is required');
  if (!gender) errors.push('Gender is required');
  if (!school || !school.trim()) errors.push('School/College name is required');
  if (!board) errors.push('Board is required');
  if (!twelfthPercent || isNaN(twelfthPercent) || twelfthPercent < 0 || twelfthPercent > 100) errors.push('Valid 12th percentage required (0-100)');
  if (!pcmPercent || isNaN(pcmPercent) || pcmPercent < 0 || pcmPercent > 100) errors.push('Valid PCM percentage required (0-100)');
  if (!cetPercentile || isNaN(cetPercentile) || cetPercentile < 0 || cetPercentile > 100) errors.push('Valid CET percentile required (0-100)');
  if (!attempt) errors.push('Attempt is required');
  if (!category) errors.push('Category is required');
  if (!domicile) errors.push('Domicile is required');

  if (errors.length > 0) {
    return res.render('basic-info', {
      title: 'Basic Information — MHT-CET Counselling',
      plan: req.session.selectedPlan,
      amount: req.session.planAmount,
      errors,
      formData: req.body
    });
  }

  try {
    const student = new Student({
      firstName: firstName.trim(),
      middleName: middleName ? middleName.trim() : '',
      lastName: lastName.trim(),
      mobile: mobile.trim(),
      email: email.trim().toLowerCase(),
      dob: new Date(dob),
      gender,
      school: school.trim(),
      board,
      twelfthPercent: parseFloat(twelfthPercent),
      pcmPercent: parseFloat(pcmPercent),
      cetPercentile: parseFloat(cetPercentile),
      attempt,
      category,
      subCategory: subCategory || 'None',
      domicile,
      selectedPlan: req.session.selectedPlan,
      planAmount: req.session.planAmount,
      paymentStatus: 'pending_payment'
    });

    await student.save();
    req.session.studentId = student._id.toString();
    req.session.studentName = `${firstName} ${lastName}`;
    res.redirect('/payment');
  } catch (err) {
    console.error(err);
    res.render('basic-info', {
      title: 'Basic Information — MHT-CET Counselling',
      plan: req.session.selectedPlan,
      amount: req.session.planAmount,
      errors: ['Server error. Please try again.'],
      formData: req.body
    });
  }
};
