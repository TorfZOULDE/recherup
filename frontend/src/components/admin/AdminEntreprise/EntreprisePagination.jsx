import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EntreprisePagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages === 0) return null;

  return (
    <div
      className="flex items-center justify-center gap-3 mt-4 py-3 rounded-xl"
      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
    >
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="w-8 h-8 flex items-center justify-center rounded-md text-slate-300 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        <ChevronLeft size={15} />
      </button>

      <span className="text-sm text-slate-300 flex items-center gap-2">
        Page
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded-md text-white text-sm font-semibold"
          style={{ background: "rgba(99,102,241,0.4)", border: "1px solid rgba(99,102,241,0.5)" }}
        >
          {page}
        </span>
        <span className="text-slate-500">sur</span>
        <span className="font-medium text-slate-200">{totalPages}</span>
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-md text-slate-300 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}