import { z } from 'zod'

export const LeadSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(100),

  telefono: z
    .string()
    .min(8, 'Ingresá un teléfono válido.')
    .max(25)
    .regex(/^[0-9\s\-\+\(\)]+$/, 'Solo números, espacios y guiones.'),

  email: z.string().email('Email inválido.').optional().or(z.literal('')),

  localidad: z
    .string()
    .min(2, 'Ingresá una localidad válida.')
    .max(100),

  tipoCompra: z.enum(['0km', 'adjudicado', 'financiacion']),

  modelo: z
    .string()
    .min(1, 'Seleccioná un modelo.')
    .max(60),

  tieneUsado: z.boolean().optional(),

  anticipoAprox: z.enum(['ninguno', '20-30%', '50%+']).optional(),

  canalPreferido: z.enum(['whatsapp', 'email', 'ambos']).default('whatsapp'),

  source: z.string().optional(),

  // Campos de conversión enriquecida
  preferred_color: z.string().optional(),
  plazo_compra:    z.string().optional(),
  anticipo_label:  z.string().optional(),
  lead_score:      z.number().optional(),
  lead_temperature: z.enum(['HOT', 'WARM', 'COLD']).optional(),
})

export type LeadData = z.infer<typeof LeadSchema>

export type LeadFieldErrors = Partial<Record<keyof LeadData, string>>

export function mapZodErrors(errors: z.ZodError): LeadFieldErrors {
  const flat = errors.flatten()
  const result: LeadFieldErrors = {}
  for (const [key, msgs] of Object.entries(flat.fieldErrors)) {
    const arr = msgs as string[] | undefined
    if (arr && arr.length > 0) {
      result[key as keyof LeadData] = arr[0]
    }
  }
  return result
}
