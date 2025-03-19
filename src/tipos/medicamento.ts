import { z } from "zod";

export const medicamentoSchema = z.object({
    nome: z.string()
})

export type Medicamento = z.infer<typeof medicamentoSchema>

export const medicamentoListSchema = z.object({
    id: z.number(),
    nome: z.string()
})

export type MedicamentoList = z.infer<typeof medicamentoListSchema>