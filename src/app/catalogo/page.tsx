import type { Metadata } from 'next'
import { VW_MODELS } from '@/data/volkswagen'
import VehicleCard from '@/components/vehicles/VehicleCard'
import AnimatedSection from '@/components/marketing/AnimatedSection'
import { WHATSAPP_NUMBER } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Catálogo Volkswagen 0km',
  description: 'Catálogo de vehículos Volkswagen 0km: Amarok, Taos, Nivus, Polo y Tera. Venta convencional con entrega inmediata, cuotas fijas y retiro coordinado en Buenos Aires.',
  alternates: { canonical: '/catalogo' },
}

const WA_TEXT = encodeURIComponent(
  'Hola, estoy mirando el catálogo 0km y quiero consultar por un modelo que no encuentro.'
)

export default function CatalogoPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6 py-20">

        <div className="mb-12">
          <span className="eyebrow">Volkswagen · Línea completa</span>
          <h1 className="section-title section-title-light" style={{ marginBottom: '0.5rem' }}>
            Catálogo 0km
          </h1>
          <div className="divider" style={{ marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 560 }}>
            Vehículos 0km con entrega inmediata sujeta a disponibilidad, cuotas fijas
            y retiro coordinado en Buenos Aires. Atendemos todo el país.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: '1200px' }}>
          {VW_MODELS.map((model, i) => (
            <AnimatedSection key={model.id} delay={i * 0.06}>
              <VehicleCard model={model} />
            </AnimatedSection>
          ))}
        </div>

        <div className="glass-card text-center" style={{ marginTop: '3rem', padding: '2rem' }}>
          <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.375rem' }}>
            ¿Buscás otro modelo o marca?
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Trabajamos con una red de concesionarias oficiales. Consultanos y lo buscamos por vos.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_TEXT}`}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-gold"
          >
            Consultar por WhatsApp
          </a>
        </div>

      </div>
    </div>
  )
}
