const Controller = require("./Controller.js");
const AtividadeServices = require("../services/AtividadeServices.js");
const AtividadeRepository = require("../repository/AtividadeRepository.js");
const atividadeRepository = new AtividadeRepository();

const atividadeServices = new AtividadeServices();

class AtividadeController extends Controller {
    constructor() {
        super(atividadeRepository, atividadeServices);
    }
    
}

module.exports = AtividadeController;
