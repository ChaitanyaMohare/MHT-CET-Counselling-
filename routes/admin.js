const express = require('express');
const router = express.Router();
const {
  requireAdmin,
  getLogin, postLogin, logout,
  getDashboard,
  getStudentDetail, postCounsellingForm,
  getQuickLeads
} = require('../controllers/adminController');

router.get('/admin/login', getLogin);
router.post('/admin/login', postLogin);
router.get('/admin/logout', logout);

router.get('/admin', requireAdmin, getDashboard);
router.get('/admin/student/:id', requireAdmin, getStudentDetail);
router.post('/admin/student/:id/form', requireAdmin, postCounsellingForm);
router.get('/admin/quick-leads', requireAdmin, getQuickLeads);

module.exports = router;
