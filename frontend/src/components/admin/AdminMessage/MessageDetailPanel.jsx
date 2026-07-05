import { useState, useEffect } from "react";
import { X } from "lucide-react";

const typeStyles = { User: "bg-sky-100 text-sky-800", Company: "bg-indigo-100 text-indigo-800" };

export default function MessageDetailPanel({ message, onClose, onReply, onArchive }) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setReplying(false);
    setReplyText("");
    setError("");
  }, [message?.id]);

  if (!message) return null;

  const handleSend = async () => {
    if (replyText.trim().length < 3) {
      setError("La réponse est trop courte.");
      return;
    }
    setSending(true);
    setError("");
    try {
      await onReply(message.id, replyText.trim());
      setReplying(false);
      setReplyText("");
    } catch {
      setError("Erreur lors de l'envoi.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="absolute top-0 right-0 w-72 p-5 z-10" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-900">Détails du Message</h4>
        <button onClick={onClose} className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 transition"><X size={14} /></button>
      </div>

      <div className="space-y-3 text-sm">
        <div><p className="text-xs font-semibold text-gray-400 mb-0.5">Nom:</p><p className="text-gray-900">{message.sender}</p></div>
        <div><p className="text-xs font-semibold text-gray-400 mb-0.5">Email:</p><p className="text-gray-700">{message.email}</p></div>
        <div><p className="text-xs font-semibold text-gray-400 mb-1">Type:</p><span className={`px-2 py-1 rounded-md text-xs font-medium ${typeStyles[message.type]}`}>{message.type}</span></div>
        <div><p className="text-xs font-semibold text-gray-400 mb-0.5">Message complet:</p><p className="text-gray-600 leading-relaxed">{message.content}</p></div>

        {message.admin_reply && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 mb-0.5">Votre réponse:</p>
            <p className="text-gray-600 leading-relaxed">{message.admin_reply}</p>
          </div>
        )}
      </div>

      {replying ? (
        <div className="mt-4 space-y-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={4}
            placeholder="Bonjour, ..."
            className="w-full text-sm border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-indigo-400"
          />
          {error && <p className="text-xs text-rose-600">{error}</p>}
          <div className="flex gap-2">
            <button onClick={() => setReplying(false)} className="flex-1 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100" style={{ border: "1px solid rgba(0,0,0,0.1)" }}>Cancel</button>
            <button onClick={handleSend} disabled={sending} className="flex-1 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60">
              {sending ? "Envoi..." : "Send"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-2">
          <button onClick={() => setReplying(true)} className="w-full py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">Reply</button>
          <button
            onClick={() => onArchive(message.id)}
            disabled={message.status === "Archived"}
            className="w-full py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ border: "1px solid rgba(0,0,0,0.1)" }}
          >
            {message.status === "Archived" ? "Already archived" : "Archive"}
          </button>
        </div>
      )}
    </div>
  );
}