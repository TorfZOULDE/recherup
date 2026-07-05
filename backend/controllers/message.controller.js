// backend/controllers/message.controller.js
const db = require('../config/db');
const LIMIT = 10;

// ─── Mapping DB ↔ Frontend ─────────────────────────────

const TYPE_TO_BADGE = { support: 'User', entreprise: 'Company' };
const BADGE_TO_TYPE = { user: 'support', company: 'entreprise' };

const STATUT_TO_STATUS = { nouveau: 'Unread', en_cours: 'Read', traite: 'Replied', archive: 'Archived' };
const STATUS_TO_STATUT = { unread: 'nouveau', read: 'en_cours', replied: 'traite', archived: 'archive' };

const TYPE_DEMANDE_LABELS = {
  offre: "Offre d'emploi / stage",
  partenariat: "Demande de partenariat",
  sponsoring: "Demande de sponsoring",
  autre: "Autre demande",
};

function formatMessage(r) {
  return {
    id: r.id,
    sender: r.type === 'support' ? r.nom : r.nom_entreprise,
    email: r.email,
    type: TYPE_TO_BADGE[r.type],
    subject: r.type === 'support' ? 'Support technique' : (TYPE_DEMANDE_LABELS[r.type_demande] || 'Demande entreprise'),
    content: r.message,
    status: STATUT_TO_STATUS[r.statut],
    admin_reply: r.admin_reply,
    replied_at: r.replied_at,
    date: r.created_at,
  };
}

// ─── GET /api/admin/messages ────────────────────────────
exports.getAll = async (req, res) => {
  const { page = 1, type = '', status = '', period = '', search = '' } = req.query;
  const offset = (parseInt(page) - 1) * LIMIT;

  let where = 'WHERE is_deleted = 0';
  const params = [];

  if (BADGE_TO_TYPE[type]) { where += ' AND type = ?'; params.push(BADGE_TO_TYPE[type]); }
  if (STATUS_TO_STATUT[status]) { where += ' AND statut = ?'; params.push(STATUS_TO_STATUT[status]); }
  if (search) {
    where += ' AND (nom LIKE ? OR nom_entreprise LIKE ? OR email LIKE ? OR message LIKE ?)';
    const like = `%${search}%`;
    params.push(like, like, like, like);
  }
  if (period === 'today') where += ' AND DATE(created_at) = CURDATE()';
  if (period === '7d') where += ' AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)';
  if (period === '30d') where += ' AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)';

  try {
    const [rows] = await db.query(
      `SELECT * FROM contacts ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, LIMIT, offset]
    );
    const [count] = await db.query(`SELECT COUNT(*) as total FROM contacts ${where}`, params);

    res.json({
      messages: rows.map(formatMessage),
      total: count[0].total,
      page: parseInt(page),
      totalPages: Math.ceil(count[0].total / LIMIT) || 1,
    });
  } catch (err) {
    console.error('MESSAGE LIST ERROR:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des messages.' });
  }
};

// ─── GET /api/admin/messages/count ──────────────────────
exports.getCount = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) as total FROM contacts WHERE is_deleted = 0");
    res.json({ total: rows[0].total });
  } catch (err) {
    console.error('MESSAGE COUNT ERROR:', err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// ─── GET /api/admin/messages/:id ────────────────────────
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contacts WHERE id = ? AND is_deleted = 0', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Message introuvable.' });
    res.json(formatMessage(rows[0]));
  } catch (err) {
    console.error('MESSAGE GET BY ID ERROR:', err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// ─── PATCH /api/admin/messages/:id/read ─────────────────
exports.markAsRead = async (req, res) => {
  try {
    await db.query(
      "UPDATE contacts SET statut = 'en_cours' WHERE id = ? AND statut = 'nouveau' AND is_deleted = 0",
      [req.params.id]
    );
    res.json({ message: 'Statut mis à jour.' });
  } catch (err) {
    console.error('MESSAGE READ ERROR:', err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// ─── POST /api/admin/messages/:id/reply ─────────────────
exports.reply = async (req, res) => {
  const { reply } = req.body;
  if (!reply || reply.trim().length < 3) {
    return res.status(400).json({ error: 'La réponse est trop courte.' });
  }
  try {
    const [result] = await db.query(
      "UPDATE contacts SET admin_reply = ?, statut = 'traite', replied_at = NOW() WHERE id = ? AND is_deleted = 0",
      [reply.trim(), req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Message introuvable.' });

    // TODO : brancher l'envoi d'email réel ici (nodemailer) une fois ton SMTP configuré.
    // Pour l'instant la réponse est stockée en base uniquement.

    res.json({ message: 'Réponse envoyée.' });
  } catch (err) {
    console.error('MESSAGE REPLY ERROR:', err);
    res.status(500).json({ error: "Erreur lors de l'envoi de la réponse." });
  }
};

// ─── PATCH /api/admin/messages/:id/archive ──────────────
exports.archive = async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE contacts SET statut = 'archive' WHERE id = ? AND is_deleted = 0",
      [req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Message introuvable.' });
    res.json({ message: 'Message archivé.' });
  } catch (err) {
    console.error('MESSAGE ARCHIVE ERROR:', err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// ─── DELETE /api/admin/messages/:id (soft delete) ───────
exports.remove = async (req, res) => {
  try {
    const [result] = await db.query('UPDATE contacts SET is_deleted = 1 WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Message introuvable.' });
    res.json({ message: 'Message supprimé.' });
  } catch (err) {
    console.error('MESSAGE DELETE ERROR:', err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};