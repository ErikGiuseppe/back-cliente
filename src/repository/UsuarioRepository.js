const Repository = require("./Repository.js");
const dataSource = require("../models");
const database = require("../models");

class UsuarioRepository extends Repository {
  constructor() {
    super("usuarios");
  }
  
}

module.exports = UsuarioRepository;
