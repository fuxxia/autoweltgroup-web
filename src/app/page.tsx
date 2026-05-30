import type { Metadata } from 'next'
import Link from 'next/link'
import { VW_MODELS } from '@/data/volkswagen'
import CounterStats from '@/components/CounterStats'
import TestimoniosSection from '@/components/TestimoniosSection'
import CotizadorWizard from '@/components/cotizador/CotizadorWizard'
import AnimatedSection from '@/components/marketing/AnimatedSection'
import VehicleCard from '@/components/vehicles/VehicleCard'
import { HeroScene3D, StickyMobileCTA } from '@/components/marketing/ClientDynamics'
import { WHATSAPP_NUMBER } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'AutoWelt Group — Volkswagen 0km desde Buenos Aires',
  description: 'Mejor stock, mejores condiciones y financiación real. Amarok, Polo, Taos, Nivus, Tera 0km. Cuotas fijas, entrega inmediata, tomamos tu usado. Atendemos todo el interior del país.',
}

const STATS = [
  { num: '+500', label: 'Autos entregados' },
  { num: '15',   label: 'Años de experiencia' },
  { num: '+320', label: 'Concesionarios adheridos' },
  { num: '0%',   label: 'Tasa en planes elegidos' },
]

const PILARES = [
  { icon: '⭐', t: '+15 años en el rubro',           d: 'Trayectoria comprobada en gestión de 0km y financiación automotriz en Argentina.' },
  { icon: '🚗', t: '+500 entregas realizadas',        d: 'Compradores de Buenos Aires y todo el interior que retiraron sin sorpresas.' },
  { icon: '🏢', t: 'Red de concesionarias oficiales', d: 'Coordinamos con concesionarios VW oficiales. Garantía de fábrica, precio confirmado.' },
  { icon: '🤝', t: 'Atención sin bots',              d: 'Cada comprador tiene un asesor asignado. Respuesta real, sin automatizaciones genéricas.' },
  { icon: '🗺️', t: 'Operamos en todo el país',        d: 'Interior, CABA y GBA. Coordinamos el retiro antes de que viajes.' },
  { icon: '📋', t: 'Operación clara desde el inicio', d: 'Precio, disponibilidad y plazos confirmados antes de avanzar. Sin letra chica.' },
]

const INTERIOR = [
  { n: '01', t: 'Más disponibilidad',    d: 'CABA concentra la mayor oferta de 0km del país. Más modelos, versiones y colores.' },
  { n: '02', t: 'Mejores condiciones',   d: 'Accedés a planes y bonificaciones que muchos concesionarios del interior no ofrecen.' },
  { n: '03', t: 'Retiro coordinado',     d: 'Organizamos la entrega para que uses el mínimo tiempo posible en Buenos Aires.' },
  { n: '04', t: 'Operación validada',    d: 'Confirmamos precio, disponibilidad y documentación antes de que subas al micro o avión.' },
]

