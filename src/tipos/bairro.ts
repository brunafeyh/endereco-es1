import { z } from "zod"

export const bairroSchema = z.object({
    id: z.number(),
    nome: z.string()
})

export type BairroType = z.infer<typeof bairroSchema>