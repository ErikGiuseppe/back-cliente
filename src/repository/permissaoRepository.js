const database = require("../models");
const uuid = require("uuid");
const Repository = require("./Repository");

class PermissaoRepository extends Repository {
  constructor() {
    super("permissoes");
  }
}
module.exports = PermissaoRepository;
