import { z } from "zod";
import { medicoSchema } from "./medico";
import { pacienteSchema } from "./paciente";
import { cidSchema } from "./cid";
import { medicamentoListSchema } from "./medicamento";

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

export const receitaMedicaListSchema = z.object({
    numero: z.number(),
    dataEmissao: z.string(),
    medico: medicoSchema,
    paciente: pacienteSchema,
    diagnosticoCID: cidSchema
})

export type ReceitaMedicaList = z.infer<typeof receitaMedicaListSchema>

export const medicamentoReceitaOneSchema = z.object({
    dataInicio: z.string(),
    dataFim: z.string(),
    posologia: z.string(),
    medicamento: medicamentoListSchema
})

export const receitaMedicaListOneSchema = receitaMedicaListSchema.extend({
    medicamentoReceitaMedicas: z.array(medicamentoReceitaOneSchema)
})

export type ReceitaMedicaListOne = z.infer<typeof receitaMedicaListOneSchema>