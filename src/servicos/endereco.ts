import apiInstancia from "../compartilhado/api";
import { EnderecoTipo } from "../tipos/endereco";

class EnderecoService {
    private apiUrl: string;

    constructor(apiUrl: string = `/endereco`) {
        this.apiUrl = apiUrl;
    }

    async adicionarEndereco(form: EnderecoTipo): Promise<void> {
        await apiInstancia.post(`${this.apiUrl}/cadastrar`, form);
    }

    async listarEnderecosCEP(cep: string): Promise<EnderecoTipo[]> {
        const response = await apiInstancia.get(`${this.apiUrl}/cep`, {
            params: { cep },
        })
        return response.data
    }

    async obterEnderecoID(id: number): Promise<EnderecoTipo> {
        const response = await apiInstancia.get(`${this.apiUrl}/id`, {
            params: { id },
        })
        return response.data
    }

    async obterEnderecoExterno(cep: string): Promise<EnderecoTipo> {
        const response = await apiInstancia.get(`${this.apiUrl}/externo`, {
            params: { cep },
        })
        return response.data
    }
}

export default EnderecoService;
