const database = require("../models");
const uuid = require("uuid");
const Services = require("./Services.js");
const RoleRepository = require("../repository/roleRepository.js");
const roleRepository = new RoleRepository();
class RoleService extends Services {
  constructor() {
    super(roleRepository);
  }
  async cadastrar(dto) {
    const where = {
      nome: dto.nome,
    };
    const role = await roleRepository.pegaUmRegistro(where);
    if (role) {
      throw new Error("Role já cadastrada");
    }
    try {
      const newRole = await roleRepository.criaRegistro(dto);
      return newRole;
    } catch (error) {
      throw new Error("Erro ao cadastrar role");
    }
  }

  async buscarTodasRoles() {
    const roles = await roleRepository.pegaTodosOsRegistros();
    return roles;
  }
  async buscarRolePorId(id) {
    const where = {
      id: id,
    };
    const role = await roleRepository.pegaUmRegistro(where);
    if (!role) {
      throw new Error("Role informada não cadastrada!");
    }
    return role;
  }
  async deletarRolePorId(id) {
    const where = {
      id: id,
    };
    const role = await roleRepository.pegaUmRegistro(where);
    if (!role) {
      throw new Error("Role informada não cadastrada!");
    }
    try {
      const where = {
        id: id,
      };
      await roleRepository.excluiRegistro(where);
    } catch (error) {
      console.error("Message error: ", error.message);
      throw error;
    }
  }
  async editarRole(dto) {
    const where = {
      id: dto.id,
    };
    const role = await roleRepository.pegaUmRegistro(where);
    if (!role) {
      throw new Error("Role informada não cadastrada!");
    }
    const listadeRegistrosAtualizados =
      this.entidadeRepository.atualizaRegistro(
        dadosAtualizados,

        where
      );
    if (listadeRegistrosAtualizados[0] === 0) {
      return false;
    }
    return true;
  }
}
module.exports = RoleService;
