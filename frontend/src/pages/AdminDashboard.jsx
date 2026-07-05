import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import AdminStats from "../components/admin/AdminStats";
import AdminChart from "../components/admin/AdminChart";
import AdminDonutChart from "../components/admin/AdminDonutChart";
import AdminRecentActivity from "../components/admin/AdminRecentActivity";
import { getDashboardStats, getDashboardCharts, getActivityLogs } from "../services/admin.service";

const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const SyncIcon = ({ spinning }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ animation: spinning ? "spin 1s linear infinite" : "none" }}>
    <polyline points="23 4 23 10 17 10"/>
    <polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>
);

export default function AdminDashboard() {
  const [stats, setStats]         = useState(null);
  const [charts, setCharts]       = useState(null);
  const [activity, setActivity]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [syncing, setSyncing]     = useState(false);
  const [error, setError]         = useState("");
  const [range, setRange]         = useState("30 derniers jours");
  const [showRange, setShowRange] = useState(false);

  const ranges = ["Aujourd'hui", "7 derniers jours", "30 derniers jours", "3 mois", "1 an"];

  const fetchAll = useCallback(async (manual = false) => {
    if (manual) setSyncing(true);
    else setLoading(true);
    setError("");
    try {
      const [s, c, a] = await Promise.all([
        getDashboardStats(),
        getDashboardCharts(),
        getActivityLogs(),
      ]);
      setStats(s);
      setCharts(c);
      setActivity(a);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger le dashboard.");
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);
  useEffect(() => {
    const interval = setInterval(() => fetchAll(), 30000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  return (
    <AdminLayout adminName="Antoine Dubois">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white drop-shadow">Vue d'ensemble du Dashboard</h1>
          <p className="text-sm text-slate-300 mt-0.5">Bienvenue, voici l'activité récente de la plateforme.</p>
        </div>
        <div className="flex items-center gap-3">

          {/* Bouton sync manuel */}
          <button
            onClick={() => fetchAll(true)}
            disabled={syncing}
            title="Synchroniser"
            className="p-2.5 rounded-lg text-slate-200 hover:text-white transition disabled:opacity-50"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <SyncIcon spinning={syncing} />
          </button>

          {/* Date range */}
          <div className="relative">
            <button
              onClick={() => setShowRange(v => !v)}
              className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2.5 rounded-lg transition"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <CalendarIcon />
              {range}
            </button>
            {showRange && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl overflow-hidden z-30 shadow-2xl"
                style={{ background: "rgba(15,23,42,0.97)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {ranges.map(r => (
                  <button key={r} onClick={() => { setRange(r); setShowRange(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition flex items-center gap-2
                      ${range === r ? "text-indigo-400 bg-indigo-500/10" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}>
                    {range === r && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />}
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* style spin */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {/* Erreur */}
      {error && (
        <div className="mb-5 px-4 py-3 rounded-xl text-red-300 text-sm flex items-center justify-between"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <span>{error}</span>
          <button onClick={() => fetchAll(true)} className="text-red-300 hover:text-red-200 text-xs underline ml-4">Réessayer</button>
        </div>
      )}

      {/* Stats */}
      {loading && !stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.15)" }} />
          ))}
        </div>
      ) : stats ? <AdminStats stats={stats} /> : null}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <div className="lg:col-span-2">
          {loading && !charts
            ? <div className="h-80 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.15)" }} />
            : <AdminChart data={charts?.activity || []} />}
        </div>
        {loading && !charts
          ? <div className="h-80 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.15)" }} />
          : <AdminDonutChart data={charts?.repartition || []} />}
      </div>

      {/* Activité récente */}
      <div className="mt-5">
        {loading && !activity.length
          ? <div className="h-48 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.15)" }} />
          : <AdminRecentActivity rows={activity} onRefresh={() => fetchAll(true)} />}
      </div>

    </AdminLayout>
  );
}
