import apiInstancia from "../compartilhado/api";
import { IAResponse } from "../tipos/ia";

class IAService {
    private apiUrl: string;

    constructor(apiUrl: string = `/inteligencia-artificial`) {
        this.apiUrl = apiUrl;
    }

    async obterRespostadaIA(prompt: string): Promise<IAResponse> {
        const response = await apiInstancia.get(`${this.apiUrl}`,  {
            params: { prompt },
        })
        return response.data
    }

}

export default IAService;
