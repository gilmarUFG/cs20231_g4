import express from "express";
import { supabase } from ".";

const funcionarioRouter = express.Router();

funcionarioRouter.post("/livro", async (req, res) => {
  const { error } = await supabase.from("livro").insert({
    titulo: req.body.titulo,
    autor: req.body.autor,
    categoria: req.body.categoria,
    lancamento: req.body.lancamento,
    quantidade: req.body.quantidade,
  });

  if (error) {
    console.log(error);
    res.send(error);
  }
  res.send("created!!");
});

funcionarioRouter.put("/livro/:id", async (req, res) => {
  const { error } = await supabase
    .from("livro")
    .update({
      titulo: req.body.titulo,
      autor: req.body.autor,
      categoria: req.body.categoria,
      lancamento: req.body.lancamento,
      quantidade: req.body.quantidade,
    })
    .eq("id", req.params.id);
  if (error) {
    res.send(error);
  }
  res.send("updated!!");
});

funcionarioRouter.delete("/livro/:id", async (req, res) => {
  const { error } = await supabase
    .from("livro")
    .delete()
    .eq("id", req.params.id);
  if (error) {
    res.send(error);
  }
  res.send("deleted!!");
});
