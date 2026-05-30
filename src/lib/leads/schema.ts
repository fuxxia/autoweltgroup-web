import { z } from 'zod'

export const LeadSchema = z.object({
  nombre: z
    .string({ required_error: 'Ingresá tu nombre.' })
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(100),

  telefono: z
    .string({ required_error: 'Ingresá tu WhatsApp.' })
    .min(8, 'Ingresá un teléfono válido.')
    .max(25)
    .regex(/^[0-9\s\-\+\(\)]+$/, 'Solo números, espacios y guiones.'),

  email: z
    .string({ required_error: 'Ingresá tu email.' })
    .email('Email inválido.'),

  localidad: z
    .string({ required_error: 'Ingresá tu ciudad o provincia.' })
    .min(2, 'Ingresá una localidad válida.')
    .max(100),

  tipoCompra: z.enum(['0km', 'adjudicado', 'financiacion'], {
    required_error: 'Seleccioná un tipo de compra.',
  }),

  modelo: z
    .string({ required_error: 'Seleccioná un modelo.' })
    .min(1, 'Seleccioná un modelo.')
    .max(60),

  tieneUsado: z.boolean().optional(),

  anticipoAprox: z.enum(['ninguno', '20-30%', '50%+']).optional(),

  canalPreferido: z.enum(['whatsapp', 'email', 'ambos']).default('whatsapp'),

  source: z.string().optional(),
})

export type LeadData = z.infer<typeof LeadSchema>

export type LeadFieldErrors = Partial<Record<keyof LeadData, string>>

export function mapZodErrors(errors: z.ZodError<LeadData>): LeadFieldErrors {
  const flat = errors.flatten()
  const result: LeadFieldErrors = {}
  for (const [key, msgs] of Object.entries(flat.fieldErrors)) {
    if (msgs && msgs.length > 0) {
      result[key as keyof LeadData] = msgs[0]
    }
  }
  return result
}
