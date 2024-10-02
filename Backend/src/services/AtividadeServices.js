const Services = require("./Services.js");
const dataSource = require("../models/index.js");
const uuid = require("uuid");
const AtividadeRepository = require("../repository/AtividadeRepository.js");
const atividadeRepository = new AtividadeRepository();

class AtividadeServices extends Services {
    constructor() {
        super(atividadeRepository);
    }
    
    async cadastrar(dto) {
        try {
            const newAtividade = await this.entidadeRepository.criaRegistro(dto);
            return newAtividade;
        } catch (error) {
            throw new Error("Erro ao cadastrar cliente");
        }
    }
}

module.exports = AtividadeServices;
