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
