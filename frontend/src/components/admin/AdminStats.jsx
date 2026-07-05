import { Building2, Lightbulb, Users, MessageSquare, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const config = [
  { key: "companies",   label: "Total entreprises",      icon: Building2,     colors: { bg: "rgba(99,102,241,0.12)",  icon: "#6366f1" }, path: "/admin/entreprises" },
  { key: "suggestions", label: "Suggestions en attente", icon: Lightbulb,     colors: { bg: "rgba(245,158,11,0.12)", icon: "#f59e0b" }, path: "/admin/suggestions" },
  { key: "users",       label: "Utilisateurs actifs",    icon: Users,         colors: { bg: "rgba(16,185,129,0.12)", icon: "#10b981" }, path: "/admin/utilisateurs" },
  { key: "messages",    label: "Messages non lus",       icon: MessageSquare, colors: { bg: "rgba(239,68,68,0.12)",  icon: "#ef4444" }, path: "/admin/messages" },
];

export default function AdminStats({ stats }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {config.map(({ key, label, icon: Icon, colors, path }) => {
        const d = stats?.[key];
        const change = d?.change != null ? parseFloat(d.change) : null;
        return (
          <div
            key={key}
            onClick={() => navigate(path)}
            className="flex flex-col gap-4 p-5 rounded-xl cursor-pointer transition-transform hover:scale-[1.02]"
            style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">{label}</span>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: colors.bg }}>
                <Icon size={18} style={{ color: colors.icon }} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-slate-900">
                {d?.total != null ? d.total.toLocaleString("fr-FR") : "—"}
              </span>
              {change != null && (
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${change >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                  {change >= 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {Math.abs(change)}%
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
