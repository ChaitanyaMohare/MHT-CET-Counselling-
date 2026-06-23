const Inquiry = require('../models/Inquiry');

exports.getHome = (req, res) => {
  res.render('index', { title: 'Pravesh Mitra — Your Trusted Admission Partner' });
};

exports.submitInquiry = async (req, res) => {
  try {
    const { name, contact, email, mhtCetScore, jeeScore, branches, cities } = req.body;

    // Validation
    const errors = [];
    if (!name || name.trim().length < 2) {
      errors.push('Please enter a valid name');
    }
    if (!contact || !/^[6-9][0-9]{9}$/.test(contact)) {
      errors.push('Please enter a valid 10-digit mobile number');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Please enter a valid email address');
    }
    if (!mhtCetScore || mhtCetScore < 0 || mhtCetScore > 200) {
      errors.push('Please enter a valid MHT-CET score (0-200)');
    }
    if (!branches || branches.length === 0) {
      errors.push('Please select at least one branch');
    }
    if (!cities || cities.length === 0) {
      errors.push('Please select at least one city');
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Create inquiry
    const inquiry = new Inquiry({
      name: name.trim(),
      contact: contact.trim(),
      email: email.trim().toLowerCase(),
      mhtCetScore: parseFloat(mhtCetScore),
      jeeScore: jeeScore ? parseFloat(jeeScore) : null,
      branches: Array.isArray(branches) ? branches : [branches],
      cities: Array.isArray(cities) ? cities : [cities]
    });

    await inquiry.save();

    // Redirect to packages page or success page
    res.redirect('/packages');

  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ 
      success: false, 
      errors: ['Something went wrong. Please try again.'] 
    });
  }
};

