import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FAQAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#332454]">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex justify-between items-center text-left">
        <span className="text-white font-medium">{question}</span>
        <ChevronDown className={`text-[#a855f7] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="pb-6 text-[#94a3b8] leading-relaxed">{answer}</div>}
    </div>
  );
};