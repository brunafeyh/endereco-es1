import apiInstancia from "../compartilhado/api"
import { LogradouroTipo } from "../tipos/logradouro";

export class LogradouroService {
    private apiUrl: string;

    constructor(apiUrl: string = `/endereco/logradouros`) {
        this.apiUrl = apiUrl;
    }

    async listarLogradouros(): Promise<LogradouroTipo[]> {
        const response = await apiInstancia.get<LogradouroTipo[]>(`${this.apiUrl}`); 
        return response.data
      }
}
