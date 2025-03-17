import { z } from "zod";

export const cidSchema = z.object({
    codigo: z.string(),
    descricao: z.string()
})

export type CID = z.infer<typeof cidSchema>