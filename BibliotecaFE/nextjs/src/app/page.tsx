"use client";
import Script from "next/script";
import React, { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";
import "./asd.css";
import { get } from "http";
export const supabaseUrl = "https://orfdtvmjzqvptbbwvxof.supabase.co" as any;
export const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yZmR0dm1qenF2cHRiYnd2eG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1ODg1ODIsImV4cCI6MjAwMjE2NDU4Mn0.po8KuRqJ2cZ94T7tUJP64iA2_NrscEW7qeEPiYQkiqg" as any;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default function Home() {
  const [session, setSession] = useState(null) as any;
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      {!session ? (
        <PaginaCadastro />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </>
  );
}
function PaginaCadastro() {
  const [registerState, setRegisterState] = React.useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [loginState, setLoginState] = React.useState({
    email: "",
    senha: "",
  });

  return (
    <div className="principal">
      <Script src="js/login.js" strategy="afterInteractive" />
      <section className="principal_esquerda">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            supabase.auth
              .signInWithPassword({
                email: loginState.email,
                password: loginState.senha,
              })
              .then(async (response) => {
                var username = registerState.nome;
                if (response.error) {
                  alert(response.error.message);
                  return;
                }

                console.log(response);
              });
          }}
        >
          <h1 className="nome_biblioteca">Sistema de biblioteca</h1>
          <div className="campo_usuario campos">
            <div>
              <i className="fas fa-solid fa-user"></i>
              <label htmlFor="usuario"> Email</label>
            </div>
            <input
              value={loginState.email}
              onChange={(e) =>
                setLoginState({ ...loginState, email: e.target.value })
              }
              type="email"
              name="usuario"
              className="inputUsuario inputs"
              id="id_usuario"
            />
          </div>
          <div className="campo_senha campos">
            <div>
              <i className="fas fa-solid fa-key"></i>
              <label htmlFor="">Senha</label>
            </div>
            <input
              value={loginState.senha}
              onChange={(e) =>
                setLoginState({ ...loginState, senha: e.target.value })
              }
              type="password"
              name="senha"
              className="inputSenha inputs"
              id="id_LoginSenha"
            />
            <i
              className="fas fa-regular fa-eye visualizarSenha"
              id="id_btnMostrarSenha"
            ></i>
          </div>
          <center>
            <input
              className="btnEntrar"
              value="Entrar"
              type="submit"
              id="id_btnLogin"
            />
          </center>
        </form>
      </section>
      <section className="principal_direita">
        <h1 className="nome_cadastro">Realizar cadastro</h1>
        <label className="txtinputs Nometxt" htmlFor="Nome">
          Nome:
        </label>
        <input
          value={registerState.nome}
          onChange={(e) =>
            setRegisterState({ ...registerState, nome: e.target.value })
          }
          className="inputsCadastro"
          id="id_nomeCadastro"
          type="text"
          name="Nome"
        />
        <label className="txtinputs" htmlFor="email">
          Email:
        </label>
        <input
          className="inputsCadastro"
          type="email"
          name="email"
          id=""
          value={registerState.email}
          onChange={(e) =>
            setRegisterState({ ...registerState, email: e.target.value })
          }
        />
        <label className="txtinputs" htmlFor="senha">
          Senha:
        </label>
        <input
          value={registerState.senha}
          onChange={(e) =>
            setRegisterState({ ...registerState, senha: e.target.value })
          }
          className="inputsCadastro inputsSenhaCadastro"
          type="password"
          name="senha"
          id="id_cadastroSenha"
        />

        <i
          className="fas fa-regular fa-eye visualizarSenhaCadastro"
          id="id_btnMostrarSenhaConfirmaCadastro"
        ></i>
        <input
          className="btnCadastrar"
          id="id_btnCadastrar"
          type="submit"
          name="Enviar"
          value="Cadastrar"
          onClick={async (e) => {
            e.preventDefault();
            supabase.auth
              .signUp({
                email: registerState.email,
                password: registerState.senha,
                options: {
                  emailRedirectTo: `${location.origin}/auth/callback`,
                },
              })
              .then(async (response) => {
                if (response.error) {
                  if (response.error.message.includes("already")) {
                    alert("O usuário já existia, realizando login...");
                    return supabase.auth
                      .signInWithPassword({
                        email: registerState.email,
                        password: registerState.senha,
                      })
                      .then((response) => {
                        if (response.error) {
                          alert("Senha ou email incorretos");
                          return;
                        }
                        console.log(response);
                      });
                  } else {
                    alert("ocorreu um erro\n" + response.error.message);
                  }
                  return;
                }
                var username = registerState.nome;
                var x = await supabase
                  .from("profiles")
                  .upsert({ id: response.data.user?.id, username });
                if (x.error) alert(x.error);
                console.log(response);
              });
          }}
        />
      </section>
      <section className="tela_movel" id="id_principal_direita">
        <p className="realizar_cadastro" id="id_textoCadastro">
          Não possui conta?
        </p>
        <i className="fas fa-solid fa-arrow-down"></i>
        <button type="submit" className="btnLoginCadastro" id="id_btnMovel">
          Realizar cadastro
        </button>
      </section>

      <i className="fas fa-solid fa-book livro1 icones"></i>
      <i className="fas fa-solid fa-book livro2 icones"></i>
      <i className="fas fa-solid fa-book-open icones"></i>
      <i className="fas fa-solid fa-pen icones"></i>
    </div>
  );
}

function Account({ session }: { session: any }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null as any);

  useEffect(() => {
    const { user } = session;
    supabase
      .from("profiles")
      .select(`username`)
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
        }
        setLoading(false);
      });
  }, [session]);

  async function updateProfile({ username }: { username: any }) {
    try {
      setLoading(true);
      await supabase.from("profiles").upsert({ id: session.user.id, username });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <a href="/livros">
        <button
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
        >
          ver livros
        </button>
      </a>
      <form
        className="form-widget"
        onSubmit={async (e) => {
          e.preventDefault();
          updateProfile({ username });
        }}
        style={{
          // grid 2x2
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <label htmlFor="email">Email: </label>
        <input id="email" type="text" value={session.user.email} disabled />
        <label htmlFor="username">Name: </label>
        <input
          id="username"
          type="text"
          required
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          style={{
            width: "100%",
          }}
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            updateProfile({ username });
          }}
        >
          {loading ? "Carregando..." : "Atualizar"}
        </button>
      </form>
      <div
        style={{
          height: 10,
        }}
      ></div>
      <div>
        <button
          type="button"
          onClick={async () => {
           await supabase.auth.signOut();
           window.location.reload();
          }}
          style={{
            width: "100%",
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
}
