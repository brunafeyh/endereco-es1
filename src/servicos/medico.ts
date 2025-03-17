import apiInstancia from "../compartilhado/api"
import { Medico } from "../tipos/paciente";

class MedicoService {
    private apiUrl: string;

    constructor(apiUrl: string = `/medico`) {
        this.apiUrl = apiUrl;
    }

    async adicionarMedico(form: Medico): Promise<void> {
        await apiInstancia.post(`${this.apiUrl}/cadastrar`, form);
    }
}

export default MedicoService;
