import type { Metadata } from 'next'
import Link from 'next/link'
import { ADJUDICADOS } from '@/data/adjudicados'
import { VW_MODELS } from '@/data/volkswagen'
import AdjudicadoCard from '@/components/AdjudicadoCard'
import SimuladorForm from '@/components/SimuladorForm'
import HeroCarSlider from '@/components/HeroCarSlider'
import CounterStats from '@/components/CounterStats'
import TestimoniosSection from '@/components/TestimoniosSection'
import { WHATSAPP_NUMBER } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Autos Welt — Volkswagen 0km en Argentina',
  description: 'Concesionaria oficial Volkswagen. Polo, Nivus, Taos, Amarok, Tera. También planes adjudicados. Cotizá ahora.',
}

const STATS = [
  { num: '+500', label: 'Autos entregados' },
  { num: '15',   label: 'Años de experiencia' },
  { num: '+320', label: 'Concesionarios adheridos' },
  { num: '40%',  label: 'Ahorro en adjudicados' },
]

const PROCESO = [
  { step: '01', title: 'Consultás sin compromiso', desc: 'Nos describís lo que buscás. Te mostramos opciones reales con precio, disponibilidad y condiciones claras. Sin presión.' },
  { step: '02', title: 'Revisamos la operación', desc: 'Confirmamos stock, financiación y documentación antes de que muevas un pie. La operación sale sola.' },
  { step: '03', title: 'Retirás y volvés manejando', desc: 'Coordinamos la entrega en Buenos Aires. Muchos compradores del interior viajan y vuelven el mismo día con su 0km.' },
]

const VENTAJAS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="22" height="22">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
    title: 'Sin promesas vacías',
    desc: 'Cada condición que te damos está validada antes de confirmarte. Precio, stock, financiación y plazos: sin letra chica.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="22" height="22">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Entrega inmediata',
    desc: 'Tenemos acceso a stock disponible. Sin sorteos, sin esperas. Tu 0km listo para retirar cuando la operación esté confirmada.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="22" height="22">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: 'Cuotas fijas en pesos',
    desc: 'Financiación oficial Volkswagen Argentina. Cuotas que no se ajustan. Planificá tu compra con números reales.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="22" height="22">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Asesoramiento de persona real',
    desc: 'Pablo Alessio, 15 años operando en el rubro. Te atiende una persona con experiencia, no un bot ni un call center.',
  },
]

