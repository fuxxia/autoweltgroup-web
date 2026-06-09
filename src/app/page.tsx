import type { Metadata } from 'next'
import Link from 'next/link'
import { VW_MODELS } from '@/data/volkswagen'
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
      {/* ═══ HERO — CINEMATIC FULL-BLEED ════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '100svh', minHeight: 700, overflow: 'hidden', background: 'var(--bg)' }}>

        {/* ── Full-bleed 3D scene: stars, partículas, Amarok en la derecha */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <HeroScene3D />
        </div>

        {/* ── Grid texture — solo visible en la izquierda */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(217,162,58,.028) 1px, transparent 1px), linear-gradient(90deg, rgba(217,162,58,.028) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 48% 100% at 10% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 48% 100% at 10% 50%, black 0%, transparent 100%)',
        }} />


        {/* ── Fade inferior hacia la siguiente sección */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '22%', zIndex: 4, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(7,17,31,1) 0%, rgba(7,17,31,0.60) 50%, transparent 100%)',
        }} />

        {/* ── Contenido superpuesto */}
        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
          <div className="max-w-7xl mx-auto px-6 w-full" style={{ flex: 1, display: 'flex', alignItems: 'center', paddingTop: '6rem', pointerEvents: 'auto' }}>

            <div className="hero-enter" style={{ maxWidth: 560 }}>

              {/* Live badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4375rem 1rem', marginBottom: '1.25rem', background: 'rgba(217,162,58,.05)', border: '1px solid rgba(217,162,58,.18)', borderRadius: 'var(--r-pill)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>
                <span className="live-dot" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                  Stock disponible · Entrega inmediata
                </span>
              </div>

              {/* Headline — font escala con vw Y svh para evitar overflow en pantallas cortas */}
              <h1 style={{ fontSize: 'clamp(2.5rem, min(6.5vw, 9svh), 5.5rem)', fontWeight: 900, lineHeight: 0.91, letterSpacing: '-0.055em', color: 'var(--text)', marginBottom: '1.25rem', fontFamily: 'var(--font-jakarta), var(--font-inter), sans-serif' }}>
                Tu 0km<br />
                desde BsAs.<br />
                <span style={{ color: 'var(--gold)', textShadow: '0 0 80px rgba(217,162,58,0.55), 0 0 160px rgba(217,162,58,0.20)' }}>Mejor oferta.</span>
              </h1>

              {/* Sub */}
              <p style={{ fontSize: '1.0625rem', color: 'var(--text-muted)', lineHeight: 1.70, maxWidth: 420, marginBottom: '1.25rem' }}>
                Accedé a mejor stock, mejores condiciones y financiación clara.
                Coordinamos todo antes de que viajes.
              </p>

              {/* Bono badge */}
              <div className="float-y" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', padding: '0.5625rem 1rem', marginBottom: '1.375rem', background: 'rgba(217,162,58,.07)', border: '1px solid rgba(217,162,58,.2)', borderRadius: 10, boxShadow: '0 0 20px rgba(217,162,58,0.10)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" width="14" height="14">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--gold-bright)' }}>
                  Bonificación vigente en Amarok: hasta $10.100.000
                </span>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <a href="#cotizador" className="btn btn-gold btn-gold-lg">
                  Cotizar ahora
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href={WA('Hola, quiero consultar sobre un 0km desde Buenos Aires')} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light btn-gold-lg">
                  <WaIcon />
                  Consultar por WhatsApp
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ═══ COTIZADOR ══════════════════════════════════════════════════════ */}
      <section id="cotizador" style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 50%, var(--bg) 100%)', padding: '10rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(217,162,58,0.035) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Columna visual — foto + headline */}
            <AnimatedSection>
              <div className="lg:sticky" style={{ top: '5.5rem' }}>
                <span className="eyebrow">Configurá tu operación</span>
                <h2 className="section-title section-title-light" style={{ marginBottom: '0.625rem' }}>
                  Cotizá con atención real
                </h2>
                <div className="divider" style={{ marginBottom: '1.75rem' }} />

                {/* Foto editorial del auto */}
                <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', marginBottom: '1.75rem', height: 260 }}>
                  <img
                    src="/images/fotos/amarok/amarok.jpeg"
                    alt="Volkswagen Amarok 0km"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
                    loading="lazy"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,17,31,0.75) 0%, rgba(7,17,31,0.20) 50%, transparent 100%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem' }}>
                    <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.25rem' }}>Volkswagen · 0km</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>Amarok V6</p>
                  </div>
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

      {/* ═══ COMPRADORES DEL INTERIOR ════════════════════════════════════════ */}
      <section id="entrega" style={{ background: 'var(--bg)', padding: '11rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 600, height: 600, background: 'radial-gradient(ellipse, rgba(19,40,71,0.6) 0%, transparent 65%)', pointerEvents: 'none', borderRadius: '50%' }} />
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
              <div style={{ background: 'linear-gradient(135deg, rgba(217,162,58,0.10) 0%, rgba(217,162,58,0.04) 100%)', border: '1px solid rgba(217,162,58,.25)', borderRadius: 16, padding: '1.5rem 1.75rem', marginBottom: '2rem', boxShadow: '0 0 40px rgba(217,162,58,0.08)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(217,162,58,0.45) 50%, transparent 100%)', borderRadius: '16px 16px 0 0' }} />
                <p style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--gold-bright)', lineHeight: 1.55, letterSpacing: '-0.015em', textShadow: '0 0 30px rgba(217,162,58,0.25)' }}>
                  &ldquo;No viajás a probar suerte.<br/>Viajás con la operación revisada.&rdquo;
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {INTERIOR.map((item, i) => (
                <AnimatedSection key={item.n} delay={i * 0.08}>
                  <div className="interior-item">
                    <span style={{ fontSize: '4rem', fontWeight: 900, color: 'rgba(217,162,58,.14)', lineHeight: 1, letterSpacing: '-0.06em', minWidth: '4rem', fontFamily: 'var(--font-jakarta), sans-serif', fontVariantNumeric: 'tabular-nums' }}>
                      {item.n}
                    </span>
                    <div style={{ paddingTop: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{item.t}</h3>
                      <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.d}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══ MODELOS VW ══════════════════════════════════════════════════════ */}
      <section id="modelos" style={{ background: 'var(--bg-2)', padding: '10rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '0', left: '0', right: '0', height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(217,162,58,0.25) 50%, transparent 100%)', pointerEvents: 'none' }} />
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
      <section style={{ background: 'linear-gradient(160deg, rgba(7,17,31,1) 0%, rgba(11,22,42,1) 40%, rgba(7,17,31,1) 100%)', padding: '11rem 0', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(217,162,58,0.06) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)' }} />
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
