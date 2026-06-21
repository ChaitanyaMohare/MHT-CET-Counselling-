const plans = [
  {
    id: 'Basic',
    name: 'Basic',
    price: 999,
    features: [
      'PDF college list based on percentile',
      '1 Expert call (30 minutes)',
      'Email support',
      'College eligibility report'
    ],
    featured: false,
    badge: null
  },
  {
    id: 'Pro',
    name: 'Pro',
    price: 1999,
    features: [
      'Personalized college shortlist',
      '3 Expert counselling calls',
      'Branch guidance & analysis',
      'Priority email support',
      'Cut-off comparison report'
    ],
    featured: true,
    badge: 'Most Popular'
  },
  {
    id: 'Premium',
    name: 'Premium',
    price: 4999,
    features: [
      'Full counselling support',
      'Unlimited expert calls',
      'Form filling assistance',
      'Priority support 24/7',
      'Document verification help',
      'College visit guidance'
    ],
    featured: false,
    badge: 'Best Value'
  }
];

exports.getPackages = (req, res) => {
  res.render('packages', { title: 'Choose Your Plan — MHT-CET Counselling', plans });
};

exports.selectPlan = (req, res) => {
  const { plan } = req.body;
  const selected = plans.find(p => p.id === plan);
  if (!selected) return res.redirect('/packages');
  req.session.selectedPlan = selected.id;
  req.session.planAmount = selected.price;
  res.redirect('/basic-info');
};
