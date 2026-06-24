const QuickLead = require('../models/QuickLead');
const { sendQuickLeadThankYou } = require('../utils/mailer');

exports.postQuickLead = async (req, res) => {
  const { name, contact, email, mhtCetScore, jeeScore } = req.body;

  // Normalize multi-select arrays
  const rawBranches = req.body['branches[]'] || req.body.branches || [];
  const rawCities   = req.body['cities[]']   || req.body.cities   || [];
  const branches = (Array.isArray(rawBranches) ? rawBranches : [rawBranches]).filter(Boolean);
  const cities   = (Array.isArray(rawCities)   ? rawCities   : [rawCities]).filter(Boolean);

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
      branches,
      cities
    });
    console.log(`✅ QuickLead saved: ${name} — ${contact}`);

    // Send thank-you email (non-blocking — don't await to keep redirect fast)
    sendQuickLeadThankYou(email.trim().toLowerCase(), name.trim(), {
      mhtCetScore: mhtCetScore || '',
      branches,
      cities
    }).catch(err => console.error('❌ Email error:', err.message));

  } catch (err) {
    console.error('❌ QuickLead save error:', err.message);
  }

  // Always redirect to packages
  res.redirect('/packages');
};
