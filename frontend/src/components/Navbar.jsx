import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/auth.service";

const NAV_LINKS = [
  { to: "/",           label: "Accueil" },
  { to: "/entreprises", label: "Entreprises" },
  { to: "/filieres",   label: "Filières" },
  { to: "/a-propos",   label: "À propos" },
  { to: "/contact",    label: "Contact" },
];

export default function Navbar() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const [user, setUser]               = useState(getCurrentUser());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false); // menu mobile
  const dropdownRef = useRef(null);

  useEffect(() => { setUser(getCurrentUser()); }, [location.pathname]);
  useEffect(() => { setMenuOpen(false); }, [location.pathname]); // ferme menu au changement de page

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout(); setUser(null); setDropdownOpen(false); navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const getInitials = (name = "") =>
    name.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const activeClass  = (path) => isActive(path) ? "text-white font-semibold" : "text-gray-400 hover:text-white";
  const activeLine   = (path) => isActive(path)
    ? <span className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 shadow-[0_0_8px_#a855f7] rounded-full" />
    : null;

  return (
    <nav className="flex justify-between items-center py-5 md:py-8 relative z-50 select-none">

      {/* ── Logo ── */}
      <Link to="/" className="flex items-center gap-2.5 group cursor-pointer shrink-0">
        <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/40 group-hover:scale-105 transition-transform">
          <span className="font-bold text-base md:text-lg text-white">F</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Filière<span className="text-purple-500">Connect</span>
        </h1>
      </Link>

      {/* ── Liens desktop ── */}
      <div className="hidden lg:flex gap-8 xl:gap-10 font-medium">
        {NAV_LINKS.map(({ to, label }) => (
          <Link key={to} to={to} className={`transition-colors cursor-pointer relative py-1 ${activeClass(to)}`}>
            {label}
            {activeLine(to)}
          </Link>
        ))}
      </div>

      {/* ── Droite desktop ── */}
      <div className="hidden lg:flex gap-4 items-center">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all cursor-pointer active:scale-95"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-md shrink-0">
                {getInitials(user.name)}
              </div>
              <span className="text-sm font-medium text-gray-200 max-w-[120px] truncate">{user.name}</span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-[#0b0e1a] border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden z-[300] animate-dropdown">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                  <p className="text-gray-500 text-xs truncate">{user.email}</p>
                  {user.role && (
                    <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wide text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                      {user.role}
                    </span>
                  )}
                </div>
                <div className="p-2">
                  <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm font-medium cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Se déconnecter
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer active:scale-95 text-sm">
                Connexion
              </button>
            </Link>
            <Link to="/register">
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-lg shadow-purple-500/30 hover:brightness-110 transition-all cursor-pointer active:scale-95 text-sm">
                Inscription
              </button>
            </Link>
          </>
        )}
      </div>

      {/* ── Hamburger (mobile/tablette) ── */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all"
        aria-label="Menu"
      >
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* ── Menu mobile ── */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-[#0b0e1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[200]">
          <div className="flex flex-col p-4 gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive(to)
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Séparateur */}
            <div className="my-2 border-t border-white/10" />

            {user ? (
              <>
                <div className="px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{user.name}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Se déconnecter
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" className="w-full">
                  <button className="w-full py-3 rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 text-sm font-semibold hover:bg-white/[0.06] transition-all">
                    Connexion
                  </button>
                </Link>
                <Link to="/register" className="w-full">
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 text-white text-sm font-semibold shadow-lg shadow-purple-500/30 hover:brightness-110 transition-all">
                    Inscription
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-dropdown { animation: dropdownIn 0.18s ease forwards; }
      `}</style>
    </nav>
  );
}