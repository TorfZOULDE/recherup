const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuration des CORS (autoriser uniquement ton frontend)
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
const contactRoutes = require("./routes/contact.routes");
app.use("/api/contact", contactRoutes);
// Routes principales
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/companies', require('./routes/company.routes'));
app.use('/api/fields', require('./routes/field.routes'));
app.use('/api/suggestions', require('./routes/suggestion.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

module.exports = app;
