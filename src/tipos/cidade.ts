import { z } from "zod"
import { unidadeFederativaSchema } from "./unidade-federativa"

export const cidadeSchema = z.object({
  id: z.number(),
  nome: z.string(),
  unidadeFederativa: unidadeFederativaSchema
})

export type CidadeTipo = z.infer<typeof cidadeSchema>