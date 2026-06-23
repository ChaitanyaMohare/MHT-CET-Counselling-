const Contact = require('../models/Contact');

exports.getContact = (req, res) => {
  res.render('contact', {
    title: 'Ask For A Call — Pravesh Mitra',
    success: false,
    errors: [],
    formData: {}
  });
};

exports.postContact = async (req, res) => {
  const { name, mobile, preferredDate, preferredTime, message } = req.body;
  const errors = [];

  // Validation
  if (!name || !name.trim()) {
    errors.push('Name is required');
  }
  if (!mobile || !/^[6-9]\d{9}$/.test(mobile.trim())) {
    errors.push('Valid 10-digit mobile number is required');
  }
  if (!preferredDate) {
    errors.push('Preferred date is required');
  }
  if (!preferredTime) {
    errors.push('Preferred time slot is required');
  }

  // Check if date is not in the past
  if (preferredDate) {
    const selectedDate = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.push('Please select a current or future date');
    }
  }

  if (errors.length > 0) {
    return res.render('contact', {
      title: 'Ask For A Call — Pravesh Mitra',
      success: false,
      errors,
      formData: req.body
    });
  }

  try {
    await Contact.create({
      name: name.trim(),
      email: 'callback@praveshmitra.in', // Placeholder since email is optional now
      mobile: mobile.trim(),
      message: message ? message.trim() : `Callback requested for ${preferredDate} at ${preferredTime}`,
      preferredDate: preferredDate,
      preferredTime: preferredTime
    });
    
    res.render('contact', {
      title: 'Ask For A Call — Pravesh Mitra',
      success: true,
      errors: [],
      formData: {}
    });
  } catch (err) {
    console.error('Contact form error:', err);
    res.render('contact', {
      title: 'Ask For A Call — Pravesh Mitra',
      success: false,
      errors: ['Server error. Please try again later.'],
      formData: req.body
    });
  }
};
