const HttpStatus = require('http-status-codes');
const express = require('express');
const router = express.Router();

require("dotenv").config();
const jwt = require('jsonwebtoken');

/**
 * Rota (dummy) do path raiz da aplicação => OPTIONS http://localhost:3333/
 */
router.options('/', async (req, res, next) => {
    // Criamos esse endpoint simplesmente para pingar a aplicação no Postman
    // Será usada no Postman para setar as variáveis de ambiente
    res.status(HttpStatus.NO_CONTENT).send();
});

module.exports = router;