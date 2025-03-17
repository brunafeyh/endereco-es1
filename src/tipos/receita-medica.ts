import { z } from "zod";

export const personSchema = z.object({
    id: z.number()
})

export const diagnoticoCIDSchema = z.object({
    codigo: z.string()
})
export const medicamentoSchema = z.object({
    id: z.number()
})

export const medicamentoReceitaSchema = z.object({
    dataInicio: z.string(),
    dataFim: z.string(),
    posologia: z.string(),
    medicamento: medicamentoSchema
})

export const receitaMedicaSchema = z.object({
    dataEmissao: z.string(),
    medico: personSchema,
    paciente: personSchema,
    diagnosticoCID: diagnoticoCIDSchema,
    medicamentoReceitaMedicas: z.array(medicamentoReceitaSchema)
})

export type Receita = z.infer<typeof receitaMedicaSchema>