const router = require('express').Router();
const ctrl = require('../controllers/field.controller');

// GET /api/fields/search?q=
router.get('/search', ctrl.search);

// GET /api/fields/paginated?page=1
router.get('/paginated', ctrl.getPaginated);

// GET /api/fields/search?q=
router.get('/search', ctrl.search);

// GET /api/fields/paginated?page=1
router.get('/paginated', ctrl.getPaginated);

// GET /api/fields (toutes les filières)
router.get('/', ctrl.getAll);

// GET /api/fields/:id/companies (entreprises liées à une filière — Cas 4)
router.get('/:id/companies', ctrl.getCompaniesByField);

module.exports = router;