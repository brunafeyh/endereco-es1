import { z } from "zod"

export const neighborhoodSchema = z.object({
    id: z.number(),
    nome: z.string()
})

export type NeighborhoodType = z.infer<typeof neighborhoodSchema>