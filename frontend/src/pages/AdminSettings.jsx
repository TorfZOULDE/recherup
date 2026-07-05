import { useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";

const cardStyle = { background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "12px", padding: "24px" };

export default function AdminSettings() {
  const [form, setForm] = useState({
    nomEntreprise: "RecherUp", emailContact: "contact@recherup.com",
    domaine: "recherup.com", fuseauHoraire: "(UTC+01:00) Paris, Madrid",
    couleurPrimaire: "#4f46e5", couleurSecondaire: "#6c757d",
    messageBienvenue: "Bienvenue sur le portail d'administration RecherUp.",
    auth2fa: true, delaiSession: "30 minutes",
    minCaracteres: true, caracSpeciaux: false, chiffresRequis: false,
    whitelistIp: "192.168.1.1, 10.0.0.5",
    notifNouveauxUsers: true, notifNouvellesEntreprises: true,
    notifEntreprisesEmail: false, slackAlertes: "#alertes-admin",
  });

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition bg-white/80";
  const labelClass = "block text-xs text-gray-500 mb-1.5";

  const Toggle = ({ value, onChange }) => (
    <button onClick={() => onChange(!value)} className={`relative inline-flex w-10 h-5 rounded-full transition-colors flex-shrink-0 ${value ? "bg-indigo-600" : "bg-gray-300"}`}>
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );

  return (
    <AdminLayout adminName="Antoine Dubois">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white drop-shadow">Paramètres de l'Administration</h1>
          <p className="text-sm text-slate-300 mt-0.5">Configurez votre plateforme RecherUp</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">Enregistrer les modifications</button>
          <button className="px-4 py-2.5 text-sm font-medium text-white rounded-lg transition" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>Réinitialiser</button>
        </div>
      </div>

      <div className="space-y-5">
        <div style={cardStyle}>
          <h2 className="text-sm font-semibold text-gray-900 mb-5">Général: Informations de la plateforme</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[["nomEntreprise","Nom de l'entreprise","text"],["emailContact","E-mail de contact","email"],["domaine","Domaine principal","text"]].map(([key,label,type]) => (
              <div key={key}><label className={labelClass}>{label}</label><input type={type} value={form[key]} onChange={(e) => set(key, e.target.value)} className={inputClass} /></div>
            ))}
            <div><label className={labelClass}>Fuseau horaire</label>
              <select value={form.fuseauHoraire} onChange={(e) => set("fuseauHoraire", e.target.value)} className={inputClass}>
                <option>(UTC+01:00) Paris, Madrid</option><option>(UTC+00:00) Londres</option><option>(UTC+02:00) Le Caire</option>
              </select>
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 className="text-sm font-semibold text-gray-900 mb-5">Branding: Personnalisation de l'interface</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[["couleurPrimaire","Couleur primaire"],["couleurSecondaire","Couleur secondaire"]].map(([key,label]) => (
              <div key={key}><label className={labelClass}>{label}</label>
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-white/80">
                  <input type="color" value={form[key]} onChange={(e) => set(key, e.target.value)} className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent" />
                  <span className="text-sm text-gray-700">{form[key]}</span>
                </div>
              </div>
            ))}
            <div><label className={labelClass}>Favicon</label>
              <button className="flex items-center gap-2 px-3 py-2 w-full border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-white transition bg-white/80">
                <span className="w-5 h-5 flex items-center justify-center bg-indigo-100 rounded text-xs font-bold text-indigo-600">F</span>Modifier le favicon
              </button>
            </div>
            <div><label className={labelClass}>Message de bienvenue</label>
              <textarea value={form.messageBienvenue} onChange={(e) => set("messageBienvenue", e.target.value)} rows={2} className={`${inputClass} resize-none`} />
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 className="text-sm font-semibold text-gray-900 mb-5">Sécurité: sécurité et accès</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Toggle value={form.auth2fa} onChange={(v) => set("auth2fa", v)} />
                <span className="text-xs text-gray-400">{form.auth2fa ? "ON" : "OFF"}</span>
                <span className="text-sm text-gray-700">Exiger l'auth à deux facteurs</span>
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-2">Politique de mot de passe</p>
                <div className="flex flex-wrap gap-4">
                  {[["minCaracteres","Minimum 12 caractères"],["caracSpeciaux","Caractères spéciaux"],["chiffresRequis","Chiffres requis"]].map(([key,label]) => (
                    <label key={key} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" checked={form[key]} onChange={(e) => set(key, e.target.checked)} className="w-4 h-4 rounded border-gray-300 accent-indigo-600" />{label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div><label className={labelClass}>Délai d'expiration de session</label>
                <select value={form.delaiSession} onChange={(e) => set("delaiSession", e.target.value)} className={inputClass}>
                  <option>15 minutes</option><option>30 minutes</option><option>1 heure</option><option>2 heures</option>
                </select>
              </div>
              <div><label className={labelClass}>Whitelist d'adresses IP</label>
                <textarea value={form.whitelistIp} onChange={(e) => set("whitelistIp", e.target.value)} rows={2} className={`${inputClass} resize-none`} />
              </div>
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 className="text-sm font-semibold text-gray-900 mb-5">Préférences des notifications</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              {[["notifNouveauxUsers","Notifs e-mail nouveaux utilisateurs"],["notifNouvellesEntreprises","Notifs e-mail nouvelles entreprises"]].map(([key,label]) => (
                <div key={key} className="flex items-center gap-3">
                  <Toggle value={form[key]} onChange={(v) => set(key, v)} />
                  <span className="text-xs text-gray-400">{form[key] ? "ON" : "OFF"}</span>
                  <span className="text-sm text-gray-700">{label}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Toggle value={form.notifEntreprisesEmail} onChange={(v) => set("notifEntreprisesEmail", v)} />
                <span className="text-xs text-gray-400">{form.notifEntreprisesEmail ? "ON" : "OFF"}</span>
                <span className="text-sm text-gray-700">Notifs e-mail nouvelles entreprises</span>
              </div>
              <div><label className={labelClass}>Canaux Slack alertes critiques</label>
                <textarea value={form.slackAlertes} onChange={(e) => set("slackAlertes", e.target.value)} rows={2} className={`${inputClass} resize-none`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">Save Changes</button>
      </div>
    </AdminLayout>
  );
}
