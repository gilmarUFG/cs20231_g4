import Image from "next/image";
import Script from "next/script";
import React from "react";

export default function Home() {
  return (
    // script import login.js

    <div className="principal">
      <Script src="js/login.js" strategy="afterInteractive" />

      <section className="principal_esquerda">
        <h1 className="nome_biblioteca">Sistema de biblioteca</h1>

        <div className="campo_usuario campos">
          <div>
            <i className="fas fa-solid fa-user"></i>
            <label htmlFor="usuario">Usuário</label>
          </div>
          <input
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
        <input
          className="btnEntrar"
          value="Entrar"
          type="submit"
          id="id_btnLogin"
        />
      </section>
      <section className="principal_direita">
        <h1 className="nome_cadastro">Realizar cadastro</h1>
        <label className="txtinputs Nometxt" htmlFor="Nome">
          Nome:
        </label>
        <input
          className="inputsCadastro"
          id="id_nomeCadastro"
          type="text"
          name="Nome"
        />
        <div className="divAniversarioFuncionario">
          <div>
            <label
              className="txtinputs txtAniversario"
              htmlFor="DataAniversario"
            >
              Nascimento:
            </label>
            <br />
            <input
              className="inputsCadastro dataAniversario"
              type="date"
              name="DataAniversario"
              id=""
            />
          </div>
          <div>
            <label className="txtinputs" style={{ marginLeft: "0.5vmax" }}>
              Tipo:
            </label>
            <div
              className="divSelecionaUsuario inputsCadastro"
              id="id_FuncionarioUsuario"
            >
              Usuário
            </div>
          </div>
        </div>
        <label className="txtinputs" htmlFor="email">
          Email:
        </label>
        <input className="inputsCadastro" type="email" name="email" id="" />
        <label className="txtinputs" htmlFor="senha">
          Senha:
        </label>
        <input
          className="inputsCadastro inputsSenhaCadastro"
          type="password"
          name="senha"
          id="id_cadastroSenha"
        />
        <i
          className="fas fa-regular fa-eye visualizarSenhaCadastro "
          id="id_btnMostrarSenhaCadastro"
        ></i>
        <label className="txtinputs" htmlFor="ConfirmaSenha">
          Confirmar senha:
        </label>
        <input
          className="inputsCadastro inputsSenhaCadastro"
          type="password"
          name="ConfirmaSenha"
          id="id_confirmaCadastroSenha"
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
