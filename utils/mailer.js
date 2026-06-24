const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

// Package data for email
const packages = [
  {
    name: 'Basic',
    price: '₹499',
    subtitle: 'College Discovery Package',
    features: [
      'Personalized College List',
      'Dream / Target / Safe Colleges',
      'Branch Recommendations',
      'Cutoff Analysis',
      'College Comparison Sheet',
      'PDF Report'
    ],
    link: 'https://payments.cashfree.com/forms/pravesh-mitra-basic-plan'
  },
  {
    name: 'Standard',
    price: '₹999',
    subtitle: 'Admission Strategy Package',
    badge: 'Most Popular',
    features: [
      'Everything in Basic Plan',
      '1-on-1 Counseling Call (30-45 mins)',
      'Branch Selection Guidance',
      'Option Form Strategy',
      'College vs Branch Decision Support',
      'Real Insights from Seniors',
      'WhatsApp Support for 7 Days'
    ],
    link: 'https://payments.cashfree.com/forms/pravesh-mitra-standard-plan'
  },
  {
    name: 'Premium',
    price: '₹1,999',
    subtitle: 'Complete CAP Support',
    badge: 'Best Value',
    features: [
      'Everything in Standard Plan',
      'Support Throughout All CAP Rounds',
      'Option Form Review',
      'Round-wise Guidance',
      'Freeze / Betterment Advice',
      'Spot Round Guidance',
      'Priority WhatsApp Support',
      'Multiple Counseling Sessions'
    ],
    link: 'https://payments.cashfree.com/forms/pravesh-mitra-premium-plan'
  }
];

/**
 * Send thank you email for quick lead submissions from homepage
 */
