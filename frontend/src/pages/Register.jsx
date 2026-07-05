import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../services/auth.service';
import RegisterCard from '../components/register/RegisterCard';

export default function Register() {
  const navigate = useNavigate();
  const connected = isAuthenticated();
  const user = getCurrentUser();

  // Redirige si déjà connecté après 3 secondes
  useEffect(() => {
    if (connected) {
      const t = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(t);
    }
  }, [connected, navigate]);

  if (connected) {
    return (
      <div className="min-h-screen bg-[#040817] flex items-center justify-center px-4">
        <div className="bg-[#070b19] border border-purple-500/20 rounded-2xl p-8 max-w-md w-full text-center space-y-5">
          {/* Icône */}
          <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Message */}
          <div>
            <h2 className="text-white text-xl font-extrabold mb-2">Vous avez déjà un compte</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Vous êtes connecté en tant que <span className="text-purple-400 font-semibold">{user?.name}</span>.
              Vous allez être redirigé automatiquement...
            </p>
          </div>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigate('/')}
              className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold transition-all">
              Retour à l'accueil
            </button>
            <button
              onClick={() => navigate('/entreprises')}
              className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 text-sm font-semibold transition-all">
              Explorer les entreprises
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040817] flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6">
        <RegisterCard />
      </main>
    </div>
  );
}