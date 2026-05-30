import type { Metadata } from 'next'
import Link from 'next/link'
import { ADJUDICADOS } from '@/data/adjudicados'
import { VW_MODELS } from '@/data/volkswagen'
import AdjudicadoCard from '@/components/AdjudicadoCard'
import HeroCarSlider from '@/components/HeroCarSlider'
import CounterStats from '@/components/CounterStats'
import TestimoniosSection from '@/components/TestimoniosSection'
import CotizadorWizard from '@/components/cotizador/CotizadorWizard'
import TrustStrip from '@/components/marketing/TrustStrip'
import StickyMobileCTA from '@/components/marketing/StickyMobileCTA'
import { WHATSAPP_NUMBER } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'AutoWelt Group — Volkswagen 0km y Planes Adjudicados',
  description: 'Concesionaria Volkswagen. Amarok, Polo, Taos, Nivus, Tera 0km. Planes adjudicados hasta 40% off. Atendemos Buenos Aires y todo el interior. Financiación oficial, cuotas fijas.',
}

const STATS = [
  { num: '+500', label: 'Autos entregados' },
  { num: '15',   label: 'Años de experiencia' },
  { num: '+320', label: 'Concesionarios adheridos' },
  { num: '40%',  label: 'Ahorro en adjudicados' },
]

const PROCESO = [
  {
    step: '01',
    title: 'Consultás sin compromiso',
    desc: 'Nos describís lo que buscás. Te mostramos opciones reales con precio, disponibilidad y condiciones claras. Sin presión, sin letra chica.',
  },
  {
    step: '02',
    title: 'Revisamos la operación',
    desc: 'Confirmamos stock, financiación y documentación antes de que muevas un pie. La operación sale sola. Coordinamos todo.',
  },
  {
    step: '03',
    title: 'Retirás y volvés manejando',
    desc: 'Coordinamos la entrega en Buenos Aires. Muchos compradores del interior viajan y vuelven el mismo día con su 0km.',
  },
]

const VENTAJAS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="20" height="20">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
    title: 'Sin promesas vacías',
    desc: 'Cada condición que te damos está validada. Precio, stock, financiación y plazos: sin letra chica.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="20" height="20">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Entrega inmediata',
    desc: 'Tenemos acceso a stock disponible. Sin sorteos, sin esperas. Tu 0km listo para retirar cuando la operación esté confirmada.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="20" height="20">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: 'Cuotas fijas en pesos',
    desc: 'Financiación oficial Volkswagen Argentina. Cuotas que no se ajustan. Planificá tu compra con números reales.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="20" height="20">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Atención de persona real',
    desc: 'Pablo Alessio, 15 años en el rubro. Te atiende directamente, con experiencia y sin bots.',
  },
]

