const Student = require('../models/Student');
const CounsellingForm = require('../models/CounsellingForm');
const QuickLead = require('../models/QuickLead');

const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';

// ── Middleware ──────────────────────────────────────────────
exports.requireAdmin = (req, res, next) => {
  if (req.session.isAdmin) return next();
  res.redirect('/admin/login');
};

// ── GET /admin/login ────────────────────────────────────────
exports.getLogin = (req, res) => {
  if (req.session.isAdmin) return res.redirect('/admin');
  res.render('admin/login', { title: 'Admin Login', error: null });
};

// ── POST /admin/login ───────────────────────────────────────
exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.isAdmin = true;
    return res.redirect('/admin');
  }
  res.render('admin/login', { title: 'Admin Login', error: 'Invalid username or password.' });
};

// ── GET /admin/logout ───────────────────────────────────────
exports.logout = (req, res) => {
  req.session.isAdmin = false;
  res.redirect('/admin/login');
};

// ── GET /admin — Dashboard: all students ───────────────────
exports.getDashboard = async (req, res) => {
  try {
    const filter = req.query.status || 'all';
    const search = req.query.search || '';

    let query = {};
    if (filter === 'paid') query.paymentStatus = 'paid';
    if (filter === 'pending') query.paymentStatus = 'pending_payment';
    if (search) {
      query.$or = [
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
        { mobile: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }

    const students = await Student.find(query).sort({ createdAt: -1 });

    // Attach counselling form status for each student
    const studentIds = students.map(s => s._id);
    const forms = await CounsellingForm.find({ studentId: { $in: studentIds } }).select('studentId');
    const formSet = new Set(forms.map(f => f.studentId.toString()));

    const enriched = students.map(s => ({
      ...s.toObject(),
      hasForm: formSet.has(s._id.toString())
    }));

    const totalStudents = await Student.countDocuments();
    const paidStudents = await Student.countDocuments({ paymentStatus: 'paid' });
    const pendingStudents = await Student.countDocuments({ paymentStatus: 'pending_payment' });
    const formsCount = await CounsellingForm.countDocuments();
    const quickLeadsCount = await QuickLead.countDocuments();

    res.render('admin/dashboard', {
      title: 'Admin Dashboard — NextStep',
      students: enriched,
      stats: { totalStudents, paidStudents, pendingStudents, formsCount, quickLeadsCount },
      filter,
      search
    });
  } catch (err) {
    console.error(err);
    res.render('error', { title: 'Error', error: err.message });
  }
};

// ── GET /admin/student/:id — Student detail ─────────────────
exports.getStudentDetail = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.redirect('/admin');
    const form = await CounsellingForm.findOne({ studentId: student._id });
    res.render('admin/student-detail', {
      title: `${student.firstName} ${student.lastName} — Admin`,
      student,
      form,
      errors: [],
      formData: form ? form.toObject() : {},
      saved: req.query.saved === '1'
    });
  } catch (err) {
    console.error(err);
    res.redirect('/admin');
  }
};

// ── POST /admin/student/:id/form — Save counselling form ────
exports.postCounsellingForm = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.redirect('/admin');

    const {
      branchPrimary, branchSecondary, lateralEntry,
      collegeType, minorityOk, deemedOk,
      preferredCities, maxDistance, homeDistrict,
      rankingPreference, naacGrade, nbaRequired, placementPriority,
      feeBudget, hostelRequired, hostelType, scholarshipNeeded,
      priority_collegeReputation, priority_branch, priority_location,
      priority_fee, priority_placement,
      sportsQuota, managementQuota, targetCollege, excludeCollege,
      careerPlan, dreamCompanies, notes
    } = req.body;

    const errors = [];
    if (!branchPrimary) errors.push('Primary branch preference is required');

    if (errors.length > 0) {
      const form = await CounsellingForm.findOne({ studentId: student._id });
      return res.render('admin/student-detail', {
        title: `${student.firstName} ${student.lastName} — Admin`,
        student, form,
        errors,
        formData: req.body,
        saved: false
      });
    }

    const branchArr = Array.isArray(branchSecondary) ? branchSecondary : branchSecondary ? [branchSecondary] : [];
    const collegeTypeArr = Array.isArray(collegeType) ? collegeType : collegeType ? [collegeType] : [];
    const citiesArr = Array.isArray(preferredCities) ? preferredCities : preferredCities ? [preferredCities] : [];

    const formData = {
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
      notes: notes ? notes.trim() : '',
      submittedAt: new Date()
    };

    // Upsert — update if exists, create if not
    await CounsellingForm.findOneAndUpdate(
      { studentId: student._id },
      formData,
      { upsert: true, new: true }
    );

    res.redirect('/admin/student/' + student._id + '?saved=1');
  } catch (err) {
    console.error(err);
    res.redirect('/admin');
  }
};
