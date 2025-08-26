import React, { useState, useEffect } from "react";
import { FaTrash, FaDatabase, FaVideo, FaMusic, FaUpload } from "react-icons/fa";
import { supabase } from "../supabaseClient";

const DriveDashboard = () => {
  const [activeSection, setActiveSection] = useState("storage");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const getBucketName = () => {
    switch (activeSection) {
      case "storage": return "uploads";
      case "video": return "videos";
      case "audio": return "audio";
      default: return "uploads";
    }
  };

  const fetchFiles = async () => {
    const bucket = getBucketName();
    try {
      const { data, error } = await supabase.storage.from(bucket).list("");
      if (error) throw error;

      const filesWithUrls = data.map((f) => {
        const { publicUrl } = supabase.storage.from(bucket).getPublicUrl(f.name);
        return { name: f.name, url: publicUrl };
      });
      setFiles(filesWithUrls);
    } catch (err) {
      console.error(err);
      setMessage(`Failed to fetch files from ${bucket}.`);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [activeSection]);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!selectedFile) return setMessage("Please select a file");

    const bucket = getBucketName();
    const sanitizedFileName = selectedFile.name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
    const filePath = `${Date.now()}-${sanitizedFileName}`;

    const { error } = await supabase.storage.from(bucket).upload(filePath, selectedFile);

    if (error) {
      console.error(error);
      setMessage("Upload failed: " + error.message);
    } else {
      const { publicUrl } = supabase.storage.from(bucket).getPublicUrl(filePath);
      setFiles((prev) => [...prev, { name: selectedFile.name, url: publicUrl }]);
      setMessage("Upload successful!");
      setSelectedFile(null);
    }
  };

  const renderContent = () => (
    <div>
      {/* Section Header */}
      <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
      </h2>

      {/* Upload Area */}
      <div className="mb-6 flex flex-wrap items-center space-x-4">
        <label className="flex items-center cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-lg shadow-md transition-all transform hover:scale-105">
          <FaUpload className="mr-2" />
          <span>{selectedFile ? selectedFile.name : "Select file"}</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white rounded-lg shadow-md transition-all transform hover:scale-105"
        >
          Upload
        </button>
      </div>

      {/* Message */}
      {message && (
        <p
          className={`mb-4 p-2 rounded-lg text-center ${
            message.includes("failed") ? "bg-red-600 text-white" : "bg-green-600 text-white"
          }`}
        >
          {message}
        </p>
      )}

      {/* Files List */}
      {files.length === 0 ? (
        <p className="text-gray-400">No files uploaded yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {files.map((file, index) => (
            <li
              key={index}
              className="bg-gray-700 p-4 rounded-lg flex items-center justify-between hover:bg-gray-600 transition-all shadow hover:shadow-lg transform hover:scale-105"
            >
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 truncate font-medium">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
      {/* Top Menu */}
      <div className="flex bg-gray-800 p-2 space-x-4 shadow-lg rounded-b-lg">
        {[
          { key: "storage", label: "Storage", icon: <FaDatabase /> },
          { key: "video", label: "Video", icon: <FaVideo /> },
          { key: "audio", label: "Audio", icon: <FaMusic /> },
          { key: "trash", label: "Trash", icon: <FaTrash /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              activeSection === tab.key
                ? "bg-blue-500 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tab.icon} <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">{renderContent()}</div>
    </div>
  );
};

export default DriveDashboard;
