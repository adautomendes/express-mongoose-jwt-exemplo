/**
 * Arquivo de configuração do documento que irá persistir no MongoDB
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pessoa = new Schema(
    {
        dadosPessoais: {
            nome: { type: String, default: null },
            rg: { type: String, default: null },
            cpf: { type: String, default: null }
        },
        contato: {
            email: { type: String, default: null },
            telefone: { type: String, default: null }
        },
        acesso: {
            usuario: { type: String, required: true, unique: true },
            senha: { type: String, default: 'miojo123' },
            ultimoLogin: { type: Date, default: null }
        }
    },
    { timestamps: true } /* Com esse campo, o mongoose é capaz de gerenciar os campos 'createdAt' e 'updatedAt' */
)

module.exports = mongoose.model('Pessoa', Pessoa);
