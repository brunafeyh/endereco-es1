import apiInstancia from "../compartilhado/api"
import { Receita, ReceitaMedicaList, ReceitaMedicaListOne } from "../tipos/receita-medica";

class ReceitaMedicaService {
    private apiUrl: string;

    constructor(apiUrl: string = `/receita-medica`) {
        this.apiUrl = apiUrl;
    }

    async adicionarReceita(form: Receita): Promise<void> {
        await apiInstancia.post(`${this.apiUrl}/cadastrar`, form);
    }

    async listarTodasReceitasMedicas(): Promise<ReceitaMedicaList[]> {
        const response = await apiInstancia.get(`${this.apiUrl}`)
        return response.data
    }

    async obterReceitaMedica(numero: number): Promise<ReceitaMedicaListOne> {
        const response = await apiInstancia.get(`${this.apiUrl}/consultar`, {
            params: { numero },
        })
        return response.data
    }
}

export default ReceitaMedicaService;
