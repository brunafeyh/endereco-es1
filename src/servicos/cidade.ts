import apiInstancia from "../compartilhado/api"
import { CidadeTipo } from "../tipos/cidade";

class CidadeService {
    private apiUrl: string;

    constructor(apiUrl: string = `/endereco/cidades`) {
        this.apiUrl = apiUrl;
    }

    async listarCidades(): Promise<CidadeTipo[]> {
       const response = await apiInstancia.get(`${this.apiUrl}`)
       return response.data
    }

    async obterCidadeporId(id: number): Promise<CidadeTipo> {
        try {
          const response = await apiInstancia.get<CidadeTipo>(`/endereco/cidade/id`, {
            params: { id },
          })
          return response.data;
        } catch (error) {
          console.error('Erro ao buscar cidade:', error);
          throw error;
        }
      }
}

export default CidadeService