const BUENOS_AIRES_ITEMS = [
  { emoji: '📦', title: 'Mayor stock disponible', desc: 'CABA concentra la mayor oferta de 0km del país. Más modelos, más versiones, más posibilidades.' },
  { emoji: '💳', title: 'Mejor financiación', desc: 'Acceso a planes con tasa preferencial que muchos concesionarios del interior no ofrecen.' },
  { emoji: '⚡', title: 'Entrega en horas', desc: 'Sin listas de espera. Coordinamos la entrega antes de que viajes, para que el tiempo en CABA sea mínimo.' },
  { emoji: '🛡️', title: 'Operación revisada antes de viajar', desc: 'Confirmamos todo antes de que subas al micro o avión. No viajás a probar suerte.' },
]

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'var(--bg)', minHeight: '92vh' }}
      >
        {/* Grid texture sutil */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(212,162,68,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,162,68,.018) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
        {/* Glows */}
        <div className="absolute bottom-0 left-0 pointer-events-none" style={{
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse at bottom left, rgba(19,40,71,.35) 0%, transparent 65%)',
        }} />
        <div className="absolute top-0 right-0 pointer-events-none" style={{
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse at top right, rgba(212,162,68,.04) 0%, transparent 70%)',
        }} />

        <div className="relative max-w-6xl mx-auto px-6 w-full flex items-center" style={{ minHeight: '92vh' }}>
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center w-full py-24">

            {/* ── Copy ── */}
            <div>
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-7 rounded-full"
                style={{ background: 'rgba(212,162,68,.08)', border: '1px solid rgba(212,162,68,.2)' }}>
                <span className="dot-live" />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
                  Stock disponible · Entrega inmediata
                </span>
              </div>

              {/* Headline */}
              <h1
                className="display-title text-white mb-4"
                style={{ fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)', lineHeight: 1.04 }}
              >
                Tu 0km desde<br />
                Buenos Aires.<br />
                <span style={{ color: 'var(--accent)' }}>Sin vueltas.</span>
              </h1>

              {/* Subtítulo */}
              <p className="mb-7 leading-relaxed" style={{ color: '#8896A5', fontSize: '1rem', maxWidth: '460px', lineHeight: 1.75 }}>
                Compradores del interior acceden a{' '}
                <strong style={{ color: '#CBD5E1' }}>mejor stock, mejores precios y financiación</strong>{' '}
                que no encuentran en su ciudad.{' '}
                <strong style={{ color: '#CBD5E1' }}>Coordinamos todo antes de que viajes.</strong>
              </p>

              {/* Checklist */}
              <div className="flex flex-col gap-2.5 mb-8">
                {[
                  'Operación confirmada antes de viajar',
                  'Financiación oficial · cuotas fijas en pesos',
                  'Tomamos tu usado como parte de pago',
                  'Retirás en Buenos Aires y volvés manejando',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm" style={{ color: '#94A3B8' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" width="14" height="14" style={{ flexShrink: 0 }}>
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-12">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20cotizar%20un%20Volkswagen%200km%20desde%20Buenos%20Aires`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-amber btn-amber-lg"
                >
                  <WaIcon />
                  Consultar por WhatsApp
                </a>
                <a href="#cotizador" className="btn-outline-white btn-amber-lg">
                  Cotizar sin WhatsApp
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>

              {/* Authority strip */}
              <div className="flex flex-wrap items-center gap-5">
                {[
                  { icon: '⭐', text: '15 años en el mercado' },
                  { icon: '🚗', text: '+500 entregas realizadas' },
                  { icon: '📍', text: 'Todo el interior del país' },
                ].map((item, i, arr) => (
                  <div key={item.text} className="flex items-center gap-2">
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-xs font-semibold" style={{ color: '#64748B' }}>{item.text}</span>
                    {i < arr.length - 1 && <span className="trust-divider ml-5 hidden sm:block" />}
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <CounterStats stats={STATS} />
              </div>
            </div>

            {/* ── Slider desktop ── */}
            <div className="hidden lg:block">
              <HeroCarSlider />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST STRIP ════════════════════════════════════════════════════ */}
      <TrustStrip />

      {/* ═══ COTIZADOR WIZARD ════════════════════════════════════════════════ */}
      <section id="cotizador" style={{ background: 'var(--surface-soft)', borderBottom: '1px solid var(--line-mid)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Copy lateral */}
            <div className="lg:sticky lg:top-24">
              <span className="section-eyebrow">Cotizador gratuito</span>
              <h2 className="section-title mb-2">Cotizá tu 0km con atención real</h2>
              <div className="section-divider mb-5" />
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted-light)', maxWidth: '400px' }}>
                Elegís el modelo, nos contás un poco y te mandamos una propuesta real.
                Sin bots, sin formularios interminables. Un asesor te responde en el día.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  'Resultado en el día, sin esperas',
                  'Sin compromiso de compra',
                  'Tus datos solo para coordinar la propuesta',
                  'Continuidad por WhatsApp si preferís',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-muted-light)' }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'var(--accent-subtle)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-active)" strokeWidth="2.5" width="11" height="11">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              {/* Pablo authority */}
              <div className="flex items-center gap-3 p-4 rounded-xl"
                style={{ background: '#fff', border: '1px solid var(--line-mid)', boxShadow: 'var(--shadow-xs)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-black text-base"
                  style={{ background: 'linear-gradient(135deg, var(--bg), var(--surface-elevated))', color: 'var(--accent)' }}>
                  PA
                </div>
                <div>
                  <p className="font-bold text-sm mb-0.5" style={{ color: 'var(--text)' }}>Pablo Alessio</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted-light)' }}>
                    15 años en el rubro · 500+ autos entregados · Atiende personalmente
                  </p>
                </div>
              </div>
            </div>

            {/* Wizard */}
            <CotizadorWizard />
          </div>
        </div>
      </section>

      {/* ═══ PARA EL INTERIOR DEL PAÍS ══════════════════════════════════════ */}
      <section style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line-inv)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">

          <div className="mb-12 max-w-2xl">
            <span className="section-eyebrow">Para compradores del interior</span>
            <h2 className="section-title-white mb-2">
              ¿Por qué compradores de todo el país eligen operar desde Buenos Aires?
            </h2>
            <div className="section-divider mb-5" />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', maxWidth: '500px' }}>
              No viajás a probar suerte. Confirmamos todo antes de que llegues a CABA.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {BUENOS_AIRES_ITEMS.map((v) => (
              <div key={v.title} className="p-5 rounded-xl"
                style={{ background: 'rgba(255,255,255,.04)', border: '1px solid var(--line-inv-mid)' }}>
                <div className="text-2xl mb-3">{v.emoji}</div>
                <h3 className="font-bold text-sm mb-2" style={{ color: '#F1F5F9' }}>{v.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA interior */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-5 rounded-xl"
            style={{ background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)' }}>
            <div>
              <p className="font-bold text-sm mb-0.5" style={{ color: '#F1F5F9' }}>
                Operamos en todo el país. Coordinamos cada detalle.
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Córdoba · Mendoza · Rosario · Tucumán · Neuquén · Mar del Plata · y más.
              </p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20soy%20del%20interior%20y%20quiero%20cotizar%20un%200km%20desde%20Buenos%20Aires`}
              target="_blank" rel="noopener noreferrer"
              className="btn-amber shrink-0"
              style={{ fontSize: '0.875rem' }}
            >
              <WaIcon />
              Consultar
            </a>
          </div>
        </div>
      </section>

      {/* ═══ MODELOS VW ══════════════════════════════════════════════════════ */}
      <section id="modelos" style={{ background: 'var(--surface-soft)', borderBottom: '1px solid var(--line-mid)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-eyebrow">Volkswagen · Línea completa</span>
              <h2 className="section-title mb-1">Modelos disponibles en 0km</h2>
              <div className="section-divider" />
              <p className="text-sm mt-3" style={{ color: 'var(--text-muted-light)' }}>
                Precio oficial · Entrega desde concesionaria · Garantía de fábrica
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-xl bg-white"
              style={{ border: '1px solid var(--line-mid)', boxShadow: 'var(--shadow-xs)' }}>
              <img src="/images/autos/Volkswagen_logo_2019.svg.png" alt="Volkswagen"
                style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Concesionario oficial</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VW_MODELS.slice(0, 5).map((model) => {
              const hasImg = model.imagenes.length > 0
              const waText = encodeURIComponent(`Hola, quiero cotizar un Volkswagen ${model.nombre} 0km`)
              return (
                <div key={model.id} className="car-card">
                  <div className="relative overflow-hidden" style={{ height: '210px', background: 'var(--bg)' }}>
                    {hasImg ? (
                      <img src={model.imagenes[0]} alt={`VW ${model.nombre}`}
                        className="w-full h-full object-cover"
                        style={{ transition: 'transform .5s ease' }}
                        loading="lazy"
                      />
                    ) : model.video ? (
                      <video src={model.video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-black text-2xl" style={{ color: 'var(--accent)' }}>VW</span>
                      </div>
                    )}
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to top, rgba(7,26,46,.8) 0%, transparent 55%)'
                    }} />
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      <span className="tag" style={{ background: 'rgba(0,15,40,.88)', color: '#fff', border: '1px solid rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', fontSize: '0.625rem' }}>
                        {model.tipo}
                      </span>
                      <div className="flex gap-1.5">
                        {model.badge && (
                          <span className="tag" style={{ background: 'rgba(212,162,68,.92)', color: 'var(--text)', border: 'none', fontSize: '0.625rem' }}>
                            {model.badge}
                          </span>
                        )}
                        {model.nuevo && (
                          <span className="tag" style={{ background: 'rgba(34,197,94,.9)', color: '#fff', border: 'none', fontSize: '0.625rem' }}>
                            NUEVO
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-4">
                      <p className="font-black text-white text-xl leading-none" style={{ letterSpacing: '-.025em' }}>
                        {model.nombre}
                      </p>
                    </div>
                  </div>
                  <div className="car-card-body">
                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted-light)' }}>{model.tagline}</p>
                    <div className="mb-4">
                      <p className="text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>
                        {model.versiones.length} {model.versiones.length === 1 ? 'versión' : 'versiones'}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {model.versiones.slice(0, 3).map((v) => (
                          <span key={v.nombre} className="tag tag-slate">{v.nombre}</span>
                        ))}
                        {model.versiones.length > 3 && (
                          <span className="tag tag-slate">+{model.versiones.length - 3} más</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-auto pt-3 flex gap-2" style={{ borderTop: '1px solid var(--line-mid)' }}>
                      <Link href={`/modelos/${model.slug}`} className="btn-navy"
                        style={{ flex: 1, justifyContent: 'center', fontSize: '.8rem', padding: '0.625rem 0.75rem' }}>
                        Ver modelo
                      </Link>
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn-amber"
                        style={{ flex: 1, justifyContent: 'center', fontSize: '.8rem', padding: '0.625rem 0.75rem' }}>
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
      <section id="adjudicados" style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="section-eyebrow">Disponibles ahora</span>
              <h2 className="section-title-white mb-1">Planes adjudicados</h2>
              <div className="section-divider mb-3" />
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Tomás el plan, pagás la cesión y retirás el auto. Sin sorteos, sin esperas.
              </p>
            </div>
            <Link href="/catalogo" className="btn-ghost shrink-0">
              Ver todos
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADJUDICADOS.slice(0, 3).map((a) => (
              <AdjudicadoCard key={a.id} adjudicado={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VENTAJAS ════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="section-eyebrow">¿Por qué elegirnos?</span>
            <h2 className="section-title mb-2">Lo que nos diferencia</h2>
            <div className="section-divider section-divider-center" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {VENTAJAS.map((v) => (
              <div key={v.title} className="card-premium p-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0"
                  style={{ background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)', color: 'var(--accent-active)' }}>
                  {v.icon}
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: 'var(--text)', lineHeight: 1.4 }}>{v.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted-light)' }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Pablo authority block */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 rounded-xl"
            style={{ background: 'var(--surface-soft)', border: '1px solid var(--line-mid)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-black text-base"
              style={{ background: 'linear-gradient(135deg, var(--bg), var(--surface-elevated))', color: 'var(--accent)' }}>
              PA
            </div>
            <div>
              <p className="font-bold text-sm mb-0.5" style={{ color: 'var(--text)' }}>
                Pablo Alessio — Asesor comercial
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted-light)', maxWidth: '560px' }}>
                15 años operando en el rubro automotriz. Trayectoria en concesionarias, gestión de leads y cierre comercial.
                Te atiende personalmente, con información real y sin promesas vacías.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIOS ═════════════════════════════════════════════════════ */}
      <TestimoniosSection />

      {/* ═══ PROCESO ═════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white" style={{ borderTop: '1px solid var(--line-mid)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="section-eyebrow">Proceso</span>
            <h2 className="section-title mb-2">Tres pasos para tener tu auto</h2>
            <div className="section-divider section-divider-center" />
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PROCESO.map((p) => (
              <div key={p.step} className="p-8 rounded-xl" style={{ background: 'var(--surface-soft)', border: '1px solid var(--line-mid)' }}>
                <span className="mono font-black text-5xl block mb-5"
                  style={{ color: 'var(--accent)', letterSpacing: '-.04em', lineHeight: 1 }}>
                  {p.step}
                </span>
                <h3 className="font-bold mb-2.5" style={{ color: 'var(--text)', fontSize: '0.9375rem' }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted-light)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/como-funciona" className="btn-navy">
              Ver explicación completa
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ MENSAJES CLAVE ══════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--surface-soft)', borderTop: '1px solid var(--line-mid)', borderBottom: '1px solid var(--line-mid)' }}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {[
              { emoji: '⚡', text: 'Entrega inmediata' },
              { emoji: '📋', text: 'Cuotas fijas en pesos' },
              { emoji: '🔄', text: 'Tomamos tu usado' },
              { emoji: '🤝', text: 'Atención personalizada' },
              { emoji: '🗺️', text: 'Operamos en todo el país' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <span className="text-lg">{item.emoji}</span>
                <span className="text-sm font-semibold" style={{ color: '#334155' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══════════════════════════════════════════════════════ */}
      <section style={{ background: `linear-gradient(135deg, var(--bg) 0%, var(--surface-elevated) 100%)` }}>
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="section-eyebrow" style={{ color: 'rgba(212,162,68,.8)' }}>Próximo paso</span>
              <h2 className="font-black text-white mb-3"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.125rem)', letterSpacing: '-.028em', lineHeight: 1.15, fontFamily: 'var(--font-jakarta), var(--font-inter), sans-serif' }}>
                ¿Ya sabés lo que buscás?<br />
                <span style={{ color: 'var(--accent)' }}>Empezamos ahora.</span>
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Un asesor te responde en el día. Sin bots.
                Si sos del interior, coordinamos todo antes de que viajes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:justify-end">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20cotizar%20un%20Volkswagen%200km`}
                target="_blank" rel="noopener noreferrer"
                className="btn-amber"
              >
                <WaIcon />
                Cotizar por WhatsApp
              </a>
              <a href="#cotizador" className="btn-outline-white">
                Cotizar sin WhatsApp
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <StickyMobileCTA />
    </>
  )
}
