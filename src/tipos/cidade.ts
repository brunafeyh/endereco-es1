import { z } from "zod"
import { unidadeFederativaSchema } from "./unidade-federativa"

export const cidadeSchema = z.object({
  id: z.number(),
  nome: z.string(),
  unidadeFederativa: unidadeFederativaSchema
})

export type UnidadeFedrativaTipo = z.infer<typeof cidadeSchema>