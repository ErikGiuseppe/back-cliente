const Controller = require("./Controller.js");
const ClienteServices = require("../services/ClienteServices.js");
const ClienteRepository = require("../repository/ClienteRepository.js");
const clienteRepository = new ClienteRepository();

const clienteServices = new ClienteServices();

class ClienteController extends Controller {
    constructor() {
        super(clienteRepository, clienteServices);
    }
    async pegaUmPorNome(req, res) {
        const { nome } = req.params;
        try {
            const umRegistro = await this.entidadeService.pegaUmRegistroPorNome(
                String(nome)
            );
            return res.status(200).json(umRegistro);
        } catch (erro) {
            // erro
        }
    }
    async pegaTudoEscopo(req, res) {
        try {
            const listaDeRegistro =
                await this.entidadeService.pegaTudoEscopo();
            return res.status(200).json(listaDeRegistro);
        } catch (erro) {
            return res.status(400).send({ message: erro.message });
        }
    }
}

module.exports = ClienteController;
