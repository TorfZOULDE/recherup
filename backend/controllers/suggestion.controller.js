// backend/controllers/suggestion.controller.js
const db = require('../config/db');

// ─── PUBLIC ───────────────────────────────────────────

// Soumettre une nouvelle suggestion d'entreprise
exports.create = async (req, res) => {
  try {
    const {
      company_name, city, domain, contact_email,
      phone, website, description, source_type
    } = req.body;

    if (!company_name || !city || !domain || !['user', 'company'].includes(source_type)) {
      return res.status(400).json({ error: "Veuillez remplir tous les champs obligatoires." });
    }

    // Si l'utilisateur est connecté, on trace qui a soumis
    const submitted_by_user_id = req.user?.id || null;

    const sql = `INSERT INTO suggestions
      (company_name, city, domain, contact_email, phone, website, description, source_type, submitted_by_user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await db.query(sql, [
      company_name, city, domain, contact_email || null,
      phone || null, website || null, description || null,
      source_type, submitted_by_user_id
    ]);

    res.status(201).json({ message: "Votre suggestion a été soumise avec succès et est en attente de validation !" });
  } catch (error) {
    console.error("SUGGESTION CREATE ERROR:", error);
    res.status(500).json({ error: "Erreur lors de la soumission de la suggestion." });
  }
};

// ─── ADMIN ────────────────────────────────────────────

const LIMIT = 20;

// GET /api/admin/suggestions?page=1&status=&domain=&period=&search=
exports.getAllAdmin = async (req, res) => {
  const { page = 1, status = "", domain = "", period = "", search = "" } = req.query;
  const offset = (parseInt(page) - 1) * LIMIT;

  let where = "WHERE 1=1";
  const params = [];

  if (status) { where += " AND s.status = ?"; params.push(status); }
  if (domain) { where += " AND s.domain LIKE ?"; params.push(`%${domain}%`); }
  if (search) { where += " AND (s.company_name LIKE ? OR s.city LIKE ?)"; params.push(`%${search}%`, `%${search}%`); }
  if (period === "today") where += " AND DATE(s.submitted_at) = CURDATE()";
  if (period === "7d") where += " AND s.submitted_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
  if (period === "30d") where += " AND s.submitted_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)";

  try {
    const [rows] = await db.query(
      `SELECT s.*, u.name AS submitted_by_name
       FROM suggestions s
       LEFT JOIN users u ON u.id = s.submitted_by_user_id
       ${where}
       ORDER BY s.submitted_at DESC
       LIMIT ? OFFSET ?`,
      [...params, LIMIT, offset]
    );
    const [count] = await db.query(
      `SELECT COUNT(*) as total FROM suggestions s ${where}`,
      params
    );
    res.json({
      suggestions: rows,
      total: count[0].total,
      page: parseInt(page),
      totalPages: Math.ceil(count[0].total / LIMIT) || 1,
    });
  } catch (err) {
    console.error("SUGGESTION ADMIN LIST ERROR:", err);
    res.status(500).json({ error: "Erreur lors de la récupération des suggestions." });
  }
};

// GET /api/admin/suggestions/count
exports.getCountAdmin = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT COUNT(*) as total FROM suggestions WHERE status = 'pending'"
    );
    res.json({ total: rows[0].total });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// GET /api/admin/suggestions/:id
exports.getByIdAdmin = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT s.*, u.name AS submitted_by_name
       FROM suggestions s
       LEFT JOIN users u ON u.id = s.submitted_by_user_id
       WHERE s.id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Suggestion introuvable." });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// PATCH /api/admin/suggestions/:id/approve
exports.approve = async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
    const [rows] = await db.query("SELECT * FROM suggestions WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Suggestion introuvable." });
    const s = rows[0];

    if (s.status === "approved") {
      return res.status(400).json({ error: "Cette suggestion a déjà été approuvée." });
    }

    // Vérification de doublon avant insertion
    const [existing] = await db.query("SELECT id FROM companies WHERE name = ?", [s.company_name]);
    if (existing.length > 0) {
      await db.query(
        "UPDATE suggestions SET status = 'duplicate', reviewed_at = NOW() WHERE id = ?",
        [id]
      );
      return res.status(409).json({ error: "Entreprise déjà existante." });
    }

    conn = await db.getConnection();
    await conn.beginTransaction();

    await conn.query(
      "INSERT INTO companies (name, domain, city, description, contact_email, status) VALUES (?, ?, ?, ?, ?, 'approved')",
      [s.company_name, s.domain, s.city, s.description, s.contact_email]
    );
    await conn.query(
      "UPDATE suggestions SET status = 'approved', reviewed_at = NOW() WHERE id = ?",
      [id]
    );

    await conn.commit();
    res.json({ message: "Suggestion approuvée" });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("SUGGESTION APPROVE ERROR:", err);
    res.status(500).json({ error: "Erreur lors de l'approbation." });
  } finally {
    if (conn) conn.release();
  }
};

// PATCH /api/admin/suggestions/:id/reject
exports.reject = async (req, res) => {
  const { admin_comment } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE suggestions SET status = 'rejected', admin_comment = ?, reviewed_at = NOW() WHERE id = ?",
      [admin_comment || null, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Suggestion introuvable." });
    res.json({ message: "Suggestion rejetée." });
  } catch (err) {
    console.error("SUGGESTION REJECT ERROR:", err);
    res.status(500).json({ error: "Erreur lors du rejet." });
  }
};

// DELETE /api/admin/suggestions/:id
exports.remove = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM suggestions WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Suggestion introuvable." });
    res.json({ message: "Suggestion supprimée." });
  } catch (err) {
    console.error("SUGGESTION DELETE ERROR:", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};



// PUT /api/admin/suggestions/:id
exports.update = async (req, res) => {
  const { company_name, city, domain, contact_email, phone, website, description } = req.body;
  if (!company_name || !city || !domain) {
    return res.status(400).json({ error: "Nom, ville et domaine sont obligatoires." });
  }
  try {
    const [result] = await db.query(
      `UPDATE suggestions
       SET company_name=?, city=?, domain=?, contact_email=?, phone=?, website=?, description=?
       WHERE id=?`,
      [company_name, city, domain, contact_email || null, phone || null, website || null, description || null, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Suggestion introuvable." });
    res.json({ message: "Suggestion mise à jour." });
  } catch (err) {
    console.error("SUGGESTION UPDATE ERROR:", err);
    res.status(500).json({ error: "Erreur lors de la mise à jour." });
  }
};

// GET /api/admin/suggestions/:id/check-duplicate
exports.checkDuplicate = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT company_name FROM suggestions WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Suggestion introuvable." });
    const name = rows[0].company_name;

    const [matches] = await db.query(
      "SELECT id, name, city, status FROM companies WHERE name LIKE ? LIMIT 5",
      [`%${name}%`]
    );
    res.json({ found: matches.length > 0, matches });
  } catch (err) {
    console.error("SUGGESTION DUPLICATE CHECK ERROR:", err);
    res.status(500).json({ error: "Erreur lors de la vérification." });
  }
};

// GET /api/admin/suggestions/export?status=&domain=&period=&search=
exports.exportReport = async (req, res) => {
  const { status = "", domain = "", period = "", search = "" } = req.query;
  let where = "WHERE 1=1";
  const params = [];
  if (status) { where += " AND s.status = ?"; params.push(status); }
  if (domain) { where += " AND s.domain LIKE ?"; params.push(`%${domain}%`); }
  if (search) { where += " AND (s.company_name LIKE ? OR s.city LIKE ?)"; params.push(`%${search}%`, `%${search}%`); }
  if (period === "today") where += " AND DATE(s.submitted_at) = CURDATE()";
  if (period === "7d") where += " AND s.submitted_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
  if (period === "30d") where += " AND s.submitted_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)";

  try {
    const [rows] = await db.query(
      `SELECT s.id, s.company_name, s.city, s.domain, s.contact_email, s.phone, s.website,
              s.source_type, s.status, u.name AS submitted_by_name, s.submitted_at, s.reviewed_at, s.admin_comment
       FROM suggestions s
       LEFT JOIN users u ON u.id = s.submitted_by_user_id
       ${where}
       ORDER BY s.submitted_at DESC`,
      params
    );

    const headers = ["ID","Entreprise","Ville","Domaine","Email","Téléphone","Site web","Source","Statut","Proposé par","Date soumission","Date révision","Commentaire"];
    const escape = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [headers.join(",")];
    rows.forEach(r => {
      lines.push([
        r.id, r.company_name, r.city, r.domain, r.contact_email, r.phone, r.website,
        r.source_type, r.status, r.submitted_by_name || "Anonyme",
        r.submitted_at, r.reviewed_at || "", r.admin_comment || ""
      ].map(escape).join(","));
    });
    const csv = "\uFEFF" + lines.join("\n"); // BOM pour Excel

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", "attachment; filename=suggestions_rapport.csv");
    res.send(csv);
  } catch (err) {
    console.error("SUGGESTION EXPORT ERROR:", err);
    res.status(500).json({ error: "Erreur lors de la génération du rapport." });
  }
};