const QuickLead = require('../models/QuickLead');

exports.postQuickLead = async (req, res) => {
  const { name, contact, email, mhtCetScore, jeeScore } = req.body;

  // Normalize multi-select arrays (checkboxes come as array or single string)
  const rawBranches = req.body['branches[]'] || req.body.branches || [];
  const rawCities   = req.body['cities[]']   || req.body.cities   || [];
  const branches = Array.isArray(rawBranches) ? rawBranches : [rawBranches];
  const cities   = Array.isArray(rawCities)   ? rawCities   : [rawCities];

  // Basic validation — redirect to packages even if missing fields
  if (!name || !contact || !email) {
    return res.redirect('/packages');
  }

  try {
    await QuickLead.create({
      fullName:    name.trim(),
      mobile:      contact.trim(),
      email:       email.trim().toLowerCase(),
      mhtCetScore: mhtCetScore ? mhtCetScore.trim() : '',
      jeeScore:    jeeScore    ? jeeScore.trim()    : '',
      branches:    branches.filter(Boolean),
      cities:      cities.filter(Boolean)
    });
    console.log(`✅ QuickLead saved: ${name} — ${contact}`);
  } catch (err) {
    console.error('❌ QuickLead save error:', err.message);
  }

  // Always send to packages
  res.redirect('/packages');
};
