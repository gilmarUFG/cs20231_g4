import { createClient } from "@supabase/supabase-js";
import express from "express";
// Replace these with your Supabase credentials
const supabaseUrl = "https://orfdtvmjzqvptbbwvxof.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yZmR0dm1qenF2cHRiYnd2eG9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjU4ODU4MiwiZXhwIjoyMDAyMTY0NTgyfQ.upbUKQw3GZGyBy_m9aeOOWzAU_syRj8A8Bccoc_LMKc";

require("dotenv").config();
const supabase = createClient(supabaseUrl, supabaseKey);
const expressApp = express();
expressApp.use(express.json());       

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
expressApp.get('/livro', async (req, res) => {
  const {data, error} = await supabase
      .from('livro')
      .select()
  res.send(data);
});

expressApp.get('/livro/:id', async (req, res) => {
  const {data, error} = await supabase
      .from('livro')
      .select()
      .is('id', req.params.id)
  res.send(data);
});

expressApp.post('/livro', async (req, res) => {
  
  const {error} = await supabase
      .from('livro')
      .insert({
        titulo: req.body.titulo,
        autor: req.body.autor,
        categoria: req.body.categoria,
        lancamento: req.body.lancamento,
        quantidade: req.body.quantidade
      })
     
      
  if (error) {
    console.log(error);
    res.send(error);
  }
  res.send("created!!");
});

expressApp.put('/livro/:id', async (req, res) => {
  const {error} = await supabase
      .from('livro')
      .update({
          titulo: req.body.titulo,
          autor: req.body.autor,
          categoria: req.body.categoria,
          lancamento: req.body.lancamento,
          quantidade: req.body.quantidade
      })
      .eq('id', req.params.id)
  if (error) {
      res.send(error);
  }
  res.send("updated!!");
});

expressApp.delete('/livro/:id', async (req, res) => {
  const {error} = await supabase
      .from('livro')
      .delete()
      .eq('id', req.params.id)
  if (error) {
      res.send(error);
  }
  res.send("deleted!!")

});
expressApp.post("/livro/alugar/:id", async (req, res) => {
  const livroId = req.body.livro_id;
  const profileId = req.body.profile_id;
  try {
    const { error: insertError } = await supabase.from("alugados").insert({
      livro_id: livroId,
      profile_id: profileId,
    });
    if (insertError) {
      console.log(insertError);
      return res.status(500).send("Erro ao alugar livro.");
    }
    const { error: updateError } = await supabase.from("livros")
      .update({ quantidade: { "$inc": -1 } })
      .eq("id", livroId);
    if (updateError) {
      console.log(updateError);
      return res.status(500).send("Erro ao atualizar quantidade de livros.");
    }

    res.send("Livro alugado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao alugar livro.");
  }
});


expressApp.delete(
  "/livro/alugar/:idLivro/:idUsuario",
  async (req, res) => {
    const livroId = req.params.idLivro;
    const usuarioId = req.params.idUsuario;
    try {
      const { error: deleteError } = await supabase
        .from("alugados")
        .delete()
        .eq("livro_id", livroId)
        .eq("profile_id", usuarioId);

      if (deleteError) {
        return res.status(500).send("Erro ao devolver livro.");
      }
      const { error: updateError } = await supabase.from("livros")
        .update({ quantidade: { "$inc": 1 } })
        .eq("id", livroId);

      if (updateError) {
        return res.status(500).send("Erro ao atualizar quantidade de livros.");
      }
      res.send("Livro devolvido com sucesso!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao devolver livro.");
    }
  }
);
async function main() {
  const port = process.env.PORT || 3000;
  expressApp.listen(port, () => {
    console.log("Server running on port 3000");
  });
}

main().catch(console.error);