const sendQuickLeadThankYou = async (toEmail, studentName, details = {}) => {
  const { mhtCetScore, jeeScore, branches = [], cities = [] } = details;

  const branchList = branches.length
    ? `<ul style="margin:6px 0;padding-left:18px;">${branches.map(b => `<li style="color:#0a0f2e;font-size:0.85rem;margin:3px 0;">${b}</li>`).join('')}</ul>`
    : '<p style="margin:4px 0;color:#64748b;font-size:0.85rem;">Not specified</p>';

  const cityList = cities.length
    ? cities.join(', ')
    : 'Not specified';

  // Generate package cards HTML
  const packageCards = packages.map(pkg => `
    <div style="background:#fff;border:2px solid ${pkg.badge ? '#1a56db' : '#e2e8f0'};border-radius:12px;padding:20px;margin-bottom:16px;position:relative;">
      ${pkg.badge ? `<div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#1a56db,#4F6EF7);color:#fff;padding:4px 16px;border-radius:20px;font-size:0.7rem;font-weight:700;">${pkg.badge}</div>` : ''}
      <h3 style="color:#0a0f2e;font-size:1.15rem;font-weight:800;margin:${pkg.badge ? '8px' : '0'} 0 4px;">${pkg.name} Plan</h3>
      <p style="color:#64748b;font-size:0.8rem;margin:0 0 12px;">${pkg.subtitle}</p>
      <div style="display:flex;align-items:flex-end;gap:4px;margin-bottom:12px;">
        <span style="font-size:2rem;font-weight:900;color:#1a56db;line-height:1;">${pkg.price}</span>
        <span style="font-size:0.75rem;color:#64748b;margin-bottom:4px;">/ one-time</span>
      </div>
      <ul style="list-style:none;padding:0;margin:0 0 16px;">
        ${pkg.features.map(f => `<li style="display:flex;align-items:flex-start;gap:8px;margin:6px 0;font-size:0.82rem;color:#374151;"><span style="color:#22c55e;font-weight:700;flex-shrink:0;">✓</span><span>${f}</span></li>`).join('')}
      </ul>
      <a href="${pkg.link}" style="display:block;text-align:center;background:${pkg.badge ? '#1a56db' : '#f1f5f9'};color:${pkg.badge ? '#fff' : '#0a0f2e'};padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.88rem;">
        Select ${pkg.name} Plan →
      </a>
    </div>
  `).join('');

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Pravesh Mitra <sauravambhore@gmail.com>',
      to: toEmail,
      subject: '✅ Response Submitted Successfully - Pravesh Mitra',
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Thank You - Pravesh Mitra</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1a56db 0%,#3730a3 100%);padding:36px 40px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:1.7rem;font-weight:800;">प्रवेश<span style="opacity:0.9;">मित्र</span></h1>
      <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:0.88rem;font-weight:500;">ऍडमिशन तुमचं, जबाबदारी आमची!</p>
    </div>

    <!-- Success Message -->
    <div style="padding:36px 40px;">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="width:64px;height:64px;background:#dcfce7;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:16px;">✅</div>
        <h2 style="color:#0a0f2e;margin:0 0 8px;font-size:1.4rem;font-weight:800;">Response Submitted Successfully!</h2>
        <p style="color:#64748b;line-height:1.7;margin:0;font-size:0.95rem;">
          Thank you, <strong style="color:#0a0f2e;">${studentName}</strong>! We've received your information.
        </p>
      </div>

      <!-- Submission Summary -->
      <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 14px;font-size:0.78rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">📋 Your Submission Summary</p>
        
        <table style="width:100%;border-collapse:collapse;">
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:10px 0;color:#64748b;font-size:0.88rem;">Name</td>
            <td style="padding:10px 0;text-align:right;color:#0a0f2e;font-weight:700;font-size:0.88rem;">${studentName}</td>
          </tr>
          ${mhtCetScore ? `
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:10px 0;color:#64748b;font-size:0.88rem;">MHT-CET Score</td>
            <td style="padding:10px 0;text-align:right;color:#1a56db;font-weight:700;font-size:0.92rem;">${mhtCetScore}</td>
          </tr>` : ''}
          ${jeeScore ? `
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:10px 0;color:#64748b;font-size:0.88rem;">JEE Score</td>
            <td style="padding:10px 0;text-align:right;color:#1a56db;font-weight:700;font-size:0.92rem;">${jeeScore}</td>
          </tr>` : ''}
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:10px 0;color:#64748b;font-size:0.88rem;vertical-align:top;">Preferred Branches</td>
            <td style="padding:10px 0;text-align:right;">
              ${branchList}
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#64748b;font-size:0.88rem;">Preferred Cities</td>
            <td style="padding:10px 0;text-align:right;color:#0a0f2e;font-weight:600;font-size:0.88rem;">${cityList}</td>
          </tr>
        </table>
      </div>

      <!-- Next Steps -->
      <div style="background:linear-gradient(135deg,rgba(26,86,219,0.08),rgba(79,110,247,0.08));border:1.5px solid rgba(26,86,219,0.2);border-radius:12px;padding:20px 24px;margin-bottom:32px;">
        <h3 style="margin:0 0 14px;font-weight:800;color:#0a0f2e;font-size:1.05rem;">🚀 What Happens Next?</h3>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:flex-start;gap:12px;">
            <span style="background:#1a56db;color:#fff;width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;flex-shrink:0;">1</span>
            <p style="margin:0;color:#374151;font-size:0.88rem;line-height:1.6;">
              <strong style="color:#0a0f2e;">Choose Your Plan</strong><br/>
              Browse our counselling packages below and select the one that fits your needs.
            </p>
          </div>
          <div style="display:flex;align-items:flex-start;gap:12px;">
            <span style="background:#1a56db;color:#fff;width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;flex-shrink:0;">2</span>
            <p style="margin:0;color:#374151;font-size:0.88rem;line-height:1.6;">
              <strong style="color:#0a0f2e;">Complete Payment</strong><br/>
              Secure checkout via Cashfree Payment Gateway. 100% safe & encrypted.
            </p>
          </div>
          <div style="display:flex;align-items:flex-start;gap:12px;">
            <span style="background:#1a56db;color:#fff;width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;flex-shrink:0;">3</span>
            <p style="margin:0;color:#374151;font-size:0.88rem;line-height:1.6;">
              <strong style="color:#0a0f2e;">Expert Counselling</strong><br/>
              Our counsellor will call you within <strong style="color:#1a56db;">24 hours</strong> to discuss your college options.
            </p>
          </div>
        </div>
      </div>

      <!-- Package Cards -->
      <div style="margin-bottom:32px;">
        <h3 style="text-align:center;color:#0a0f2e;font-size:1.25rem;font-weight:800;margin:0 0 20px;">Choose Your Counselling Plan</h3>
        ${packageCards}
      </div>

      <!-- Contact Info -->
      <div style="text-align:center;padding:20px;background:#f8fafc;border-radius:10px;margin-bottom:24px;">
        <p style="margin:0 0 12px;color:#64748b;font-size:0.85rem;font-weight:600;">Need Help? We're Here!</p>
        <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
          <a href="tel:+919529679073" style="color:#1a56db;text-decoration:none;font-weight:700;font-size:0.88rem;">
            📞 +91 95296 79073
          </a>
          <a href="https://wa.me/919529679073" style="color:#16a34a;text-decoration:none;font-weight:700;font-size:0.88rem;">
            💬 WhatsApp
          </a>
          <a href="mailto:support@praveshmitra.in" style="color:#d97706;text-decoration:none;font-weight:700;font-size:0.88rem;">
            ✉️ Email
          </a>
        </div>
      </div>

      <!-- Call to Action -->
      <div style="text-align:center;">
        <a href="https://praveshmitra.online/packages" style="display:inline-block;background:linear-gradient(135deg,#1a56db,#3730a3);color:#fff;padding:16px 40px;border-radius:10px;text-decoration:none;font-weight:800;font-size:1rem;box-shadow:0 4px 16px rgba(26,86,219,0.3);">
          View All Plans & Get Started →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#0a0f2e;padding:24px 40px;text-align:center;">
      <p style="margin:0 0 8px;color:rgba(255,255,255,0.5);font-size:0.78rem;line-height:1.6;">
        © ${new Date().getFullYear()} Pravesh Mitra — Your Trusted Admission Partner<br/>
        Chhatrapati Sambhaji Nagar, Maharashtra, India
      </p>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.4);font-size:0.72rem;">
        This is an automated email. Please do not reply to this message.
      </p>
    </div>

  </div>
</body>
</html>`
    });

    console.log(`✅ Quick Lead thank-you email sent to ${toEmail}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendQuickLeadThankYou };