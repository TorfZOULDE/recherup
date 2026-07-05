// routes/contact.routes.js
const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

// POST /api/contact
router.post("/", contactController.submit);

// GET /api/contact  (admin uniquement)
router.get("/", contactController.getAll);

module.exports = router;