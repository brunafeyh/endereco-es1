import { z } from "zod"
import { enderecoSchema } from "./endereco"
import { telefoneSchema } from "./telefone"

export const enderecoEspecificoSchema = z.object({
    numero: z.string(),
    complemento: z.string(),
    endereco: enderecoSchema
})

export const cpfSchema = z.object({
    cpf: z.string(),
})

export const crmSchema = z.object({
    crm: z.string(),
})

export const sexoSchema = z.object({
    sigla: z.string(),
    nome: z.string()
})

export type Sexo = z.infer<typeof sexoSchema>


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

export const pacientSchema = z.object({
    sexo: sexoSchema,
    cpf: cpfSchema,
    id: z.number(),
    nome: z.string(),
    emails: z.array(emailSchema),
});

export type Paciente = z.infer<typeof pacientSchema>;

export const medicoSchema = z.object({
    id: z.number(),
    nome: z.string(),
    cpf: cpfSchema,
    crm: crmSchema,
    enderecoEspecifico: enderecoEspecificoSchema,
    sexo: sexoSchema,
    telefones: z.array(telefoneSchema),
    emails: z.array(emailSchema)
})

export type Medico = z.infer<typeof medicoSchema>