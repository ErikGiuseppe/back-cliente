const database = require("../models");
const Sequelize = require("sequelize");
const UsuarioRepository = require("../repository/UsuarioRepository");
const RoleRepository = require("../repository/roleRepository");
const PermissaoRepository = require("../repository/permissaoRepository");
const usuarioRepository = new UsuarioRepository();
const roleRepository = new RoleRepository();
const permissaoRepository = new PermissaoRepository();
class SegurancaService {
  async cadastrarAcl(dto) {
    const includeUser = [
      {
        model: database.roles,
        as: "usuario_roles",
        attributes: ["id", "nome", "descricao"],
        through: {
          attributes: [],
        },
      },
      {
        model: database.permissoes,
        as: "usuario_permissoes",
        attributes: ["id", "nome", "descricao"],
        through: {
          attributes: [],
        },
      },
    ];
    const whereUser = {
      id: dto.usuarioId,
    };
    const usuario = await usuarioRepository.getOneIncludeWhere(
      includeUser,
      whereUser
    );

    if (!usuario) {
      throw new Error("Usuario não cadastrado");
    }
    const whereRoles = {
      id: {
        [Sequelize.Op.in]: dto.roles,
      },
    };
    const rolesCadastradas = await roleRepository.pegaTodosOsRegistros(
      whereRoles
    );
    const wherePermissoes = {
      id: {
        [Sequelize.Op.in]: dto.permissoes,
      },
    };
    const permissoesCadastradas = await permissaoRepository.pegaUmRegistro(
      wherePermissoes
    );
    await usuario.removeUsuario_roles(usuario.usuario_roles);
    await usuario.removeUsuario_permissoes(usuario.usuario_permissoes);
    await usuario.addUsuario_roles(rolesCadastradas);
    await usuario.addUsuario_permissoes(permissoesCadastradas);
    const novoUsuario = await usuarioRepository.getOneIncludeWhere(
      includeUser,
      whereUser
    );
    return novoUsuario;
  }
  async cadastrarPermissoesRoles(dto) {
    const include = [
      {
        model: database.permissoes,
        as: "roles_das_permissoes",
        attributes: ["id", "nome", "descricao"],
        through: {
          attributes: [],
        },
      },
    ];
    const whereRole = {
      id: dto.roleId,
    };
    const role = await roleRepository.getOneIncludeWhere(include, whereRole);
    if (!role) {
      throw new Error("Role não cadastrada");
    }
    const wherePermissao = {
      id: {
        [Sequelize.Op.in]: dto.permissoes,
      },
    };
    const permissoesCadastradas =
      await permissaoRepository.pegaTodosOsRegistros(wherePermissao);
    await role.removeRoles_das_permissoes(role.roles_das_permissoes);
    await role.addRoles_das_permissoes(permissoesCadastradas);
    const novaRole = await roleRepository.getOneIncludeWhere(
      include,
      whereRole
    );
    return novaRole;
  }
}
module.exports = SegurancaService;
