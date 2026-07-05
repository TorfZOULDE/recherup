// backend/routes/auth.routes.js
const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');

// POST /api/auth/register
router.post('/register', ctrl.register);

// POST /api/auth/login
router.post('/login', ctrl.login);

module.exports = router;