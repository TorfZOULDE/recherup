import FieldBadge from "./FieldBadge";

export default function CompanyCard({ company }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{company.name}</h3>
      <p className="text-gray-500 text-sm mb-4">📍 {company.city}</p>
      <div className="mt-2">
        <FieldBadge name={company.domain} />
      </div>
    </div>
  );
}