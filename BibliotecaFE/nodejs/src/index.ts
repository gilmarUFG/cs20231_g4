import z from "zod";
import path from "path";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import express from "express";
import { adminRouter } from "./adminRouter";
import morgan from "morgan";
import { readFileSync, unlinkSync } from "fs";
import fs from "fs";
const supabaseUrl = "https://orfdtvmjzqvptbbwvxof.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yZmR0dm1qenF2cHRiYnd2eG9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjU4ODU4MiwiZXhwIjoyMDAyMTY0NTgyfQ.upbUKQw3GZGyBy_m9aeOOWzAU_syRj8A8Bccoc_LMKc";
export const jwtSecret = "secret";
const PDFParser = require("pdf-parse");
const { pdftobuffer } = require("pdftopic");
import cors from "cors";

// ! declaration
require("dotenv").config();
export const supabase = createClient(supabaseUrl, supabaseKey);
const expressApp = express();
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(cors());


// ? config
// expressApp.use(express.json());
expressApp.use(
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

// * setup
expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});

expressApp.use("admin", adminRouter);

expressApp.get("/livro/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("livro")
    .select()
    .is("id", req.params.id);
  res.send(data);
});

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

async function convertImage(pdfPath: string) {
  const pdf = fs.readFileSync(pdfPath, null);

  var buffer = await pdftobuffer(pdf, 0);
  fs.writeFileSync(pdfPath.replace(".pdf", ".png"), buffer, null);
}

const upload = multer({ storage });
expressApp.post("/admin/livro", upload.single("file"), async (req, res) => {
  // !
  var file = req.file;
  // ?
  if (req.body.token != "08d24b69-3b7e-4c3e-959c-a953d87f4f6c") {
    return res.status(401).send("Unauthorized");
  }
  if (!file) return res.status(400).send("No file uploaded.");
  // !
  const localPdfPath = file.path;
  let localImgPath = file.path.replace(".pdf", ".png").replace(/\\/g, "/");
  var numberOfPages = await getNumberOfPages(localPdfPath);

  const localPdfBuffer = readFileSync(localPdfPath);
  // *
  await convertImage(file.path);
  const localImgBuffer = readFileSync(localImgPath);

  try {
    // ?
    if (file?.mimetype !== "application/pdf") {
      return res.status(400).send("File is not pdf.");
    }
    // *

    await supabase.storage
      .from("livros")
      .upload(file.originalname, localPdfBuffer, {
        cacheControl: "public, max-age=31536000, immutable",
        contentType: "application/pdf",
      });
    await supabase.storage.from("livros").upload(localImgPath, localImgBuffer, {
      cacheControl: "public, max-age=31536000, immutable",
      contentType: "image/jpg",
    });

    var zodParser = z
      .object({
        quantidade: z.string(),
        autor: z.string(),
        categoria: z.string(),
      })
      .parse({ ...req.body });

    // create permalink
    const pdfUrlData = supabase.storage
      .from("livros")
      .getPublicUrl(file.originalname);
    const imgUrlData = supabase.storage
      .from("livros")
      .getPublicUrl(localImgPath);

    const pdfUrl = pdfUrlData.data.publicUrl;
    const imgUrl = imgUrlData.data.publicUrl;
    const { data, error } = await supabase.from("livro").insert({
      ...zodParser,
      url: pdfUrl,
      thumb: imgUrl,
      titulo: file.originalname,
      paginas: numberOfPages,
      tamanho: file.size,
    });
    res.send(data);
    unlinkSync(localPdfPath);
    unlinkSync(localImgPath);
  } catch (err) {
    console.log(err);
    unlinkSync(localPdfPath);
    unlinkSync(localImgPath);
  }
});

expressApp.post("/admin/deleteLivro",  async (req, res) => {
  // ?
  // request raw body
  if (req.body['token'] != "08d24b69-3b7e-4c3e-959c-a953d87f4f6c") {
    return res.status(401).send("Unauthorized " + req.body.token);
  }
  // *
  const id = req.body.id;
  const { data, error } = await supabase
    .from("livro")
    .delete()
    .match({ id: id });
  res.send(data);
});


async function main() {
  const port = process.env.PORT || 3000;
  expressApp.listen(port, () => {
    console.log("Server running on port 3000");
  });
}

main().catch(console.error);

async function getNumberOfPages(pdfPath: string) {
  try {
    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfParser = await PDFParser(pdfBuffer);
    return pdfParser.numpages;
  } catch (error) {
    console.error("Error:", error);
    return -1; // Return a default value in case of an error
  }
}

expressApp.post("/livro/alugar", async (req, res) => {
  const livroId = parseInt(req.body.livroId);
  const profileId = req.body.profileId;
  const devolverAt = req.body.devolverAt;
  try {
    const { data, error } = await supabase
      .from("livro")
      .select("quantidade")
      .eq("id", livroId);

    if (error) {
      console.error(error);
      throw new Error("Erro ao obter quantidade atual.");
    }

    const currentQuantity = data[0].quantidade;
    if (currentQuantity < 1) {
      res.send("Sem exemplares disponíveis!");
      return;
    }

    const { error: insertError } = await supabase.from("alugados").insert({
      livro_id: livroId,
      profile_id: profileId,
      devolver_at: devolverAt
    });
    if (insertError) {
      console.log(insertError);
      return res.status(500).send("Erro ao alugar livro.");
    }

    const newQuantity = currentQuantity - 1;

    const { error: updateError } = await supabase
      .from("livro")
      .update({ quantidade: newQuantity })
      .eq("id", livroId);
    if (updateError) return res.status(500).send("Erro ao atualizar quantidade de livros.");
    res.send("Livro alugado com sucesso!");

  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao alugar livro.");
  }
});

expressApp.post("/livro/devolver", async (req, res) => {
  const livroId = req.body.livro_id;
  const alugadoId = req.body.alugado_id;
  try {
    const { data, error } = await supabase
      .from("livro")
      .select("quantidade")
      .eq("id", livroId);

    if (error) {
      console.error(error);
      throw new Error("Erro ao obter quantidade atual.");
    }

    const currentQuantity = data[0].quantidade;

    const { error: deleteError } = await supabase
      .from("alugados")
      .delete()
      .eq("id", alugadoId)

    if (deleteError) {
      return res.status(500).send("Erro ao devolver livro.");
    }
    const newQuantity = currentQuantity + 1;
    const { error: updateError } = await supabase
      .from("livro")
      .update({ quantidade: newQuantity })
      .eq("id", livroId);

    if (updateError) {
      console.log(updateError);
      
      return res.status(500).send("Erro ao atualizar quantidade de livros.");
    }
    res.send("Livro devolvido com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao devolver livro.");
  }
});