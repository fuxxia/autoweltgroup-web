import Link from 'next/link'
import { Adjudicado } from '@/data/adjudicados'
import { formatARS } from '@/lib/utils'

export default function AdjudicadoCard({ adjudicado: a }: { adjudicado: Adjudicado }) {
  const cuotasRestantes = a.cuotasTotal - a.cuotasPagas
  const porcentajePagado = Math.round((a.cuotasPagas / a.cuotasTotal) * 100)
  const ahorroEstimado = a.valorUnidad - a.precioCesion - (cuotasRestantes * a.cuotaMensual)

  return (
    <Link href={`/catalogo/${a.slug}`} className="car-card block group">

      {/* Imagen */}
      <div className="relative overflow-hidden" style={{ height: '180px', background: '#F1F5F9' }}>
        <img
          src={a.fotos[0]}
          alt={`${a.marca} ${a.modelo}`}
          className="w-full h-full object-cover group-hover:scale-105"
          style={{ transition: 'transform .4s ease' }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <img
            src="/images/autos/Volkswagen_logo_2019.svg.png"
            alt={a.marca}
            style={{ width: '30px', height: '30px', objectFit: 'contain', filter: 'brightness(0) invert(1) drop-shadow(0 1px 3px rgba(0,0,0,.5))' }}
          />
          <span className="tag"
            style={{ background: 'rgba(15,23,42,.7)', color: '#F59E0B', border: '1px solid rgba(245,158,11,.25)', backdropFilter: 'blur(6px)' }}>
            {porcentajePagado}% pagado
          </span>
        </div>
        {!a.disponible && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-sm">No disponible</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="car-card-body">

        {/* Nombre */}
        <div className="mb-3">
          <h3 className="font-bold text-base leading-snug" style={{ color: '#0F172A', letterSpacing: '-.01em' }}>
            {a.modelo}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{a.version}</p>
        </div>

        {/* Spec strip */}
        <div className="spec-strip mb-3">
          <div className="spec-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" width="13" height="13">
              <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            <strong>{a.cuotasPagas}</strong>
            <span>pagas</span>
          </div>
          <div className="spec-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" width="13" height="13">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            <strong>{a.cuotasTotal}</strong>
            <span>total</span>
          </div>
          <div className="spec-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" width="13" height="13">
              <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z"/><path d="M12 6v6l4 2"/>
            </svg>
            <strong>{cuotasRestantes}</strong>
            <span>rest.</span>
          </div>
          <div className="spec-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" width="13" height="13">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
            </svg>
            <strong style={{ fontSize: '.65rem' }}>{(a.cuotaMensual / 1000).toFixed(0)}k</strong>
            <span>/mes</span>
          </div>
        </div>

        {/* Progress */}
        <div className="prog-bar mb-4">
          <div className="prog-fill" style={{ width: `${porcentajePagado}%` }} />
        </div>

        {/* Price + CTA */}
        <div className="mt-auto pt-3" style={{ borderTop: '1px solid #F1F5F9' }}>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-xs mb-0.5" style={{ color: '#94A3B8' }}>Precio de cesión</p>
              <p className="text-xl font-black mono" style={{ color: '#0F172A', letterSpacing: '-.02em' }}>
                {formatARS(a.precioCesion)}
              </p>
              {ahorroEstimado > 0 && (
                <p className="text-xs font-semibold mt-0.5" style={{ color: '#059669' }}>
                  ↓ ahorrás {formatARS(ahorroEstimado)}
                </p>
              )}
            </div>
          </div>

          <span className="btn-amber w-full justify-center">
            Ver detalle
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>

      </div>
    </Link>
  )
}
