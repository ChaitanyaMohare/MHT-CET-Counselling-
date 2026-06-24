const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send thank-you email after quick lead form submission
 * @param {string} toEmail
 * @param {string} studentName
 * @param {object} details  — { mhtCetScore, branches, cities }
 */
const sendQuickLeadThankYou = async (toEmail, studentName, details = {}) => {
  const { mhtCetScore, branches = [], cities = [] } = details;

  const branchList = branches.length
    ? `<ul style="margin:6px 0;padding-left:18px;">${branches.map(b => `<li>${b}</li>`).join('')}</ul>`
    : '<p style="margin:4px 0;color:#64748b;">Not specified</p>';

  const cityList = cities.length
    ? cities.join(', ')
    : 'Not specified';

  const mailOptions = {
    from: `"NextStep Counselling" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: '🎓 Thank You for Choosing NextStep — We\'re On It!',
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1a56db 0%,#3730a3 100%);padding:36px 40px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:1.7rem;font-weight:800;letter-spacing:-0.5px;">NextStep</h1>
      <p style="color:rgba(255,255,255,0.75);margin:6px 0 0;font-size:0.85rem;">Guiding Every Step to Your Dream College</p>
    </div>

    <!-- Body -->
    <div style="padding:36px 40px;">
      <h2 style="color:#0a0f2e;margin:0 0 8px;font-size:1.3rem;">नमस्ते ${studentName}! 👋</h2>
      <p style="color:#374151;line-height:1.7;margin:0 0 20px;">
        Thank you for filling out the quick form on <strong>NextStep</strong>. We're thrilled you've chosen us for your <strong>MHT-CET counselling journey</strong>!
      </p>

      <!-- Summary card -->
      <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
        <p style="margin:0 0 12px;font-size:0.78rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Your Submission Summary</p>
        ${mhtCetScore ? `
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e2e8f0;">
          <span style="color:#64748b;font-size:0.88rem;">MHT-CET Score</span>
          <strong style="color:#1a56db;font-size:0.95rem;">${mhtCetScore}</strong>
        </div>` : ''}
        <div style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
          <span style="color:#64748b;font-size:0.88rem;">Preferred Branches</span>
          ${branchList}
        </div>
        <div style="padding:8px 0;">
          <span style="color:#64748b;font-size:0.88rem;">Preferred Cities</span>
          <p style="margin:4px 0;color:#0a0f2e;font-weight:600;font-size:0.88rem;">${cityList}</p>
        </div>
      </div>

      <!-- What happens next -->
      <div style="background:linear-gradient(135deg,rgba(26,86,219,0.06),rgba(124,58,237,0.06));border:1.5px solid rgba(26,86,219,0.15);border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 12px;font-weight:700;color:#0a0f2e;font-size:0.92rem;">📋 What Happens Next?</p>
        <p style="margin:0 0 8px;color:#374151;font-size:0.85rem;line-height:1.6;">
          <strong style="color:#1a56db;">1.</strong> Browse our counselling plans and choose the one that fits your needs.
        </p>
        <p style="margin:0 0 8px;color:#374151;font-size:0.85rem;line-height:1.6;">
          <strong style="color:#1a56db;">2.</strong> Complete your registration and payment.
        </p>
        <p style="margin:0;color:#374151;font-size:0.85rem;line-height:1.6;">
          <strong style="color:#1a56db;">3.</strong> Our expert counsellor will call you within <strong>24 hours</strong> to discuss your college preferences.
        </p>
      </div>

      <!-- CTA Button -->
      <div style="text-align:center;margin-bottom:28px;">
        <a href="https://praveshmitra.online/packages"
           style="display:inline-block;background:linear-gradient(135deg,#1a56db,#3730a3);color:#fff;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.95rem;letter-spacing:0.3px;">
          View Counselling Plans →
        </a>
      </div>

      <!-- Helpline -->
      <div style="text-align:center;padding:16px;background:#f8fafc;border-radius:8px;">
        <p style="margin:0;color:#64748b;font-size:0.85rem;">
          📞 Helpline: <strong style="color:#0a0f2e;">+91 95296 79073</strong> &nbsp;|&nbsp;
          💬 <a href="https://wa.me/919999999999" style="color:#16a34a;text-decoration:none;font-weight:600;">Chat on WhatsApp</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#0a0f2e;padding:20px 40px;text-align:center;">
      <p style="margin:0;color:rgba(255,255,255,0.5);font-size:0.78rem;">
        © ${new Date().getFullYear()} NextStep — Guiding Every Step to Your Dream College<br/>
        Pune, Maharashtra, India
      </p>
    </div>

  </div>
</body>
</html>`
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Thank-you email sent to ${toEmail}`);
};

module.exports = { sendQuickLeadThankYou };
