import ClienteRepository from "../Repositories/ClienteRepository";

export default class ClienteService {
  constructor() {
    this.clienteRepository = new ClienteRepository();
  }
  async getAllDistinct() {
    const note = await this.clienteRepository.getAll();
    var types = [];
  

    note.map((props, index) => {
      if (index != 0) {
        types = types.filter(function (e) {
          return e !== props.type;
        });
      }

      types.push(props.type);
    });
   

    return types;
  }
}
