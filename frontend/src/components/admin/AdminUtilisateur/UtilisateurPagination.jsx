import { ChevronLeft, ChevronRight } from "lucide-react";

export default function UtilisateurPagination({ page = 1, totalPages = 1, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1} className="w-8 h-8 flex items-center justify-center rounded-md text-white disabled:opacity-30 disabled:cursor-not-allowed transition" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
        <ChevronLeft size={15} />
      </button>
      <span className="text-sm text-slate-300">
        Page
        <span className="inline-flex items-center justify-center w-7 h-7 mx-2 rounded-md text-white font-medium" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>{page}</span>
        of {totalPages}
      </span>
      <button onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="w-8 h-8 flex items-center justify-center rounded-md text-white disabled:opacity-30 disabled:cursor-not-allowed transition" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
        <ChevronRight size={15} />
      </button>
    </div>
  );
}