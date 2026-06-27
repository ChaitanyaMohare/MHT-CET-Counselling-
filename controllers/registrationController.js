const CounsellingForm = require('../models/CounsellingForm');
const { sendRegistrationSuccessEmail } = require('../utils/mailer');

// Plan configurations
const plans = {
  Basic: { name: 'Basic', price: 499 },
  Standard: { name: 'Standard', price: 999 },
  Premium: { name: 'Premium', price: 1499 }
};

// Maharashtra Universities (Complete List)
const universities = [
  'Mumbai University (University of Mumbai)',
  'Savitribai Phule Pune University (SPPU)',
  'Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)',
  'Shivaji University, Kolhapur',
  'Dr. Babasaheb Ambedkar Marathwada University, Aurangabad',
  'Sant Gadge Baba Amravati University',
  'North Maharashtra University, Jalgaon',
  'Swami Ramanand Teerth Marathwada University, Nanded',
  'Solapur University',
  'Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere',
  'Maharashtra University of Health Sciences (MUHS), Nashik',
  'Maharashtra Animal and Fishery Sciences University (MAFSU), Nagpur',
  'Kavayitri Bahinabai Chaudhari North Maharashtra University, Jalgaon',
  'Punyashlok Ahilyadevi Holkar Solapur University',
  'Mahatma Gandhi Antarrashtriya Hindi Vishwavidyalaya, Wardha',
  'Dr. Panjabrao Deshmukh Krishi Vidyapeeth, Akola',
  'Vasantrao Naik Marathwada Krishi Vidyapeeth, Parbhani',
  'Maharashtra State Board of Technical Education (MSBTE)',
  'Yashwantrao Chavan Maharashtra Open University (YCMOU), Nashik',
  'Bharati Vidyapeeth Deemed University, Pune',
  'Symbiosis International University, Pune',
  'Tilak Maharashtra Vidyapeeth, Pune',
  'Dr. D. Y. Patil Vidyapeeth, Pune',
  'Krishna Institute of Medical Sciences Deemed University, Karad',
  'Padmashree Dr. D. Y. Patil University, Navi Mumbai',
  'MGM Institute of Health Sciences, Navi Mumbai',
  'Pravara Institute of Medical Sciences Deemed University, Ahmednagar',
  'Smt. Kashibai Navale Medical College and General Hospital, Pune',
  'Datta Meghe Institute of Medical Sciences, Wardha',
  'Maharashtra Institute of Technology (MIT), Pune',
  'Sandip University, Nashik',
  'MIT Art, Design and Technology University, Pune',
  'Dr. Vishwanath Karad MIT World Peace University, Pune',
  'Symbiosis University of Applied Sciences, Indore',
  'Flame University, Pune',
  'JSPM University, Pune',
  'Dr. D. Y. Patil Vidyapeeth, Pimpri',
  'Sanjay Ghodawat University, Kolhapur',
  'Ajeenkya D Y Patil University, Pune',
  'NICMAR University, Pune',
  'Other'
];

// Engineering Branches
const branches = [
  'Computer Science & Engineering',
  'Information Technology',
  'Artificial Intelligence & Data Science',
  'Computer Science & Design',
  'Artificial Intelligence & Machine Learning',
  'Electronics & Telecommunication',
  'Electronics Engineering (EXTC)',
  'Electronics & Computer Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Chemical Engineering',
  'Instrumentation Engineering',
  'Automobile Engineering',
  'Production Engineering',
  'Biotechnology',
  'Textile Engineering',
  'Printing & Packaging Technology',
  'Plastic Engineering'
];

// Maharashtra Cities
const cities = [
  'Mumbai',
  'Pune',
  'Nagpur',
  'Nashik',
  'Chhatrapati Sambhaji Nagar (Aurangabad)',
  'Thane',
  'Navi Mumbai',
  'Kalyan-Dombivli',
  'Vasai-Virar',
  'Solapur',
  'Kolhapur',
  'Amravati',
  'Nanded',
  'Sangli',
  'Akola',
  'Latur',
  'Jalgaon',
  'Dhule',
  'Ahmednagar',
  'Chandrapur',
  'Parbhani',
  'Ichalkaranji',
  'Jalna',
  'Ambarnath',
  'Bhiwandi',
  'Panvel',
  'Ulhasnagar',
  'Satara',
  'Beed',
  'Yavatmal',
  'Wardha',
  'Gondia',
  'Ratnagiri'
];

// GET - Registration Form
exports.getRegistration = (req, res) => {
  const { plan } = req.query;
  
  // Validate plan
  if (!plan || !plans[plan]) {
    return res.redirect('/packages');
  }

  const selectedPlan = plans[plan];

  res.render('registration', {
    title: `Register for ${selectedPlan.name} Plan — Pravesh Mitra`,
    plan: selectedPlan.name,
    planPrice: selectedPlan.price,
    universities,
    branches,
    cities,
    errors: [],
    formData: {}
  });
};

