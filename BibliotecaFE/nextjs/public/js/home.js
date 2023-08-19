(function () {
  "use strict";
  console.clear();

  //Função para atualizar a data e hora.
  function atualizaDataHora(data) {
    const dataHoraServidor = data.datetime;

    //------------------------------------
    //atualizar a data buscando do servidor
    const dias = document.getElementById("id_data");

    dias.textContent = `${dataHoraServidor.slice(
      8,
      10
    )}/${dataHoraServidor.slice(5, 7)}/${dataHoraServidor.slice(0, 4)}`;

    //-------------------------------------
    //atualiza o horario buscando do servidor
    const horario = document.getElementById("id_horario");

    horario.textContent = `${dataHoraServidor.slice(11, 19)}`;
  }

  //intevalo para buscar a cada 1 seg o horário e data.
  setInterval(() => {
    fetch("http://worldtimeapi.org/api/ip")
      .then((response) => response.json())
      .then((data) => atualizaDataHora(data))
      .catch((error) => {
        console.log("Ocorreu um erro:", error);
      });
  }, 1000);
  //-----------------------------------------------
  //voltar para o login ao clicar em sair

  const btnSair = document.getElementById("id_btnSair");



})();
