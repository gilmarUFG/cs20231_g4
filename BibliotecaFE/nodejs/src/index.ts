import { createClient } from "@supabase/supabase-js";
import express from "express";
import { adminRouter } from "./adminRouter";
import morgan from "morgan";
import helmet from "helmet";

const supabaseUrl = "https://orfdtvmjzqvptbbwvxof.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yZmR0dm1qenF2cHRiYnd2eG9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjU4ODU4MiwiZXhwIjoyMDAyMTY0NTgyfQ.upbUKQw3GZGyBy_m9aeOOWzAU_syRj8A8Bccoc_LMKc";
export const jwtSecret = "secret";

// ! declaration
require("dotenv").config();
export const supabase = createClient(supabaseUrl, supabaseKey);
const expressApp = express();

// ? config
expressApp.use(express.json());
expressApp.use(
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);
expressApp.use(helmet());

// * setup
expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});

expressApp.use("admin/", adminRouter);

expressApp.get("/livro/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("livro")
    .select()
    .is("id", req.params.id);
  res.send(data);
});


async function main() {
  const port = process.env.PORT || 3000;
  expressApp.listen(port, () => {
    console.log("Server running on port 3000");
  });
}

main().catch(console.error);
