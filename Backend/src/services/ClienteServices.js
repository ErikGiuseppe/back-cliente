const Services = require("./Services.js");
const dataSource = require("../models/index.js");
const uuid = require("uuid");
const ClienteRepository = require("../repository/ClienteRepository.js");
const clienteRepository = new ClienteRepository();

class ClienteServices extends Services {
    constructor() {
        super(clienteRepository);
    }
    async pegaUmRegistroPorNome(nome) {
        const where = {
            nome: nome,
        };
        return this.entidadeRepository.pegaUmRegistro(where);
    }
    async cadastrar(dto) {
        try {
            const newNote = await clienteRepository.criaRegistro(dto);
            return newNote;
        } catch (error) {
            throw new Error("Erro ao cadastrar nota");
        }
    }
}

module.exports = ClienteServices;
