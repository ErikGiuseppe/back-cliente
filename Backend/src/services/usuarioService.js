const database = require("../models");
const { hash } = require("bcryptjs");
const uuid = require("uuid");
const UsuarioRepository = require("../repository/UsuarioRepository");
const usuarioRepository = new UsuarioRepository();
class UsuarioService {
  async cadastrar(dto) {
    const where = {
      email: dto.email,
    };

    const usuario = await usuarioRepository.pegaUmRegistro(where);

    if (usuario) {
      throw new Error("Usuario ja cadastrado");
    }
    try {
      const senhaHash = await hash(dto.senha, 8);
      dto.senha = senhaHash;
      const novoUsuario = await usuarioRepository.criaRegistro(dto);
      return novoUsuario;
    } catch (error) {
      throw new Error("Erro ao cadastrar usuario");
    }
  }
  async buscarTodosUsuarios() {
    const usuarios = await usuarioRepository.pegaTodosOsRegistros();
    return usuarios;
  }
  async buscarUsuarioPorId(id) {
    const where = {
      id: id,
    };
    const usuario = await usuarioRepository.pegaUmRegistro(where);
    if (!usuario) {
      throw new Error("Usuario informado não cadastrado!");
    }
    return usuario;
  }
  async editarUsuario(dto) {
    const usuario = await usuarioRepository.pegaUmRegistroPorId(dto.id);
    try {
      usuario.nome = dto.nome;
      usuario.email = dto.email;
      await usuario.save();
      return usuario;
    } catch (error) {
      throw new Error("Erro ao editar usuario!");
    }
  }
  async deletarUsuario(id) {
    await usuarioRepository.pegaUmRegistroPorId(id);
    try {
      usuarioRepository.excluiRegistro(id);
    } catch (error) {
      throw new Error("Erro ao tentar deletar o usuario!");
    }
  }
  async pegaTudoEscopo() {
    const escopos = ["secretariaUsuario"];

    const listaAditivo = await usuarioRepository.getAllInclude(escopos);
    return listaAditivo;
  }
  async pegaTudoEscopoPorId(id) {
    const escopos = ["secretariaUsuario"];

    const listaAditivo = await usuarioRepository.getOneInclude(id, escopos);
    return listaAditivo;
  }
}
module.exports = UsuarioService;
