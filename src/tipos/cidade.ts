import { z } from "zod";

export const publicPlaceType = z.object({
    sigla: z.string(),
    nome: z.string()
})