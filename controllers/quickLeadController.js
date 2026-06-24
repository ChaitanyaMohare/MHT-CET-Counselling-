const QuickLead = require('../models/QuickLead');
const { sendQuickLeadThankYou } = require('../utils/mailer');

exports.postQuickLead = async (req, res) => {
  const { name, contact, email, mhtCetScore, jeeScore } = req.body;

  // Normalize multi-select arrays
  const rawBranches = req.body['branches[]'] || req.body.branches || [];
  const rawCities   = req.body['cities[]']   || req.body.cities   || [];
  const branches = (Array.isArray(rawBranches) ? rawBranches : [rawBranches]).filter(Boolean);
  const cities   = (Array.isArray(rawCities)   ? rawCities   : [rawCities]).filter(Boolean);

  // Basic validation
  if (!name || !contact || !email) {
    console.log('⚠️ Quick lead submission missing required fields');
    return res.redirect('/?error=missing_fields');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    console.log('⚠️ Invalid email format:', email);
    return res.redirect('/?error=invalid_email');
  }

  // Validate mobile number format (Indian mobile)
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(contact.trim())) {
    console.log('⚠️ Invalid mobile number:', contact);
    return res.redirect('/?error=invalid_mobile');
  }

  try {
    // Save to database
    const quickLead = await QuickLead.create({
      fullName:    name.trim(),
      mobile:      contact.trim(),
      email:       email.trim().toLowerCase(),
      mhtCetScore: mhtCetScore ? mhtCetScore.trim() : '',
      jeeScore:    jeeScore    ? jeeScore.trim()    : '',
      branches,
      cities
    });
    console.log(`✅ QuickLead saved: ${name} (ID: ${quickLead._id})`);

    // Send thank-you email with package information
    // Use async/await to handle success/failure properly
    const emailResult = await sendQuickLeadThankYou(
      email.trim().toLowerCase(), 
      name.trim(), 
      {
        mhtCetScore: mhtCetScore || '',
        jeeScore: jeeScore || '',
        branches,
        cities
      }
    );

    if (emailResult.success) {
      console.log(`✅ Email sent successfully to ${email}`);
    } else {
      console.error(`❌ Email failed for ${email}:`, emailResult.error);
    }

  } catch (err) {
    console.error('❌ QuickLead processing error:', err.message);
    // Continue to redirect even if there's an error
  }

  // Redirect to packages page with success indicator
  res.redirect('/packages?from=quicklead');
};
