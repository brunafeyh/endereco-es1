import { z } from "zod"

export const tipodeLogradouroSchema = z.object({
    sigla: z.string(),
    nome: z.string()
})

export type TipodeTipodeLogradouro = z.infer<typeof tipodeLogradouroSchema>