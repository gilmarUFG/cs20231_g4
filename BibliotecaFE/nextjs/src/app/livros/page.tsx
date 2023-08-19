/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import "./asd.css";
import { supabase, supabaseAnonKey, supabaseUrl } from "../page";
import Link from "next/link";

function App() {

  const [selected, setSelected] = useState("Livros disponíveis");
  const [session, setSession] = useState(null) as any;
  const [books, setBooks] = useState([]) as any;
  const [myBooks, setMyBooks] = useState([]) as any;
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        window.location.href = "/";
      } else {
        supabase
          .from("livro")
          .select()
          .then(({ data: livro, error }) => {
            if (error) {
              alert(error.message);
            } else {
              console.log(livro);
              setBooks(livro);
            }
          });

        supabase
          .from("alugados")
          .select()
          .eq("profile_id", session.user.id)
          .then(({ data: alugados, error }) => {
            if (error) {
              alert(error.message);
            } else {
              setMyBooks(alugados);
            }
          });
      }
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!session) {
    return <div>Carregando...</div>;
  }
  if (session.user.id == "08d24b69-3b7e-4c3e-959c-a953d87f4f6c") {
    return <AdminArea books={books} session={session} />;
  }
  return (
    <div className="corpo">
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v6.4.0/css/all.css"
      />
      <Script src="./js/home.js"></Script>
      <header className="headerPrincipal">
        <div className="headerSuperior">
          <section className="dataHora">
            <i className="fas fa-solid fa-calendar-week"></i>
            <div className="data">
              <p id="id_data">00/00/2000</p>
            </div>
            <i className="fas fa-regular fa-clock"></i>
            <div className="hora">
              <p className="hora" id="id_horario">
                00:00:00
              </p>
            </div>
          </section>
          <p className="txtLogo">Sistema de Biblioteca</p>
          <section className="infoUsuario">
            <p>Usuário: {session ? session.user.email : "Não logado"}</p>
            <Link href="/">
              <p className="tipoUsuario">Cliente</p>
            </Link>
            <div onClick={() => supabase.auth.signOut()}>
              <div className="btnSair" id="id_btnSair">
                <i className="fas fa-solid fa-arrow-right-from-bracket"></i>
                Sair
              </div>
            </div>
          </section>
        </div>
        <div className="bordaHeader"></div>
        <div className="headerInferior">
          {[
            {
              nome: "Livros disponíveis",
            },
            {
              nome: "Meus livros",
            },
          ].map((menu) => {
            return (
              <div
                className="menuOpcoes"
                key={menu.nome}
                style={{
                  backgroundColor: selected === menu.nome ? "lightblue" : "",
                }}
                onClick={() => {
                  setSelected(menu.nome);
                }}
              >
                {menu.nome}
              </div>
            );
          })}
        </div>
      </header>

      <aside className="txtLateral" id="id_txtLateral">
        {selected}
      </aside>

      <main
        className="principal"
        id="id_principal"
        style={{
          marginLeft: "0px",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <h1>
          <center>{selected}</center>
        </h1>
        <ul
          style={{
            width: "90%",
            marginLeft: "0px",
            height: "100%",
            alignItems: "start",
            justifyContent: "start",
            padding: "0px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            gap: "20px",
            paddingRight: "20px",
          }}
        >
          {selected == "Meus livros" &&
            myBooks.map((alugado: any) => {
              return (
                <li
                  className={`genero-romance`}
                  style={{
                    backgroundColor:
                      colors[
                        Math.floor(
                          colors.length * (alugado.livro_id % colors.length)
                        )
                      ],

                    width: "100%",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                  key={alugado.nome}
                >
                  <div>
                    <img
                      src={
                        books.find((livro: any) => livro.id == alugado.livro_id)
                          ?.thumb
                      }
                      alt=""
                      style={{
                        height: "150px",
                      }}
                    />
                    <br />
                    {books
                      .find((livro: any) => livro.id == alugado.livro_id)
                      ?.titulo.replace(".pdf", "")}
                  </div>

                  <div>
                    {new Date(alugado.devolver_at).toLocaleDateString()}
                    <br />
                    {new Date(alugado.devolver_at) < new Date() ? (
                      <div
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          padding: "10px",
                          borderRadius: "10px",
                        }}
                      >
                        Atrasado
                        <br />
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          padding: "10px",
                          borderRadius: "10px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Em dia
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          {selected == "Livros disponíveis" &&
            books.map((livro: any, index:any) => {
              return (
                <li
                  className={`genero-romance`}
                  style={{
                    backgroundColor:
                               colors[
                        Math.floor(
                          colors.length * (index % colors.length)
                        )
                      ],
                    width: "100%",
                    alignItems: "start",
                    justifyContent: "start",
                  }}
                  key={livro.nome}
                >
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(livro.thumb.replace("%5C", "/"));
                    }}
                    src={livro.thumb.replace("%5C", "/")}
                    alt=""
                    style={{
                      height: "200px",
                    }}
                  />
                  <div
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      {livro.titulo.replace(".pdf", "")}
                    </h3>
                    <span
                      style={{
                        // no break
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <i className="fas fa-solid fa-feather"></i> Autor:{" "}
                      {livro.autor}
                    </span>
                    <br />

                    <span id="id_genero">
                      <i className="fas fa-solid fa-bookmark"></i> Gênero:{" "}
                      {livro.categoria}
                    </span>
                    <br />

                    <span>
                      <i className="fas fa-solid fa-book"></i> Páginas:{" "}
                      {livro.paginas}
                    </span>
                    <br />

                    <span>
                      <b>Exemplares:</b>
                      {livro.quantidade}
                    </span>
                    <br />
                    <span>
                      <b>Criado em:</b>
                      {/* date and hour */}
                      {new Date(livro.created_at).toLocaleDateString()}{" "}
                      {new Date(livro.created_at).toLocaleTimeString()}{" "}
                    </span>
                    <br />
                    <div
                      style={{
                        height: "20px",
                        flex: 1,
                      }}
                    ></div>
                    <button
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        window.open(livro.url.replace("%5C", "/"));
                      }}
                    >
                      acessar livro
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </main>
    </div>
  );
}

export default App;

var colors = [
  "#ffaeae",
  "#CCFFCC",
  "#CCCCFF",
  "#FFCCFF",
  "#FFFFCC",
  "#CCFFFF",
  "#FFCCCC",
  "#CCFF99",
  "#FFCC99",
  "#FF99CC",
  "#FF99FF",
  "#99CCFF",
  "#99CC99",
  "#99FF99",
  "#99FFCC",
  "#99FFFF",
  "#99CCCC",
  "#CC99CC",
  "#CC99FF",
  "#CCCC99",
  "#CCCCFF",
  "#CCCC99",
  "#FF9999",
  "#FF99CC",
  "#FF9999",
  "#FF99CC",
];
function AdminArea(props: { books?: any; session?: any }) {

  // !
  const { books, session } = props;
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("Livros disponíveis");
  const [data, setData] = useState(
    new Date().toISOString().split("T")[0]
  ) as any;

  // !
  const [autores, setAutores] = useState([]) as any;
  const [alugados, setAlugados] = useState([]) as any;
  const [usuarios, setUsuarios] = useState([]) as any;
  useEffect(() => {
    supabase
      .from("livro")
      .select("autor")
      .then(({ data: autores, error }) => {
        if (error) {
          alert(error.message);
        } else {
          setAutores(autores);
        }
      });
    supabase
      .from("profiles")
      .select()
      .then(({ data: usuarios, error }) => {
        if (error) {
          alert(error.message);
        } else {
          setUsuarios(usuarios);
        }
      });
    supabase
      .from("alugados")
      .select()
      .then(({ data: alugados, error }) => {
        if (error) {
          alert(error.message);
        } else {
          setAlugados(alugados);
        }
      });
  }, []);

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          {[
            "Livros disponíveis",
            "Adicionar livro",
            "Alugar livro",
            "Livros alugados",
          ].map((menu) => {
            return (
              <div
                className="menuOpcoes"
                key={menu}
                style={{
                  backgroundColor: selected === menu ? "lightblue" : "",
                  flex: 1,
                }}
                onClick={() => {
                  setSelected(menu);
                }}
              >
                {menu}
              </div>
            );
          })}
        </div>
        {selected == "Livros alugados" && (
          <div
            style={{
              width: "1000px",
              height: "600px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <ul
              style={{
                width: "100%",
                marginLeft: "0px",
                maxHeight: "100vh",
                alignItems: "start",
                overflow: "auto",
                justifyContent: "start",
                padding: "0px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
                gap: "20px",
                paddingBottom: "20px",
                paddingRight: "20px",
              }}
            >
              {alugados.map((alugado: any) => {
                return (
                  <li
                    className={`genero-romance`}
                    style={{
                      backgroundColor:
                                 colors[
                        Math.floor(
                          colors.length * (alugado.livro_id % colors.length)
                        )
                      ],
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "start",
                    }}
                    key={alugado.nome}
                  >
                    <div>
                      <img
                        src={
                          books.find(
                            (livro: any) => livro.id == alugado.livro_id
                          )?.thumb
                        }
                        alt=""
                        style={{
                          width: "100px",
                        }}
                      />
                      {books
                        .find((livro: any) => livro.id == alugado.livro_id)
                        ?.titulo.replace(".pdf", "")}
                    </div>

                    <div>
                      {new Date(alugado.devolver_at).toLocaleDateString()}
                      <br />
                      {new Date(alugado.devolver_at) < new Date() ? (
                        <div
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            padding: "10px",
                            borderRadius: "10px",
                          }}
                        >
                          Atrasado
                          <br />
                        </div>
                      ) : (
                        <div
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            padding: "10px",
                            borderRadius: "10px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Em dia
                        </div>
                      )}
                    </div>

                    <h2>
                      {
                        usuarios.find(
                          (usuario: any) => usuario.id == alugado.profile_id
                        )?.username
                      }
                    </h2>

                    <div
                      style={{
                        width: "100%",
                      }}
                    ></div>

                    <button
                      onClick={async (e) => {
                        // "/livro/devolver", async (req, res) => {
                        //   const livroId = req.body.livro_id;
                        //   const alugadoId = req.body.alugado_id;
                        e.preventDefault();
                        const asd = JSON.stringify({
                          token: session.user.id ?? "",
                          livro_id: alugado.livro_id,
                          alugado_id: alugado.id,
                        });
                        // ask for confirmation
                        var x = confirm(
                          "Tem certeza que deseja devolver o livro?"
                        );
                        if (!x) return;
                        await fetch(
                          "https://sistemadebiblioteca-13f1a9d69285.herokuapp.com/livro/devolver",
                          {
                            method: "POST",
                            body: asd,
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        window.location.reload();
                      }}
                      style={{
                        marginRight: "20px",
                      }}
                    >
                      <h2>devolver</h2>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {selected == "Alugar livro" && (
          <div
            style={{
              width: "1000px",
              height: "600px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const asd = new FormData(e.target as any);
                  var x = await fetch(
                    "https://sistemadebiblioteca-13f1a9d69285.herokuapp.com/livro/alugar",
                    {
                      method: "POST",
                      body: JSON.stringify({
                        livroId: parseInt(asd.get("livroId")?.toString() ?? ""),
                        profileId: asd.get("profileId"),
                        devolverAt: asd.get("devolverAt"),
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  alert((await x.text()) ?? "sucesso");
                  window.location.reload();
                } catch (e) {
                  alert(e);
                }
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <label htmlFor="livroId">Livro: </label>
              <select name="livroId" id="livroId">
                {books.map((livro: any) => {
                  return (
                    <option
                      value={livro.id}
                      key={livro.id}
                      disabled={livro.quantidade == 0}
                    >
                      ({livro.quantidade}) - {livro.titulo}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="profileId">Usuário: </label>
              <select name="profileId" id="profileId">
                {usuarios.map((usuario: any) => {
                  return (
                    <option value={usuario.id} key={usuario.id}>
                      {usuario.username}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="devolverAt">Data: </label>
              <input
                type="date"
                name="devolverAt"
                id="devolverAt"
                value={data}
                onChange={(e) => {
                  setData(e.target.value);
                }}
              />

              <input
                type="hidden"
                name="token"
                id="token"
                value={session.user.id}
              />
              <input
                type="submit"
                value="Alugar"
                style={{
                  gridColumn: "1 / 3",
                  width: "100%",
                  marginTop: "20px",
                  padding: "10px",
                }}
              />
            </form>
          </div>
        )}

        {selected == "Livros disponíveis" && (
          <div
            style={{
              height: "600px",
              overflow: "auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
              gap: "30px",
              paddingRight: "20px",
            }}
          >
            {books.map((livro: any, index:any) => {
              return (
                <li
                  className={`genero-romance`}
                  style={{
                    backgroundColor:
                               colors[
                                Math.floor(
                                  colors.length * (index % colors.length)
                                )
                      ],
                    width: "100%",
                    alignItems: "start",
                    justifyContent: "start",
                  }}
                  key={livro.nome}
                >
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(livro.thumb.replace("%5C", "/"));
                    }}
                    src={livro.thumb.replace("%5C", "/")}
                    alt=""
                    style={{
                      height: "200px",
                    }}
                  />
                  <div
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      {livro.titulo.replace(".pdf", "")}
                    </h3>
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <i className="fas fa-solid fa-feather"></i> Autor:{" "}
                      {livro.autor}
                    </span>
                    <br />

                    <span id="id_genero">
                      <i className="fas fa-solid fa-bookmark"></i> Gênero:{" "}
                      {livro.categoria}
                    </span>
                    <br />

                    <span>
                      <i className="fas fa-solid fa-book"></i> Páginas:{" "}
                      {livro.paginas}
                    </span>
                    <br />
                    <span>
                      <b>Exemplares: </b>
                      {livro.quantidade}
                    </span>
                    <br />
                    <span>
                      <i className="fas fa-solid fa-book"></i> Criado em:{" "}
                      {/* date and hour */}
                      {new Date(livro.created_at).toLocaleDateString()}{" "}
                      {new Date(livro.created_at).toLocaleTimeString()}{" "}
                    </span>
                    <br />
                    <div
                      style={{
                        height: "20px",
                        flex: 1,
                      }}
                    ></div>
                    <button
                      style={{
                        cursor: "pointer",
                        marginRight: "120px",
                      }}
                      onClick={() => {
                        window.open(livro.url.replace("%5C", "/"));
                      }}
                    >
                      acessar livro
                    </button>
                    <br />
                    <br />

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const asd = JSON.stringify({
                          token: session.user.id ?? "",
                          id: livro.id,
                        });
                        // ask for confirmation
                        var x = confirm(
                          "Tem certeza que deseja deletar o livro?"
                        );
                        if (!x) return;
                        await fetch(
                          "https://sistemadebiblioteca-13f1a9d69285.herokuapp.com/admin/deleteLivro",
                          {
                            method: "POST",
                            body: asd,
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        window.location.reload();
                      }}
                      method="POST"
                    >
                      <input
                        type="hidden"
                        name="token"
                        id="token"
                        value={session.user.id}
                      />
                      <input type="hidden" name="id" id="id" value={livro.id} />
                      <button
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        deletar livro
                      </button>
                    </form>
                  </div>
                </li>
              );
            })}
          </div>
        )}
      </div>

      {selected == "Adicionar livro" && (
        <div
          style={{
            width: "1000px",
            height: "600px",
            // center
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <form
            onSubmit={async (e) => {
              setLoading(true);
              e.preventDefault();
              const asd = new FormData(e.target as any);
              var x = await fetch(
                "https://sistemadebiblioteca-13f1a9d69285.herokuapp.com/admin/livro",
                {
                  method: "POST",
                  body: asd,
                }
              );
              setLoading(false);
              alert((await x.text()) ?? "sucesso");
              window.location.reload();
            }}
            method="POST"
            action="https://sistemadebiblioteca-13f1a9d69285.herokuapp.com/admin/livro"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "400px",
              flexDirection: "column",
            }}
            encType="multipart/form-data"
          >
            {/* hidden input with id */}
            <input
              type="hidden"
              name="token"
              id="token"
              value={session.user.id}
            />
            <div
              style={{
                // grid 2x2
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "5px",
              }}
            >
              <label htmlFor="quantidade">
                Quantidade:&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input type="number" name="quantidade" id="quantidade" />

              <label htmlFor="autor">Autor: </label>
              <input
                type="text"
                name="autor"
                id="autor"
                list="autores"
                placeholder="Clique para ver outros autores"
              />
              {/* datalist */}

              <datalist id="autores">
                {autores.map((autor: any) => {
                  return <option value={autor.autor} key={autor.autor} />;
                })}
              </datalist>

              <label htmlFor="categoria">Categoria: </label>
              <select name="categoria" id="categoria">
                {[
                  "Ação",
                  "Aventura",
                  "Comédia",
                  "Drama",
                  "Fantasia",
                  "Ficção científica",
                  "Romance",
                  "Suspense",
                  "Terror",
                  "Tecnologia",
                ].map((categoria) => {
                  return (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="file">Arquivo: </label>
              <input type="file" name="file" id="file" />
            </div>
            {loading ? (
              <button
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "10px",
                }}
                disabled
              >
                Loading...
              </button>
            ) : (
              <input
                type="submit"
                value="Enviar"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "10px",
                }}
              />
            )}
          </form>
          <a href="/">
            <button
              style={{
                width: "100%",
                marginTop: "40px",
                padding: "5px",
              }}
            >
              Ir para perfil
            </button>
          </a>
        </div>
      )}
    </div>
  );
}
