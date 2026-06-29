const Inquiry = require('../models/Inquiry');

// Plans data for packages section on homepage
const plans = [
  {
    id: 'Basic',
    name: 'Basic',
    price: 499,
    subtitle: 'College Discovery Package',
    features: [
      'Personalized College List',
      'Dream / Target / Safe Colleges',
      'Branch Recommendations',
      'Cutoff Analysis',
      'College Comparison Sheet',
      'PDF Report'
    ],
    tagline: 'Best for Students exploring options',
    featured: false,
    badge: null
  },
  {
    id: 'Standard',
    name: 'Standard',
    price: 999,
    subtitle: 'Admission Strategy Package',
    features: [
      'Everything in Basic Plan',
      '1-on-1 Counseling Call (30-45 mins)',
      'Branch Selection Guidance',
      'Option Form Strategy',
      'College vs Branch Decision Support',
      'Real Insights from Seniors',
      'WhatsApp Support for 7 Days'
    ],
    tagline: 'Best for Students confused about choices',
    featured: true,
    badge: 'Valid upto only 1st CAP round'
  },
  {
    id: 'Premium',
    name: 'Premium',
    price: 1499,
    subtitle: 'Complete CAP Support',
    features: [
      'Everything in Standard Plan',
      'Support Throughout All CAP Rounds',
      'Option Form Review',
      'Round-wise Guidance',
      'Freeze / Betterment Advice',
      'Spot Round Guidance',
      'Priority WhatsApp Support',
      'Multiple Counseling Sessions',
      'Connect with Real Seniors'
    ],
    tagline: 'Best for Complete admission support',
    featured: false,
    badge: 'Most Popular'
  }
];

exports.getHome = (req, res) => {
  res.render('index', { 
    title: 'Pravesh Mitra — Your Trusted Admission Partner',
    plans 
  });
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

