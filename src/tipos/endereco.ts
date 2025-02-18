import { z } from "zod"
import { cidadeSchema } from "./cidade"
import { logradouroSchema } from "./logradouro"
import { bairroSchema } from "./bairro"

export const enderecoSchema = z.object({
    id: z.number(),
    cep: z.string(),
    cidade: cidadeSchema,
    logradouro: logradouroSchema,
    bairro: bairroSchema
})

export type EnderecoTipo = z.infer<typeof enderecoSchema>