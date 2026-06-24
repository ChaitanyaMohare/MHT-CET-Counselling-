const nodemailer = require('nodemailer');

// Create Gmail transporter with enhanced configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ SMTP connection error:', error);
  } else {
    console.log('✅ SMTP server is ready to send emails');
  }
});

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

  // Generate package cards HTML (table-based for better email client support)
  const packageCards = packages.map(pkg => `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#ffffff;border:2px solid ${pkg.badge ? '#1a56db' : '#e2e8f0'};border-radius:8px;margin-bottom:16px;">
      ${pkg.badge ? `
      <tr>
        <td style="padding:8px 0 0;text-align:center;">
          <span style="display:inline-block;background:linear-gradient(135deg,#1a56db,#4F6EF7);color:#ffffff;padding:4px 16px;border-radius:20px;font-size:11px;font-weight:bold;">${pkg.badge}</span>
        </td>
      </tr>` : ''}
      <tr>
        <td style="padding:20px;">
          <h3 style="color:#0a0f2e;font-size:20px;font-weight:bold;margin:0 0 4px;">${pkg.name} Plan</h3>
          <p style="color:#64748b;font-size:13px;margin:0 0 12px;">${pkg.subtitle}</p>
          <p style="margin:0 0 12px;">
            <span style="font-size:32px;font-weight:bold;color:#1a56db;line-height:1;">${pkg.price}</span>
            <span style="font-size:12px;color:#64748b;">/ one-time</span>
          </p>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:16px;">
            ${pkg.features.map(f => `
            <tr>
              <td style="padding:4px 0;font-size:14px;color:#374151;">
                <span style="color:#22c55e;font-weight:bold;margin-right:8px;">✓</span>${f}
              </td>
            </tr>`).join('')}
          </table>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="text-align:center;">
                <a href="${pkg.link}" style="display:inline-block;background-color:${pkg.badge ? '#1a56db' : '#f1f5f9'};color:${pkg.badge ? '#ffffff' : '#0a0f2e'};padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">
                  Select ${pkg.name} Plan →
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `).join('');

  try {
    const mailOptions = {
      from: {
        name: 'Pravesh Mitra',
        address: process.env.GMAIL_USER
      },
      to: toEmail,
      replyTo: process.env.GMAIL_USER,
      subject: 'Thank You for Your Interest - Pravesh Mitra',
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'Pravesh Mitra Counselling System',
        'Importance': 'normal'
      },
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>Thank You - Pravesh Mitra</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f1f5f9;">
    <tr>
      <td style="padding:20px 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin:0 auto;background-color:#ffffff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a56db 0%,#3730a3 100%);padding:36px 40px;text-align:center;border-radius:8px 8px 0 0;">
              <h1 style="color:#ffffff;margin:0;font-size:28px;font-weight:bold;">प्रवेश<span style="opacity:0.9;">मित्र</span></h1>
              <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:14px;">ऍडमिशन तुमचं, जबाबदारी आमची!</p>
            </td>
          </tr>

          <!-- Success Message -->
          <tr>
            <td style="padding:40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align:center;padding-bottom:24px;">
                    <div style="width:64px;height:64px;background-color:#dcfce7;border-radius:50%;display:inline-block;line-height:64px;font-size:32px;margin-bottom:16px;">✅</div>
                    <h2 style="color:#0a0f2e;margin:0 0 12px;font-size:24px;font-weight:bold;">Thank You for Your Interest!</h2>
                    <p style="color:#64748b;line-height:1.6;margin:0;font-size:16px;">
                      Dear <strong style="color:#0a0f2e;">${studentName}</strong>, we have successfully received your information.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Submission Summary -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 12px;font-size:12px;font-weight:bold;color:#94a3b8;text-transform:uppercase;">📋 Your Submission Summary</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr style="border-bottom:1px solid #e2e8f0;">
                        <td style="padding:10px 0;color:#64748b;font-size:14px;">Name</td>
                        <td style="padding:10px 0;text-align:right;color:#0a0f2e;font-weight:bold;font-size:14px;">${studentName}</td>
                      </tr>
                      ${mhtCetScore ? `
                      <tr style="border-bottom:1px solid #e2e8f0;">
                        <td style="padding:10px 0;color:#64748b;font-size:14px;">MHT-CET Score</td>
                        <td style="padding:10px 0;text-align:right;color:#1a56db;font-weight:bold;font-size:14px;">${mhtCetScore}</td>
                      </tr>` : ''}
                      ${jeeScore ? `
                      <tr style="border-bottom:1px solid #e2e8f0;">
                        <td style="padding:10px 0;color:#64748b;font-size:14px;">JEE Score</td>
                        <td style="padding:10px 0;text-align:right;color:#1a56db;font-weight:bold;font-size:14px;">${jeeScore}</td>
                      </tr>` : ''}
                      <tr style="border-bottom:1px solid #e2e8f0;">
                        <td style="padding:10px 0;color:#64748b;font-size:14px;vertical-align:top;">Branches</td>
                        <td style="padding:10px 0;text-align:right;font-size:13px;color:#0a0f2e;">${branches.length > 0 ? branches.join(', ') : 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;color:#64748b;font-size:14px;">Cities</td>
                        <td style="padding:10px 0;text-align:right;color:#0a0f2e;font-size:14px;">${cityList}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#e8f0fe;border:1px solid #c7d7fa;border-radius:8px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 16px;font-weight:bold;color:#0a0f2e;font-size:18px;">🚀 What Happens Next?</h3>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding-bottom:12px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="30" style="vertical-align:top;">
                                <div style="background-color:#1a56db;color:#ffffff;width:24px;height:24px;border-radius:50%;text-align:center;line-height:24px;font-weight:bold;font-size:12px;">1</div>
                              </td>
                              <td style="padding-left:8px;">
                                <p style="margin:0;color:#374151;font-size:14px;line-height:1.5;">
                                  <strong style="color:#0a0f2e;">Choose Your Plan</strong><br/>
                                  Select a counselling package that fits your needs.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:12px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="30" style="vertical-align:top;">
                                <div style="background-color:#1a56db;color:#ffffff;width:24px;height:24px;border-radius:50%;text-align:center;line-height:24px;font-weight:bold;font-size:12px;">2</div>
                              </td>
                              <td style="padding-left:8px;">
                                <p style="margin:0;color:#374151;font-size:14px;line-height:1.5;">
                                  <strong style="color:#0a0f2e;">Complete Payment</strong><br/>
                                  Secure checkout via Cashfree Gateway.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="30" style="vertical-align:top;">
                                <div style="background-color:#1a56db;color:#ffffff;width:24px;height:24px;border-radius:50%;text-align:center;line-height:24px;font-weight:bold;font-size:12px;">3</div>
                              </td>
                              <td style="padding-left:8px;">
                                <p style="margin:0;color:#374151;font-size:14px;line-height:1.5;">
                                  <strong style="color:#0a0f2e;">Expert Counselling</strong><br/>
                                  We'll call you within 24 hours.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Package Cards -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom:16px;">
                    <h3 style="text-align:center;color:#0a0f2e;font-size:20px;font-weight:bold;margin:0 0 20px;">Choose Your Counselling Plan</h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    ${packageCards}
                  </td>
                </tr>
              </table>

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
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Quick Lead thank-you email sent to ${toEmail}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendQuickLeadThankYou };