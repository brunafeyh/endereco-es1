import { z } from "zod";
import { cpfSchema, crmSchema, emailSchema, sexoSchema } from "./paciente";

export const medicoSchema = z.object({
  crm: crmSchema,
  sexo: sexoSchema,
  cpf: cpfSchema,
  id: z.number(),
  nome: z.string(),
  emails: z.array(emailSchema),
});

export type Medico = z.infer<typeof medicoSchema>;
