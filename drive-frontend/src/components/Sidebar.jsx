<div className="w-64 bg-gray-800 p-4 flex flex-col space-y-4 shadow-lg">
  <h2 className="text-2xl font-bold mb-6 text-center text-white">My Drive</h2>

  {["storage", "video", "audio", "trash"].map((section) => (
    <button
      key={section}
      onClick={() => setActiveSection(section)}
      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
        activeSection === section ? "bg-blue-600" : "hover:bg-gray-700"
      }`}
    >
      {section === "storage" && <FaDatabase />}
      {section === "video" && <FaVideo />}
      {section === "audio" && <FaMusic />}
      {section === "trash" && <FaTrash />}
      <span className="text-white capitalize">{section}</span>
    </button>
  ))}
</div>
