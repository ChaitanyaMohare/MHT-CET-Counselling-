const Student = require('../models/Student');
const CounsellingForm = require('../models/CounsellingForm');

exports.getMainForm = async (req, res) => {
  if (!req.session.studentId || !req.session.paymentDone) return res.redirect('/payment');
  try {
    const student = await Student.findById(req.session.studentId);
    if (!student || student.paymentStatus !== 'paid') return res.redirect('/payment');
    res.render('main-form', {
      title: 'Counselling Form — MHT-CET Counselling',
      student,
      errors: [],
      formData: {}
    });
  } catch (err) {
    console.error(err);
    res.redirect('/payment');
  }
};

exports.postMainForm = async (req, res) => {
  if (!req.session.studentId || !req.session.paymentDone) return res.redirect('/payment');

  try {
    const student = await Student.findById(req.session.studentId);
    if (!student || student.paymentStatus !== 'paid') return res.redirect('/payment');

    const {
      branchPrimary, branchSecondary, lateralEntry,
      collegeType, minorityOk, deemedOk,
      preferredCities, maxDistance, homeDistrict,
      rankingPreference, naacGrade, nbaRequired, placementPriority,
      feeBudget, hostelRequired, hostelType, scholarshipNeeded,
      priority_collegeReputation, priority_branch, priority_location, priority_fee, priority_placement,
      sportsQuota, managementQuota, targetCollege, excludeCollege,
      careerPlan, dreamCompanies, notes
    } = req.body;

    const errors = [];
    if (!branchPrimary) errors.push('Primary branch preference is required');
    if (!homeDistrict || !homeDistrict.trim()) errors.push('Home district is required');

    if (errors.length > 0) {
      return res.render('main-form', {
        title: 'Counselling Form — MHT-CET Counselling',
        student,
        errors,
        formData: req.body
      });
    }

    // Normalize arrays
    const branchArr = Array.isArray(branchSecondary)
      ? branchSecondary : branchSecondary ? [branchSecondary] : [];
    const collegeTypeArr = Array.isArray(collegeType)
      ? collegeType : collegeType ? [collegeType] : [];
    const citiesArr = Array.isArray(preferredCities)
      ? preferredCities : preferredCities ? [preferredCities] : [];

    const form = new CounsellingForm({
      studentId: student._id,
      branchPrimary,
      branchSecondary: branchArr.slice(0, 5),
      lateralEntry: lateralEntry || 'No',
      collegeType: collegeTypeArr,
      minorityOk: minorityOk || 'No',
      deemedOk: deemedOk || 'No',
      preferredCities: citiesArr,
      maxDistance: maxDistance || 'Any',
      homeDistrict: homeDistrict ? homeDistrict.trim() : '',
      rankingPreference: rankingPreference || 'Any Accredited',
      naacGrade: naacGrade || 'Any',
      nbaRequired: nbaRequired || 'No',
      placementPriority: placementPriority || 'Not a priority',
      feeBudget: feeBudget || 'No Limit',
      hostelRequired: hostelRequired || 'No',
      hostelType: hostelType || '',
      scholarshipNeeded: scholarshipNeeded || 'No',
      priorityRanking: {
        collegeReputation: parseInt(priority_collegeReputation) || 1,
        branch: parseInt(priority_branch) || 2,
        location: parseInt(priority_location) || 3,
        fee: parseInt(priority_fee) || 4,
        placement: parseInt(priority_placement) || 5
      },
      sportsQuota: sportsQuota || 'No',
      managementQuota: managementQuota || 'No',
      targetCollege: targetCollege ? targetCollege.trim() : '',
      excludeCollege: excludeCollege ? excludeCollege.trim() : '',
      careerPlan: careerPlan || 'Not Sure',
      dreamCompanies: dreamCompanies ? dreamCompanies.trim() : '',
      notes: notes ? notes.trim() : ''
    });

    await form.save();
    req.session.formSubmitted = true;
    req.session.counsellingFormId = form._id.toString();
    res.redirect('/thankyou');
  } catch (err) {
    console.error(err);
    const student = await Student.findById(req.session.studentId).catch(() => null);
    res.render('main-form', {
      title: 'Counselling Form — MHT-CET Counselling',
      student,
      errors: ['Server error. Please try again.'],
      formData: req.body
    });
  }
};

exports.getThankYou = async (req, res) => {
  if (!req.session.studentId) return res.redirect('/');
  try {
    const student = await Student.findById(req.session.studentId);
    const form = req.session.counsellingFormId
      ? await CounsellingForm.findById(req.session.counsellingFormId)
      : null;
    res.render('thankyou', {
      title: 'Thank You — MHT-CET Counselling',
      student,
      form
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};
