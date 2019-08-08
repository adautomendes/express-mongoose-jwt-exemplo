/* Dependêcias padrão do Express */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/*********************************/

/* Dependências utilizadas na aplicação */

/****************************************/

/* [1] - Importação dos arquivos das rotas dentro da aplicação (1º nível) */
var rotas = {
    index: require('./routes'), //http://localhost:3333/
    autenticacao: require('./routes/auth'), // http://localhost:3333/auth/v1/...
    pessoa: require('./routes/pessoa') // http://localhost:3333/pessoa/v1/...
};

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * [2] - Configuração das rotas baseado no que foi definido em [1]
 * Quando expomos algo além do router no módulo, temos que explicitar o que vamos usar
 * por isto aqui usamos 'rotas.autenticacao.router' e 'rotas.autenticacao.verifyJWT'.
 */
app.use('/', rotas.index); //Rota raiz (não vai retornar nada)

var authRouter = express.Router(); //Criando um router para as rotas de autenticação
app.use('/auth/v1', authRouter); //Rotas de autenticação, não protegidas
authRouter.use('/', rotas.autenticacao.router); //Todas as rotas configuradas em ./routes/auth/index.js serão acessadas por http://localhost:3333/auth/v1/...

var apiRouter = express.Router(); //Criando um router para as rotas da API
app.use('/api/v1', rotas.autenticacao.verifyJWT, apiRouter); //Rotas da api, protegidas, executam a função 'verifyJWT' para validar o token enviado na request
apiRouter.use('/pessoa', rotas.pessoa); //Todas as rotas configuradas em ./routes/pessoa/index.js serão acessadas por http://localhost:3333/api/v1/pessoa/...

module.exports = app;
