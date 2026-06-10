import type { Metadata } from 'next'
import Link from 'next/link'
import { WHATSAPP_NUMBER } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Cómo funciona la compra de tu 0km',
  description: 'Proceso claro para comprar tu Volkswagen 0km desde Buenos Aires: cotizás, validamos disponibilidad y financiación, coordinamos la entrega. Sin sorpresas, con todo confirmado antes de avanzar.',
  alternates: { canonical: '/como-funciona' },
}

const WA_TEXT = encodeURIComponent(
  'Hola, quiero entender cómo es el proceso de compra de un 0km desde Buenos Aires. ¿Me pueden asesorar?'
)

const PASOS = [
  {
    num: '01',
    title: 'Cotizás tu 0km',
    desc: 'Elegís modelo, anticipo y plazo de compra en el cotizador. En minutos tenés una propuesta orientativa con bonificación vigente y opciones de cuotas fijas.',
  },
  {
    num: '02',
    title: 'Validamos la operación',
    desc: 'Un asesor confirma disponibilidad real, color, versión, bonificación y condiciones de financiación vigentes con la red de concesionarias oficiales. Nada se promete sin verificar.',
  },
  {
    num: '03',
    title: 'Definimos anticipo y financiación',
    desc: 'Armamos la operación según tu situación: anticipo, cuotas fijas y, si corresponde, tu usado como parte de pago (sujeto a evaluación). Te mostramos números claros antes de decidir.',
  },
  {
    num: '04',
    title: 'Coordinamos la entrega',
    desc: 'Si sos del interior, organizamos todo antes de que viajes: documentación, fecha y punto de retiro en Buenos Aires. Viajás con la operación revisada, no a probar suerte.',
  },
  {
    num: '05',
    title: 'Retirás tu 0km',
    desc: 'Retirás tu vehículo patentado y volvés manejando. Te acompañamos hasta la entrega y quedamos disponibles para lo que necesites después.',
  },
]

const FAQS = [
  {
    q: '¿Venden planes de ahorro?',
    a: 'No. Trabajamos venta convencional de vehículos 0km: anticipo + cuotas fijas o pago contado, con entrega inmediata sujeta a disponibilidad. Sin sorteos ni licitaciones.',
  },
  {
    q: '¿Toman mi usado como parte de pago?',
    a: 'Sí, si cumple condiciones. La toma está sujeta a evaluación técnica y documentación. Te damos una valuación orientativa antes de que viajes.',
  },
  {
    q: 'Soy del interior, ¿cómo retiro el vehículo?',
    a: 'Coordinamos el retiro en Buenos Aires con todo confirmado antes de tu viaje: precio, disponibilidad, documentación y financiación. La mayoría de nuestros clientes vuelve manejando el mismo día o al día siguiente.',
  },
  {
    q: '¿La entrega inmediata está garantizada?',
    a: 'La entrega inmediata está sujeta a disponibilidad de stock y se confirma antes de avanzar con la operación. Por eso validamos todo primero: para que no haya sorpresas.',
  },
]

export default function ComoFuncionaPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="eyebrow">Proceso claro, sin sorpresas</span>
          <h1 className="section-title section-title-light" style={{ marginBottom: '0.75rem' }}>
            Cómo funciona la compra de tu 0km
          </h1>
          <div className="divider divider-center" style={{ marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
            Venta convencional de vehículos 0km con entrega inmediata, financiación vigente
            y validación humana antes de cada paso.
          </p>
        </div>

        {/* Pasos */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PASOS.map((p) => (
            <div key={p.num} className="interior-item">
              <span style={{ fontSize: '3.5rem', fontWeight: 900, color: 'rgba(217,162,58,.16)', lineHeight: 1, letterSpacing: '-0.06em', minWidth: '4rem', fontFamily: 'var(--font-jakarta), sans-serif', fontVariantNumeric: 'tabular-nums' }}>
                {p.num}
              </span>
              <div style={{ paddingTop: '0.5rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{p.title}</h2>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ marginTop: '5rem' }}>
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2 className="section-title section-title-light" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
            Lo que más nos consultan
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQS.map((f) => (
              <div key={f.q} className="glass-card" style={{ padding: '1.5rem 1.75rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '-0.015em' }}>{f.q}</h3>
                <p style={{ fontSize: '0.9063rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="glass-card glass-card-gold text-center" style={{ marginTop: '4rem', padding: '2.5rem 2rem' }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', marginBottom: '0.625rem', fontFamily: 'var(--font-jakarta), sans-serif' }}>
            ¿Listo para empezar?
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 440, margin: '0 auto 1.5rem' }}>
            Cotizá tu 0km en menos de un minuto o hablá directo con un asesor.
            Valores sujetos a disponibilidad y validación comercial.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/#cotizador" className="btn btn-gold btn-gold-lg">
              Cotizar ahora
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_TEXT}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost-light btn-gold-lg"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
