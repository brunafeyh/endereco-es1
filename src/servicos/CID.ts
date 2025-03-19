import apiInstancia from "../compartilhado/api";
import { CID } from "../tipos/cid";

export class CIDService {
    private apiUrl: string;

    constructor(apiUrl: string = `/diagnostico-cid`) {
        this.apiUrl = apiUrl;
    }

    async criarCID(form: CID): Promise<void> {
        await apiInstancia.post(`${this.apiUrl}/cadastrar`, form)
    }
    async listarCIDS(): Promise<CID[]> {
        const response = await apiInstancia.get(`${this.apiUrl}`)
        return response.data
    }
}