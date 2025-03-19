import apiInstancia from "../compartilhado/api"
import { Paciente, PacienteTipo } from "../tipos/paciente";

class PacienteService {
    private apiUrl: string;

    constructor(apiUrl: string = `/paciente`) {
        this.apiUrl = apiUrl;
    }

    async adicionarPaciente(form: PacienteTipo): Promise<void> {
        await apiInstancia.post(`${this.apiUrl}/cadastrar`, form);
    }

    async buscarPacienteporID(id: number): Promise<PacienteTipo> {
        const response = await apiInstancia.get(`${this.apiUrl}/consultar`, {
            params: { id },
        })
        return response.data
    }
    async buscarPacienteporCPF(cpf: string): Promise<Paciente> {
        const response = await apiInstancia.get(`${this.apiUrl}/consultar/cpf`, {
            params: { cpf },
        })
        return response.data
    }
}

export default PacienteService;
