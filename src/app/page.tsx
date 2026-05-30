import type { Metadata } from 'next'
import Link from 'next/link'
import { ADJUDICADOS } from '@/data/adjudicados'
import { VW_MODELS } from '@/data/volkswagen'
import AdjudicadoCard from '@/components/AdjudicadoCard'
import CounterStats from '@/components/CounterStats'
import TestimoniosSection from '@/components/TestimoniosSection'
import CotizadorWizard from '@/components/cotizador/CotizadorWizard'
import { HeroVisual, StickyMobileCTA } from '@/components/marketing/ClientDynamics'
import { WHATSAPP_NUMBER } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'AutoWelt Group — Volkswagen 0km y Planes Adjudicados',
  description: 'Accedé a mejor stock, mejores condiciones y financiación real. Amarok, Polo, Taos, Nivus, Tera 0km. Atendemos Buenos Aires y todo el interior del país.',
}

const STATS = [
  { num: '+500', label: 'Autos entregados' },
  { num: '15',   label: 'Años de experiencia' },
  { num: '+320', label: 'Concesionarios adheridos' },
  { num: '40%',  label: 'Ahorro en adjudicados' },
]

const PILARES = [
  { icon: '⭐', title: '+15 años en el mercado automotor', desc: 'Trayectoria comprobada en gestión de operaciones 0km y planes adjudicados en Argentina.' },
  { icon: '🚗', title: '+500 entregas realizadas',         desc: 'Compradores de Buenos Aires y de todo el interior que retiraron su vehículo sin sorpresas.' },
  { icon: '🏢', title: 'Red de concesionarias oficiales',  desc: 'Coordinamos con concesionarios VW oficiales. Garantía de fábrica, precio oficial y documentación.' },
  { icon: '🤝', title: 'Atención personalizada real',      desc: 'Cada comprador tiene un asesor asignado. Sin bots. Sin respuestas automáticas genéricas.' },
  { icon: '🗺️', title: 'Operamos en todo el país',         desc: 'Interior, CABA y GBA. Muchos compradores viajan y retiran en Buenos Aires. Coordinamos todo.' },
  { icon: '📋', title: 'Operación clara desde el inicio',  desc: 'Precio, disponibilidad, financiación y plazos confirmados antes de que avances. Sin letra chica.' },
]

const INTERIOR_ITEMS = [
  { n: '01', t: 'Más stock disponible', d: 'CABA concentra la mayor oferta de 0km del país. Más modelos, versiones y colores.' },
  { n: '02', t: 'Mejores condiciones',  d: 'Accedés a planes y bonificaciones que muchos concesionarios del interior no ofrecen.' },
  { n: '03', t: 'Retiro coordinado',    d: 'Organizamos la entrega para que uses el mínimo tiempo posible en Buenos Aires.' },
  { n: '04', t: 'Validación previa',    d: 'Confirmamos precio, disponibilidad y documentación antes de que subas al micro o avión.' },
]

