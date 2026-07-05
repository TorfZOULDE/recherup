const db = require('../config/db');
const LIMIT = 10;

// ─── ENTREPRISES ─────────────────────────────────────────

exports.getPendingCompanies = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM companies WHERE status = 'pending' ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error('ADMIN PENDING ERROR:', err);
    res.status(500).json({ error: "Erreur lors de la récupération des entreprises en attente." });
  }
};

exports.approveCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      "UPDATE companies SET status = 'approved', validated_at = NOW(), validated_by = ? WHERE id = ?",
      [req.user.id, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Entreprise introuvable." });
    res.json({ message: "Entreprise approuvée avec succès." });
  } catch (err) {
    console.error('ADMIN APPROVE ERROR:', err);
    res.status(500).json({ error: "Erreur lors de l'approbation." });
  }
};

exports.rejectCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      "UPDATE companies SET status = 'rejected', validated_at = NOW(), validated_by = ? WHERE id = ?",
      [req.user.id, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Entreprise introuvable." });
    res.json({ message: "Entreprise rejetée." });
  } catch (err) {
    console.error('ADMIN REJECT ERROR:', err);
    res.status(500).json({ error: "Erreur lors du rejet." });
  }
};

exports.getAllCompaniesAdmin = async (req, res) => {
  const { page = 1, search = "", status = "", city = "" } = req.query;
  const offset = (parseInt(page) - 1) * LIMIT;

  let where = "WHERE 1=1";
  const params = [];

  if (search) {
    where += " AND (name LIKE ? OR domain LIKE ? OR city LIKE ?)";
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  if (status) { where += " AND status = ?"; params.push(status); }
  if (city)   { where += " AND city LIKE ?"; params.push(`%${city}%`); }

  try {
    const [rows] = await db.query(
      `SELECT * FROM companies ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, LIMIT, offset]
    );
    const [count] = await db.query(
      `SELECT COUNT(*) as total FROM companies ${where}`,
      params
    );
    res.json({ companies: rows, total: count[0].total });
  } catch (err) {
    console.error('ADMIN GET ALL ERROR:', err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM companies WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Entreprise introuvable." });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
};

exports.createCompany = async (req, res) => {
  const { name, domain, city, description, contact_email, status = "pending" } = req.body;
  if (!name || !domain || !city) {
    return res.status(400).json({ error: "Nom, domaine et ville sont obligatoires." });
  }
  try {
    await db.query(
      "INSERT INTO companies (name, domain, city, description, contact_email, status) VALUES (?, ?, ?, ?, ?, ?)",
      [name, domain, city, description || null, contact_email || null, status]
    );
    res.status(201).json({ message: "Entreprise créée avec succès." });
  } catch (err) {
    console.error('ADMIN CREATE ERROR:', err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

exports.updateCompany = async (req, res) => {
  const { name, domain, city, description, contact_email, status } = req.body;
  const { id } = req.params;
  try {
    const [result] = await db.query(
      "UPDATE companies SET name=?, domain=?, city=?, description=?, contact_email=?, status=? WHERE id=?",
      [name, domain, city, description || null, contact_email || null, status, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Entreprise introuvable." });
    res.json({ message: "Entreprise mise à jour." });
  } catch (err) {
    console.error('ADMIN UPDATE ERROR:', err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM companies WHERE id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Entreprise introuvable." });
    res.json({ message: "Entreprise supprimée." });
  } catch (err) {
    console.error('ADMIN DELETE ERROR:', err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

exports.toggleStatus = async (req, res) => {
  const { status } = req.body;
  const allowed = ["approved", "pending", "rejected", "disabled"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "Statut invalide." });
  }
  try {
    const [result] = await db.query(
      "UPDATE companies SET status = ? WHERE id = ?",
      [status, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Entreprise introuvable." });
    res.json({ message: "Statut mis à jour." });
  } catch (err) {
    console.error('ADMIN TOGGLE ERROR:', err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// ─── FILIÈRES ────────────────────────────────────────────

const FIELD_LIMIT = 10;

exports.getAllFieldsAdmin = async (req, res) => {
  const { page = 1, limit = FIELD_LIMIT } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  try {
    const [rows] = await db.query(
      "SELECT * FROM fields ORDER BY name ASC LIMIT ? OFFSET ?",
      [parseInt(limit), offset]
    );
    const [[count]] = await db.query("SELECT COUNT(*) as total FROM fields");
    res.json({ fields: rows, total: count.total });
  } catch (err) {
    console.error('ADMIN GET FIELDS ERROR:', err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

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

exports.updateField = async (req, res) => {
  const { name, icon, color } = req.body;
  const { id } = req.params;
  if (!name) return res.status(400).json({ error: "Le nom est obligatoire." });
  try {
    const [result] = await db.query(
      "UPDATE fields SET name=?, icon=?, color=? WHERE id=?",
      [name, icon || null, color || "#6366f1", id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Filière introuvable." });
    res.json({ message: "Filière mise à jour." });
  } catch (err) {
    console.error("UPDATE FIELD ERROR:", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

exports.deleteField = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM fields WHERE id=?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Filière introuvable." });
    res.json({ message: "Filière supprimée." });
  } catch (err) {
    console.error("DELETE FIELD ERROR:", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// ─── UTILISATEURS ────────────────────────────────────────

const USER_LIMIT = 20;

exports.getAllUsers = async (req, res) => {
  const { page = 1, status = "", city = "", period = "", search = "" } = req.query;
  const offset = (parseInt(page) - 1) * USER_LIMIT;

  let where = status ? "WHERE u.status = ?" : "WHERE u.status != 'deleted'";
  const params = status ? [status] : [];

  if (city)   { where += " AND u.city LIKE ?";                         params.push(`%${city}%`); }
  if (search) { where += " AND (u.name LIKE ? OR u.email LIKE ?)";     params.push(`%${search}%`, `%${search}%`); }
  if (period === "today") where += " AND DATE(u.created_at) = CURDATE()";
  else if (period === "7d")  where += " AND u.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
  else if (period === "30d") where += " AND u.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)";

  try {
    const [rows] = await db.query(
      `SELECT u.id, u.name, u.email, u.role, u.status, u.city, u.phone, u.avatar,
              u.created_at, u.updated_at, u.last_login
       FROM users u ${where}
       ORDER BY u.created_at DESC LIMIT ? OFFSET ?`,
      [...params, USER_LIMIT, offset]
    );
    const [count] = await db.query(`SELECT COUNT(*) as total FROM users u ${where}`, params);

    const users = rows.map(u => ({
      id:         u.id,
      fullname:   u.name,
      email:      u.email,
      role:       u.role || 'user',
      status:     u.status || 'active',
      city:       u.city || '',
      phone:      u.phone || '',
      avatar:     u.avatar || null,
      created_at: u.created_at,
      updated_at: u.updated_at,
      last_login: u.last_login,
    }));

    res.json({
      users,
      total: count[0].total,
      page: parseInt(page),
      totalPages: Math.ceil(count[0].total / USER_LIMIT) || 1,
    });
  } catch (err) {
    console.error('ADMIN GET ALL USERS ERROR:', err);
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs." });
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) as total FROM users WHERE status = 'active'");
    res.json({ total: rows[0].total });
  } catch (err) {
    console.error('ADMIN USER COUNT ERROR:', err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Utilisateur introuvable." });
    const u = rows[0];

    const safeCount = async (sql, params) => {
      try { const [r] = await db.query(sql, params); return r[0]?.total || 0; }
      catch { return 0; }
    };

    const [messages, suggestions, favorites] = await Promise.all([
      safeCount("SELECT COUNT(*) as total FROM messages WHERE user_id = ?", [u.id]),
      safeCount("SELECT COUNT(*) as total FROM suggestions WHERE submitted_by_user_id = ?", [u.id]),
      safeCount("SELECT COUNT(*) as total FROM favorites WHERE user_id = ?", [u.id]),
    ]);

    res.json({
      id:         u.id,
      fullname:   u.name,
      email:      u.email,
      role:       u.role,
      status:     u.status,
      city:       u.city,
      phone:      u.phone,
      avatar:     u.avatar,
      ban_reason: u.ban_reason,
      created_at: u.created_at,
      updated_at: u.updated_at,
      last_login: u.last_login,
      stats: { favorites, messages, suggestions },
    });
  } catch (err) {
    console.error('ADMIN GET USER BY ID ERROR:', err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

exports.updateUser = async (req, res) => {
  const { fullname, email, city, phone, role } = req.body;
  const { id } = req.params;

  if (!fullname || !email) {
    return res.status(400).json({ error: "Nom et email sont obligatoires." });
  }

  try {
    const [result] = await db.query(
      "UPDATE users SET name=?, email=?, city=?, phone=?, role=? WHERE id=?",
      [fullname, email, city || null, phone || null, role || 'user', id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Utilisateur introuvable." });
    res.json({ message: "Utilisateur mis à jour avec succès." });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: "Cet email est déjà utilisé." });
    console.error('ADMIN UPDATE USER ERROR:', err);
    res.status(500).json({ error: "Erreur lors de la mise à jour." });
  }
};

exports.updateUserStatus = async (req, res) => {
  const { status, ban_reason } = req.body;
  const { id } = req.params;

  const allowed = ['active', 'suspended', 'pending'];
  if (!allowed.includes(status)) return res.status(400).json({ error: "Statut invalide." });

  try {
    const [result] = await db.query(
      "UPDATE users SET status=?, ban_reason=? WHERE id=?",
      [status, status === 'suspended' ? (ban_reason || null) : null, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Utilisateur introuvable." });
    res.json({ message: `Statut mis à jour : ${status}` });
  } catch (err) {
    console.error('ADMIN UPDATE USER STATUS ERROR:', err);
    res.status(500).json({ error: "Erreur lors de la mise à jour du statut." });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(
      "UPDATE users SET status='deleted', deleted_at=NOW() WHERE id=?",
      [id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Utilisateur introuvable." });
    res.json({ message: "Utilisateur supprimé avec succès." });
  } catch (err) {
    console.error('ADMIN DELETE USER ERROR:', err);
    res.status(500).json({ error: "Erreur lors de la suppression." });
  }
};

exports.exportUsers = async (req, res) => {
  const { status = "", city = "", period = "", search = "" } = req.query;
  let where = status ? "WHERE status = ?" : "WHERE status != 'deleted'";
  const params = status ? [status] : [];
  if (city)   { where += " AND city LIKE ?";                       params.push(`%${city}%`); }
  if (search) { where += " AND (name LIKE ? OR email LIKE ?)";     params.push(`%${search}%`, `%${search}%`); }
  if (period === "today") where += " AND DATE(created_at) = CURDATE()";
  else if (period === "7d")  where += " AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
  else if (period === "30d") where += " AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)";

  try {
    const [rows] = await db.query(
      `SELECT id, name, email, role, status, city, phone, created_at, last_login
       FROM users ${where} ORDER BY created_at DESC`,
      params
    );
    const headers = ["ID","Nom","Email","Rôle","Statut","Ville","Téléphone","Date inscription","Dernière connexion"];
    const escape = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines  = [headers.join(",")];
    rows.forEach(u => {
      lines.push([u.id, u.name, u.email, u.role, u.status, u.city, u.phone, u.created_at, u.last_login || ""].map(escape).join(","));
    });
    const csv = "\uFEFF" + lines.join("\n");
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", "attachment; filename=utilisateurs_rapport.csv");
    res.send(csv);
  } catch (err) {
    console.error("USERS EXPORT ERROR:", err);
    res.status(500).json({ error: "Erreur lors de la génération du rapport." });
  }
};

// ─── DASHBOARD ───────────────────────────────────────────

exports.getDashboardStats = async (req, res) => {
  const safe = async (sql) => {
    try { const [[r]] = await db.query(sql); return r?.total || 0; }
    catch { return 0; }
  };
  try {
    const [companies, users, suggestions, messages,
           compPrev, userPrev, suggPrev] = await Promise.all([
      safe("SELECT COUNT(*) as total FROM companies WHERE status='approved'"),
      safe("SELECT COUNT(*) as total FROM users WHERE status='active'"),
      safe("SELECT COUNT(*) as total FROM suggestions WHERE status='pending'"),
      safe("SELECT COUNT(*) as total FROM contacts WHERE statut='nouveau' AND is_deleted=0"),
      safe("SELECT COUNT(*) as total FROM companies WHERE status='approved' AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY)"),
      safe("SELECT COUNT(*) as total FROM users WHERE status='active' AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY)"),
      safe("SELECT COUNT(*) as total FROM suggestions WHERE status='pending' AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY)"),
    ]);
    const pct = (curr, prev) => prev > 0 ? (((curr - prev) / prev) * 100).toFixed(1) : null;
    res.json({
      companies:   { total: companies,   change: pct(companies,   compPrev) },
      users:       { total: users,       change: pct(users,       userPrev) },
      suggestions: { total: suggestions, change: pct(suggestions, suggPrev) },
      messages:    { total: messages,    change: null },
    });
  } catch (err) {
    console.error('DASHBOARD STATS ERROR:', err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

exports.getDashboardCharts = async (req, res) => {
  try {
    const [compRows] = await db.query(`
      SELECT DATE_FORMAT(created_at, '%b') as mois,
             YEAR(created_at) as yr, MONTH(created_at) as mo,
             COUNT(*) as total
      FROM companies
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 9 MONTH)
      GROUP BY yr, mo, mois ORDER BY yr, mo
    `);
    const [userRows] = await db.query(`
      SELECT DATE_FORMAT(created_at, '%b') as mois,
             YEAR(created_at) as yr, MONTH(created_at) as mo,
             COUNT(*) as total
      FROM users
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 9 MONTH)
      GROUP BY yr, mo, mois ORDER BY yr, mo
    `);

    const months = [...new Set([...compRows, ...userRows].map(r => `${r.yr}-${r.mo}`))].sort();
    const data = months.map(key => {
      const [yr, mo] = key.split('-');
      const c = compRows.find(r => r.yr == yr && r.mo == mo);
      const u = userRows.find(r => r.yr == yr && r.mo == mo);
      return { mois: (c || u)?.mois || '', entreprises: c?.total || 0, utilisateurs: u?.total || 0 };
    });

    const [[totalComp]] = await db.query("SELECT COUNT(*) as total FROM companies WHERE status='approved'");
    const [[totalUser]] = await db.query("SELECT COUNT(*) as total FROM users WHERE status='active'");
    const total = totalComp.total + totalUser.total || 1;

    res.json({
      activity: data,
      repartition: [
        { name: "Entreprises", value: Math.round((totalComp.total / total) * 100) },
        { name: "Utilisateurs", value: Math.round((totalUser.total / total) * 100) },
      ]
    });
  } catch (err) {
    console.error('DASHBOARD CHARTS ERROR:', err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

exports.getActivityLogs = async (req, res) => {
  try {
    const safeQuery = async (sql) => {
      try { const [r] = await db.query(sql); return r; } catch { return []; }
    };

    const suggestions = await safeQuery(`
      SELECT company_name as entreprise, source_type as source, city as localisation,
             created_at as date, status as statut, 'suggestion' as type
      FROM suggestions ORDER BY created_at DESC LIMIT 5
    `);
    const companies = await safeQuery(`
      SELECT name as entreprise, 'Entreprise' as source, city as localisation,
             created_at as date, status as statut, 'company' as type
      FROM companies ORDER BY created_at DESC LIMIT 5
    `);

    const all = [...suggestions, ...companies]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8)
      .map(r => ({
        entreprise:   r.entreprise,
        source:       r.source === 'user' ? 'Utilisateur' : 'Entreprise',
        localisation: r.localisation || '—',
        date:         new Date(r.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
        statut:       r.statut === 'pending' ? 'En attente' : r.statut === 'approved' ? 'Validé' : 'Refusé',
      }));

    res.json(all);
  } catch (err) {
    console.error('ACTIVITY LOGS ERROR:', err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};