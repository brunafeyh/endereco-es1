import { z } from "zod"
import { enderecoSchema } from "./endereco"

export const enderecoEspecificoSchema = z.object({
    numero: z.string(),
    complemento: z.string(),
    endereco: enderecoSchema
})

export const cpfSchema = z.object({
    cpf: z.string(),
})

export const sexoSchema = z.object({
    sigla: z.string(),
    nome: z.string()
})

export type Sexo = z.infer<typeof sexoSchema>

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

export const emailSchema = z.object({
    email: z.string()
})

export const pacienteSchema = z.object({
    id: z.number(),
    nome: z.string(),
    cpf: cpfSchema,
    enderecoEspecifico: enderecoEspecificoSchema,
    sexo: sexoSchema,
    telefones: z.array(telefoneSchema),
    emails: z.array(emailSchema)
})

export type PacienteTipo = z.infer<typeof pacienteSchema>