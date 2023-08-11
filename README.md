### cs_20234
Repositório definido para a manutenção do controle de versão dos artefatos do projeto de construção de uma API Rest para:

**A API tem como propósito auxiliar no controle de estoque de uma biblioteca pública.**.

### Grupo
Esta API será construída pelos componentes do grupo 4:

|Matrícula|Nome|Usuário Git|
|---|---|---|
|202009561|Gabriel Cardoso de Castro|[GabrielCCastrodev](https://github.com/GabrielCCastrodev)|
|202004756|Gustavo Alves Marçal|[gugualves2002](https://github.com/gugualves2002)|
|201802778|Mateus Silva de Sousa|[MateusSilvaUFG](https://github.com/MateusSilvaUFG)|
|202105052|Pedro Lucas de Oliveira Lara|[pedrollara](https://github.com/pedrollara)|
|202004777|Rafael Estanislau Morais dos Santos|[RafaelEstanislau](https://github.com/RafaelEstanislau)|

### Requisitos Funcionais
1. RF001 - O sistema deve ser capaz de efetuar o cadastro dos locatários utilizando email e senha
2. RF002 - O sistema deve ser capaz de controlar a entrada e saída de livros, tendo controle sobre a quantidade de cada livro
3. RF003 - O sistema deve permitir o registro de itens no estoque da biblioteca pública, incluindo informações como título, autor, categória, número de exemplares.


### Requisitos Não Funcionais
2. RNF002 - A API deve garantir a segurança dos dados dos usuários e das informações da biblioteca pública. 
3. RNF003 - A API deve ser capaz de responder rapidamente ás solicitações dos usuários, garantindo uma boa experiência do usuário.
4. RNF004 - A API deve ser confiável e estar disponível o tempo todo, para que os usuários possam acessar o estoque da biblioteca pública a qualquer momento.
5. RNF005 - Facilidade de uso, para que os usuários possam navegar facilmente pelo estoque da biblioteca e realizar as operações necessárias.

### Regras de Negócio
1. RN01 - O sistema deve permitir apenas locatários cadastrados realizarem a locação de livros.
2. RN02 - O sistema deve permitir que um locatário possa locar até 3 livros por vez.
3. RN03 - O sistema deve bloquear locação de livros que estejam com quantidade zerada.
4. RN04 - O sistema permitir a locação apenas por usuários logados

### Tecnologia de _Front-end_
A tecnologia utilizada no Front-end será **JavaScript**.

### Tecnologia de _Back-end_
A tecnologia utilizada no Back-end será **NodeJS**.

### Tecnologia de Persistência de Dados
A tecnologia utilizada para a persistência de dados será através de um banco de dados relacional(**SQL**).

### Local do _Deploy_
O _deploy_ da API sera feito no **Heroku**.

### Cronograma de Desenvolvimento

|Iteração|Tarefa|Data Início|Data Fim|Responsável|Situação|
|---|---|---|---|---|---|
|1|Especificar História de Usuário 1|17/04/2023|05/05/2023|Rafael Estanislau|Programada|
|2|Diagramar Casos de Uso, Classe, Sequência, Arquitetura|06/05/2023|19/05/2023|Rafael Estanislau|Programada|
|3|Implementar Back End|20/05/2023|02/06/2023|Rafael Estanislau|Programada|
|4|Implementar Back End|03/06/2023|16/06/2023|Rafael Estanislau|Programada|
|5|Implementar Front End|17/06/2023|30/06/2023|Rafael Estanislau|Programada|
|6|Implementar Front End|01/07/2023|21/07/2023|Rafael Estanislau|Programada|
|7|Validações e Testes|22/07/2023|11/08/2023|Rafael Estanislau|Programada|

### História de Usuário

1. HU01 - Eu como um usuário da biblioteca, quero poder pesquisar por livros no sistema utilizando palavras-chave, autor, título e outras informações relevantes, para facilitar a busca por livros de meu interesse.
2. HU02 - Eu como um funcionário da biblioteca, quero ter a possibilidade de atualizar as informações dos livros no sistema, como quantidade de exemplares, autor, categoria, para manter o catálogo atualizado.
3. HU03 - Eu como um usuário da biblioteca, quero poder alugar até 3 livros de exemplares diferentes.
