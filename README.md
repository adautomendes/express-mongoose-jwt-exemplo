# Express + Mongoose + JWT + MongoDB
## Sobre
#### Exemplo de uma aplicação (backend) que utiliza:

- [Express](https://expressjs.com/pt-br/): framework para desenvolvimento rápido de aplicações web.
- [Mongoose](https://mongoosejs.com/): modelagem de objetos para o banco de dados não relacional MongoDB.
- [JWT](https://jwt.io/): sistema de autenticação baseado em token, um padrão para segurança de APIs RESTful atualmente.
- [MongoDB](https://www.mongodb.com/): banco de dados de código aberto, gratuito, de alta performance, sem esquemas e orientado à documentos.

Além disso utilizamos outras bibliotecas:
- [Chalk](https://www.npmjs.com/package/chalk): customizar cor das mensagens de console.
- [DotEnv](https://www.npmjs.com/package/dotenv): configuração das variáveis de ambiente (.env).
- [HTTP Status Codes](https://www.npmjs.com/package/http-status-codes): enum com todos os códigos de status do protocolo HTTP.

## Pre requisitos

- NodeJS
- MongoDB

## Instalação, Configuração e Execução
1) Após clonar o repositório, execute o comando abaixo para instalar as depedências (a pasta `node_modules` será criada):
```
npm install
```
2) Renomeie o arquivo `.env.template` para `.env`.
2) Altere o arquivo `.env` com as os valores desejados e com os parâmetros corretos de conexão com o MongoDB.
2.1) Se a flag `RECREATE_DB` estiver com valor `true` sempre que a aplicação subir o banco de dados será recriado  e você perderá todos os dados. Aconselha-se a deixar o flag em `true` somente na primeira vez que for subir a aplicação.
3) Execute o comando abaixo para subir o servidor:
```
npm start
```
4) Importe o arquivo `ExpressMongooseJWT.postman_collection.json` no Postman e execute a collection. São um total de 13 testes e todos devem passar.