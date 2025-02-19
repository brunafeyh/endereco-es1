import apiInstancia from "../compartilhado/api"
import { BairroType } from "../tipos/bairro"

class BairroService {
    private apiUrl: string;

    constructor(apiUrl: string = `/endereco/bairros`) {
        this.apiUrl = apiUrl;
    }

    async listarBairros(): Promise<BairroType[]> {
       const response = await apiInstancia.get(`${this.apiUrl}`)
       return response.data
    }
}

export default BairroService
