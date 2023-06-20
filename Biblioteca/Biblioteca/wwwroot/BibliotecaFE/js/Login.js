;(function(){
    "use scrict";
    console.clear();

    const telaMovel = document.getElementById("id_principal_direita");
    const btnMovel = document.getElementById("id_btnMovel");
    const textoCadastro = document.getElementById("id_textoCadastro");

    let direita = true;

    btnMovel.addEventListener("click", moverTelaCadastro);

    function moverTelaCadastro() {

        if (direita) {
            textoCadastro.textContent = "Já possui conta?";
            btnMovel.textContent = "Realizar Login";
            telaMovel.style.animation = "moverparaLadoEsquerdo 1s cubic-bezier(.8,-0.40,.32,1.40)";
            telaMovel.style.translate = "-100%";
            telaMovel.style.borderRadius = "10px 0 0 10px";
            direita = !direita;
        }else {
            textoCadastro.textContent = "Não possui conta?";
            btnMovel.textContent = "Realizar cadastro";
            telaMovel.style.animation = "moverparaLadoDireito 1s cubic-bezier(.8,-0.40,.32,1.40)";
            telaMovel.style.translate = "0%";
            telaMovel.style.borderRadius = "0 10px 10px 0";
            direita = !direita;
        }
    }
    //--------------------------------------------------------------------
    //Mudar a visualização dos campos senha
    const btnMostrarSenha = document.getElementById("id_btnMostrarSenha");
    const loginSenha = document.getElementById("id_LoginSenha");
    const inputCadastroSenha = document.getElementById("id_cadastroSenha");
    const btnMostrarcadastroSenha = document.getElementById("id_btnMostrarSenhaCadastro");
    const inputConfirmaCadastroSenha = document.getElementById("id_confirmaCadastroSenha");
    const btnMostrarconfirmaCadastroSenha = document.getElementById("id_btnMostrarSenhaConfirmaCadastro");

    btnMostrarSenha.addEventListener("click", () => {
        if (loginSenha.type === "password") {
            loginSenha.type = "text";
            btnMostrarSenha.classList.add('fa-eye-slash');
            loginSenha.focus();
        } else{
            loginSenha.type = "password";
            btnMostrarSenha.classList.remove("fa-eye-slash");
            loginSenha.focus();
        }  
    });
    btnMostrarcadastroSenha.addEventListener("click", () => {
        if (inputCadastroSenha.type === "password") {
            inputCadastroSenha.type = "text";
            btnMostrarcadastroSenha.classList.add('fa-eye-slash');
            inputCadastroSenha.focus();
        } else{
            inputCadastroSenha.type = "password";
            btnMostrarcadastroSenha.classList.remove("fa-eye-slash");
            inputCadastroSenha.focus();
        }  
    });
    btnMostrarconfirmaCadastroSenha.addEventListener("click", () => {
        if (inputConfirmaCadastroSenha.type === "password") {
            inputConfirmaCadastroSenha.type = "text";
            btnMostrarconfirmaCadastroSenha.classList.add('fa-eye-slash');
            inputConfirmaCadastroSenha.focus();
        } else{
            inputConfirmaCadastroSenha.type = "password";
            btnMostrarconfirmaCadastroSenha.classList.remove("fa-eye-slash");
            inputConfirmaCadastroSenha.focus();
        }  
    });
    //---------------------------------------------------------------------
    //mudar e reconhecer se é funcionário ou não
    const trocaFuncionarioUsuario = document.getElementById("id_FuncionarioUsuario");

    trocaFuncionarioUsuario.addEventListener("click", mudaFuncionarioUsuario);
    
    function mudaFuncionarioUsuario(){
        let usuario = true;
        if (trocaFuncionarioUsuario.textContent == "Usuário") {
            trocaFuncionarioUsuario.textContent = "Funcionário";
            usuario = false;
        }else{
            trocaFuncionarioUsuario.textContent = "Usuário";
        }
        return usuario;
    }
    //-------------------------------------------------------------------------
    //checar se no login foram preenchidos os campos(usuário tem @), e a senha é maior do que 8

    const loginUsuario = document.getElementById("id_usuario");
    const btnLogin = document.getElementById("id_btnLogin");

    btnLogin.addEventListener("click", fazerLogin);

    function fazerLogin(){
        
        //essas barras seguidas significa que é para retirar depois
        /////////////////////////////////////////////////////////////
        //Senha e user apenas para testar
        if (loginSenha.value == "gabs123" && loginUsuario.value == "gabs") {
            window.location.href = "../TelaPrincipal/indexHome.html"
        }else{
            if (loginUsuario.value == "") {
                let temporario;
                temporario = loginUsuario.value;
                loginUsuario.value = "Usuário incorreto";
                loginUsuario.style.backgroundColor = "rgb(255, 170, 170)";
                setTimeout(() => {
                    loginUsuario.style.backgroundColor = "#88d8d8";
                    loginUsuario.value = temporario;
                }, 2000)
            }
            if (loginSenha.value.length < 8) {
                let temporario;
                let aux = false;
                temporario = loginSenha.value;
                if (loginSenha.type == "password") {
                    loginSenha.type = "text";
                    aux = true;
                }
                loginSenha.value = "Senha incorreta";
                loginSenha.style.backgroundColor = "rgb(255, 170, 170)";
                setTimeout(() => {
                    loginSenha.style.backgroundColor = "#88d8d8";
                    loginSenha.value = temporario;
                    if (aux === true) {
                        loginSenha.type = "password"
                    }
                }, 2000)
            }
        }
    }

    //-------------------------------------------------------------------
    //Verificar os dados fornecidos pelo cadastro
    //Nome - Não nulo
    //nascimento - completo
    //funcionário - aqui tanto faz
    //email - deve conter "@"
    //a senha e confirma senha devem serem iguais e maiores do que 8 caracteres

    const nomeCadastro = document.getElementById("id_nomeCadastro");
    
    const btnCadastrar = document.getElementById("id_btnCadastrar");
    btnCadastrar.addEventListener("click", checarDadosCadastro);

    function checarDadosCadastro(){
        if (nomeCadastro.value == ""){
            nomeCadastro.value = "Informe um nome";
            nomeCadastro.style.backgroundColor = "rgb(255, 170, 170)";
            
            setTimeout(() => {
                nomeCadastro.value = "";
                nomeCadastro.style.backgroundColor = "#88d8d8";
                //arrumar o hover que não está voltando após mostrar o erro
            }, 2000)
        }
    }

})()