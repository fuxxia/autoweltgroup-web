import type { LeadData } from './schema'
import { buildWhatsAppUrl } from '@/lib/utils'

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string }

/**
 * Envía el lead al Route Handler /api/leads.
 * Fallback automático si la red falla: retorna ok:false para que
 * el UI muestre el botón de WhatsApp como continuidad comercial.
 */
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

/**
 * Construye la URL de WhatsApp con el resumen del lead.
 * Se usa como fallback inmediato en el success state y como
 * continuidad comercial si el submit falla.
 */
export function buildLeadWhatsApp(data: Partial<LeadData>): string {
  const tipo =
    data.tipoCompra === '0km'          ? '0km' :
    data.tipoCompra === 'adjudicado'   ? 'adjudicado' :
    data.tipoCompra === 'financiacion' ? 'con financiación' :
    'consulta'

  const lineaModelo = data.modelo ? `un ${data.modelo} ${tipo}` : tipo
  const lineaUsado  = data.tieneUsado ? ' Tengo un usado para dar en parte de pago.' : ''
  const lineaLocal  = data.localidad  ? ` Soy de ${data.localidad}.` : ''
  const lineaCanal  = data.canalPreferido === 'email' ? ' Prefiero respuesta por email.' : ''

  const msg = `Hola, soy ${data.nombre ?? 'un interesado'}. Quiero cotizar ${lineaModelo}.${lineaUsado}${lineaLocal}${lineaCanal}`
  return buildWhatsAppUrl(msg)
}

/**
 * Mapea la fuente del lead según el contexto de la página.
 */
export function mapLeadSource(pathname: string, formLocation: string): string {
  if (formLocation) return formLocation
  if (pathname === '/') return 'homepage'
  if (pathname.startsWith('/modelos')) return 'vehicle_page'
  if (pathname === '/cotizador') return 'cotizador_page'
  if (pathname === '/simulador') return 'simulador_page'
  return 'other'
}
