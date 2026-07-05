const db = require('../config/db');

// Récupérer toutes les filières
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM fields ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des filières" });
  }
};

// Récupérer les entreprises liées à une filière (Cas 4) — publiques uniquement
exports.getCompaniesByField = async (req, res) => {
  try {
    const fieldId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;

    const [rows] = await db.query(
      `SELECT c.id, c.name, c.domain, c.city, c.description, c.logoUrl, c.compatibilityScore, c.can_apply, c.contact_email
       FROM companies c
       INNER JOIN company_fields cf ON cf.company_id = c.id
       WHERE cf.field_id = ? AND c.status = 'approved'
       ORDER BY c.compatibilityScore DESC
       LIMIT ? OFFSET ?`,
      [fieldId, limit, offset]
    );

    const [countRows] = await db.query(
      `SELECT COUNT(*) as total FROM company_fields cf
       INNER JOIN companies c ON c.id = cf.company_id
       WHERE cf.field_id = ? AND c.status = 'approved'`,
      [fieldId]
    );

    const [fieldRows] = await db.query('SELECT * FROM fields WHERE id = ?', [fieldId]);
    if (fieldRows.length === 0) {
      return res.status(404).json({ error: "Filière introuvable" });
    }

    res.json({
      field: fieldRows[0],
      results: rows,
      total: countRows[0].total,
      page,
      totalPages: Math.ceil(countRows[0].total / limit),
    });
  } catch (error) {
    console.error('FIELD COMPANIES ERROR:', error);
    res.status(500).json({ error: "Erreur lors de la récupération des entreprises de cette filière" });
  }
};
// Recherche filières — GET /api/fields/search?q=info
exports.search = async (req, res) => {
  try {
    const q = req.query.q || "";
    const [rows] = await db.query(
      "SELECT * FROM fields WHERE name LIKE ? OR description LIKE ? ORDER BY name ASC LIMIT 20",
      [`%${q}%`, `%${q}%`]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la recherche" });
  }
};

// Filières paginées — GET /api/fields/paginated?page=1
exports.getPaginated = async (req, res) => {
  try {
    const page  = parseInt(req.query.page) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;
    const [rows]  = await db.query("SELECT * FROM fields ORDER BY name ASC LIMIT ? OFFSET ?", [limit, offset]);
    const [[count]] = await db.query("SELECT COUNT(*) as total FROM fields");
    res.json({
      fields:     rows,
      total:      count.total,
      page,
      totalPages: Math.ceil(count.total / limit),
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération paginée" });
  }
};


// ─── CRUD ADMIN ───────────────────────────────────────────

// POST /api/admin/fields
exports.createField = async (req, res) => {
  const { name, icon, color } = req.body;
  if (!name) return res.status(400).json({ error: "Le nom est obligatoire." });
  try {
    const [result] = await db.query(
      "INSERT INTO fields (name, icon, color) VALUES (?, ?, ?)",
      [name, icon || null, color || "#6366f1"]
    );
    res.status(201).json({ message: "Filière créée.", id: result.insertId });
  } catch (err) {
    console.error("CREATE FIELD ERROR:", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// PUT /api/admin/fields/:id
exports.updateField = async (req, res) => {
  const { name, icon, color } = req.body;
  const { id } = req.params;
  if (!name) return res.status(400).json({ error: "Le nom est obligatoire." });
  try {
    const [result] = await db.query(
      "UPDATE fields SET name=?, icon=?, color=? WHERE id=?",
      [name, icon || null, color || "#6366f1", id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Filière introuvable." });
    res.json({ message: "Filière mise à jour." });
  } catch (err) {
    console.error("UPDATE FIELD ERROR:", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// DELETE /api/admin/fields/:id
exports.deleteField = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM fields WHERE id=?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Filière introuvable." });
    res.json({ message: "Filière supprimée." });
  } catch (err) {
    console.error("DELETE FIELD ERROR:", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};
// Recherche filières — GET /api/fields/search?q=info
exports.search = async (req, res) => {
  try {
    const q = req.query.q || "";
    const [rows] = await db.query(
      "SELECT * FROM fields WHERE name LIKE ? OR description LIKE ? ORDER BY name ASC LIMIT 20",
      [`%${q}%`, `%${q}%`]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la recherche" });
  }
};

// Filières paginées — GET /api/fields/paginated?page=1
exports.getPaginated = async (req, res) => {
  try {
    const page  = parseInt(req.query.page) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;
    const [rows]  = await db.query("SELECT * FROM fields ORDER BY name ASC LIMIT ? OFFSET ?", [limit, offset]);
    const [[count]] = await db.query("SELECT COUNT(*) as total FROM fields");
    res.json({
      fields:     rows,
      total:      count.total,
      page,
      totalPages: Math.ceil(count.total / limit),
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération paginée" });
  }
};
