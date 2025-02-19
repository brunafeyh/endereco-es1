import apiInstancia from "../../compartilhado/api";
import { DDD } from "../../tipos/paciente";

class DDDService {
    private apiUrl: string;

    constructor(apiUrl: string = `/pessoa/ddds`) {
        this.apiUrl = apiUrl;
    }

    async listarDDDs(): Promise<DDD[]> {
       const response = await apiInstancia.get(`${this.apiUrl}`)
       return response.data
    }
}

export default DDDService
