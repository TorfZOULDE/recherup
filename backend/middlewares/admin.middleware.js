// Vérifie que l'utilisateur connecté a le rôle admin.
// À utiliser APRÈS le middleware auth (qui remplit req.user via le JWT).
module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: "Accès réservé aux administrateurs." });
  }
  next();
};