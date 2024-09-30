class Services {
  constructor(entidadeRepository) {
    this.entidadeRepository = entidadeRepository;
  }
  async cadastrar() {
    throw new Error("Abstract Method has no implementation");
  }
  async pegaUmRegistroPorId(id) {
    const registro = await this.entidadeRepository.pegaUmRegistro(id);
    if (!registro) {
      throw new Error("Dado informado não cadastrado!");
    }
    return registro;
  }
  async excluiRegistro(where) {
    try {
      const dadoExcluido = await this.entidadeRepository.excluiRegistro(where);
      if (!dadoExcluido) {
        throw new Error("Dado informada não excluido!");
      }
      return "deletado com sucesso!";
    } catch (error) {
      throw new Error("Erro ao tentar deletar o registro!");
    }
  }

  async atualizaRegistro(dadosAtualizados, where) {
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

module.exports = Services;