const WA = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg)', minHeight: '100svh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(217,162,58,.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217,162,58,.015) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }} />

        {/* Ambient glows */}
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 700, height: 500, pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(19,40,71,.45) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 400, pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(217,162,58,.06) 0%, transparent 65%)' }} />

        <div className="max-w-6xl mx-auto px-6 w-full py-28" style={{ position: 'relative' }}>
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Copy */}
            <div>
              {/* Live pill */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.4375rem 1rem', marginBottom: '1.75rem',
                background: 'rgba(217,162,58,.07)', border: '1px solid rgba(217,162,58,.18)',
                borderRadius: 'var(--r-pill)',
              }}>
                <span className="live-dot" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                  Stock disponible · Entrega inmediata
                </span>
              </div>

              {/* Headline */}
              <h1 style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: '-0.035em',
                color: 'var(--text)',
                marginBottom: '1rem',
                fontFamily: 'var(--font-jakarta), var(--font-inter), sans-serif',
              }}>
                Tu 0km desde<br />
                Buenos Aires.<br />
                <span style={{ color: 'var(--gold)' }}>Mejor oferta.</span>
              </h1>

              {/* Subheadline */}
              <p style={{ fontSize: '1.0625rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 480, marginBottom: '1.75rem' }}>
                Accedé a mejores condiciones, entrega inmediata y financiación clara.
                Coordinamos todo antes de que viajes.
              </p>

              {/* Bono badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                padding: '0.625rem 1.125rem', marginBottom: '2rem',
                background: 'rgba(217,162,58,.08)', border: '1px solid rgba(217,162,58,.2)',
                borderRadius: 10,
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" width="15" height="15">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--gold-bright)' }}>
                  Bonificación vigente en Amarok: hasta $10.100.000
                </span>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
                <a href="#cotizador" className="btn btn-gold btn-gold-lg">
                  Cotizar ahora
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <a href={WA('Hola, quiero consultar sobre un 0km desde Buenos Aires')}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost-light btn-gold-lg">
                  <WaIcon />
                  Consultar por WhatsApp
                </a>
              </div>

              {/* Badges row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Cuotas fijas', 'Tomamos tu usado', 'Todo el país', 'Sin bots'].map(b => (
                  <span key={b} className="trust-badge">{b}</span>
                ))}
              </div>

              {/* Stats */}
              <div style={{ marginTop: '2.5rem' }}>
                <CounterStats stats={STATS} />
              </div>
            </div>

            {/* Visual */}
            <div className="hidden lg:block" style={{ position: 'relative' }}>
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST STRIP ════════════════════════════════════════════════════ */}
      <div style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, alignItems: 'center', justifyContent: 'center', padding: '0.75rem 0' }}>
            {[
              { icon: '✓', t: 'Precio sin sorpresas' },
              { icon: '✓', t: 'Entrega coordinada' },
              { icon: '✓', t: 'Asesor real con nombre' },
              { icon: '✓', t: 'Cuotas fijas en pesos' },
              { icon: '✓', t: 'Tomamos tu usado' },
              { icon: '✓', t: 'Operamos en todo el país' },
            ].map((item, i, arr) => (
              <div key={item.t} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', borderRight: i < arr.length - 1 ? '1px solid var(--line)' : 'none', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold)' }}>{item.icon}</span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>{item.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ COTIZADOR ══════════════════════════════════════════════════════ */}
      <section id="cotizador" style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--line)', padding: '5rem 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Copy */}
            <div className="lg:sticky" style={{ top: '5.5rem' }}>
              <span className="eyebrow">Cotizador gratuito</span>
              <h2 className="section-title section-title-light" style={{ marginBottom: '0.625rem' }}>
                Cotizá tu 0km con atención real
              </h2>
              <div className="divider" style={{ marginBottom: '1.5rem' }} />

              <p className="section-desc" style={{ marginBottom: '2rem' }}>
                Elegís el modelo, el anticipo y te mostramos opciones de financiación reales.
                Un asesor te contacta con la propuesta exacta. Sin bots.
              </p>

              {/* Garantías */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2rem' }}>
                {[
                  'Propuesta en el día, sin esperas',
                  'Sin compromiso de compra',
                  'Atendemos todo el interior del país',
                  'Tus datos se usan solo para contactarte',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(217,162,58,.12)', border: '1px solid rgba(217,162,58,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" width="11" height="11">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Bonificación destacada */}
              <div className="glass-card glass-card-gold" style={{ padding: '1.25rem' }}>
                <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.375rem' }}>
                  Amarok · Bonificación vigente
                </p>
                <p style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.25rem', fontVariantNumeric: 'tabular-nums' }}>
                  hasta $10.100.000
                </p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Sobre precio de lista. Sujeto a disponibilidad y validación comercial.
                </p>
              </div>
            </div>

            <CotizadorWizard />
          </div>
        </div>
      </section>

      {/* ═══ CONFIANZA INSTITUCIONAL ═════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line)', padding: '5rem 0' }}>
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div style={{ marginBottom: '3.5rem', maxWidth: 580 }}>
            <span className="eyebrow">AutoWelt Group</span>
            <h2 className="section-title section-title-light" style={{ marginBottom: '0.625rem' }}>
              Coordinamos operaciones 0km con respaldo real
            </h2>
            <div className="divider" style={{ marginBottom: '1.25rem' }} />
            <p className="section-desc">
              AutoWelt Group coordina operaciones 0km con concesionarias oficiales, financiación vigente y acompañamiento hasta la entrega.
            </p>
          </div>

          {/* Pilares grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PILARES.map((p) => (
              <div key={p.title} className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.875rem' }}>{p.icon}</div>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.35, marginBottom: '0.5rem', letterSpacing: '-0.015em' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPRADORES DEL INTERIOR ════════════════════════════════════════ */}
      <section id="entrega" style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--line)', padding: '5rem 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Texto */}
            <div>
              <span className="eyebrow">Para compradores del interior</span>
              <h2 className="section-title section-title-light" style={{ marginBottom: '0.75rem' }}>
                Compradores de todo el país eligen operar desde Buenos Aires
              </h2>
              <div className="divider" style={{ marginBottom: '1.5rem' }} />
              <p className="section-desc" style={{ marginBottom: '1.75rem' }}>
                Si en tu ciudad no conseguís stock, precio o financiación conveniente,
                validamos opciones reales antes de que viajes.
              </p>
              <div className="glass-card-gold" style={{
                background: 'rgba(217,162,58,.06)',
                border: '1px solid rgba(217,162,58,.18)',
                borderRadius: 14,
                padding: '1.25rem 1.375rem',
                marginBottom: '2rem',
              }}>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gold-bright)', lineHeight: 1.5, letterSpacing: '-0.01em' }}>
                  &ldquo;No viajás a probar suerte. Viajás con la operación previamente validada.&rdquo;
                </p>
              </div>
              <a
                href={WA('Hola, soy del interior del país y quiero cotizar un 0km desde Buenos Aires')}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-gold btn-gold-lg"
              >
                <WaIcon />
                Consultar sin compromiso
              </a>
            </div>

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {INTERIOR_ITEMS.map(item => (
                <div key={item.n} className="glass-card" style={{ padding: '1.375rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'rgba(217,162,58,.3)', lineHeight: 1, letterSpacing: '-0.04em', minWidth: '2rem', fontFamily: 'var(--font-jakarta), sans-serif', fontVariantNumeric: 'tabular-nums' }}>
                    {item.n}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.375rem', letterSpacing: '-0.015em' }}>
                      {item.t}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══ MODELOS VW ══════════════════════════════════════════════════════ */}
      <section id="modelos" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line)', padding: '5rem 0' }}>
        <div className="max-w-6xl mx-auto px-6">

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="eyebrow">Volkswagen · Línea completa</span>
                <h2 className="section-title section-title-light" style={{ marginBottom: '0.375rem' }}>Modelos disponibles en 0km</h2>
                <div className="divider" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.625rem 1rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 10 }}>
                <img src="/images/autos/Volkswagen_logo_2019.svg.png" alt="VW" style={{ width: 24, height: 24, objectFit: 'contain' }} />
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Concesionario oficial</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VW_MODELS.slice(0, 5).map((model) => {
              const hasImg = model.imagenes.length > 0
              const waText = encodeURIComponent(`Hola, quiero cotizar un Volkswagen ${model.nombre} 0km`)
              return (
                <div key={model.id} className="car-card">
                  {/* Media */}
                  <div style={{ position: 'relative', overflow: 'hidden', height: 220, background: 'var(--bg-3)' }}>
                    {hasImg ? (
                      <img src={model.imagenes[0]} alt={`VW ${model.nombre}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s ease', display: 'block' }}
                        loading="lazy"
                      />
                    ) : model.video ? (
                      <video src={model.video} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontWeight: 900, fontSize: '2rem', color: 'var(--gold)' }}>VW</span>
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,17,31,.88) 0%, transparent 55%)', pointerEvents: 'none' }} />

                    {/* Badges top */}
                    <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span className="tag tag-slate" style={{ fontSize: '0.5625rem', backdropFilter: 'blur(8px)', background: 'rgba(7,17,31,.75)' }}>
                        {model.tipo}
                      </span>
                      <div style={{ display: 'flex', gap: '0.375rem' }}>
                        {model.badge && <span className="tag tag-gold" style={{ fontSize: '0.5625rem' }}>{model.badge}</span>}
                        {model.nuevo && <span className="tag tag-green" style={{ fontSize: '0.5625rem' }}>Nuevo</span>}
                      </div>
                    </div>

                    {/* Model name bottom */}
                    <div style={{ position: 'absolute', bottom: 14, left: 16 }}>
                      <p style={{ fontSize: '1.375rem', fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                        {model.nombre}
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="car-card-body">
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>{model.tagline}</p>

                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-faint)', marginBottom: '0.375rem' }}>
                        {model.versiones.length} {model.versiones.length === 1 ? 'versión' : 'versiones'}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                        {model.versiones.slice(0, 3).map(v => (
                          <span key={v.nombre} className="tag tag-slate">{v.nombre}</span>
                        ))}
                        {model.versiones.length > 3 && (
                          <span className="tag tag-slate">+{model.versiones.length - 3}</span>
                        )}
                      </div>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--line)', display: 'flex', gap: '0.5rem' }}>
                      <Link href={`/modelos/${model.slug}`} className="btn btn-ghost-light flex-1 justify-center" style={{ fontSize: '0.8125rem', padding: '0.625rem' }}>
                        Ver modelo
                      </Link>
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn btn-gold flex-1 justify-center"
                        style={{ fontSize: '0.8125rem', padding: '0.625rem' }}>
                        Cotizar
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ ADJUDICADOS ═════════════════════════════════════════════════════ */}
      <section id="adjudicados" style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--line)', padding: '5rem 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="eyebrow">Disponibles ahora</span>
                <h2 className="section-title section-title-light" style={{ marginBottom: '0.375rem' }}>Planes adjudicados</h2>
                <div className="divider" />
              </div>
              <Link href="/catalogo" className="btn btn-ghost-light" style={{ fontSize: '0.875rem' }}>
                Ver todos
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADJUDICADOS.slice(0, 3).map(a => (
              <AdjudicadoCard key={a.id} adjudicado={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIOS ═════════════════════════════════════════════════════ */}
      <TestimoniosSection />

      {/* ═══ CTA FINAL ═══════════════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, var(--bg) 0%, var(--bg-3) 100%)', borderTop: '1px solid var(--line)', padding: '5rem 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="eyebrow">Próximo paso</span>
              <h2 className="section-title section-title-light" style={{ marginBottom: '0.75rem' }}>
                ¿Ya sabés lo que buscás?<br />
                <span style={{ color: 'var(--gold)' }}>Empezamos ahora.</span>
              </h2>
              <p className="section-desc">
                Un asesor te responde en el día. Sin bots, sin formularios de 10 páginas.
                Si sos del interior, coordinamos todo antes de que viajes.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
              <a href={WA('Hola, quiero cotizar un Volkswagen 0km')}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-gold btn-gold-lg w-full justify-center">
                <WaIcon />
                Cotizar por WhatsApp
              </a>
              <a href="#cotizador" className="btn btn-ghost-light w-full justify-center" style={{ fontSize: '0.9375rem' }}>
                Cotizar sin WhatsApp
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', textAlign: 'center', width: '100%' }}>
                Valores orientativos. Financiación sujeta a validación y disponibilidad de stock.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StickyMobileCTA />
    </>
  )
}
