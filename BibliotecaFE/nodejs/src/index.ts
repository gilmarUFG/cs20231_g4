import { createClient } from "@supabase/supabase-js";
import express from "express";
// Replace these with your Supabase credentials
const supabaseUrl = "https://orfdtvmjzqvptbbwvxof.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yZmR0dm1qenF2cHRiYnd2eG9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjU4ODU4MiwiZXhwIjoyMDAyMTY0NTgyfQ.upbUKQw3GZGyBy_m9aeOOWzAU_syRj8A8Bccoc_LMKc";

require("dotenv").config();
const supabase = createClient(supabaseUrl, supabaseKey);
const expressApp = express();

expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});

expressApp.get("/profiles", async (req, res) => {
    const profiles = await getAllProfiles();
    res.json(profiles);
});

async function getAllProfiles() {
  const { data, error } = await supabase.from("profiles").select("*");
  if (error) return console.log(error);
  console.log(data);
  return data;
}

async function main() {
  const port = process.env.PORT || 3000;
  expressApp.listen(port, () => {
    console.log("Server running on port 3000");
  });
}

main().catch(console.error);