const WA = (t: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t)}`

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

        {/* Grid texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(217,162,58,.014) 1px, transparent 1px), linear-gradient(90deg, rgba(217,162,58,.014) 1px, transparent 1px)`,
          backgroundSize: '68px 68px',
        }} />
        {/* Glows */}
        <div style={{ position: 'absolute', bottom: '-8%', left: '-4%', width: 700, height: 500, pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(19,40,71,.5) 0%, transparent 68%)' }} />
        <div style={{ position: 'absolute', top: '-6%', right: '-4%', width: 550, height: 420, pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(217,162,58,.07) 0%, transparent 65%)' }} />

        <div className="max-w-6xl mx-auto px-6 w-full" style={{ position: 'relative', paddingTop: '7rem', paddingBottom: '5rem' }}>
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Copy */}
            <div>
              {/* Live badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4375rem 1rem', marginBottom: '1.75rem', background: 'rgba(217,162,58,.07)', border: '1px solid rgba(217,162,58,.2)', borderRadius: 'var(--r-pill)' }}>
                <span className="live-dot" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                  Stock disponible · Entrega inmediata
                </span>
              </div>

              {/* Headline */}
              <h1 style={{ fontSize: 'clamp(2.375rem, 5.8vw, 4.25rem)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.038em', color: 'var(--text)', marginBottom: '1rem', fontFamily: 'var(--font-jakarta), var(--font-inter), sans-serif' }}>
                Tu 0km desde<br />
                Buenos Aires.<br />
                <span style={{ color: 'var(--gold)' }}>Mejor oferta.</span>
              </h1>

              {/* Sub */}
              <p style={{ fontSize: '1.0625rem', color: 'var(--text-muted)', lineHeight: 1.72, maxWidth: 470, marginBottom: '1.5rem' }}>
                Accedé a mejor stock, mejores condiciones y financiación clara.
                Coordinamos todo antes de que viajes.
              </p>

              {/* Bono badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', padding: '0.625rem 1.125rem', marginBottom: '2rem', background: 'rgba(217,162,58,.07)', border: '1px solid rgba(217,162,58,.2)', borderRadius: 10 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" width="14" height="14">
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href={WA('Hola, quiero consultar sobre un 0km desde Buenos Aires')} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light btn-gold-lg">
                  <WaIcon />
                  Consultar por WhatsApp
                </a>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Cuotas fijas', 'Tomamos tu usado', 'Todo el país', 'Sin bots'].map(b => (
                  <span key={b} className="trust-badge">{b}</span>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <CounterStats stats={STATS} />
              </div>
            </div>

            {/* 3D Hero */}
            <div className="hidden lg:block" style={{ position: 'relative', height: 420 }}>
              <HeroScene3D />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST STRIP ════════════════════════════════════════════════════ */}
      <div style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: '0.75rem 0' }}>
            {['Precio sin sorpresas', 'Entrega coordinada', 'Asesor real', 'Cuotas fijas', 'Tomamos tu usado', 'Todo el país'].map((t, i, arr) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1.125rem', borderRight: i < arr.length - 1 ? '1px solid var(--line)' : 'none', whiteSpace: 'nowrap' }}>
                <span style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.8125rem' }}>✓</span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ COTIZADOR ══════════════════════════════════════════════════════ */}
      <section id="cotizador" style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--line)', padding: '5rem 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Copy lateral */}
            <AnimatedSection>
              <div className="lg:sticky" style={{ top: '5.5rem' }}>
                <span className="eyebrow">Cotizador gratuito</span>
                <h2 className="section-title section-title-light" style={{ marginBottom: '0.625rem' }}>
                  Cotizá con atención real
                </h2>
                <div className="divider" style={{ marginBottom: '1.5rem' }} />
                <p className="section-desc" style={{ marginBottom: '2rem' }}>
                  Elegís el modelo, el anticipo y te mostramos opciones de financiación reales.
                  Un asesor te contacta con la propuesta exacta. Sin bots.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2rem' }}>
                  {['Propuesta en el día, sin esperas', 'Sin compromiso de compra', 'Atendemos todo el interior del país', 'Tus datos solo para contactarte'].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(217,162,58,.12)', border: '1px solid rgba(217,162,58,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>
                      </div>
                      <span style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Bono destacado */}
                <div className="glass-card glass-card-gold" style={{ padding: '1.375rem' }}>
                  <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                    Amarok · Bonificación vigente
                  </p>
                  <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.035em', lineHeight: 1, marginBottom: '0.375rem', fontVariantNumeric: 'tabular-nums' }}>
                    hasta $10.100.000
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                    Sobre precio de lista. Sujeto a disponibilidad y validación comercial.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.12}>
              <CotizadorWizard />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ CONFIANZA INSTITUCIONAL ═════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line)', padding: '5rem 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection style={{ marginBottom: '3.5rem', maxWidth: 580 }}>
            <span className="eyebrow">AutoWelt Group</span>
            <h2 className="section-title section-title-light" style={{ marginBottom: '0.625rem' }}>
              Coordinamos 0km con respaldo real
            </h2>
            <div className="divider" style={{ marginBottom: '1.25rem' }} />
            <p className="section-desc">
              AutoWelt Group coordina operaciones 0km con concesionarias oficiales, financiación vigente y acompañamiento hasta la entrega.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PILARES.map((p, i) => (
              <AnimatedSection key={p.t} delay={i * 0.06}>
                <div className="glass-card" style={{ padding: '1.5rem', height: '100%' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.875rem' }}>{p.icon}</div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.35, marginBottom: '0.5rem', letterSpacing: '-0.015em' }}>{p.t}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{p.d}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPRADORES DEL INTERIOR ════════════════════════════════════════ */}
      <section id="entrega" style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--line)', padding: '5rem 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            <AnimatedSection>
              <span className="eyebrow">Para compradores del interior</span>
              <h2 className="section-title section-title-light" style={{ marginBottom: '0.75rem' }}>
                Comprar en Buenos Aires puede cambiar la operación
              </h2>
              <div className="divider" style={{ marginBottom: '1.5rem' }} />
              <p className="section-desc" style={{ marginBottom: '1.75rem' }}>
                Más stock, mejores condiciones y retiro coordinado antes de que viajes.
              </p>
              <div style={{ background: 'rgba(217,162,58,.06)', border: '1px solid rgba(217,162,58,.18)', borderRadius: 14, padding: '1.25rem 1.375rem', marginBottom: '2rem' }}>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gold-bright)', lineHeight: 1.55, letterSpacing: '-0.01em' }}>
                  &ldquo;No viajás a probar suerte. Viajás con una operación previamente revisada.&rdquo;
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
            </AnimatedSection>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {INTERIOR.map((item, i) => (
                <AnimatedSection key={item.n} delay={i * 0.08}>
                  <div className="glass-card" style={{ padding: '1.375rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.375rem', fontWeight: 900, color: 'rgba(217,162,58,.28)', lineHeight: 1, letterSpacing: '-0.04em', minWidth: '2.25rem', fontFamily: 'var(--font-jakarta), sans-serif', fontVariantNumeric: 'tabular-nums' }}>
                      {item.n}
                    </span>
                    <div>
                      <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.375rem', letterSpacing: '-0.015em' }}>{item.t}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.d}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══ MODELOS VW ══════════════════════════════════════════════════════ */}
      <section id="modelos" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line)', padding: '5rem 0' }}>
        <div className="max-w-6xl mx-auto px-6">

          <AnimatedSection style={{ marginBottom: '3rem' }}>
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
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: '1200px' }}>
            {VW_MODELS.slice(0, 5).map((model, i) => (
              <AnimatedSection key={model.id} delay={i * 0.07}>
                <VehicleCard model={model} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIOS ═════════════════════════════════════════════════════ */}
      <TestimoniosSection />

      {/* ═══ CTA FINAL ═══════════════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, var(--bg) 0%, var(--bg-3) 100%)', borderTop: '1px solid var(--line)', padding: '5rem 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href={WA('Hola, quiero cotizar un Volkswagen 0km')} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-gold-lg w-full justify-center">
                  <WaIcon />
                  Cotizar por WhatsApp
                </a>
                <a href="#cotizador" className="btn btn-ghost-light w-full justify-center">
                  Cotizar sin WhatsApp
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', textAlign: 'center' }}>
                  Valores orientativos. Financiación sujeta a validación y disponibilidad de stock.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <StickyMobileCTA />
    </>
  )
}
