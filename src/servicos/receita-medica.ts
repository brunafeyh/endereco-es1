import apiInstancia from "../compartilhado/api"
import { Receita } from "../tipos/receita-medica";

class ReceitaMedicaService {
    private apiUrl: string;

    constructor(apiUrl: string = `/receita-medica`) {
        this.apiUrl = apiUrl;
    }

    async adicionarReceita(form: Receita): Promise<void> {
        await apiInstancia.post(`${this.apiUrl}/cadastrar`, form);
    }
}

export default ReceitaMedicaService;
