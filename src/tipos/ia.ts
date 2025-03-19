import { z } from "zod"

export const apitypeResponseEnumSchema = z.enum(['CONSULTAR_PACIENTE_POR_ID', 'CONSULTAR_RECEITA_MEDICA_POR_NUMERO', 'ERRO'])

export const bairroSchema = z.object({
    id: z.number(),
    intencao: apitypeResponseEnumSchema
})

export type IAResponse = z.infer<typeof bairroSchema>