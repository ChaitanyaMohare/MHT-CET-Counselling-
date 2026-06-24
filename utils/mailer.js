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
    rejectUnauthorized: false,
    ciphers: 'SSLv3'
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 10
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

  // Generate package cards HTML (simplified for primary inbox delivery)
  const packageCards = packages.map(pkg => `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#ffffff;border:1px solid #d1d5db;margin-bottom:15px;">
      <tr>
        <td style="padding:18px;">
          ${pkg.badge ? `<p style="margin:0 0 8px;font-size:12px;color:#2563eb;font-weight:bold;">${pkg.badge}</p>` : ''}
          <h3 style="color:#1f2937;font-size:18px;font-weight:bold;margin:0 0 5px;">${pkg.name}</h3>
          <p style="color:#6b7280;font-size:13px;margin:0 0 10px;">${pkg.subtitle}</p>
          <p style="margin:0 0 12px;">
            <span style="font-size:28px;font-weight:bold;color:#2563eb;">${pkg.price}</span>
          </p>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:15px;">
            ${pkg.features.map(f => `
            <tr>
              <td style="padding:3px 0;font-size:13px;color:#374151;">
                - ${f}
              </td>
            </tr>`).join('')}
          </table>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td>
                <a href="${pkg.link}" style="display:inline-block;background-color:#2563eb;color:#ffffff;padding:10px 20px;text-decoration:none;font-size:14px;">
                  Choose ${pkg.name}
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
        name: 'Pravesh Mitra Counselling',
        address: process.env.GMAIL_USER
      },
      to: toEmail,
      replyTo: {
        name: 'Pravesh Mitra Support',
        address: process.env.GMAIL_USER
      },
      subject: 'Your College Counselling Information - Pravesh Mitra',
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'Nodemailer',
        'Importance': 'normal',
        'X-Entity-Ref-ID': `PMITRA-${Date.now()}`,
        'List-Unsubscribe': `<mailto:${process.env.GMAIL_USER}?subject=unsubscribe>`
      },
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Your College Counselling Information</title>
</head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:Arial,sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f8f9fa;">
    <tr>
      <td style="padding:20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background-color:#ffffff;">
          
          <!-- Simple Header -->
          <tr>
            <td style="background-color:#2563eb;padding:30px 20px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:normal;">Pravesh Mitra</h1>
              <p style="color:#ffffff;margin:5px 0 0;font-size:13px;">MHT-CET Counselling Support</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:30px 20px;">
              
              <!-- Greeting -->
              <p style="margin:0 0 20px;font-size:16px;color:#1f2937;">
                Hello ${studentName},
              </p>
              
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
                We have received your request for college counselling guidance. Thank you for choosing Pravesh Mitra.
              </p>

              <!-- Information Received -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f9fafb;border:1px solid #e5e7eb;margin-bottom:25px;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 15px;font-size:14px;font-weight:bold;color:#374151;">Information Received:</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      ${mhtCetScore ? `
                      <tr>
                        <td style="padding:8px 0;color:#6b7280;font-size:14px;">MHT-CET Score:</td>
                        <td style="padding:8px 0;text-align:right;color:#1f2937;font-size:14px;">${mhtCetScore}</td>
                      </tr>` : ''}
                      ${jeeScore ? `
                      <tr>
                        <td style="padding:8px 0;color:#6b7280;font-size:14px;">JEE Score:</td>
                        <td style="padding:8px 0;text-align:right;color:#1f2937;font-size:14px;">${jeeScore}</td>
                      </tr>` : ''}
                      ${branches.length > 0 ? `
                      <tr>
                        <td style="padding:8px 0;color:#6b7280;font-size:14px;vertical-align:top;">Preferred Branches:</td>
                        <td style="padding:8px 0;text-align:right;font-size:13px;color:#1f2937;">${branches.join(', ')}</td>
                      </tr>` : ''}
                      ${cities.length > 0 ? `
                      <tr>
                        <td style="padding:8px 0;color:#6b7280;font-size:14px;">Preferred Cities:</td>
                        <td style="padding:8px 0;text-align:right;color:#1f2937;font-size:14px;">${cityList}</td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:25px;">
                <tr>
                  <td>
                    <p style="margin:0 0 15px;font-size:15px;font-weight:bold;color:#1f2937;">Next Steps:</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding:0 0 12px;">
                          <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                            <strong>1. Review our counselling packages</strong><br>
                            Choose a plan that matches your requirements.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 12px;">
                          <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                            <strong>2. Complete the payment process</strong><br>
                            Secure payment through our official gateway.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 12px;">
                          <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                            <strong>3. We will contact you within 24 hours</strong><br>
                            Our counselling team will reach out to guide you.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Available Plans -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:25px;">
                <tr>
                  <td>
                    <p style="margin:0 0 15px;font-size:15px;font-weight:bold;color:#1f2937;">Available Counselling Plans:</p>
                  </td>
                </tr>
              </table>

              ${packageCards}

              <!-- Contact Information -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f9fafb;border:1px solid #e5e7eb;margin-top:25px;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 10px;font-size:14px;font-weight:bold;color:#374151;">Need assistance?</p>
                    <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">
                      Phone: +91 95296 79073<br>
                      Email: support@praveshmitra.in<br>
                      WhatsApp: +91 95296 79073
                    </p>
                  </td>
                </tr>
              </table>

              <!-- View Plans Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top:25px;">
                <tr>
                  <td style="text-align:center;">
                    <a href="https://praveshmitra.online/packages" style="display:inline-block;background-color:#2563eb;color:#ffffff;padding:14px 32px;text-decoration:none;font-size:15px;border-radius:4px;">
                      View All Plans
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f3f4f6;padding:20px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 5px;color:#6b7280;font-size:13px;">
                Pravesh Mitra - MHT-CET Counselling<br>
                Chhatrapati Sambhaji Nagar, Maharashtra
              </p>
              <p style="margin:5px 0 0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} Pravesh Mitra. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
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
