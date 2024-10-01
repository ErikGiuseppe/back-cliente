const uuid = require("uuid");
const dataSource = require("../models");

class Repository {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros(where = []) {
    return dataSource[this.model].findAll({
      where: {
        ...where,
      },
    });
  }
  async pegaUmRegistro(where) {
    return dataSource[this.model].findOne({ where: { ...where } });
  }
  async pegaUmRegistroAtributo(attributes, where) {
    return dataSource[this.model].findOne({
      where: { ...where },
      attributes: attributes,
    });
  }

  async pegaUmRegistroPorId(id) {
    const registro = await dataSource[this.model].findOne({
      where: {
        id: id,
      },
    });
    return registro;
  }

  async criaRegistro(dadosDoRegistro) {
    return dataSource[this.model].create({ id: uuid.v4(), ...dadosDoRegistro });
  }
  async criaRegistroTransacao(dadosDoRegistro, transacao = {}) {
    return dataSource[this.model].create(
      { id: uuid.v4(), ...dadosDoRegistro },
      { transaction: transacao }
    );
  }

  async atualizaRegistro(dadosAtualizados, where) {
    const listadeRegistrosAtualizados = dataSource[this.model].update(
      dadosAtualizados,
      {
        where: {
          ...where,
        },
      }
    );

    return listadeRegistrosAtualizados;
  }

  async excluiRegistro(where) {
    const dadoExcluido = await dataSource[this.model].destroy({
      where: {
        ...where,
      },
    });
    return dadoExcluido;
  }
  async getAllInclude(escopos) {
    const todosRegistros = await dataSource[this.model].findAll({
      include: escopos,
    });
    return todosRegistros;
  }

  async getAllIncludeWhere(escopos, where) {
    const todosRegistros = await dataSource[this.model].findAll({
      include: escopos,
      where: { ...where },
    });
    return todosRegistros;
  }
  async getOneIncludeWhere(escopos, where) {
    const todosRegistros = await dataSource[this.model].findOne({
      include: escopos,
      where: { ...where },
    });
    return todosRegistros;
  }
  async getAllIncludeOrder(escopos, order) {
    console.log(order);
    const todosRegistros = await dataSource[this.model].findAll({
      include: escopos,
      order: [order],
    });
    return todosRegistros;
  }
  async getAllIncludeEscopoOrder(a, escopos, order) {
    console.log(order);
    const todosRegistros = await dataSource[this.model].scope(a).findAll({
      include: escopos,
      order: [order],
    });
    return todosRegistros;
  }

  async getOneInclude(id, escopos) {
    console.log(id);
    const todosRegistros = await dataSource[this.model].findAll({
      include: escopos,

      where: { id },
    });
    return todosRegistros;
  }
}

module.exports = Repository;