// POST - Submit Registration
exports.postRegistration = async (req, res) => {
  console.log('📝 Registration form submission received:', req.body);

  const {
    selectedPlan,
    planPrice,
    fullName,
    mobile,
    email,
    mhtCetPercentile,
    jeeMainPercentile,
    casteCategory,
    homeUniversity
  } = req.body;

  // Handle multi-select arrays
  const rawBranches = req.body['preferredBranches[]'] || req.body.preferredBranches || [];
  const rawCities = req.body['preferredCities[]'] || req.body.preferredCities || [];
  const preferredBranches = (Array.isArray(rawBranches) ? rawBranches : [rawBranches]).filter(Boolean);
  const preferredCities = (Array.isArray(rawCities) ? rawCities : [rawCities]).filter(Boolean);

  const errors = [];

  // Validation
  if (!selectedPlan || !plans[selectedPlan]) {
    errors.push('Invalid plan selected');
  }
  if (!fullName || !fullName.trim()) {
    errors.push('Full name is required');
  }
  if (!mobile || !/^[6-9]\d{9}$/.test(mobile.trim())) {
    errors.push('Valid 10-digit mobile number is required');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push('Valid email address is required');
  }
  if (!mhtCetPercentile || isNaN(mhtCetPercentile) || mhtCetPercentile < 0 || mhtCetPercentile > 100) {
    errors.push('Valid MHT-CET percentile (0-100) is required');
  }
  if (jeeMainPercentile && (isNaN(jeeMainPercentile) || jeeMainPercentile < 0 || jeeMainPercentile > 100)) {
    errors.push('JEE Main percentile must be between 0-100');
  }
  if (!casteCategory || !casteCategory.trim()) {
    errors.push('Caste category is required');
  }
  const validCategories = ['OPEN', 'EWS', 'OBC', 'SC', 'ST', 'NT-B', 'NT-C', 'NT-D', 'VJ/DT', 'SBC', 'TFWS'];
  if (casteCategory && !validCategories.includes(casteCategory.trim())) {
    errors.push('Invalid caste category selected');
  }
  if (preferredBranches.length === 0) {
    errors.push('Please select at least one branch');
  }
  if (preferredCities.length === 0) {
    errors.push('Please select at least one city');
  }

  if (errors.length > 0) {
    console.log('⚠️ Registration validation errors:', errors);
    return res.render('registration', {
      title: `Register for ${selectedPlan} Plan — Pravesh Mitra`,
      plan: selectedPlan,
      planPrice: parseInt(planPrice),
      universities,
      branches,
      cities,
      errors,
      formData: req.body
    });
  }

  try {
    // Save to MongoDB
    const registration = await CounsellingForm.create({
      selectedPlan: selectedPlan.trim(),
      planPrice: parseInt(planPrice),
      fullName: fullName.trim(),
      mobile: mobile.trim(),
      email: email.trim().toLowerCase(),
      mhtCetPercentile: parseFloat(mhtCetPercentile),
      jeeMainPercentile: jeeMainPercentile ? parseFloat(jeeMainPercentile) : null,
      casteCategory: casteCategory.trim(),
      homeUniversity: homeUniversity && homeUniversity.trim() ? homeUniversity.trim() : '',
      preferredBranches,
      preferredCities,
      status: 'pending'
    });

    console.log(`✅ Registration saved: ${fullName} - ${selectedPlan} Plan (ID: ${registration._id})`);

    // Send registration success email
    const emailResult = await sendRegistrationSuccessEmail(
      email.trim().toLowerCase(),
      {
        fullName: fullName.trim(),
        selectedPlan: selectedPlan.trim(),
        planPrice: parseInt(planPrice),
        mobile: mobile.trim(),
        mhtCetPercentile: parseFloat(mhtCetPercentile),
        jeeMainPercentile: jeeMainPercentile ? parseFloat(jeeMainPercentile) : null,
        casteCategory: casteCategory.trim(),
        homeUniversity: homeUniversity && homeUniversity.trim() ? homeUniversity.trim() : '',
        preferredBranches,
        preferredCities
      }
    );

    if (emailResult.success) {
      console.log(`✅ Registration email sent successfully to ${email}`);
    } else {
      console.error(`⚠️ Registration email failed for ${email}:`, emailResult.error);
    }

    // Redirect to confirmation page
    res.redirect('/registration-success');

  } catch (err) {
    console.error('❌ Registration error:', err);
    console.error('Error details:', {
      name: err.name,
      message: err.message,
      stack: err.stack
    });

    return res.render('registration', {
      title: `Register for ${selectedPlan} Plan — Pravesh Mitra`,
      plan: selectedPlan,
      planPrice: parseInt(planPrice),
      universities,
      branches,
      cities,
      errors: ['Server error. Please try again later.'],
      formData: req.body
    });
  }
};

// GET - Registration Success Page
exports.getRegistrationSuccess = (req, res) => {
  res.render('registration-success', {
    title: 'Registration Successful — Pravesh Mitra'
  });
};
