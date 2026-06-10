'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MODELOS_COTIZADOR, type ModeloFinanciamiento } from '@/data/financiamiento'
import { formatARS, WHATSAPP_NUMBER } from '@/lib/utils'

const IMGS: Record<string, string> = {
  'amarok-trendline-4x2': '/images/modelos/amarok-trendline.webp',
  'amarok-trendline-4x4': '/images/modelos/amarok-trendline.webp',
  'amarok-v6-comfortline': '/images/modelos/amarok-comfortline.webp',
  'amarok-v6-highline':    '/images/modelos/amarok.webp',
  'amarok-v6-extreme':     '/images/modelos/amarok-v6extreme.webp',
}

export default function AmarokFinanciador() {
  const [sel, setSel] = useState<ModeloFinanciamiento>(
    MODELOS_COTIZADOR.find(m => m.slug === 'amarok-trendline-4x2') ?? MODELOS_COTIZADOR[0]
  )

  const waText = encodeURIComponent(
    `Hola, quiero cotizar un Amarok ${sel.version} 0km. ¿Pueden asesorarme?`
  )

  return (
    <section id="financiador" className="py-10 sm:py-16" style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10">
          <span className="section-eyebrow">Financiación Fábrica Volkswagen</span>
          <h2 className="section-title mb-1">Financiá tu Amarok 0km — Tasa 0% · Bonificación vigente</h2>
          <p className="text-sm" style={{ color: '#64748B' }}>
            Bonificación vigente · Cuotas fijas en pesos · Fábrica Volkswagen · Sujeto a validación comercial
          </p>
        </div>

        {/* Version selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-8 sm:mb-10">
          {MODELOS_COTIZADOR.map((m) => {
            const active = sel.slug === m.slug
            return (
              <button
                key={m.slug}
                onClick={() => setSel(m)}
                className="rounded-xl text-left transition-all duration-200"
                style={{
                  background: active ? 'rgba(245,158,11,.08)' : '#FFFFFF',
                  border: `1.5px solid ${active ? '#F59E0B' : '#E2E8F0'}`,
                  padding: '10px',
                }}
              >
                <div className="w-full rounded-lg overflow-hidden mb-2" style={{ height: '64px', background: '#FFFFFF', padding: '4px' }}>
                  <img
                    src={IMGS[m.slug] ?? '/images/modelos/amarok.webp'}
                    alt={`Amarok ${m.version}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <p
                  className="text-xs font-bold leading-tight mb-0.5"
                  style={{ color: active ? '#F59E0B' : '#0F172A' }}
                >
                  {m.version}
                </p>
                <p className="text-xs" style={{ color: '#64748B' }}>
                  {formatARS(m.ofertaPatentar)}
                </p>
              </button>
            )
          })}
        </div>

        {/* Details */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Imagen + precio */}
          <div>
            <div className="hidden sm:block rounded-2xl overflow-hidden mb-4" style={{ background: '#0F172A', aspectRatio: '16/9' }}>
              <video
                src="/images/fotos/amarok/amarok.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Precio breakdown */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
              <div className="px-4 py-3 flex justify-between items-center" style={{ borderBottom: '1px solid #E2E8F0', background: '#FAFAFA' }}>
                <span className="text-sm" style={{ color: '#64748B' }}>Precio de lista</span>
                <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>{formatARS(sel.precioLista)}</span>
              </div>

              {/* Bono de regalo — animated */}
              <div className="bono-row px-4 flex justify-between items-center" style={{ borderBottom: '1px solid #FDE68A', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, zIndex: 1, position: 'relative' }}>
                  <span style={{ fontSize: '1rem', lineHeight: 1 }}>🎁</span>
                  <div>
                    <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#92400E', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 1 }}>
                      Bono de regalo
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#B45309', fontWeight: 500 }}>Incluido en la oferta</div>
                  </div>
                </div>
                <span className="bono-amount" style={{ fontSize: '1.05rem', fontWeight: 900, color: '#B45309', zIndex: 1, position: 'relative', letterSpacing: '-.01em' }}>
                  − {formatARS(sel.descuento)}
                </span>
                {/* shimmer sweep */}
                <span className="bono-shimmer" aria-hidden />
              </div>

              <div className="px-4 py-4 flex justify-between items-center" style={{ borderBottom: '1px solid #FDE68A', background: 'rgba(245,158,11,.06)' }}>
                <span className="text-sm font-bold" style={{ color: '#0F172A' }}>Oferta para patentar</span>
                <span className="text-lg font-black" style={{ color: '#F59E0B' }}>{formatARS(sel.ofertaPatentar)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between items-center" style={{ background: 'rgba(34,197,94,.07)', borderTop: '1px solid rgba(34,197,94,.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '0.7rem', lineHeight: 1 }}>⚡</span>
                  <span className="text-xs font-bold" style={{ color: '#16A34A', letterSpacing: '.04em', textTransform: 'uppercase' }}>Entrega inmediata</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: '#16A34A' }}>Stock disponible</span>
              </div>
            </div>

            <style>{`
              .bono-row {
                background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 60%, #FFFBEB 100%);
                padding-top: 14px;
                padding-bottom: 14px;
                animation: bono-pulse 3s ease-in-out infinite;
              }
              @keyframes bono-pulse {
                0%, 100% {
                  background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 60%, #FFFBEB 100%);
                  box-shadow: inset 0 0 0 0 rgba(245,158,11,0);
                }
                50% {
                  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 60%, #FEF3C7 100%);
                  box-shadow: inset 0 0 0 1.5px rgba(245,158,11,.4);
                }
              }
              .bono-shimmer {
                position: absolute;
                top: 0; left: -60%;
                width: 50%; height: 100%;
                background: linear-gradient(
                  100deg,
                  transparent 20%,
                  rgba(255,255,255,.55) 50%,
                  transparent 80%
                );
                animation: bono-sweep 3s ease-in-out infinite;
                pointer-events: none;
              }
              @keyframes bono-sweep {
                0%   { left: -60%; opacity: 0; }
                10%  { opacity: 1; }
                50%  { left: 120%; opacity: 1; }
                51%  { opacity: 0; }
                100% { left: 120%; opacity: 0; }
              }
              .bono-amount {
                animation: bono-amount-pop 3s ease-in-out infinite;
              }
              @keyframes bono-amount-pop {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.04); }
              }
            `}</style>

            {/* Motor info */}
            <div className="mt-3 flex gap-2">
              <span className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' }}>
                {sel.motor}
              </span>
              <span className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' }}>
                {sel.transmision}
              </span>
            </div>
          </div>

          {/* Planes */}
          <div className="flex flex-col gap-3">
            {sel.planes.map((plan) => (
              <div
                key={plan.id}
                className="rounded-xl p-4"
                style={{
                  background: plan.destacado ? 'rgba(245,158,11,.07)' : '#FFFFFF',
                  border: `1px solid ${plan.destacado ? '#FCD34D' : '#E2E8F0'}`,
                }}
              >
                {plan.destacado && (
                  <div className="mb-2">
                    <span className="text-xs font-black px-2.5 py-1 rounded" style={{ background: '#F59E0B', color: '#0F172A' }}>
                      ★ Sin gastos de financiación · Tasa 0%
                    </span>
                  </div>
                )}
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs mb-1" style={{ color: '#64748B' }}>
                      {plan.cuotas} cuotas fijas · Cap. máx. {formatARS(plan.capitalMaximo)}
                    </p>
                    <p className="text-2xl font-black leading-none" style={{ color: '#0F172A' }}>
                      {formatARS(plan.montoCuota)}
                      <span className="text-xs font-normal ml-1" style={{ color: '#94A3B8' }}>/mes</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs mb-0.5" style={{ color: '#94A3B8' }}>Anticipo</p>
                    <p className="text-base font-bold" style={{ color: plan.destacado ? '#D97706' : '#0F172A' }}>
                      {formatARS(plan.anticipo)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="mt-2 flex flex-col gap-2.5">
              <Link
                href={`/cotizador/${sel.slug}`}
                className="btn-amber btn-amber-lg justify-center w-full"
              >
                Cotizar Amarok {sel.version}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white btn-amber-lg justify-center w-full"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
