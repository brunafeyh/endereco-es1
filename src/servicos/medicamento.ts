import apiInstancia from "../compartilhado/api";
import { Medicamento } from "../tipos/medicamento";

export class MedicamentoService {
    private apiUrl: string;

    constructor(apiUrl: string = `/medicamento/cadastrar`) {
        this.apiUrl = apiUrl;
    }

    async criarMedicamento(form: Medicamento): Promise<void> {
        await apiInstancia.post(`${this.apiUrl}`, form)
    }
}