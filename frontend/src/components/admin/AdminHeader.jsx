import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, Lightbulb, Users, MessageSquare, LogOut } from "lucide-react";
import { getCurrentUser, logout } from "../../services/auth.service";
import adminSuggestionService from "../../services/admin.suggestion.service";
import adminUserService from "../../services/admin.user.service";
import adminMessageService from "../../services/admin.message.service";

export default function AdminHeader({ adminName }) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const displayName = currentUser?.name || adminName || "Administrateur";
  const initials = displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const [counts, setCounts] = useState({ suggestions: 0, users: 0, messages: 0 });
  const [showNotifs, setShowNotifs] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const notifRef = useRef(null);
  const menuRef = useRef(null);

  const fetchCounts = useCallback(async () => {
    const results = await Promise.allSettled([
      adminSuggestionService.getCount(),
      adminUserService.getAll({ status: "pending", page: 1 }),
      adminMessageService.getCount(),
    ]);
    setCounts({
      suggestions: results[0].status === "fulfilled" ? results[0].value.data.total : 0,
      users: results[1].status === "fulfilled" ? results[1].value.data.total : 0,
      messages: results[2].status === "fulfilled" ? results[2].value.data.total : 0,
    });
  }, []);

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 60000); // refresh chaque minute
    return () => clearInterval(interval);
  }, [fetchCounts]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false);
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalNotifs = counts.suggestions + counts.users + counts.messages;

  const notifItems = [
    { icon: Lightbulb, label: "Suggestions en attente", count: counts.suggestions, path: "/admin/suggestions" },
    { icon: Users, label: "Utilisateurs en attente", count: counts.users, path: "/admin/utilisateurs" },
    { icon: MessageSquare, label: "Messages non lus", count: counts.messages, path: "/admin/messages" },
  ].filter((item) => item.count > 0);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="fixed top-0 left-64 right-0 z-20 flex items-center justify-between px-8 py-4" style={{
      background: "rgba(15,23,42,0.75)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)"
    }}>
      <div className="relative w-72">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 outline-none rounded-lg transition"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
        />
      </div>

      <div className="flex items-center gap-5">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifs((v) => !v)}
            className="relative text-slate-400 hover:text-white transition"
          >
            <Bell size={18} />
            {totalNotifs > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {showNotifs && (
            <div
              className="absolute right-0 mt-3 w-80 rounded-xl overflow-hidden shadow-2xl"
              style={{ background: "rgba(15,23,42,0.97)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="px-4 py-3 text-sm font-semibold text-white border-b border-white/10">
                Notifications
              </div>
              {notifItems.length === 0 ? (
                <p className="px-4 py-6 text-sm text-slate-400 text-center">Aucune notification</p>
              ) : (
                notifItems.map(({ icon: Icon, label, count, path }) => (
                  <button
                    key={label}
                    onClick={() => { setShowNotifs(false); navigate(path); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition border-b border-white/5 last:border-0"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(99,102,241,0.2)" }}>
                      <Icon size={15} className="text-indigo-300" />
                    </div>
                    <span className="text-sm text-slate-200 flex-1">{label}</span>
                    <span className="text-xs font-semibold text-white px-2 py-0.5 rounded-full bg-indigo-600">{count}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Menu utilisateur */}
        <div className="relative" ref={menuRef}>
          <div
            onClick={() => setShowMenu((v) => !v)}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span className="text-sm text-slate-400 whitespace-nowrap">Admin:</span>
            <span className="text-sm font-medium text-white whitespace-nowrap">{displayName}</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-indigo-300 font-semibold text-xs flex-shrink-0" style={{ background: "rgba(99,102,241,0.25)", border: "1px solid rgba(99,102,241,0.35)" }}>
              {initials}
            </div>
            <ChevronDown size={14} className="text-slate-400 flex-shrink-0" />
          </div>

          {showMenu && (
            <div
              className="absolute right-0 mt-3 w-48 rounded-xl overflow-hidden shadow-2xl"
              style={{ background: "rgba(15,23,42,0.97)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-rose-400 hover:bg-rose-500/10 transition"
              >
                <LogOut size={15} />
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}