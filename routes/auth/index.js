const HttpStatus = require('http-status-codes');
const express = require('express');
const router = express.Router();

require("dotenv").config();
const jwt = require('jsonwebtoken');

const Pessoa = require('../../database/schemas/pessoa'); //Importando o esquema Pessoa para utilizarmos no login

/**
 * Rota de login => POST http://localhost:3333/auth/v1/login
 * Body:
{
    "usuario": <usuario>,
    "senha": <senha>
}
 */
router.post('/login', async (req, res, next) => {
    try {
        let pessoa = await Pessoa.findOne({ 'acesso.usuario': req.body.usuario })
            .and({ 'acesso.senha': req.body.senha }); //Buscando pessoa baseado no usuario/senha fornacidos na request

        if (pessoa != null) {
            //Se usuário/senha forem encontrados no BD, o login será realizado
            var token = jwt.sign({ id: pessoa._id }, process.env.SECRET, { // SECRET => chave utilizada para gerar o token, deve ser mantida em um arquivo seguro
                expiresIn: '1d' // Definindo token para expirar em 1 dia
            });

            //Atualizando ultimo login da pessoa
            pessoa = await Pessoa.findByIdAndUpdate(pessoa._id, { 'acesso.ultimoLogin': new Date() }, { new: true }).lean();

            //Com o login realizado, devolvemos o token e as informações da pessoa logada na response
            res.status(HttpStatus.OK).send({ token: token, pessoa: pessoa });
        } else {
            res.status(HttpStatus.UNAUTHORIZED).send({ msg: 'Login inválido' });
        }
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: error });
    }
});

/**
 * Rota (fake) de logout => POST http://localhost:3333/auth/v1/logout
 */
router.post('/logout', async (req, res, next) => {
    // Criamos esse endpoint de logout só para o frontend remover o token
    // Não há necessidade de nenhuma ação do lado do backend, então só retornamos uma mensagem
    res.status(HttpStatus.OK).send({ msg: 'Logged out :)' });
});

/**
 * Função de middleware utilizada
 * para validar o token de rotas protegidas
 */
const verifyJWT = (req, res, next) => {
    var token = req.headers['token']; //Pegaremos o parâmetro 'token' do header das requests
    if (token == null)
        return res.status(HttpStatus.UNAUTHORIZED).send({ msg: 'Token não fornecido.' });

    //Função para validação do token enviado
    jwt.verify(token, process.env.SECRET, function (error, decoded) {
        if (error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: 'Erro na validação do token', erro: error });

        // Se tudo estiver ok, salva o id na request para uso posterior
        req.userId = decoded.id;
    });

    next(); //Chamando a próxima função, caso a verificação do token tenha sido bem sucedida
}

module.exports = {
    router, // Expondo as rotas de autenticação
    verifyJWT // Expondo a função de verificação do token para ser usada como função de middleware
}
