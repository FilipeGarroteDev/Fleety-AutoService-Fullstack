[Sobre](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#fleety) | [Funcionalidades](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#funcionalidades) | [Tecnologias](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#tecnologias) | [Rodar com Docker](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#como-rodar-o-projeto-com-docker) | [Rodar localmente](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#como-rodar-a-aplica%C3%A7%C3%A3o-localmente) | [Rodar testes](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#como-rodar-a-aplica%C3%A7%C3%A3o-localmente) | [Informações Importantes](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#informa%C3%A7%C3%B5es-importantes-para-o-uso-da-aplica%C3%A7%C3%A3o)

<h1>Fleety</h1>

<div align="center">
  <img src="/frontend/src/assets/images/CustomerGif.gif" />
</div>
<div align="center">
  <img src="/frontend/src/assets/images/AdminGif.gif" />
</div>

O Fleety é um projeto fullstack de fácil utilização - acessível para quaisquer tipos de clientes, da mais variada faixa etária - desenvolvido com o intuito de melhorar a experiência do consumidor e facilitar o monitoramento, controle e análise dos serviços para o administrador do restaurante. É um serviço de automatização/monitoramento de pedidos para restaurantes através do qual, por meio de login, é possível acessar menu digital - lado do cliente - ou o dashboard do administrador - caso tenha permissão para tal. O Fleety foi desenvolvido do zero, do layout ao deploy, utilizando tecnologias como React.js, JavaScript, Node.js, TypeScript, PostgreSQL, mongoDB, jest, dentre outras.

**Deploy**: [Fleety Site](www.fleety.site)


## Funcionalidades

Em linhas gerais, o Fleety está disponível, atualmente, para dispositivos Desktop e tablets. Com o intuito de promover uma maior acessibilidade, diminuir o uso de papel, garantir uma maior transparência, fidelizar a clientela e, principalmente, às vistas de entregar uma experiência única ao cliente e ao administrador do restaurante, foram implementadas as seguintes funcionalidades:

### Consumidor
- Login realizado por mesa. Ao pagar o pedido, a aplicação é deslogada e uma nova comanda aberta para a respectiva mesa;
- Página inicial: Banner (carrossel) com os destaques do restaurante, por meio do qual o usuário é levado às respectivas seções;
- Página de comidas/bebidas: O usuário pode acessar, através do menu lateral, o cardápio de comidas ou de bebidas. Selecionando-o, são mostradas as categorias vinculadas (salvas em banco para permitir uma futura personalização por parte do restaurante). Clicando em uma categoria, são listados os itens vinculados àquela categoria;
- Página do produto: ao clicar em um produto, o consumidor é redirecionado para a respectiva página. Nela, há um banner animado e, abaixo, é permitido ao cliente personalizar o pedido. É possível descrever os itens que deseja retirar, bem como acrescentar itens adicionais, somando o valor unitário de cada item ao valor total do pedido. Também é possível, caso o cliente assim deseje, aumentar a quantidade daquele produto;
- Chamar garçom: No menu superior, o cliente pode solicitar atendimento pessoal, clicando no botão "Chamar garçom". Essa ordem é atualizada, em tempo real, no dashboard do administrador;
- Meu pedido: Através dessa seção, ativada no menu superior, o cliente consegue visualizar os itens selecionados, deletá-los da lista e, caso esteja tudo certo, enviá-los à cozinha - momento no qual o pedido é mostrado no dashboard do administrador.
- Minha conta: Nessa seção, o usuário consegue acompanhar o andamento de seu pedido - monitorar se os produtos estão sendo preparados ou se já foram entregues - além de acrescentar ao valor total um percentual de gorjeto (0, 10%, 15% ou 20%), bem como calcular o valor dividido por uma quantidade específica de pessoas. Caso todos os produtos tenham sido entregues, o usuário poderá realizar o pagamento por cartão de crédito ou pagar a conta dividindo entre mais pessoas (não foi, ainda, implementada a integração com gateway de pagamento);
- Página de Avaliação: O consumidor, através de opção no menu lateral, pode avaliar sua experiência no restaurante. É possível selecionar a quantidade de estrelas (1 a 5) para o atendimento, comidas, bebidas, preços e serviço, além de adicionar uma nota pessoal.

### Admin
- Login realizado através do Google. Para aumentar a segurança, é necessário que o admin possua um e-mail google para ser cadastrado.
- Aguardando atendimento: Nesta seção, a pessoa logada em uma conta com cargo de administrador pode visualizar, em tempo real, as mesas que solicitaram atendimento pessoal, contendo o número da mesa, a hora da solicitação e o tempo em espera. Além disso, é permitido ao administrador encerrar essa solicitação, assim que a mesa for atendida;
- Pedidos pendentes: É possível visualizar, em tempo real, a quantidade de pedidos pendentes, bem como a listagem dos mesmos. Cada linha é composta pelo número da mesa, número da comanda, lista de adicionais e itens para retirar, hora da entrada e tempo de espera, além do botão para comunicar ao cliente que o pedido está pronto/entregue;
- Pedidos finalizados/faturamento: Nessa opção, são listados os pedidos pagos, cada qual contendo o número da comanda, o valor gasto, forma de pagamento e dia/hora da visita. Além disso, é mostrada a quantidade de clientes atendidos, o valor total do faturamento e o ticket médio;
- Avaliações recebidas: Nessa página há um overview acerca das avaliações dos clientes. Há cards contendo a média geral da nota dada ao restaurante, bem como a média de nota por quesito. Além do mais, abaixo, são listadas as opiniões e avaliações de cada usuário, permitindo que o restaurante se atente aos seus pontos fortes e fraquezas;
- Cadastro de mesas: Cabe ao administrador o cadastro das mesas que compõem seu restaurante, bem como, caso necessário, de novos administradores. Esse cadastro se dá mediante fornecimento de uma chave secreta, de posse do restaurante, e configurada como variável de ambiente;

## Tecnologias
As seguintes ferramentas, tecnologias e frameworks foram utilizadas na construção desse projeto:<br>
<p>
  <img style='margin: 5px;' src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/react-react%20icons-%2320232a.svg?&style=for-the-badge&logo=react"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/.env-%2320232a.svg?&style=for-the-badge&logo=.ENV"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Firebase-F29D0C?style=for-the-badge&logo=firebase&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Redis-D9281A?style=for-the-badge&logo=redis&logoColor=white"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white'/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Linux-E34F26?style=for-the-badge&logo=linux&logoColor=black'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white'>
</p>



## Como rodar o projeto com Docker?

- Faça o clone/fork desse repositório, que já contém o front-end, back-end e configurações do Docker. - https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack

1. Instale o docker em sua máquina, seguindo a seguinte documentação: [Instalação Docker Ubunto](https://docs.docker.com/engine/install/ubuntu/);

2. Instale o docker-compose por meio do seguinte comando:
```bash
sudo apt-get install docker-compose
```

3. Crie um arquivo `.env.development` na raiz da pasta 'backend' e o configure utilizando, como exemplo, o arquivo `.env.example`, seguindo as instruções constantes dele.

4. Crie um arquivo `.env` na raiz da pasta 'frontend' e o configure utilizando, como exemplo, o arquivo `.env.example`, seguindo as instruções constantes dele.

5. Por fim, rode, **na raiz do projeto (./)**, o comando a seguir para iniciar a aplicação:
```bash
npm run docker:start
```

6. Pronto, agora você já pode acessar o app através da url: *(Para saber como logar na aplicação, consulte a seção [Informações Importantes](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#informa%C3%A7%C3%B5es-importantes-para-o-uso-da-aplica%C3%A7%C3%A3o)*
```bash
http://localhost
```

7. Caso queira parar a aplicação, rode:
```bash
npm run docker:down
```

8. Caso queira deletar a aplicação, bem como seus volumes, containers e imagens, rode:
```bash
npm run docker:clear
```


## Como rodar a aplicação localmente?

- Faça o clone/fork desse repositório, que já contém o front-end, back-end e configurações do Docker. - https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack

### Pasta ./backend:
 
1. Na pasta 'backend', rode o seguinte comando, para instalar as dependências:
```bash
npm i
```
2. Crie uma database no PostgreSQL com o nome de sua preferência ( recomendo que seja: fleety :D )

3. Crie um arquivo `.env.development` na raiz da pasta 'backend' e o configure utilizando, como exemplo, o arquivo `.env.example`, seguindo as instruções constantes dele.

4. Rode o seguinte comando a fim de executar as migrations do prisma ORM e criar as devidas tabelas em seu banco de dados:
```bash
npm run dev:migration:run
```

5. A fim de popular o banco com os dados necessários, rode:
```bash
npm run dev:seed
```

6. Certifique-se de que tenha o mongoDB instalado em sua máquina e inicialize-o com o comando:
```bash
mongod --dbpath ~/.mongo
```

7. Por fim, rode o comando a seguir para subir o servidor:
```bash
npm run dev
```

### Pasta ./frontend:
 
8. Na pasta 'frontend', rode o seguinte comando, para instalar as dependências:
```bash
npm i
```

9. Crie um arquivo `.env` na raiz da pasta 'frontend' e o configure utilizando, como exemplo, o arquivo `.env.example`, seguindo as instruções constantes dele.

10. Por fim, rode o comando a seguir para iniciar a aplicação:
```bash
npm start
```

11. Pronto, agora você já pode acessar o app através da url: *(Para saber como logar na aplicação, consulte a seção [Informações Importantes](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#informa%C3%A7%C3%B5es-importantes-para-o-uso-da-aplica%C3%A7%C3%A3o)*
```bash
http://localhost:[SUA PORTA]
```


## Como rodar os testes automatizados?

- Faça o clone/fork desse repositório, que já contém o front-end, back-end e configurações do Docker. - https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack

### Pasta ./backend:
 
1. Na pasta 'backend', rode o seguinte comando, para instalar as dependências:
```bash
npm i
```
2. Crie uma database no PostgreSQL com o nome de sua preferência ( recomendo que seja: fleety-test :D )

3. Crie um arquivo `.env.test` na raiz da pasta 'backend' e o configure utilizando, como exemplo, o arquivo `.env.example`, seguindo as instruções constantes dele.

4. Rode o seguinte comando a fim de executar as migrations do prisma ORM e criar as devidas tabelas em seu banco de dados:
```bash
npm run test:migration:run
```

5. A fim de popular o banco com os dados necessários, rode:
```bash
npm run test:seed
```

6. Certifique-se de que tenha o mongoDB instalado em sua máquina e inicialize-o com o comando:
```bash
mongod --dbpath ~/.mongo
```

7. Por fim, rode o comando a seguir para iniciar os testes:
```bash
npm run test
```


## Informações importantes para o uso da aplicação

1. Foi criado um usuário com privilégio de administrador, cujo login é "test" e a senha é "test".
2. Entre no sistema com essas credenciais e, assim, poderá criar um usuário com privilégio "CLIENT" ou até mesmo um outro admin com seu e-mail google.
3. Lembrando que, para criar qualquer usuário, lhe será pedida uma chave secreta do restaurante. Tal chave deve ser configurada nos arquivos .env, tanto do back-end, quanto do front-end.
4. Estou aberto e à disposição para quaisquer críticas, sugestões, parcerias e propostas. É só me procurar nos canais fornecidos no meu perfil.
5. DIVIRTAM-SE!!!!
