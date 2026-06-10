import type { Metadata } from 'next'
import Link from 'next/link'
import { WHATSAPP_NUMBER } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Tomamos tu usado como parte de pago',
  description: 'Entregá tu usado como parte de pago de tu Volkswagen 0km. Valuación orientativa antes de viajar, toma sujeta a evaluación. Atención para Buenos Aires y todo el interior del país.',
  alternates: { canonical: '/simulador' },
}

const WA_TEXT = encodeURIComponent(
  'Hola, tengo un usado para entregar como parte de pago de un 0km. Quiero saber cuánto me lo toman.\n\nMarca y modelo del usado: \nAño: \nKilometraje: \nModelo 0km que me interesa: '
)

const PASOS = [
  {
    num: '01',
    title: 'Contanos qué usado tenés',
    desc: 'Marca, modelo, año y kilometraje. Con eso un asesor te da una valuación orientativa por WhatsApp, sin que tengas que moverte.',
  },
  {
    num: '02',
    title: 'Recibís la valuación orientativa',
    desc: 'Te decimos cuánto podemos tomar tu usado como parte de pago del 0km que te interesa, junto con el resto de la operación: anticipo, bonificación y cuotas fijas.',
  },
  {
    num: '03',
    title: 'Confirmamos en la inspección',
    desc: 'La toma se confirma con una revisión técnica y la documentación del vehículo. Si sos del interior, lo coordinamos para el mismo día del retiro de tu 0km.',
  },
]

const CONDICIONES = [
  'Documentación completa y al día',
  'Sin deudas de patentes ni prendas pendientes',
  'Estado general acorde al año y kilometraje',
  'Verificación técnica al momento de la operación',
]

export default function TomamosTuUsadoPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="eyebrow">Parte de pago</span>
          <h1 className="section-title section-title-light" style={{ marginBottom: '0.75rem' }}>
            Tomamos tu usado
          </h1>
          <div className="divider divider-center" style={{ marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
            Entregá tu usado como parte de pago de tu 0km y bajá el anticipo.
            Valuación orientativa antes de viajar, confirmación en la inspección.
          </p>
        </div>

        {/* Pasos */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '4rem' }}>
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

        {/* Condiciones */}
        <div className="glass-card" style={{ padding: '1.75rem 2rem', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem', letterSpacing: '-0.015em' }}>
            Condiciones para la toma del usado
          </h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {CONDICIONES.map((c) => (
              <li key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9063rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" width="15" height="15" style={{ flexShrink: 0, marginTop: 3 }} aria-hidden="true">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                {c}
              </li>
            ))}
          </ul>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '1rem', lineHeight: 1.5 }}>
            Toma de usado sujeta a evaluación técnica y documentación. Valores orientativos hasta la confirmación comercial.
          </p>
        </div>

        {/* CTA */}
        <div className="glass-card glass-card-gold text-center" style={{ padding: '2.5rem 2rem' }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', marginBottom: '0.625rem', fontFamily: 'var(--font-jakarta), sans-serif' }}>
            Pedí la valuación de tu usado
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 440, margin: '0 auto 1.5rem' }}>
            Respondemos en el día con una valuación orientativa y la propuesta completa para tu 0km.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_TEXT}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-gold btn-gold-lg"
            >
              Valuar mi usado por WhatsApp
            </a>
            <Link href="/#cotizador" className="btn btn-ghost-light btn-gold-lg">
              Cotizar mi 0km
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
