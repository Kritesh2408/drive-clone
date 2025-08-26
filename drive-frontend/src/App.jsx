import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DriveDashboard from "./pages/DriveDashboard";
import Upload from "./pages/upload"; // <-- import the new Upload page

import { supabase } from "./supabaseClient";

function App() {
  useEffect(() => {
    const testSupabaseConnection = async () => {
      try {
        const { data, error } = await supabase.from("files").select("*"); // replace "files" with any table you have
        if (error) {
          console.error("Supabase connection error:", error.message);
        } else {
          console.log("Supabase is connected! Data:", data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    testSupabaseConnection();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DriveDashboard />} />
        <Route path="/upload" element={<Upload />} /> {/* <-- added route */}
      </Routes>
    </Router>
  );
}

export default App;
