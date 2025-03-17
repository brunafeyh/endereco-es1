import { z } from "zod"

export const dddSchema = z.object({
    numeroDDD: z.coerce.number()
})

export type DDD = z.infer<typeof dddSchema>

export const ddiSchema = z.object({
    numeroDDI: z.coerce.number()
})

export type DDI = z.infer<typeof ddiSchema>

export const telefoneSchema = z.object({
    numero: z.string(),
    ddd: dddSchema,
    ddi:ddiSchema
})