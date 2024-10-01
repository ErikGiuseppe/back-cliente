const Repository = require("./Repository.js");

class ClienteRepository extends Repository {
  constructor() {
    super("clientes");
  }
  
}

module.exports = ClienteRepository;
