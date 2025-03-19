import apiInstancia from "../compartilhado/api"
import { Medico } from "../tipos/medico";
import { Medico as MedicoForm } from "../tipos/paciente";

class MedicoService {
    private apiUrl: string;

    constructor(apiUrl: string = `/medico`) {
        this.apiUrl = apiUrl;
    }

    async adicionarMedico(form: MedicoForm): Promise<void> {
        await apiInstancia.post(`${this.apiUrl}/cadastrar`, form);
    }

    async retornarMedicoPorCPF(cpf: string): Promise<Medico> {
        const response = await apiInstancia.get(`${this.apiUrl}/consultar/cpf`, {
            params: {
                cpf: cpf
            }
        });
        return response.data
    }
}

export default MedicoService;
