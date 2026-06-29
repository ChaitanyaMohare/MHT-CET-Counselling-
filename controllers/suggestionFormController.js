const Response = require('../models/Response');
const { sendSuggestionEmail } = require('../utils/mailer');
const { getDocumentLink } = require('../driveConfig');

// Submit Suggestion Form
exports.submitSuggestionForm = async (req, res) => {
  try {
    console.log('📝 Suggestion form submission received');
    
    const { fullName, mobileNo, email, mhtCetScore, jeeScore, branches, cities, percentileRange } = req.body;

    // Validation
    if (!fullName || !mobileNo || !email || !mhtCetScore || !branches || !cities || !percentileRange) {
      console.error('❌ Validation failed: Missing required fields');
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill all required fields' 
      });
    }

    // Validate mobile number
    if (!/^[6-9]\d{9}$/.test(mobileNo.trim())) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid 10-digit mobile number' 
      });
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    // Get document link for the selected percentile range
    const documentInfo = getDocumentLink(percentileRange);
    
    if (!documentInfo) {
      console.warn('⚠️ No document found for percentile range:', percentileRange);
    }

    // Create new response
    const newResponse = new Response({
      fullName: fullName.trim(),
      mobileNo: mobileNo.trim(),
      email: email.trim().toLowerCase(),
      mhtCetScore: parseFloat(mhtCetScore),
      jeeScore: jeeScore ? parseFloat(jeeScore) : null,
      percentileRange,
      branches: Array.isArray(branches) ? branches : [branches],
      cities: Array.isArray(cities) ? cities : [cities]
    });

    await newResponse.save();
    console.log('✅ Suggestion form data saved to MongoDB');

    // Send email with college suggestions and plans
    try {
      const emailResult = await sendSuggestionEmail({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        mhtCetScore: parseFloat(mhtCetScore),
        jeeScore: jeeScore ? parseFloat(jeeScore) : null,
        percentileRange,
        branches: Array.isArray(branches) ? branches : [branches],
        cities: Array.isArray(cities) ? cities : [cities],
        documentLink: documentInfo ? documentInfo.link : null,
        documentName: documentInfo ? documentInfo.name : null
      });

      if (!emailResult.success) {
        console.warn('⚠️ Email failed to send:', emailResult.error);
      } else {
        console.log('✅ Suggestion email sent successfully');
      }
    } catch (emailError) {
      console.error('❌ Email error:', emailError.message);
      // Don't fail the request if email fails
    }

    res.status(201).json({ 
      success: true, 
      message: 'Thank you! Check your email for college suggestions and counselling plans.',
      data: newResponse,
      documentLink: documentInfo ? documentInfo.link : null,
      documentName: documentInfo ? documentInfo.name : null
    });
  } catch (error) {
    console.error('❌ Error in suggestion form submission:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.'
    });
  }
};
