import axios from "axios";

export default class AtividadeRepository {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:3000",
        });
    }
    async getAll() {
        const { data } = await this.axios.get("/atividade", {
            headers: {},
        });

        return data;
    }
    async delete(id) {
        const { data } = await this.axios.delete(`/atividade/id/${id}`, {
            headers: {},
        });

        return data;
    }
    async createAtividade(Post) {
        const { data } = await this.axios.post("/atividade", Post, {
            headers: { headers: { "Content-Type": "application/json" } },
        });

        return data;
    }
    async editAtividade(Put) {
        const { data } = await this.axios.put(`/atividade/id/${Put.id}`, Put, {
            headers: { headers: { "Content-Type": "application/json" } },
        });

        return data;
    }
}
