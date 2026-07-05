import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import api from "../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      const { token, user } = res.data;

      if (user.role !== "admin") {
        setError("Accès réservé aux administrateurs.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/admin");
    } catch (err) {
      setError(err?.response?.data?.error || "Identifiants incorrects.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/logo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm" />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md mx-4 rounded-2xl p-8"
        style={{
          background: "rgba(15,23,42,0.85)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mb-3">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <h1 className="text-xl font-bold text-white">
            Recher<span className="text-indigo-400">Up</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Espace Administrateur</p>
        </div>

        {/* Erreur */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 mb-5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
            <AlertCircle size={15} className="flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Champs */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-400 mb-1.5 block">
              Adresse email
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="admin@recheup.com"
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-400 mb-1.5 block">
              Mot de passe
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                name="password"
                type={showPwd ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
              <button
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
              >
                {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
        </div>

        {/* Bouton */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60 transition"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <p className="text-center text-xs text-slate-600 mt-6">
          RecherUp Admin — Accès restreint
        </p>
      </div>
    </div>
  );
}