const BUENOS_AIRES_VENTAJAS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" width="20" height="20">
        <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><line x1="12" y1="12" x2="12" y2="12"/>
        <circle cx="12" cy="12" r="1"/>
      </svg>
    ),
    title: 'Mayor stock disponible',
    desc: 'CABA concentra la mayor oferta de 0km del país. Más opciones, más versiones, más posibilidades.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" width="20" height="20">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Mejores condiciones de financiación',
    desc: 'Acceso a planes con tasa preferencial que muchos concesionarios del interior no ofrecen.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" width="20" height="20">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Entrega en horas, no semanas',
    desc: 'Sin listas de espera. Coordinamos la entrega antes de que viajes, para que el tiempo en CABA sea mínimo.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" width="20" height="20">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Operación revisada antes de viajar',
    desc: 'Confirmamos todo antes de que subas al micro o al avión. No viajás a probar suerte. Viajás con la compra hecha.',
  },
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
        style={{ background: '#0A1020', minHeight: '92vh' }}
      >
        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(245,158,11,.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        {/* Glow bottom-left */}
        <div className="absolute bottom-0 left-0 pointer-events-none"
          style={{
            width: '800px', height: '500px',
            background: 'radial-gradient(ellipse at bottom left, rgba(27,58,107,.22) 0%, transparent 65%)'
          }} />
        {/* Glow top-right subtle */}
        <div className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: '600px', height: '400px',
            background: 'radial-gradient(ellipse at top right, rgba(245,158,11,.04) 0%, transparent 70%)'
          }} />

        <div
          className="relative max-w-6xl mx-auto px-6 w-full flex items-center"
          style={{ minHeight: '92vh' }}
        >
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center w-full py-24">

            {/* ── Texto ── */}
            <div>
              {/* Badge live */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-7 rounded-full"
                style={{ background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)' }}>
                <span className="dot-live" />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#F59E0B' }}>
                  Stock disponible · Entrega inmediata
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-black text-white leading-none mb-4"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 3.875rem)', letterSpacing: '-.035em', lineHeight: '1.02' }}
              >
                Tu próximo auto<br />
                <span style={{ color: '#F59E0B' }}>0km</span>, operado<br />
                desde Buenos Aires.
              </h1>

              {/* Subtítulo orientado al interior */}
              <p className="mb-7 leading-relaxed" style={{ color: '#8B9DB5', fontSize: '1rem', maxWidth: '460px', lineHeight: '1.75' }}>
                Compradores del interior del país acceden a&nbsp;
                <strong style={{ color: '#CBD5E1' }}>mejor stock, mejores precios y financiación</strong>&nbsp;
                que no encuentran en su ciudad. Coordinamos todo antes de que viajes.
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" width="14" height="14" style={{ flexShrink: 0 }}>
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
                  style={{ fontSize: '0.9375rem' }}
                >
                  <WaIcon />
                  Consultar por WhatsApp
                </a>
                <Link href="/#modelos" className="btn-outline-white btn-amber-lg" style={{ fontSize: '0.9375rem' }}>
                  Ver modelos disponibles
                </Link>
              </div>

              {/* Authority strip */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" width="16" height="16">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-xs font-semibold" style={{ color: '#64748B' }}>15 años en el mercado</span>
                </div>
                <span className="trust-divider" />
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" width="16" height="16">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                  <span className="text-xs font-semibold" style={{ color: '#64748B' }}>+500 operaciones concretadas</span>
                </div>
                <span className="trust-divider" />
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" width="16" height="16">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span className="text-xs font-semibold" style={{ color: '#64748B' }}>Asesor con nombre y apellido</span>
                </div>
              </div>

              {/* Stats */}
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

      {/* ═══ INTERIOR ADVANTAGE BANNER ══════════════════════════════════════ */}
      <section style={{ background: '#0F172A', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-medium" style={{ color: '#94A3B8' }}>
              <strong style={{ color: '#F59E0B' }}>¿Estás en el interior del país?</strong>{' '}
              En Buenos Aires encontrás mejor stock, mejores precios y financiación que no llega a tu ciudad.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20soy%20del%20interior%20del%20pa%C3%ADs%20y%20quiero%20cotizar%20un%200km`}
              target="_blank" rel="noopener noreferrer"
              className="text-xs font-bold shrink-0"
              style={{ color: '#F59E0B', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              Consultá sin compromiso →
            </a>
          </div>
        </div>
      </section>

      {/* ═══ SIMULADOR ═══════════════════════════════════════════════════════ */}
      <section id="simulador" style={{ background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            <div className="lg:sticky lg:top-24">
              <span className="section-eyebrow">Simulador gratuito</span>
              <h2 className="section-title mb-2">Calculá tu cuota<br />en segundos</h2>
              <div className="section-divider mb-5" />
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748B', maxWidth: '380px' }}>
                Elegís el modelo, ingresás tus datos y te mostramos
                la cuota estimada del plan adjudicado. Sin compromiso, sin formularios interminables.
              </p>

              <div className="space-y-3">
                {[
                  'Resultado inmediato, sin esperas',
                  'Sin compromiso de compra',
                  'Asesor disponible para consultas',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm" style={{ color: '#475569' }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(245,158,11,.12)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" width="11" height="11">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <SimuladorForm />
          </div>
        </div>
      </section>

      {/* ═══ POR QUÉ BUENOS AIRES ════════════════════════════════════════════ */}
      <section style={{ background: '#0F172A', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">

          {/* Header */}
          <div className="mb-12 max-w-2xl">
            <span className="section-eyebrow">Para compradores del interior</span>
            <h2 className="section-title-white mb-2">
              ¿Por qué compradores de todo el país<br className="hidden md:block" /> eligen operar desde Buenos Aires?
            </h2>
            <div className="section-divider mb-5" />
            <p className="text-sm leading-relaxed" style={{ color: '#64748B', maxWidth: '500px' }}>
              No viajás a probar suerte. Nos encargamos de que la operación esté confirmada antes de que pises CABA.
            </p>
          </div>

          {/* Grid ventajas CABA */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {BUENOS_AIRES_VENTAJAS.map((v) => (
              <div key={v.title} className="p-5 rounded-xl" style={{
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.07)',
              }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'rgba(245,158,11,.1)', border: '1px solid rgba(245,158,11,.15)' }}>
                  {v.icon}
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: '#F1F5F9' }}>{v.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA interior */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between p-6 rounded-xl"
            style={{ background: 'rgba(245,158,11,.06)', border: '1px solid rgba(245,158,11,.15)' }}>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: '#F1F5F9' }}>
                Operamos en todo el país. Coordinamos cada detalle.
              </p>
              <p className="text-xs" style={{ color: '#64748B' }}>
                Córdoba · Mendoza · Rosario · Tucumán · Neuquén · Mar del Plata · y todo el interior.
              </p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20soy%20del%20interior%20y%20quiero%20cotizar%20un%200km%20desde%20Buenos%20Aires`}
              target="_blank" rel="noopener noreferrer"
              className="btn-amber shrink-0"
              style={{ fontSize: '0.875rem' }}
            >
              <WaIcon />
              Quiero cotizar
            </a>
          </div>
        </div>
      </section>

      {/* ═══ MODELOS VW ══════════════════════════════════════════════════════ */}
      <section id="modelos" style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-eyebrow">Volkswagen · Línea completa</span>
              <h2 className="section-title mb-1">Modelos disponibles en 0km</h2>
              <div className="section-divider" />
              <p className="text-sm mt-3" style={{ color: '#64748B' }}>Precio oficial · Entrega desde concesionaria · Garantía de fábrica</p>
            </div>
            <div className="flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-xl" style={{ background: '#fff', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(15,23,42,.05)' }}>
              <img src="/images/autos/Volkswagen_logo_2019.svg.png" alt="Volkswagen" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
              <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>Concesionario oficial</span>
            </div>
          </div>

          {/* Grid modelos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VW_MODELS.slice(0, 5).map((model) => {
              const hasImg = model.imagenes.length > 0
              const waText = encodeURIComponent(`Hola, quiero cotizar un Volkswagen ${model.nombre} 0km`)
              return (
                <div key={model.id} className="car-card">

                  {/* Media */}
                  <div className="relative overflow-hidden" style={{ height: '210px', background: '#0F172A' }}>
                    {hasImg ? (
                      <img
                        src={model.imagenes[0]}
                        alt={`VW ${model.nombre}`}
                        className="w-full h-full object-cover"
                        style={{ transition: 'transform .5s ease' }}
                        loading="lazy"
                      />
                    ) : model.video ? (
                      <video
                        src={model.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-black text-2xl" style={{ color: '#F59E0B' }}>VW</span>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to top, rgba(10,16,32,.75) 0%, transparent 55%)'
                    }} />
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      <span className="tag" style={{ background: 'rgba(0,20,60,.85)', color: '#fff', border: '1px solid rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', fontSize: '0.625rem' }}>
                        {model.tipo}
                      </span>
                      <div className="flex gap-1.5">
                        {model.badge && (
                          <span className="tag" style={{ background: 'rgba(245,158,11,.92)', color: '#0F172A', border: 'none', fontSize: '0.625rem' }}>
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

                  {/* Body */}
                  <div className="car-card-body">
                    <p className="text-xs leading-relaxed mb-4" style={{ color: '#64748B' }}>{model.tagline}</p>

                    {/* Versiones */}
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

                    {/* CTAs */}
                    <div className="mt-auto pt-3 flex gap-2" style={{ borderTop: '1px solid #F1F5F9' }}>
                      <Link
                        href={`/modelos/${model.slug}`}
                        className="btn-navy"
                        style={{ flex: 1, justifyContent: 'center', fontSize: '.8rem', padding: '0.625rem 0.75rem' }}
                      >
                        Ver modelo
                      </Link>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn-amber"
                        style={{ flex: 1, justifyContent: 'center', fontSize: '.8rem', padding: '0.625rem 0.75rem' }}
                      >
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
      <section id="adjudicados" style={{ background: '#0F172A' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="section-eyebrow">Disponibles ahora</span>
              <h2 className="section-title-white mb-1">Planes adjudicados</h2>
              <div className="section-divider mb-2" />
              <p className="text-sm" style={{ color: '#64748B' }}>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VENTAJAS.map((v) => (
              <div key={v.title} className="card-premium p-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0"
                  style={{ background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.15)', color: '#D97706' }}>
                  {v.icon}
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: '#0F172A', lineHeight: '1.4' }}>{v.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Pablo Alessio authority block */}
          <div className="mt-8 p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-5"
            style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-black text-xl"
              style={{ background: 'linear-gradient(135deg, #0F172A, #1B3A6B)', color: '#F59E0B' }}>
              PA
            </div>
            <div>
              <p className="font-bold text-sm mb-0.5" style={{ color: '#0F172A' }}>Pablo Alessio — Asesor comercial</p>
              <p className="text-xs leading-relaxed" style={{ color: '#64748B', maxWidth: '560px' }}>
                15 años trabajando en el rubro automotriz. Trayectoria en concesionarias, gestión de leads y cierre comercial.
                Te atiendo personalmente, con información real y sin promesas vacías.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIOS ═════════════════════════════════════════════════════ */}
      <TestimoniosSection />

      {/* ═══ PROCESO ═════════════════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: '#fff', borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="section-eyebrow">Proceso</span>
            <h2 className="section-title mb-2">Tres pasos para tener tu auto</h2>
            <div className="section-divider section-divider-center" />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {PROCESO.map((p) => (
              <div key={p.step} className="p-8 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <span className="mono font-black text-5xl block mb-5"
                  style={{ color: '#F59E0B', letterSpacing: '-.04em', lineHeight: 1 }}>{p.step}</span>
                <h3 className="font-bold mb-2.5" style={{ color: '#0F172A', fontSize: '0.9375rem' }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{p.desc}</p>
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
      <section style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {[
              { icon: '⚡', text: 'Entrega inmediata' },
              { icon: '📋', text: 'Cuotas fijas en pesos' },
              { icon: '🔄', text: 'Tomamos tu usado' },
              { icon: '🤝', text: 'Atención personalizada' },
              { icon: '🗺️', text: 'Operamos en todo el país' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2.5">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-semibold" style={{ color: '#334155' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══════════════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1B3A6B 100%)' }}>
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="section-eyebrow" style={{ color: 'rgba(245,158,11,.8)' }}>Próximo paso</span>
              <h2 className="font-black text-white mb-3"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', letterSpacing: '-.025em', lineHeight: '1.15' }}>
                ¿Ya sabés lo que buscás?<br />
                <span style={{ color: '#F59E0B' }}>Empezamos ahora.</span>
              </h2>
              <p className="text-sm" style={{ color: '#64748B', lineHeight: '1.7' }}>
                Un asesor te responde en minutos. Sin bots, sin formularios interminables.
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
              <a href="/modelos/amarok#financiador" className="btn-outline-white">
                Cotizá tu Amarok 0km
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
