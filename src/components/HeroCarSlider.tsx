'use client'
import { useState, useEffect } from 'react'
import { WHATSAPP_NUMBER } from '@/lib/utils'

const SLIDES = [
  {
    modelo: 'Amarok',
    version: 'Trendline 4x2 · 2.0 TDI 140CV · Entrega Inmediata',
    badge: 'OFERTA ABRIL',
    img: '/images/fotos/amarok/amarokfrente.jpeg',
    imgPosition: 'center 30%',
    slug: 'amarok',
    ctaLabel: 'Ver oferta',
    ctaHref: '/modelos/amarok',
    waText: 'Hola%2C%20quiero%20cotizar%20una%20Volkswagen%20Amarok%20Trendline%204x2%200km',
  },
  {
    modelo: 'Polo',
    version: 'Hatchback · Track / Comfortline / Highline',
    badge: 'MÁS VENDIDO',
    img: '/images/fotos/polo/polo1.jpeg',
    imgPosition: 'center 45%',
    slug: 'polo',
    ctaLabel: 'Cotizar',
    ctaHref: null,
    waText: 'Hola%2C%20quiero%20cotizar%20un%20Volkswagen%20Polo%200km',
  },
  {
    modelo: 'Tera',
    version: 'SUV 7 asientos · Nuevo ícono de VW',
    badge: 'NUEVO',
    img: '/images/fotos/tera/tera1.jpeg',
    imgPosition: 'center 38%',
    slug: 'tera',
    ctaLabel: 'Cotizar',
    ctaHref: null,
    waText: 'Hola%2C%20quiero%20cotizar%20una%20Volkswagen%20Tera%200km',
  },
]

export default function HeroCarSlider() {
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  const goTo = (i: number) => {
    if (i === active || transitioning) return
    setTransitioning(true)
    setPrev(active)
    setTimeout(() => {
      setActive(i)
      setTransitioning(false)
      setPrev(null)
    }, 420)
  }

  // No auto-rotate — Amarok fixed as default

  const slide = SLIDES[active]

  return (
    <div
      className="relative rounded-2xl overflow-hidden w-full"
      style={{
        minHeight: '480px',
        border: '1px solid rgba(255,255,255,.07)',
        background: '#0F172A',
      }}
    >
      {/* Images — fade crossfade */}
      {SLIDES.map((s, i) => (
        <div
          key={s.slug}
          className="absolute inset-0"
          style={{
            opacity: i === active ? 1 : 0,
            transition: 'opacity 0.5s ease',
            zIndex: i === active ? 2 : 1,
          }}
        >
          <img
            src={s.img}
            alt={`VW ${s.modelo}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: s.imgPosition,
              opacity: 0.82,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,.5) 50%, rgba(15,23,42,.1) 100%)',
            }}
          />
        </div>
      ))}

      {/* VW badge top-left */}
      <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
        <img
          src="/images/autos/Volkswagen_logo_2019.svg.png"
          alt="Volkswagen"
          style={{ width: '32px', height: '32px', objectFit: 'contain' }}
        />
        <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,.6)' }}>Volkswagen</span>
      </div>

      {/* Slide badge top-right */}
      <div className="absolute top-5 right-5 z-10">
        <span
          className="text-xs font-black px-2.5 py-1 rounded"
          style={{
            background: 'rgba(245,158,11,.18)',
            color: '#F59E0B',
            border: '1px solid rgba(245,158,11,.35)',
            letterSpacing: '.08em',
          }}
        >
          {slide.badge}
        </span>
      </div>

      {/* Dots */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === active ? '22px' : '6px',
              height: '6px',
              borderRadius: '9999px',
              background: i === active ? '#F59E0B' : 'rgba(255,255,255,.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all .35s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Content — bottom overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 p-6"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity .35s ease, transform .35s ease',
        }}
      >
        <h3
          className="font-black text-white leading-none mb-1"
          style={{ fontSize: '2.25rem', letterSpacing: '-.03em' }}
        >
          {slide.modelo}
        </h3>
        <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,.45)' }}>{slide.version}</p>

        <div className="flex gap-3">
          <a
            href={slide.ctaHref ?? `https://wa.me/${WHATSAPP_NUMBER}?text=${slide.waText}`}
            target={slide.ctaHref ? undefined : '_blank'}
            rel={slide.ctaHref ? undefined : 'noopener noreferrer'}
            className="btn-amber"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            {slide.ctaLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a
            href={`/modelos/${slide.slug}`}
            className="btn-outline-white"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            Ver modelo
          </a>
        </div>
      </div>
    </div>
  )
}
