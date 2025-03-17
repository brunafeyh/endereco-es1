import apiInstancia from "../compartilhado/api";
import { CID } from "../tipos/cid";

export class CIDService {
    private apiUrl: string;

    constructor(apiUrl: string = `/diagnostico-cid/cadastrar`) {
        this.apiUrl = apiUrl;
    }

    async criarCID(form: CID): Promise<void> {
        await apiInstancia.post(`${this.apiUrl}`, form)
    }
}