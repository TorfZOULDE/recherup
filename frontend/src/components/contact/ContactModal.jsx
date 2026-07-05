import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "2290169721630";
const PHONE_NUMBER = "+229 XX XX XX XX";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const STEPS = {
  CHOOSE: "choose",
  SUPPORT: "support",
  ENTREPRISE: "entreprise",
  PHONE: "phone",
  SUCCESS: "success",
};

// ── Icônes SVG ────────────────────────────────────────────────
function IconUser() {
  return (
    <svg className="field-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  );
}
function IconMail() {
  return (
    <svg className="field-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  );
}
function IconMessage() {
  return (
    <svg className="field-icon field-icon--top" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg className="field-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
    </svg>
  );
}
function IconList() {
  return (
    <svg className="field-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
    </svg>
  );
}
function IconSend() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
    </svg>
  );
}
function IconBack() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
    </svg>
  );
}

// ── Champ avec icône ──────────────────────────────────────────
function Field({ label, icon, children }) {
  return (
    <div className="field-group">
      <label>{label}</label>
      <div className="field-wrap">
        {icon}
        {children}
      </div>
    </div>
  );
}

export default function ContactModal({ isOpen, onClose }) {
  const [step, setStep]   = useState(STEPS.CHOOSE);
  const [form, setForm]   = useState({ nom: "", email: "", message: "", nomEntreprise: "", typedemande: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStep(STEPS.CHOOSE);
      setForm({ nom: "", email: "", message: "", nomEntreprise: "", typedemande: "" });
      setError("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (type) => {
    setLoading(true);
    setError("");
    try {
      const payload = type === "support"
        ? { type: "support", nom: form.nom, email: form.email, message: form.message }
        : { type: "entreprise", nomEntreprise: form.nomEntreprise, email: form.email, typedemande: form.typedemande, message: form.message };

      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setStep(STEPS.SUCCESS);
      setTimeout(() => { onClose(); }, 4000);
    } catch {
      setError("Impossible d'envoyer. Réessaie dans un moment.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Bonjour, je vous contacte depuis FilièreConnect.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`modal-box ${step !== STEPS.CHOOSE ? "modal-box--form" : ""}`}>

        {/* Glow déco */}
        <div className="modal-glow" />

        {/* Bouton fermer */}
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* ── ÉTAPE 1 : Choisir ── */}
        {step === STEPS.CHOOSE && (
          <div className="step">
            <span className="eyebrow">Nous contacter</span>
            <h2 className="modal-title">Comment souhaitez-vous<br/>nous contacter ?</h2>
            <p className="modal-sub">Choisissez l'option qui correspond à votre besoin</p>

            <div className="cards-grid">
              {/* Support */}
              <button className="contact-card" onClick={() => setStep(STEPS.SUPPORT)}>
                <div className="card-icon-wrap card-icon-wrap--purple">
                  <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </div>
                <span className="card-label">Support</span>
                <span className="card-desc">Aide technique</span>
              </button>

              {/* Entreprise */}
              <button className="contact-card" onClick={() => setStep(STEPS.ENTREPRISE)}>
                <div className="card-icon-wrap card-icon-wrap--blue">
                  <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <span className="card-label">Entreprise</span>
                <span className="card-desc">Partenariat & offres</span>
              </button>

              {/* Appel */}
              <button className="contact-card" onClick={() => setStep(STEPS.PHONE)}>
                <div className="card-icon-wrap card-icon-wrap--green">
                  <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <span className="card-label">Appel</span>
                <span className="card-desc">Contact direct</span>
              </button>

              {/* WhatsApp */}
              <button className="contact-card contact-card--wa" onClick={handleWhatsApp}>
                <div className="card-icon-wrap card-icon-wrap--wa">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span className="card-label">WhatsApp</span>
                <span className="card-desc">Rapide & informel</span>
              </button>
            </div>
          </div>
        )}

        {/* ── SUPPORT ── */}
        {step === STEPS.SUPPORT && (
          <div className="step">
            <button className="back-btn" onClick={() => { setStep(STEPS.CHOOSE); setError(""); }}>
              <IconBack /> Retour
            </button>
            <span className="eyebrow">Support technique</span>
            <h2 className="modal-title">Décrivez votre problème</h2>
            <p className="modal-sub">Notre équipe vous répond sous 24h</p>

            <div className="form-fields">
              <Field label="Nom complet" icon={<IconUser />}>
                <input name="nom" value={form.nom} onChange={handleChange} placeholder="Jean Dupont" required className="field-input" />
              </Field>

              <Field label="Adresse e-mail" icon={<IconMail />}>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="jean@exemple.com" required className="field-input" />
              </Field>

              <Field label="Décrivez votre problème" icon={<IconMessage />}>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Ex : Je n'arrive pas à créer mon compte…" required className="field-input field-textarea" />
              </Field>

              {error && <p className="form-error">{error}</p>}

              <button
                className="submit-btn"
                onClick={() => handleSubmit("support")}
                disabled={loading || !form.nom || !form.email || !form.message}
              >
                {loading ? <span className="spinner" /> : <><IconSend /> Envoyer le message</>}
              </button>
            </div>
          </div>
        )}

        {/* ── ENTREPRISE ── */}
        {step === STEPS.ENTREPRISE && (
          <div className="step">
            <button className="back-btn" onClick={() => { setStep(STEPS.CHOOSE); setError(""); }}>
              <IconBack /> Retour
            </button>
            <span className="eyebrow">Espace entreprise</span>
            <h2 className="modal-title">Parlons partenariat</h2>
            <p className="modal-sub">Publiez une offre, devenez partenaire ou sponsorisez</p>

            <div className="form-fields">
              <Field label="Nom de l'entreprise" icon={<IconBuilding />}>
                <input name="nomEntreprise" value={form.nomEntreprise} onChange={handleChange} placeholder="Ex : Nextmux" required className="field-input" />
              </Field>

              <Field label="Email professionnel" icon={<IconMail />}>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="contact@entreprise.com" required className="field-input" />
              </Field>

              <Field label="Type de demande" icon={<IconList />}>
                <select name="typedemande" value={form.typedemande} onChange={handleChange} required className="field-input field-select">
                  <option value="">Sélectionnez…</option>
                  <option value="offre">Publier une offre d'emploi / stage</option>
                  <option value="partenariat">Devenir partenaire</option>
                  <option value="sponsoring">Sponsoriser la plateforme</option>
                  <option value="autre">Autre</option>
                </select>
              </Field>

              <Field label="Message" icon={<IconMessage />}>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Décrivez votre demande…" required className="field-input field-textarea" />
              </Field>

              {error && <p className="form-error">{error}</p>}

              <button
                className="submit-btn"
                onClick={() => handleSubmit("entreprise")}
                disabled={loading || !form.nomEntreprise || !form.email || !form.typedemande || !form.message}
              >
                {loading ? <span className="spinner" /> : <><IconSend /> Envoyer la demande</>}
              </button>
            </div>
          </div>
        )}

        {/* ── TÉLÉPHONE ── */}
        {step === STEPS.PHONE && (
          <div className="step">
            <button className="back-btn" onClick={() => setStep(STEPS.CHOOSE)}>
              <IconBack /> Retour
            </button>
            <span className="eyebrow">Appel direct</span>
            <h2 className="modal-title">Contactez-nous par téléphone</h2>
            <p className="modal-sub">Notre équipe est disponible du lundi au vendredi</p>

            <div className="phone-card">
              <div className="phone-icon-wrap">
                <IconPhone />
              </div>
              <p className="phone-number">{PHONE_NUMBER}</p>
              <div className="phone-badge">
                <span className="phone-dot" />
                Lun – Ven · 8h – 18h
              </div>
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="call-btn">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                Lancer l'appel
              </a>
            </div>
          </div>
        )}

        {/* ── SUCCÈS ── */}
        {step === STEPS.SUCCESS && (
          <div className="step step--success">
            <div className="success-circle">
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 className="modal-title">Message envoyé !</h2>
            <p className="modal-sub">Notre équipe vous répondra sous 24h. Merci de nous avoir contactés.</p>
            <div className="success-bar">
              <div className="success-bar__fill" />
            </div>
          </div>
        )}
      </div>

      <style>{`
        /* ── Overlay ── */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 16px;
          animation: overlayIn 0.2s ease;
        }
        @keyframes overlayIn { from{opacity:0} to{opacity:1} }

        /* ── Box ── */
        .modal-box {
          position: relative;
          width: 100%; max-width: 700px;
          background: linear-gradient(160deg, #0e0a1e 0%, #0b0818 100%);
          border: 1px solid rgba(168,85,247,0.3);
          border-radius: 28px;
          padding: 48px 44px 44px;
          box-shadow: 0 0 80px rgba(139,92,246,0.2), 0 32px 64px rgba(0,0,0,0.6);
          animation: boxIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
          overflow: hidden;
          max-height: 90vh;
          overflow-y: auto;
          scrollbar-width: none;
        }
        .modal-box::-webkit-scrollbar { display: none; }
        .modal-box--form { max-width: 580px; }
        @keyframes boxIn {
          from { opacity:0; transform: scale(0.93) translateY(16px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }

        /* Glow déco */
        .modal-glow {
          position: absolute; top: -80px; left: -80px;
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Fermer ── */
        .modal-close {
          position: absolute; top: 18px; right: 18px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8; border-radius: 50%;
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .modal-close:hover { background: rgba(168,85,247,0.2); color: #fff; border-color: rgba(168,85,247,0.4); }

        /* ── Typo ── */
        .eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; color: #a855f7;
          text-transform: uppercase;
          background: rgba(168,85,247,0.1);
          border: 1px solid rgba(168,85,247,0.2);
          padding: 4px 12px; border-radius: 99px;
          margin-bottom: 14px;
        }
        .modal-title {
          font-size: 30px; font-weight: 800; color: #fff;
          line-height: 1.2; margin: 0 0 8px;
        }
        .modal-sub {
          font-size: 14px; color: #64748b;
          margin: 0 0 32px; line-height: 1.6;
        }

        /* ── Retour ── */
        .back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: none; border: none;
          color: #a855f7; font-size: 13px; font-weight: 600;
          cursor: pointer; padding: 0; margin-bottom: 20px;
          transition: color 0.15s, gap 0.15s;
        }
        .back-btn:hover { color: #c084fc; gap: 10px; }

        /* ── Cards ── */
        .cards-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        .contact-card {
          display: flex; flex-direction: column; align-items: flex-start;
          gap: 8px; padding: 24px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; cursor: pointer; text-align: left;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s;
        }
        .contact-card:hover {
          transform: translateY(-5px);
          background: rgba(139,92,246,0.1);
          border-color: rgba(168,85,247,0.5);
          box-shadow: 0 0 32px rgba(139,92,246,0.2);
        }
        .contact-card--wa:hover {
          background: rgba(37,211,102,0.08);
          border-color: rgba(37,211,102,0.45);
          box-shadow: 0 0 32px rgba(37,211,102,0.15);
        }

        /* Icône carte */
        .card-icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 4px;
        }
        .card-icon-wrap--purple { background: rgba(139,92,246,0.15); color: #a855f7; border: 1px solid rgba(139,92,246,0.25); }
        .card-icon-wrap--blue   { background: rgba(59,130,246,0.15);  color: #60a5fa; border: 1px solid rgba(59,130,246,0.25); }
        .card-icon-wrap--green  { background: rgba(16,185,129,0.15);  color: #34d399; border: 1px solid rgba(16,185,129,0.25); }
        .card-icon-wrap--wa     { background: rgba(37,211,102,0.15);  color: #25d366; border: 1px solid rgba(37,211,102,0.25); }

        .card-label { font-size: 16px; font-weight: 700; color: #e2e8f0; }
        .card-desc  { font-size: 12px; color: #475569; }

        /* ── Champs ── */
        .form-fields { display: flex; flex-direction: column; gap: 18px; }

        .field-group { display: flex; flex-direction: column; gap: 7px; }
        .field-group label {
          font-size: 13px; font-weight: 600; color: #cbd5e1;
          display: flex; align-items: center; gap: 6px;
        }

        .field-wrap { position: relative; }

        .field-icon {
          position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
          width: 18px; height: 18px; color: #6d28d9;
          pointer-events: none;
        }
        .field-icon--top { top: 18px; transform: none; }

        .field-input {
          width: 100%; box-sizing: border-box;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(168,85,247,0.2);
          border-radius: 14px;
          padding: 16px 16px 16px 48px;
          color: #fff; font-size: 15px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .field-input::placeholder { color: #334155; }
        .field-input:focus {
          border-color: rgba(168,85,247,0.6);
          box-shadow: 0 0 0 4px rgba(139,92,246,0.1);
          background: rgba(255,255,255,0.06);
        }
        .field-textarea { padding-top: 16px; resize: vertical; min-height: 130px; line-height: 1.6; }
        .field-select { appearance: none; -webkit-appearance: none; cursor: pointer; }
        .field-select option { background: #1a0f35; color: #fff; }

        /* ── Erreur ── */
        .form-error {
          font-size: 13px; color: #f87171;
          padding: 10px 14px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px;
          display: flex; align-items: center; gap: 8px;
        }

        /* ── Bouton submit ── */
        .submit-btn {
          margin-top: 6px; padding: 16px 28px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none; border-radius: 14px;
          color: #fff; font-size: 16px; font-weight: 700;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 24px rgba(139,92,246,0.4);
          letter-spacing: 0.01em;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(139,92,246,0.55);
        }
        .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* Spinner */
        .spinner {
          display: inline-block; width: 20px; height: 20px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg) } }

        /* ── Téléphone ── */
        .phone-card {
          display: flex; flex-direction: column; align-items: center;
          gap: 16px; padding: 40px 32px;
          background: rgba(255,255,255,0.03);
          border: 1.5px solid rgba(168,85,247,0.2);
          border-radius: 24px; text-align: center; margin-top: 8px;
        }
        .phone-icon-wrap {
          width: 80px; height: 80px; border-radius: 50%;
          background: rgba(139,92,246,0.12);
          border: 1.5px solid rgba(168,85,247,0.25);
          display: flex; align-items: center; justify-content: center;
          color: #a855f7;
        }
        .phone-number { font-size: 28px; font-weight: 800; color: #fff; letter-spacing: 2px; }
        .phone-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; color: #64748b;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 6px 16px; border-radius: 99px;
        }
        .phone-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .call-btn {
          display: inline-flex; align-items: center; gap: 10px;
          margin-top: 8px; padding: 14px 36px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff; font-weight: 700; font-size: 15px;
          border-radius: 14px; text-decoration: none;
          box-shadow: 0 4px 24px rgba(139,92,246,0.4);
          transition: transform 0.15s, box-shadow 0.2s;
        }
        .call-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(139,92,246,0.55); }

        /* ── Succès ── */
        .step--success {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 12px; padding: 32px 0;
        }
        .success-circle {
          width: 88px; height: 88px; border-radius: 50%;
          background: rgba(139,92,246,0.12);
          border: 2px solid rgba(168,85,247,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #a855f7;
          animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes popIn { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
        .success-bar {
          margin-top: 24px; width: 240px; height: 4px;
          background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden;
        }
        .success-bar__fill {
          height: 100%;
          background: linear-gradient(90deg, #7c3aed, #a855f7);
          border-radius: 99px;
          animation: drain 4s linear forwards;
        }
        @keyframes drain { from{width:100%} to{width:0%} }

        /* ── Responsive ── */
        @media(max-width:540px){
          .modal-box { padding: 32px 20px 28px; }
          .cards-grid { gap: 12px; }
          .contact-card { padding: 18px 14px; }
          .modal-title { font-size: 24px; }
          .card-icon-wrap { width: 44px; height: 44px; }
        }
      `}</style>
    </div>
  );
}