// backend/routes/suggestion.routes.js
const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const ctrl = require('../controllers/suggestion.controller');

// Configuration du Rate Limiter pour éviter les abus (Page 22 du guide)
const suggestionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Fenêtre de 15 minutes
  max: 5, // Limite chaque IP à 5 requêtes par fenêtre
  message: { error: "Trop de requêtes formulées depuis cette IP. Veuillez réessayer dans 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/suggestions (Route publique mais limitée en requêtes)
router.post('/', suggestionLimiter, ctrl.create);

module.exports = router;