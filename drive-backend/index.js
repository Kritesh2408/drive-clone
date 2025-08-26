// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

// Load environment variables
dotenv.config();

import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer setup for file uploads (temporary local storage)
const upload = multer({ dest: "uploads/" });

// ✅ Health check route
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "Backend is running 🚀" });
});

// ✅ Auth routes
app.use("/api/auth", authRoutes);

// ✅ Example file upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.status(200).json({
    message: "File uploaded successfully!",
    filename: req.file.originalname,
    path: req.file.path,
  });
});

// ✅ Catch-all route (for undefined endpoints)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
