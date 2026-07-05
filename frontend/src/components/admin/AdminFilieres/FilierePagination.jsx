import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FilierePagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-4 py-3 bg-white border border-gray-100 rounded-xl">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-50 border border-gray-200 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={15} />
      </button>

      <span className="text-sm text-gray-500 flex items-center gap-2">
        Page
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-indigo-600 text-white text-sm font-semibold">
          {page}
        </span>
        <span className="text-gray-400">sur</span>
        <span className="font-medium text-gray-700">{totalPages}</span>
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-50 border border-gray-200 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}