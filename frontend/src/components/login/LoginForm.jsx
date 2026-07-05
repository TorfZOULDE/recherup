import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth.service';
export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur de connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <div>
        <label className="block text-gray-400 mb-2 text-sm">E-mail address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="mantenn@gmail.com"
          required
          className="w-full bg-[#05060f] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-gray-400 mb-2 text-sm">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          className="w-full bg-[#05060f] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Connexion...' : 'Login'}
        {!loading && (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        )}
      </button>
    </form>
  );
}