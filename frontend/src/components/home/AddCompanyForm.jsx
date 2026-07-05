import { useState } from 'react';
import { createCompany } from '../../services/company.service';
import SuccessModal from '../SuccessModal';

const EMPTY_FORM = { name: '', domain: '', city: '', address: '', phone: '', email: '', website: '', category: '', description: '' };

export default function AddCompanyForm() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createCompany(formData);
      setFormData(EMPTY_FORM);
      setShowModal(true);
    } catch (err) {
      const msg = err.response?.status === 401
        ? 'Vous devez être connecté pour ajouter une entreprise.'
        : err.response?.data?.error || 'Erreur lors de la soumission.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onContinue={() => setShowModal(false)}
      />

      <section className="py-14 antialiased font-sans select-none text-gray-300">
        <div className="w-full bg-[#070b19] border border-gray-900 rounded-[28px] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 relative overflow-hidden shadow-2xl">
          
          <div className="flex-1 space-y-8 z-10">
            <div className="space-y-3">
              <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">Réseaux entreprises</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Ajouter votre entreprise
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                Remplissez le formulaire ci-dessous pour proposer votre entreprise à notre annuaire. Notre équipe vérifiera les informations avant publication.
              </p>
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nom de l'entreprise" required
                  className="w-full bg-[#0d1326] border border-gray-800/80 rounded-xl px-5 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/30 transition-all" />
                <input type="text" name="domain" value={formData.domain} onChange={handleChange} placeholder="Domaine / Secteur"
                  className="w-full bg-[#0d1326] border border-gray-800/80 rounded-xl px-5 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/30 transition-all" />
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Ville"
                  className="w-full bg-[#0d1326] border border-gray-800/80 rounded-xl px-5 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/30 transition-all" />
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Adresse"
                  className="w-full bg-[#0d1326] border border-gray-800/80 rounded-xl px-5 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/30 transition-all" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Téléphone"
                  className="w-full bg-[#0d1326] border border-gray-800/80 rounded-xl px-5 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/30 transition-all" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"
                  className="w-full bg-[#0d1326] border border-gray-800/80 rounded-xl px-5 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/30 transition-all" />
                <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="Site web"
                  className="w-full bg-[#0d1326] border border-gray-800/80 rounded-xl px-5 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/30 transition-all" />
                <div className="relative">
                  <select name="category" value={formData.category} onChange={handleChange}
                    className="w-full bg-[#0d1326] border border-gray-800/80 rounded-xl px-5 py-3.5 text-sm text-gray-400 focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/30 transition-all appearance-none cursor-pointer">
                    <option value="">Sélectionnez la catégorie</option>
                    <option value="informatique">Informatique</option>
                    <option value="marketing">Marketing</option>
                    <option value="finance">Finance</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4"
                  placeholder="Parlez-nous de votre entreprise..."
                  className="w-full bg-[#0d1326] border border-gray-800/80 rounded-xl p-5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/30 transition-all resize-none" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-[#582be8] hover:bg-[#4c22cc] text-white text-sm lg:text-base font-bold py-4 rounded-xl transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-lg shadow-purple-950/20 mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Envoi en cours...' : 'Soumettre ma demande'}
              </button>
            </form>
          </div>

          {/* Partie Droite */}
          <div className="w-full lg:w-[42%] flex flex-col justify-between items-center lg:items-start p-2 relative min-h-[480px]">
            <div className="w-full aspect-square rounded-[36px] overflow-hidden relative border border-purple-500/10 bg-purple-950/20 shadow-xl group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('/src/assets/images/image copy.png')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b19] via-transparent to-transparent opacity-90 lg:opacity-60" />
            </div>
            <div className="mt-6 space-y-4 w-full z-10 bg-[#070b19]/90 lg:bg-transparent p-4 lg:p-0 rounded-2xl">
              <h4 className="text-white font-extrabold text-base md:text-lg tracking-tight">Pourquoi ajouter votre entreprise ?</h4>
              <ul className="space-y-2.5 text-xs md:text-sm text-gray-400 font-medium">
                <li className="flex items-start gap-2.5"><span className="text-purple-500 text-base leading-none">•</span><span>Gagnez en visibilité auprès de milliers de talents.</span></li>
                <li className="flex items-start gap-2.5"><span className="text-purple-500 text-base leading-none">•</span><span>Attirez les meilleurs profils pour vos équipes.</span></li>
                <li className="flex items-start gap-2.5"><span className="text-purple-500 text-base leading-none">•</span><span>Participez au développement de l'écosystème.</span></li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}