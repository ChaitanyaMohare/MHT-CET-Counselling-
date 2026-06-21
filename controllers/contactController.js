const Contact = require('../models/Contact');

exports.getContact = (req, res) => {
  res.render('contact', {
    title: 'Contact Us — MHT-CET Counselling',
    success: false,
    errors: [],
    formData: {}
  });
};

exports.postContact = async (req, res) => {
  const { name, email, mobile, message } = req.body;
  const errors = [];

  if (!name || !name.trim()) errors.push('Name is required');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.push('Valid email is required');
  if (!mobile || !/^[6-9]\d{9}$/.test(mobile.trim())) errors.push('Valid 10-digit mobile number required');
  if (!message || !message.trim()) errors.push('Message is required');

  if (errors.length > 0) {
    return res.render('contact', {
      title: 'Contact Us — MHT-CET Counselling',
      success: false,
      errors,
      formData: req.body
    });
  }

  try {
    await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      message: message.trim()
    });
    res.render('contact', {
      title: 'Contact Us — MHT-CET Counselling',
      success: true,
      errors: [],
      formData: {}
    });
  } catch (err) {
    console.error(err);
    res.render('contact', {
      title: 'Contact Us — MHT-CET Counselling',
      success: false,
      errors: ['Server error. Please try again.'],
      formData: req.body
    });
  }
};
