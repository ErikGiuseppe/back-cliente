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
            const newCliente = await clienteRepository.criaRegistro(dto);
            return newCliente;
        } catch (error) {
            throw new Error("Erro ao cadastrar cliente");
        }
    }
    async pegaTudoEscopo() {
        try {
            const escopos = [
                "atividadesCliente",

            ];

            const listaClientes = await this.entidadeRepository.getAllInclude(
                escopos
            );

            return listaClientes;
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = ClienteServices;
