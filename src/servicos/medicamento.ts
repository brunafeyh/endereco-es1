import apiInstancia from "../compartilhado/api";
import { Medicamento, MedicamentoList } from "../tipos/medicamento";

export class MedicamentoService {
    private apiUrl: string;

    constructor(apiUrl: string = `/medicamento`) {
        this.apiUrl = apiUrl;
    }

    async criarMedicamento(form: Medicamento): Promise<void> {
        await apiInstancia.post(`${this.apiUrl}/cadastrar`, form)
    }

    async listarMedicamentos(): Promise<MedicamentoList[]> {
        const response = await apiInstancia.get(`${this.apiUrl}`)
        return response.data
    }
}