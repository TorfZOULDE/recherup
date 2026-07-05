import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const fallback = [
  { mois: "Jan", entreprises: 320, utilisateurs: 480 },
  { mois: "Avr", entreprises: 520, utilisateurs: 700 },
  { mois: "Jul", entreprises: 580, utilisateurs: 790 },
  { mois: "Sept", entreprises: 720, utilisateurs: 980 },
];

export default function AdminChart({ data }) {
  const chartData = data?.length ? data : fallback;
  return (
    <div className="h-full p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Graphique d'activité</h3>
        <span className="text-xs text-slate-400">9 derniers mois</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="mois" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid rgba(0,0,0,0.1)", fontSize: 13, background: "rgba(255,255,255,0.95)", color: "#0f172a" }} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: "#64748b" }} />
          <Line type="monotone" dataKey="entreprises" name="Entreprises" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3, fill: "#6366f1" }} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="utilisateurs" name="Utilisateurs" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: "#10b981" }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
