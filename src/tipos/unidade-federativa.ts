import { z } from "zod"

export const unidadeFederativaSchema = z.object({
   sigla: z.string(),
   nome: z.string()
})

export type UnidadeFedrativaTipo = z.infer<typeof unidadeFederativaSchema>