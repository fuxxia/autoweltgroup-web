import { NextRequest, NextResponse } from 'next/server'
import { LeadSchema } from '@/lib/leads/schema'

/**
 * Adapter de webhook — desacoplado del flujo principal.
 *
 * Configuración:
 *   LEADS_WEBHOOK_URL=https://... → dispara POST al webhook (n8n, Zapier, Make, CRM)
 *   LEADS_WEBHOOK_SECRET=...     → agrega Authorization header
 *
 * Si LEADS_WEBHOOK_URL no está definida:
 *   - En desarrollo: loguea el lead en consola
 *   - En producción: el lead se descarta pero el UX continúa (WhatsApp fallback)
 *
 * Payload enviado al webhook:
 * {
 *   nombre, telefono, email, localidad,
 *   tipoCompra, modelo, tieneUsado, anticipoAprox, canalPreferido,
 *   source, timestamp, metadata: { ip, userAgent }
 * }
 */
async function dispatchToWebhook(payload: Record<string, unknown>): Promise<void> {
  const url    = process.env.LEADS_WEBHOOK_URL
  const secret = process.env.LEADS_WEBHOOK_SECRET

  if (!url) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('\n[AUTOWELT LEAD]', JSON.stringify(payload, null, 2))
    }
    return
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (secret) headers['Authorization'] = `Bearer ${secret}`

  await fetch(url, { method: 'POST', headers, body: JSON.stringify(payload) })
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body   = await req.json()
    const result = LeadSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: result.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { data } = result

    await dispatchToWebhook({
      ...data,
      timestamp: new Date().toISOString(),
      metadata: {
        ip:        req.headers.get('x-forwarded-for') ?? 'unknown',
        userAgent: req.headers.get('user-agent')      ?? 'unknown',
        referer:   req.headers.get('referer')         ?? 'unknown',
      },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[LEADS API]', err)
    return NextResponse.json({ ok: false, error: 'Error interno.' }, { status: 500 })
  }
}
