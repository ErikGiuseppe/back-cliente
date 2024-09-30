const database = require("../models");
const uuid = require("uuid");
const Services = require("./Services");
const PermissaoRepository = require("../repository/permissaoRepository");
const permissaoRepository = new PermissaoRepository();
class PermissaoService extends Services {
  constructor() {
    super(permissaoRepository);
  }

  async cadastrar(dto) {
    const where = {
      nome: dto.nome,
    };

    const permissao = await permissaoRepository.pegaUmRegistro(where);
    if (permissao) {
      throw new Error("Permissão já cadastrada");
    }
    try {
      const newPermissao = await permissaoRepository.criaRegistro(dto);
      return newPermissao;
    } catch (error) {
      throw new Error("Erro cadastrar permissão");
    }
  }
  async buscarTodasPermissoes() {
    const permissoes = await permissaoRepository.pegaTodosOsRegistros();
    return permissoes;
  }
  async buscarPermissaoPorId(id) {
    const where = {
      id: id,
    };
    const permissao = await permissaoRepository.pegaUmRegistro(where);
    if (!permissao) {
      throw new Error("Permissão informada não cadastrada!");
    }
    return permissao;
  }
  async deletarPermissaoPorId(id) {
    const where = {
      id: id,
    };
    const permissao = await permissaoRepository.pegaUmRegistro(where);
    if (!permissao) {
      throw new Error("Permissão informada não cadastrada!");
    }
    try {
      await permissaoRepository.excluiRegistro({
        where,
      });
    } catch (error) {
      console.error("Message error: ", error.message);
      throw error;
    }
  }
  async editarPermissao(dto) {
    const where = {
      id: dto.id,
    };
    const permissao = await permissaoRepository.pegaUmRegistro(where);
    if (!permissao) {
      throw new Error("Permissão informada não cadastrada!");
    }
    try {
      const permissaoAtualizada = await permissaoRepository.atualizaRegistro(
        dto,
        where
      );

      return await permissaoAtualizada;
    } catch (error) {
      console.error("Message error: ", error.message);
      throw error;
    }
  }
}
module.exports = PermissaoService;
