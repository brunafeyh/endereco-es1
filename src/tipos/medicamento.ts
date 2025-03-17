import { z } from "zod";

export const medicamentoSchema = z.object({
    nome: z.string()
})

export type Medicamento = z.infer<typeof medicamentoSchema>