export default function FileCard({ name }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
      <div className="h-16 w-full bg-gray-200 flex items-center justify-center rounded mb-2">
        📄
      </div>
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
}
