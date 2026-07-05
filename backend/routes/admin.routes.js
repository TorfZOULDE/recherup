const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const suggestionAdmin = require('../controllers/suggestion.controller');
const messageAdmin = require('../controllers/message.controller');
const fieldCtrl = require('../controllers/field.controller');

router.use(authMiddleware, adminMiddleware);

// Entreprises
router.get('/companies/pending',          admin.getPendingCompanies); // AVANT /:id !
router.get('/companies',                  admin.getAllCompaniesAdmin);
router.get('/companies/:id',              admin.getCompanyById);
router.post('/companies',                 admin.createCompany);
router.put('/companies/:id',              admin.updateCompany);
router.delete('/companies/:id',           admin.deleteCompany);
router.patch('/companies/:id/status',     admin.toggleStatus);
router.patch('/companies/:id/approve',    admin.approveCompany);
router.patch('/companies/:id/reject',     admin.rejectCompany);

// Suggestions
router.get('/suggestions', suggestionAdmin.getAllAdmin);
router.get('/suggestions/count', suggestionAdmin.getCountAdmin);
router.get('/suggestions/export', suggestionAdmin.exportReport);
router.get('/suggestions/:id', suggestionAdmin.getByIdAdmin);
router.get('/suggestions/:id/check-duplicate', suggestionAdmin.checkDuplicate);
router.put('/suggestions/:id', suggestionAdmin.update);
router.patch('/suggestions/:id/approve', suggestionAdmin.approve);
router.patch('/suggestions/:id/reject', suggestionAdmin.reject);
router.delete('/suggestions/:id', suggestionAdmin.remove);

// Messages
router.get('/messages',                messageAdmin.getAll);
router.get('/messages/count',          messageAdmin.getCount);
router.get('/messages/:id',            messageAdmin.getById);
router.patch('/messages/:id/read',     messageAdmin.markAsRead);
router.post('/messages/:id/reply',     messageAdmin.reply);
router.patch('/messages/:id/archive',  messageAdmin.archive);
router.delete('/messages/:id',         messageAdmin.remove);

// Utilisateurs
router.get('/users/count',            admin.getUserCount);
router.get('/users/export',           admin.exportUsers); // AVANT /:id !
router.get('/users',                  admin.getAllUsers);
router.get('/users/:id',              admin.getUserById);
router.put('/users/:id',              admin.updateUser);
router.patch('/users/:id/status',     admin.updateUserStatus);
router.delete('/users/:id',           admin.deleteUser);

// Filières
router.get('/fields',        admin.getAllFieldsAdmin);  // ← corrigé
router.post('/fields',       fieldCtrl.createField);
router.put('/fields/:id',    fieldCtrl.updateField);
router.delete('/fields/:id', fieldCtrl.deleteField);
// Dashboard
router.get("/dashboard/stats", admin.getDashboardStats);
router.get("/dashboard/charts", admin.getDashboardCharts);
router.get("/activity-logs", admin.getActivityLogs);

module.exports = router;