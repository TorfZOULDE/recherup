// controllers/contact.controller.js
const db = require("../config/db");

/**
 * POST /api/contact
 * Body support  : { type, nom, email, message }
 * Body entreprise: { type, nomEntreprise, email, typedemande, message }
 */
exports.submit = async (req, res) => {
  try {
    const { type } = req.body;

    if (!type || !["support", "entreprise"].includes(type)) {
      return res.status(400).json({ error: "Type de contact invalide." });
    }

    if (!req.body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
      return res.status(400).json({ error: "Adresse email invalide." });
    }

    if (!req.body.message || req.body.message.trim().length < 10) {
      return res.status(400).json({ error: "Le message doit contenir au moins 10 caractères." });
    }

    if (type === "support") {
      const { nom, email, message } = req.body;
      if (!nom || nom.trim().length < 2) {
        return res.status(400).json({ error: "Le nom est requis." });
      }

      const [result] = await db.execute(
        `INSERT INTO contacts (type, nom, email, message, created_at)
         VALUES (?, ?, ?, ?, NOW())`,
        [type, nom.trim(), email.trim().toLowerCase(), message.trim()]
      );

      return res.status(201).json({ success: true, id: result.insertId });

    } else {
      // entreprise
      const { nomEntreprise, email, typedemande, message } = req.body;

      if (!nomEntreprise || nomEntreprise.trim().length < 2) {
        return res.status(400).json({ error: "Le nom de l'entreprise est requis." });
      }

      const typesValides = ["offre", "partenariat", "sponsoring", "autre"];
      if (!typedemande || !typesValides.includes(typedemande)) {
        return res.status(400).json({ error: "Type de demande invalide." });
      }

      const [result] = await db.execute(
        `INSERT INTO contacts (type, nom_entreprise, email, type_demande, message, created_at)
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [type, nomEntreprise.trim(), email.trim().toLowerCase(), typedemande, message.trim()]
      );

      return res.status(201).json({ success: true, id: result.insertId });
    }

  } catch (err) {
    console.error("[ContactController] submit error:", err);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

/**
 * GET /api/contact  – liste pour l'admin
 * Protège cette route avec ton middleware admin avant de l'exposer
 */
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, type, nom, nom_entreprise, email, type_demande, message, statut, created_at
       FROM contacts
       ORDER BY created_at DESC`
    );
    return res.json(rows);
  } catch (err) {
    console.error("[ContactController] getAll error:", err);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};