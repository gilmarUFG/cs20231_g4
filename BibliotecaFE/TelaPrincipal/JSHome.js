;(function(){
    "use strict";

    console.clear();

    //Função para atualizar a data e hora.
    function atualizaDataHora(data){

        const dataHoraServidor = data.datetime;

        //------------------------------------
        //atualizar a data buscando do servidor
        const dias = document.getElementById("id_data");

        dias.textContent = `${dataHoraServidor.slice(8,10)}/${dataHoraServidor.slice(5,7)}/${dataHoraServidor.slice(0,4)}`

        //-------------------------------------
        //atualiza o horario buscando do servidor
        const horario = document.getElementById("id_horario");

        horario.textContent = `${dataHoraServidor.slice(11,19)}`
    }

    //intevalo para buscar a cada 1 seg o horário e data.
    setInterval(() => {
        fetch('http://worldtimeapi.org/api/ip')
        .then(response => response.json())
        .then(data => atualizaDataHora(data))
        .catch(error => {
            console.log('Ocorreu um erro:', error);
        });
    },1000)
    //-----------------------------------------------
    //voltar para o login ao clicar em sair

    const btnSair = document.getElementById("id_btnSair")
    btnSair.addEventListener("click", voltarTelaLogin)

    //função para quando for clicado no botão de sair, voltar para a tela de login.
    function voltarTelaLogin() {
        window.location.href = "../LoginCadastro/indexLogin.html"
    }

    //------------------------------------------------------------
    //abaixo é para reconhecer onde foi clicado no menu e para mover o btn de selecionado
    
    const meusLivros = document.getElementById("id_meusLivros");
    const devolucao = document.getElementById("id_dataDevolucao");
    const historico = document.getElementById("id_historico");
    const livrosDisponiveis = document.getElementById("id_livrosDisponiveis");
    const movel = document.getElementById("id_movel");
    
    //mudar o texto Lateral 
    const txtLateral = document.getElementById("id_txtLateral");

    meusLivros.addEventListener("click", () => {
        movel.style.animation = "moverMeusLivros 0.3s";
        txtLateral.textContent = "Meus livros"
        mostrarMeusLivros();
        movel.addEventListener("animationend", () => {
          movel.style.animation = "";
          movel.style.left = "4.85vmax";
        });
    });
    devolucao.addEventListener("click", () => {
        movel.style.animation = "moverDevolucao 0.3s";
        txtLateral.textContent = "Datas de devolução";
        mostrarDataDevolucao();
        pintarLinhas();
        movel.addEventListener("animationend", () => {
            movel.style.animation = "";
            movel.style.left = "29.81vmax";
        });
    });
    historico.addEventListener("click", () => {
        movel.style.animation = "moverHistorico 0.3s";
        txtLateral.textContent = "Histórico";
        mostrarHistorico();
        pintarLinhas();
        movel.addEventListener("animationend", () => {
            movel.style.animation = "";
            movel.style.left = "54.84vmax";
        });
    });
    livrosDisponiveis.addEventListener("click", () => {
        movel.style.animation = "moverLivros 0.3s";
        txtLateral.textContent = "Livros";
        mostrarLivrosDisponiveis();
        pintarDisponibilidade();
        movel.addEventListener("animationend", () => {
            movel.style.animation = "";
            movel.style.left = "79.81vmax";
        });
    });

    //---------------------------------------------------------------
    //mudar o text content quando selecionar o menu buscando qual foi o selecionado dos click acima do menu
    const principal = document.getElementById("id_principal");
    
    function mostrarMeusLivros() {
        principal.innerHTML = `
        <ul>
            <li class="genero-romance">
              <p><i class="fas fa-solid fa-book"></i> Nome: Dom Casmurro</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Machado de Assis</p>
              <p id="id_genero"><i class="fas fa-solid fa-bookmark"></i> Gênero: Romance</p>
            </li>
            <li class="genero-ciencia">
              <p><i class="fas fa-solid fa-book"></i> Nome: Cosmos</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Carl Sagan</p>
              <p id="id_genero"><i class="fas fa-solid fa-bookmark"></i> Gênero: Ciência</p>
            </li>
            <li class="genero-terror">
              <p><i class="fas fa-solid fa-book"></i> Nome: A Profecia</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: David Seltzer</p>
              <p id="id_genero"><i class="fas fa-solid fa-bookmark"></i> Gênero: Terror</p>
            </li>
            <li class="genero-ciencia">
              <p><i class="fas fa-solid fa-book"></i> Nome: Interação Humano-Computador</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Simone Diniz Junqueira Barbosa</p>
              <p id="id_genero"><i class="fas fa-solid fa-bookmark"></i> Gênero: Ciência</p>
            </li>
            <li class="genero-fantasia">
              <p><i class="fas fa-solid fa-book"></i> Nome: O Último Desejo</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Andrzej Sapkowski</p>
              <p id="id_genero"><i class="fas fa-solid fa-bookmark"></i> Gênero: Fantasia</p>
            </li>
            <li class="genero-ciencia">
              <p><i class="fas fa-solid fa-book"></i> Nome: Pálido ponto azul</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Carl Sagan</p>
              <p id="id_genero"><i class="fas fa-solid fa-bookmark"></i> Gênero: Ciência</p>
            </li>
        </ul>
       `;
    }

    function mostrarDataDevolucao() {
      principal.innerHTML = `
      <ul>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: Dom Casmurro</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Machado de Assis </p>
            <p><i class="fas fa-solid fa-calendar-days"></i> Data de devolução: <b>21/07/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: Cosmos</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Carl Sagan</p>
            <p><i class="fas fa-solid fa-calendar-days"></i> Data de devolução: <b>01/08/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: A Profecia</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: David Seltzer </p>
            <p><i class="fas fa-solid fa-calendar-days"></i> Data de devolução: <b>02/08/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: Interação Humano-Computador</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Simone Diniz Junqueira Barbosa</p>
            <p><i class="fas fa-solid fa-calendar-days"></i> Data de devolução: <b>14/08/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: O Último Desejo</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Andrzej Sapkowski</p>
            <p><i class="fas fa-solid fa-calendar-days"></i> Data de devolução: <b>20/08/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: Pálido ponto azul</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Carl Sagan</p>
            <p><i class="fas fa-solid fa-calendar-days"></i> Data de devolução: <b>01/09/2023</b></p>
          </li>
        </ul>
      `
    }

    function mostrarHistorico() {
      principal.innerHTML = `
      <ul>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: Cândido, ou O Otimismo</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Voltaire</p>
            <p><i class="fa-solid fa-calendar-check"></i> Período: <b>01/07/2023</b> até <b>15/07/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: O Senhor dos Anéis</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: J. R. R. Tolkien</p>
            <p><i class="fa-solid fa-calendar-check"></i> Período: <b>20/06/2023</b> até <b>05/07/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: Os Miseráveis</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Victor Hugo</p>
            <p><i class="fa-solid fa-calendar-check"></i> Período: <b>15/06/2023</b> até <b>25/06/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: A Montanha Mágica</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Thomas Mann</p>
            <p><i class="fa-solid fa-calendar-check"></i> Período: <b>03/06/2023</b> até <b>14/06/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: Uma Passagem Para a Índia</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Edward Morgan Foster</p>
            <p><i class="fa-solid fa-calendar-check"></i> Período: <b>26/05/2023</b> até <b>06/06/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: O Velho e o Mar</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Ernest Hemingway</p>
            <p><i class="fa-solid fa-calendar-check"></i> Período: <b>12/05/2023</b> até <b>20/05/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: O Mundo se Despedaça</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Chinua Achebe</p>
            <p><i class="fa-solid fa-calendar-check"></i> Período: <b>26/04/2023</b> até <b>06/05/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: Por Quem os Sinos Dobram</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Ernest Hemingway</p>
            <p><i class="fa-solid fa-calendar-check"></i> Período: <b>15/04/2023</b> até <b>30/04/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: Édipo Rei</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Sófocles</p>
            <p><i class="fa-solid fa-calendar-check"></i> Período: <b>01/04/2023</b> até <b>14/04/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: Retrato de Uma Senhora</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Henry James</p>
            <p><i class="fa-solid fa-calendar-check"></i> Período: <b>15/03/2023</b> até <b>28/03/2023</b></p>
          </li>
          <li>
            <p><i class="fas fa-solid fa-book"></i> Nome: Fogo Pálido</p>
            <p><i class="fas fa-solid fa-feather"></i> Autor: Vladimir Nabokov</p>
            <p><i class="fa-solid fa-calendar-check"></i> Período: <b>28/02/2023</b> até <b>06/03/2023</b></p>
          </li>
        </ul>
      `
    }

    function mostrarLivrosDisponiveis() {
        principal.innerHTML = `
        <ul>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Em Busca do Tempo Perdido</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Marcel Proust</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Ulysses</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: James Joyce</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Indisponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Dom Quixote</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Miguel de Cervantes</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: O Grande Gatsby</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: F. Scott Fitzgerald</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Indisponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Cem Anos de Solidão</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Gabriel García Márquez</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Moby Dick</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Herman Melville</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Indisponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Guerra e Paz</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Lev Tolstói</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Lolita</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Vladimir Nabokov</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Indisponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Hamlet</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: William Shakespeare</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: O Apanhador no Campo de Centeio</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: J.D. Salinger</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Odisseia</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Homero</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Os Irmãos Karamazov</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Fiódor Dostoiévski</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Crime e Castigo</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Fiódor Dostoiévski</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Indisponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Madame Bovary</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Gustave Flaubert</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Divina Comédia</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Dante Alighieri</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: As Aventuras de Huckleberry Finn</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Mark Twain</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Alice no País das Maravilhas</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Lewis Carroll</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Indisponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Orgulho e Preconceito</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Jane Austen</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Indisponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: O Morro dos Ventos Uivantes</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Emily Brontë</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Ao Farol</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Virginia Woolf</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Ardil-22</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Joseph Heller</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Indisponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: O Som e A Fúria</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: William Faulkner</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: 1984</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: George Orwell</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Indisponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Anna Karenina</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Lev Tolstói</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: Ilíada</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Homero</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Disponível</p>
            </li>
            <li>
              <p><i class="fas fa-solid fa-book"></i> Nome: O Coração das Trevas</p>
              <p><i class="fas fa-solid fa-feather"></i> Autor: Joseph Conrad</p>
              <p><i class="fa-solid fa-square-check"></i> Status: Indisponível</p>
            </li>
        </ul>
        `;
    }

    //-----------------------------------------------------
    //para mudar a cor de acordo com a disponibilidade do livro
    
    function pintarDisponibilidade() {
        const ul = document.querySelector("ul");
        const lis = ul.querySelectorAll("li");
        lis.forEach((li) => {
            if(li.textContent.indexOf("Disponível") >= 0){
                li.style.backgroundColor = "#CCFFCC";
            }else{
                li.style.backgroundColor = "#ffaeae";
            }
        })
    }

    function pintarLinhas() {
      const ul = document.querySelector("ul");
      const lis = ul.querySelectorAll("li");
      let alternador = true;
      lis.forEach((li) => {
        if (alternador) {
          li.style.backgroundColor = "#b0e2e2";
          alternador = !alternador;
        }else{
          li.style.backgroundColor = "#7acece";
          alternador = !alternador;
        }
      })
    }

})()