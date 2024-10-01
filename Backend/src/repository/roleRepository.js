const database = require("../models/index.js");
const uuid = require("uuid");
const Repository = require("./Repository.js");
class RoleRepository extends Repository {
  constructor() {
    super("roles");
  }
  
}
module.exports = RoleRepository;
