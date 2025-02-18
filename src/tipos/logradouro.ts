import { z } from "zod"
import { tipodeLogradouroSchema } from "./tipodelogradouro"

export const logradouroSchema = z.object({
   id: z.number(),
   nome: z.string(),
   tipoLogradouro: tipodeLogradouroSchema
})

export type TipodeTipodeLogradouro = z.infer<typeof tipodeLogradouroSchema>