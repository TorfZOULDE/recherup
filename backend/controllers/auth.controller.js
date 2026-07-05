// backend/controllers/auth.controller.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 1. INSCRIPTION
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Veuillez remplir tous les champs" });
    }

    // Hachage du mot de passe pour la sécurité
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertion dans la base de données
    await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
};

// 2. CONNEXION
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ error: "Identifiants incorrects" });
    }

    const user = rows[0];

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Identifiants incorrects" });
    }

    // Créer le token JWT valide pour 24 heures
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Renvoyer les infos (sans le mot de passe) et le token
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};