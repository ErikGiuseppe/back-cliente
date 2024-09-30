const database = require("../models");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");
const UsuarioRepository = require("../repository/UsuarioRepository");
const usuarioRepository = new UsuarioRepository();

class AuthService {
  async login(dto) {
    const attributes = ["id", "email", "senha"];
    const where = {
      email: dto.email,
    };
    const usuario = await usuarioRepository.pegaUmRegistroAtributo(
      attributes,
      where
    );

    if (!usuario) {
      throw new Error("Usuario não cadastrado");
    }

    const senhasIguais = await compare(dto.senha, usuario.senha);

    if (!senhasIguais) {
      throw new Error("Usuario ou senha invalido");
    }

    const accessToken = sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      jsonSecret.secret,
      {
        expiresIn: 86400,
      }
    );

    return { accessToken };
  }
}

module.exports = AuthService;
