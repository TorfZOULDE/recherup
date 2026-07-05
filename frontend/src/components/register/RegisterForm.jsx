import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth.service';
export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'etudiant',
    filiere: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Les mots de passe ne correspondent pas.');
    }

    setLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;
      await register(payload);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {/* Ligne 1 : Nom complet et Email */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-gray-400 text-xs mb-1.5">Nom complet</label>
          <div className="relative">
            <UserIcon />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-[#05060f] border border-white/10 p-3 pl-10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-400 text-xs mb-1.5">Email</label>
          <div className="relative">
            <MailIcon />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#05060f] border border-white/10 p-3 pl-10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Ligne 2 : Mots de passe */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-gray-400 text-xs mb-1.5">Mot de passe</label>
          <div className="relative">
            <LockIcon />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-[#05060f] border border-white/10 p-3 pl-10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-400 text-xs mb-1.5">Confirmer mot de passe</label>
          <div className="relative">
            <LockIcon />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-[#05060f] border border-white/10 p-3 pl-10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Ligne 3 : Profil et Filière */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 text-xs mb-1.5">Type de profil</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full bg-[#05060f] border border-white/10 p-3 rounded-xl text-white outline-none focus:border-purple-500"
          >
            <option value="etudiant">Étudiant</option>
            <option value="recruteur">Recruteur</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1.5">Filière</label>
          <input
            type="text"
            name="filiere"
            value={formData.filiere}
            onChange={handleChange}
            placeholder="Informatique"
            className="w-full bg-[#05060f] border border-white/10 p-3 rounded-xl text-white outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Checkbox */}
      <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
        <input type="checkbox" required className="accent-purple-600 w-4 h-4" />
        <span>J'accepte les conditions d'utilisation</span>
      </label>

      {/* Bouton */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 py-4 rounded-xl font-bold text-white hover:bg-purple-700 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Création...' : 'Créer mon compte'}
      </button>
    </form>
  );
}

function UserIcon() {
  return <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>;
}

function MailIcon() {
  return <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>;
}

function LockIcon() {
  return <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>;
}