import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // make sure path is correct

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [filesList, setFilesList] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file");

    const filePath = `uploads/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("my-bucket") // replace with your Supabase bucket name
      .upload(filePath, file);

    if (error) {
      console.error(error);
      setMessage("Upload failed");
    } else {
      const { publicURL } = supabase.storage
        .from("my-bucket")
        .getPublicUrl(data.path);

      setMessage("Upload successful!");
      setFilesList((prev) => [...prev, { name: file.name, url: publicURL }]);
      setFile(null);
    }
  };

  // Fetch all uploaded files
  const fetchFiles = async () => {
    const { data, error } = await supabase.storage.from("my-bucket").list("uploads");
    if (error) console.error(error);
    else {
      const files = data.map((f) => {
        const { publicURL } = supabase.storage.from("my-bucket").getPublicUrl(f.name);
        return { name: f.name, url: publicURL };
      });
      setFilesList(files);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}

      <h3>Uploaded Files</h3>
      <ul>
        {filesList.map((file) => (
          <li key={file.url}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Upload;
