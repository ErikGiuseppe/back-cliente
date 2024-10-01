import axios from "axios";

export default class ClienteRepository {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:3000",
        });
    }
    async getAll() {
        const { data } = await this.axios.get("/cliente", {
            headers: {},
        });

        return data;
    }
    async delete(id) {
        const { data } = await this.axios.delete(`/cliente/id/${id}`, {
            headers: {},
        });

        return data;
    }
    async createCliente(Post) {
        const { data } = await this.axios.post("/cliente", Post, {
            headers: { headers: { "Content-Type": "application/json" } },
        });

        return data;
    }
    async editCliente(Put) {
        const { data } = await this.axios.put(`/cliente/id/${Put.id}`, Put, {
            headers: { headers: { "Content-Type": "application/json" } },
        });

        return data;
    }
}
