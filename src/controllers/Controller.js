class Controller {
  constructor(entidadeRepository, entidadeService) {
    this.entidadeRepository = entidadeRepository;
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      const listaDeRegistro =
        await this.entidadeRepository.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistro);
    } catch (erro) {
      return res.status(400).send({ message: erro.message });
    }
  }

  async pegaUmPorId(req, res) {
    try {
      const { ...params } = req.params;
      const registro = await this.entidadeService.pegaUmRegistroPorId(params);
      return res.status(200).json(registro);
    } catch (error) {
      console.log("Message error: ", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const novoRegistroCriado = await this.entidadeService.cadastrar(
        dadosParaCriacao
      );
      return res.status(200).json(novoRegistroCriado);
    } catch (Erro) {
      return res.status(400).send({ message: Erro.message });
    }
  }

  async atualiza(req, res) {
    const { ...params } = req.params;
    const dadosAtualizados = req.body;
    try {
      //isUpdated
      const foiAtualizado = await this.entidadeService.atualizaRegistro(
        dadosAtualizados,
        params
      );
      if (!foiAtualizado) {
        return res
          .status(400)
          .json({ mensagem: "registro não foi atualizado" });
      }
      return res.status(200).json({ mensagem: "Atualizado com sucesso" });
    } catch (erro) {
      return res.status(400).send({ message: erro.message });
    }
  }

  async exclui(req, res) {
    const { ...params } = req.params;
    try {
      await this.entidadeService.excluiRegistro(params);
      return res
        .status(200)
        .send({ message: "deletado deletado com sucesso!" });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
  async pegaUmRegistro(req, res) {
    const dto = req.params;

    try {
      const pesquisa = await this.entidadeRepository.pegaUmRegistro(dto);
      return res.status(200).json(pesquisa);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = Controller;
