import type { LeadData } from './schema'
import { buildWhatsAppUrl } from '@/lib/utils'

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string }

export async function submitLead(data: LeadData): Promise<SubmitResult> {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      return { ok: false, error: body?.error ?? 'Error al enviar la consulta.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Sin conexión. Podés contactarnos por WhatsApp.' }
  }
}

export function buildLeadWhatsApp(data: Partial<LeadData>): string {
  const modelo = data.modelo ?? 'un vehículo'
  const nombreModelo =
    modelo === 'Otro Volkswagen' ? 'un Volkswagen' : `una ${modelo}`

  const lines: string[] = [
    `Hola, quiero cotizar ${nombreModelo} 0km.`,
  ]
  if (data.preferred_color) lines.push(`Color preferido: ${data.preferred_color}`)
  if (data.anticipo_label)   lines.push(`Anticipo: ${data.anticipo_label}`)
  if (data.localidad)        lines.push(`Provincia: ${data.localidad}`)
  if (data.plazo_compra)     lines.push(`Plazo de compra: ${data.plazo_compra}`)
  if (data.tieneUsado)       lines.push('Tengo un usado para entregar en parte de pago.')
  lines.push('')
  lines.push('Quiero validar disponibilidad y bonificación vigente.')

  return buildWhatsAppUrl(lines.join('\n'))
}

export function mapLeadSource(pathname: string, formLocation: string): string {
  if (formLocation) return formLocation
  if (pathname === '/') return 'homepage'
  if (pathname.startsWith('/modelos')) return 'vehicle_page'
  if (pathname === '/cotizador') return 'cotizador_page'
  if (pathname === '/simulador') return 'simulador_page'
  return 'other'
}
