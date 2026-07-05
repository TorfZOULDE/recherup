import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Building2,BookOpen, Lightbulb, Users, MessageSquare, Settings, LogOut } from "lucide-react";

const menuItems = [
  { label: "Dashboard",    icon: LayoutDashboard, path: "/admin" },
  { label: "Entreprises",  icon: Building2,       path: "/admin/entreprises" },
  { label: "Filières",     icon: BookOpen,        path: "/admin/filieres" },
  { label: "Suggestions",  icon: Lightbulb,       path: "/admin/suggestions" },
  { label: "Utilisateurs", icon: Users,           path: "/admin/utilisateurs" },
  { label: "Messages",     icon: MessageSquare,   path: "/admin/messages" },
  { label: "Settings",     icon: Settings,        path: "/admin/settings" },
  
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/admin/login");
};0

  return (
    <aside className="h-screen w-64 flex flex-col fixed left-0 top-0 z-30" style={{
      background: "rgba(15,23,42,0.80)",
      backdropFilter: "blur(16px)",
      borderRight: "1px solid rgba(255,255,255,0.08)"
    }}>
      <div className="px-6 py-6 flex items-center gap-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">R</span>
        </div>
        <span className="text-lg font-bold text-white">
          Recher<span className="text-indigo-400">Up</span>
        </span>
      </div>

      <nav className="flex-1 px-3 mt-4 space-y-1">
        {menuItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            end={path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive ? "text-white" : "text-slate-400 hover:text-white"
              }`
            }
            style={({ isActive }) => isActive ? {
              background: "rgba(99,102,241,0.25)",
              border: "1px solid rgba(99,102,241,0.35)"
            } : {}}
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut size={18} strokeWidth={2} />
          Logout
        </button>
      </div>
    </aside>
  );
}