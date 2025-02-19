import apiInstancia from "../compartilhado/api"
import { Sexo } from "../tipos/paciente";

class SexoService {
    private apiUrl: string;

    constructor(apiUrl: string = `/pessoa/sexos`) {
        this.apiUrl = apiUrl;
    }

    async listarSexos(): Promise<Sexo[]> {
       const response = await apiInstancia.get(`${this.apiUrl}`)
       return response.data
    }
}

export default SexoService
