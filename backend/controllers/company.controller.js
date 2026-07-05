const db = require("../config/db");

const BASE_FIELDS = "id, name, domain, city, description, logoUrl, compatibilityScore, can_apply, contact_email, status";

// Toutes les entreprises (publiques uniquement)
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT ${BASE_FIELDS} FROM companies WHERE status = 'approved'`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Recherche avec pagination + filtres (Cas 3) — publiques uniquement
exports.search = async (req, res) => {
  const q = req.query.q || "";
  const { fieldId, domain, city, minScore } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const offset = (page - 1) * limit;

  try {
    let where = "WHERE c.status = 'approved' AND (c.name LIKE ? OR c.domain LIKE ? OR c.city LIKE ? OR c.description LIKE ?)";
    const params = [`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`];

    let join = "";
    if (fieldId) {
      join = "INNER JOIN company_fields cf ON cf.company_id = c.id";
      where += " AND cf.field_id = ?";
      params.push(fieldId);
    }
    if (domain) {
      where += " AND c.domain LIKE ?";
      params.push(`%${domain}%`);
    }
    if (city) {
      where += " AND c.city = ?";
      params.push(city);
    }
    if (minScore) {
      where += " AND c.compatibilityScore >= ?";
      params.push(minScore);
    }

    const [rows] = await db.query(
      `SELECT c.id, c.name, c.domain, c.city, c.description, c.logoUrl, c.compatibilityScore, c.can_apply, c.contact_email
       FROM companies c ${join} ${where}
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    const [countRows] = await db.query(
      `SELECT COUNT(*) as total FROM companies c ${join} ${where}`,
      params
    );
    res.json({
      results: rows,
      total: countRows[0].total,
      page,
      totalPages: Math.ceil(countRows[0].total / limit),
    });
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    res.status(500).json({ error: "Erreur recherche entreprises" });
  }
};

// Entreprises populaires (Cas 1 — non connecté) — publiques uniquement
exports.getPopular = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT ${BASE_FIELDS} FROM companies WHERE status = 'approved' ORDER BY compatibilityScore DESC LIMIT 6`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Entreprises recommandées (Cas 2 — connecté) — publiques uniquement
exports.getRecommended = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT ${BASE_FIELDS} FROM companies WHERE status = 'approved' ORDER BY compatibilityScore DESC LIMIT 6`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Une entreprise (page détail) — publique uniquement si approved
exports.getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query("SELECT * FROM companies WHERE id = ? AND status = 'approved'", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Entreprise non trouvée" });

    const [fields] = await db.query(
      `SELECT f.id, f.name, f.icon, f.color
       FROM fields f
       INNER JOIN company_fields cf ON cf.field_id = f.id
       WHERE cf.company_id = ?`,
      [id]
    );

    res.json({ ...rows[0], fields });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Créer une entreprise — toujours en attente de validation
exports.create = async (req, res) => {
  try {
    const { name, domain, city, description, contact_email } = req.body;
    await db.query(
      "INSERT INTO companies (name, domain, city, description, contact_email, status) VALUES (?, ?, ?, ?, ?, 'pending')",
      [name, domain, city, description, contact_email || null]
    );
    res.status(201).json({ message: "Entreprise soumise avec succès. Elle sera visible après validation par notre équipe." });
  } catch (err) {
    console.error("COMPANY ERROR:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
// Recherche unifiée home — entreprises + filières
exports.homeSearch = async (req, res) => {
  const q = (req.query.q || "").trim();
  if (!q) return res.json({ companies: [], fields: [] });

  try {
    const [companies] = await db.query(
      `SELECT id, name, domain, city, compatibilityScore, can_apply, contact_email
       FROM companies
       WHERE status = 'approved'
         AND (name LIKE ? OR domain LIKE ? OR city LIKE ? OR description LIKE ?)
       ORDER BY compatibilityScore DESC LIMIT 5`,
      [`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`]
    );

    const [fields] = await db.query(
      `SELECT id, name, description FROM fields WHERE name LIKE ? ORDER BY name ASC LIMIT 6`,
      [`%${q}%`]
    );

    res.json({ companies, fields });
  } catch (err) {
    console.error("HOME SEARCH ERROR:", err);
    res.status(500).json({ error: "Erreur recherche" });
  }
};
