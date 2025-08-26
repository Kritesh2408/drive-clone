// auth.js
import express from "express";
import supabase from "../supabaseclient.js";   // 👈 this will now work

const router = express.Router();

// Example route: Sign up
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "User signed up successfully!", data });
});

// Example route: Sign in
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "User signed in successfully!", data });
});

export default router;
