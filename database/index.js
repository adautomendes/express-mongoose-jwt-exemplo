/**
 * Arquivo de configuração da conexão com o MongoDB
 */
require("dotenv").config();

const DB_URL = process.env.DB_URL;

const DB_SETTINGS = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    dbName: process.env.DB_NAME
}

module.exports = {
    DB_ADDRESS: DB_URL,
    DB_OPTIONS: DB_SETTINGS
}