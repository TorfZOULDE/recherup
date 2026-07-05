export default function FieldBadge({ name }) {
  return (
    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-semibold mr-2">
      {name}
    </span>
  );
}