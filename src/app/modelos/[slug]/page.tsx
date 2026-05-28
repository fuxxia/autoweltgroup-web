import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { VW_MODELS } from '@/data/volkswagen'
import { WHATSAPP_NUMBER } from '@/lib/utils'
import AmarokFinanciador from '@/components/AmarokFinanciador'
import HeroImageSlider from '@/components/HeroImageSlider'

export function generateStaticParams() {
  return VW_MODELS.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const model = VW_MODELS.find((m) => m.slug === slug)
  if (!model) return {}

  if (slug === 'amarok') {
    return {
      title: 'Volkswagen Amarok 0km | Precio y Financiación Argentina | Autos Welt',
      description: 'Comprá tu Amarok 0km con Financiación Fábrica Volkswagen. Cuotas fijas en pesos, tasa 0%, entrega inmediata. Descuento de hasta $19.200.000. ¡Consultá ahora!',
      keywords: [
        'amarok 0km', 'volkswagen amarok precio', 'amarok nueva precio argentina',
        'comprar amarok 0km', 'amarok financiada', 'amarok con financiacion',
        'amarok cuotas fijas', 'amarok entrega inmediata', 'amarok concesionario',
        'amarok financiacion argentina', 'amarok anticipo minimo', 'amarok financiacion directa',
        'amarok cuotas sin interes', 'financiar amarok 0km', 'amarok plan sin interes',
        'amarok cuotas en pesos', 'amarok financiacion fabrica volkswagen', 'amarok entrega con anticipo',
        'comprar amarok hoy', 'amarok en stock', 'amarok entrega inmediata argentina',
        'mejor precio amarok', 'oferta amarok 0km', 'amarok disponible ahora',
        'amarok precio con anticipo argentina', 'amarok financiacion sin interes argentina',
        'comprar amarok en cuotas argentina', 'amarok v6 comfortline precio',
        'amarok buenos aires', 'amarok capital federal', 'amarok concesionario caba',
      ],
      openGraph: {
        title: 'Amarok 0km — Financiación Fábrica Volkswagen Tasa 0% | Autos Welt',
        description: 'Amarok V6 con descuento de $19.200.000. Cuotas fijas en pesos, sin intereses. Entrega inmediata.',
        siteName: 'Autos Welt',
        type: 'website',
      },
    }
  }

  return {
    title: `Volkswagen ${model.nombre} 0km — Precio y Financiación | Autos Welt`,
    description: `${model.descripcion} Financiación Fábrica Volkswagen. Cuotas fijas en pesos, entrega inmediata.`,
    openGraph: {
      title: `VW ${model.nombre} 0km | Autos Welt`,
      description: model.descripcion,
      siteName: 'Autos Welt',
    },
  }
}

