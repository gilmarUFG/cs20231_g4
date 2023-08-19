import express from "express";
import { UserRepository } from "./repositories/UserRepository";
import { supabase } from ".";
import z from "zod";
import multer from "multer";
import path from "path";
export const adminRouter = express.Router();

adminRouter.get("/", function (req, res) {
  res.send("I am the dashboard!");
});
adminRouter.get("/users", async (req, res) => {
  const profiles = await UserRepository.getAllProfiles();
  res.json(profiles);
});

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


adminRouter.post("/livro", upload.single("file"), async (req, res) => {
  var file = req.file;
  // if file is not pdf
  if (file?.mimetype !== "application/pdf") {
    return res.status(400).send("File is not pdf.");
  }
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }
  var x = await supabase.storage
    .from("livros")
    .upload(file.originalname, file.buffer);

  var zodParser = z
    .object({
      titulo: z.string(),
      quantidade: z.number(),
      autor: z.string(),
      categoria: z.string(),
      lancamento: z.date(),
    })
    .parse({ ...req.body });

  const { data, error } = await supabase.from("livro").insert({
    ...zodParser,
    url: x.data?.path ?? "",
    thumb: x.data?.path ?? "",
  });
  res.send(data);
});
