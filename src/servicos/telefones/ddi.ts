import apiInstancia from "../../compartilhado/api";
import { DDI } from "../../tipos/paciente";

class DDIService {
    private apiUrl: string;

    constructor(apiUrl: string = `/pessoa/ddis`) {
        this.apiUrl = apiUrl;
    }

    async listarDDIs(): Promise<DDI[]> {
        const response = await apiInstancia.get(`${this.apiUrl}`)
        return response.data
    }
}

export default DDIService