export default async function ModeloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const model = VW_MODELS.find((m) => m.slug === slug)
  if (!model) notFound()

  const isAmarok = slug === 'amarok'
  const waText = encodeURIComponent(`Hola, quiero cotizar un Volkswagen ${model.nombre} 0km. ¿Pueden asesorarme?`)
  const heroImg = model.imagenes[0] ?? null

  const amarokJsonLd = isAmarok ? {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: 'Volkswagen Amarok V6 0km',
    description: 'Volkswagen Amarok V6 TDI 0km. Pickup premium con motor V6, financiación oficial VW Financial Services a tasa 0%, cuotas fijas en pesos. Entrega inmediata en Buenos Aires.',
    brand: { '@type': 'Brand', name: 'Volkswagen' },
    model: 'Amarok',
    vehicleEngine: { '@type': 'EngineSpecification', name: 'V6 TDI 258CV' },
    driveWheelConfiguration: '4WD',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'ARS',
      lowPrice: '60000000',
      highPrice: '73900000',
      offerCount: '5',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'AutoDealer',
        name: 'Autos Welt',
        url: 'https://autoweltgroup.com.ar',
        address: { '@type': 'PostalAddress', addressCountry: 'AR', addressRegion: 'Buenos Aires' },
      },
    },
  } : null

  const amarokSliderImages = [
    '/images/modelos/slider/amarok1.png',
    '/images/modelos/slider/amarok2.png',
    '/images/modelos/slider/amarok3.png',
  ]

  const TRUST_ITEMS = [
    { icon: '⚡', label: 'Entrega inmediata' },
    { icon: '0%', label: 'Tasa 0% sin intereses', highlight: true },
    { icon: '₿', label: 'Cuotas fijas en pesos' },
    { icon: '🏦', label: 'Financiación Fábrica VW' },
  ]

  return (
    <>
      {amarokJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(amarokJsonLd) }}
        />
      )}
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: '#0F172A', minHeight: '70vh' }}>
        {heroImg ? (
          <div className="absolute inset-0">
            <img
              src={heroImg}
              alt={isAmarok ? 'Volkswagen Amarok V6 0km — Pickup premium Argentina' : `VW ${model.nombre}`}
              className="w-full h-full object-cover"
              style={{ opacity: 0.35 }}
              fetchPriority="high"
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to right, rgba(15,23,42,.95) 40%, rgba(15,23,42,.4) 100%)',
            }} />
          </div>
        ) : model.video ? (
          <div className="absolute inset-0">
            <video src={model.video} autoPlay muted loop playsInline className="w-full h-full object-cover" style={{ opacity: 0.3 }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,23,42,.95) 40%, rgba(15,23,42,.5) 100%)' }} />
          </div>
        ) : null}

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28 flex items-center" style={{ minHeight: '70vh' }}>
          {isAmarok ? (
            <div className="w-full grid lg:grid-cols-2 gap-10 items-center">
              {/* Left: text */}
              <div>
                <div className="flex items-center gap-2 text-xs mb-6" style={{ color: '#475569' }}>
                  <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                  <span>›</span>
                  <Link href="/#modelos" className="hover:text-white transition-colors">Modelos</Link>
                  <span>›</span>
                  <span style={{ color: '#94A3B8' }}>{model.nombre}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded"
                    style={{ background: 'rgba(245,158,11,.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,.3)', letterSpacing: '.1em' }}>
                    VOLKSWAGEN
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded"
                    style={{ background: 'rgba(255,255,255,.06)', color: '#94A3B8', border: '1px solid rgba(255,255,255,.1)' }}>
                    {model.tipo}
                  </span>
                  {model.badge && (
                    <span className="text-xs font-black px-2.5 py-1 rounded" style={{ background: '#F59E0B', color: '#0F172A' }}>
                      {model.badge}
                    </span>
                  )}
                  <span className="text-xs font-bold px-2.5 py-1 rounded"
                    style={{ background: 'rgba(34,197,94,.15)', color: '#22C55E', border: '1px solid rgba(34,197,94,.3)' }}>
                    Entrega inmediata
                  </span>
                </div>
                <h1 className="font-black text-white leading-none mb-4" style={{ fontSize: 'clamp(2.5rem, 10vw, 4.5rem)', letterSpacing: '-.03em' }}>
                  Volkswagen Amarok V6 0km
                </h1>
                <p className="text-lg mb-3" style={{ color: '#F59E0B', fontWeight: 600 }}>{model.tagline}</p>
                <p className="mb-8 leading-relaxed" style={{ color: '#64748B', fontSize: '.95rem' }}>{model.descripcion}</p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <a href="#financiador" className="btn-amber btn-amber-lg justify-center">Cotizá tu Amarok 0km</a>
                </div>
              </div>

              {/* Right: image slider */}
              <div className="hidden lg:block" style={{ height: '420px', background: 'transparent' }}>
                <HeroImageSlider
                  imagenes={amarokSliderImages}
                  nombre={model.nombre}
                  alts={[
                    'Volkswagen Amarok V6 0km precio Argentina',
                    'Amarok V6 Extreme 0km financiación Fábrica VW',
                    'Amarok 4x4 0km entrega inmediata Buenos Aires',
                  ]}
                />
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: '560px' }}>
              <div className="flex items-center gap-2 text-xs mb-6" style={{ color: '#475569' }}>
                <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                <span>›</span>
                <Link href="/#modelos" className="hover:text-white transition-colors">Modelos</Link>
                <span>›</span>
                <span style={{ color: '#94A3B8' }}>{model.nombre}</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded"
                  style={{ background: 'rgba(245,158,11,.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,.3)', letterSpacing: '.1em' }}>
                  VOLKSWAGEN
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded"
                  style={{ background: 'rgba(255,255,255,.06)', color: '#94A3B8', border: '1px solid rgba(255,255,255,.1)' }}>
                  {model.tipo}
                </span>
                {model.badge && (
                  <span className="text-xs font-black px-2.5 py-1 rounded" style={{ background: '#F59E0B', color: '#0F172A' }}>
                    {model.badge}
                  </span>
                )}
                {model.nuevo && (
                  <span className="text-xs font-black px-2.5 py-1 rounded"
                    style={{ background: 'rgba(34,197,94,.15)', color: '#22C55E', border: '1px solid rgba(34,197,94,.3)' }}>
                    NUEVO
                  </span>
                )}
              </div>

              <h1 className="font-black text-white leading-none mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', letterSpacing: '-.03em' }}>
                {model.nombre}
              </h1>
              <p className="text-lg mb-3" style={{ color: '#F59E0B', fontWeight: 600 }}>{model.tagline}</p>
              <p className="mb-8 leading-relaxed" style={{ color: '#64748B', fontSize: '.95rem' }}>{model.descripcion}</p>

              <div className="flex flex-wrap gap-3">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`} target="_blank" rel="noopener noreferrer" className="btn-amber btn-amber-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Cotizar por WhatsApp
                </a>
                <Link href="/simulador" className="btn-outline-white btn-amber-lg">Simular cuota</Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── TRUST BAR (keywords SEO + Quality Score) ── */}
      {isAmarok && (
        <div style={{ background: '#1E293B', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap justify-center sm:justify-between gap-x-6 gap-y-2">
            {TRUST_ITEMS.map((item) => (
              <span key={item.label} className="flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap"
                style={{ color: item.highlight ? '#F59E0B' : '#94A3B8' }}>
                <span style={{ fontSize: '0.7rem' }}>{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── VIDEO MOBILE ONLY (encima del financiador) ── */}
      {isAmarok && (
        <div className="block sm:hidden" style={{ background: '#0F172A' }}>
          <video
            src="/images/fotos/amarok/amarok.mp4"
            autoPlay muted loop playsInline
            className="w-full"
            style={{ aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}

      {/* ── FINANCIAMIENTO AMAROK (arriba, fondo claro) ── */}
      {isAmarok && <AmarokFinanciador />}

      {/* ── VERSIONES (solo modelos que no son Amarok) ── */}
      {!isAmarok && (
        <section className="py-10 sm:py-14" style={{ background: '#FFFFFF' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl">
              <span className="section-eyebrow">Versiones disponibles</span>
              <h2 className="section-title mb-4 sm:mb-6">
                {model.versiones.length} versiones del {model.nombre}
              </h2>
              <div className="space-y-2">
                {model.versiones.map((v, i) => (
                  <div key={v.nombre} className="px-3 py-3 sm:p-4 rounded-lg" style={{
                    border: '1px solid #E2E8F0',
                    background: i === 0 ? '#FAFAFA' : '#fff',
                  }}>
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <p className="font-bold text-sm" style={{ color: '#0F172A' }}>{v.nombre}</p>
                      <div className="flex gap-1.5 shrink-0">
                        {i === 0 && <span className="tag tag-amber">Base</span>}
                        {i === model.versiones.length - 1 && model.versiones.length > 1 && (
                          <span className="tag tag-blue">Full</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span className="text-xs flex items-center gap-1" style={{ color: '#64748B' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" width="11" height="11">
                          <path d="M12 2a3 3 0 013 3v4a3 3 0 01-6 0V5a3 3 0 013-3z"/><path d="M19 10a7 7 0 01-14 0"/>
                          <line x1="12" y1="17" x2="12" y2="22"/>
                        </svg>
                        {v.motor}
                      </span>
                      <span className="text-xs flex items-center gap-1" style={{ color: '#64748B' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" width="11" height="11">
                          <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                        </svg>
                        {v.transmision}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-5 rounded-xl" style={{ background: '#0F172A' }}>
                <p className="font-bold text-white mb-1">¿No sabés cuál elegir?</p>
                <p className="text-xs mb-4" style={{ color: '#64748B' }}>
                  Un asesor te ayuda a elegir la versión ideal según tu uso y presupuesto. Sin compromiso.
                </p>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`} target="_blank" rel="noopener noreferrer" className="btn-amber w-full justify-center">
                  Consultar versiones
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

    </>
  )
}
