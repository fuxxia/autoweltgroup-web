import type { Metadata } from 'next'
import Link from 'next/link'
import { ADJUDICADOS } from '@/data/adjudicados'
import { VW_MODELS } from '@/data/volkswagen'
import AdjudicadoCard from '@/components/AdjudicadoCard'
import SimuladorForm from '@/components/SimuladorForm'
import HeroCarSlider from '@/components/HeroCarSlider'
import CounterStats from '@/components/CounterStats'
import { WHATSAPP_NUMBER } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Autos Welt — Volkswagen 0km en Argentina',
  description: 'Concesionaria oficial Volkswagen. Polo, Nivus, Taos, Amarok, Tera. También planes adjudicados. Cotizá ahora.',
}

const STATS = [
  { num: '+2500', label: 'Autos entregados' },
  { num: '+30',   label: 'Años en el mercado' },
  { num: '+320',  label: 'Concesionarios adheridos' },
  { num: '40%',   label: 'Ahorro en adjudicados' },
]

const PROCESO = [
  { step: '01', title: 'Elegís el vehículo',      desc: 'Buscás por modelo o tipo de compra. Te mostramos todas las opciones disponibles.' },
  { step: '02', title: 'Consultás con un asesor', desc: 'Te explicamos precio, documentación y plazos. Sin compromiso, sin letra chica.' },
  { step: '03', title: 'Retirás tu auto',          desc: 'Firmamos y coordinamos la entrega desde la concesionaria. Rápido y sin vueltas.' },
]

const VENTAJAS = [
  { icon: '🏆', title: 'Marca líder del mercado',  desc: 'Volkswagen es la marca más vendida de Argentina. Calidad y respaldo garantizado.' },
  { icon: '⚡', title: 'Entrega inmediata',          desc: 'Stock disponible. Sin esperas, sin listas de espera. Tu 0km listo para retirar.' },
  { icon: '💰', title: 'Adjudicados hasta 40% off', desc: 'Accedés a un 0km a precio de cesión, ahorrando hasta un 40% sobre el valor de lista.' },
  { icon: '🤝', title: 'Asesoramiento completo',    desc: 'Te acompañamos en cada paso: versión, financiación, documentación y entrega.' },
]

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#0F172A', minHeight: '90vh' }}
      >
        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(245,158,11,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,.025) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
        }} />
        {/* Glow */}
        <div className="absolute bottom-0 left-0 w-[700px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(27,58,107,.2) 0%, transparent 70%)' }} />

        <div
          className="relative max-w-6xl mx-auto px-6 w-full flex items-center"
          style={{ minHeight: '90vh' }}
        >
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center w-full py-28">

            {/* ── Texto ── */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded"
                style={{ background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.18)' }}>
                <span className="dot-live" />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#F59E0B' }}>
                  Stock disponible · 0km
                </span>
              </div>

              <h1
                className="font-black text-white leading-none mb-5"
                style={{ fontSize: 'clamp(2.75rem, 5.5vw, 4rem)', letterSpacing: '-.03em' }}
              >
                Tu Volkswagen<br />
                <span style={{ color: '#F59E0B' }}>0km</span>, con<br />
                Autos Welt.
              </h1>

              <p className="mb-8 leading-relaxed" style={{ color: '#64748B', fontSize: '1rem', maxWidth: '440px' }}>
                Polo · Nivus · Taos · Amarok · Tera.
                <br />
                También planes adjudicados: ahorrás hasta un{' '}
                <strong style={{ color: '#F59E0B' }}>40%</strong> sobre el precio de lista.
                <br />
              </p>

              <div className="flex flex-col gap-2 mb-8">
                {[
                  'Precio oficial Volkswagen Argentina',
                  'Entrega desde concesionaria autorizada',
                  'Financiación y adjudicados disponibles',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm" style={{ color: '#94A3B8' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" width="14" height="14" style={{ flexShrink: 0 }}>
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-12">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20cotizar%20un%20Volkswagen%200km`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-amber btn-amber-lg"
                >
                  Cotizar por WhatsApp
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <Link href="/#modelos" className="btn-outline-white btn-amber-lg">
                  Ver modelos
                </Link>
              </div>

              {/* Stats */}
              <CounterStats stats={STATS} />
            </div>

            {/* ── Slider ── */}
            <div className="hidden lg:block">
              <HeroCarSlider />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SIMULADOR ═══════════════════════════════════════════════════════ */}
      <section id="simulador" style={{ background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            <div className="lg:sticky lg:top-24">
              <span className="section-eyebrow">Simulador gratuito</span>
              <h2 className="section-title mb-4">Calculá tu cuota en segundos</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748B' }}>
                Elegís modelo, ingresás tus datos y te mostramos
                la cuota estimada del plan adjudicado. Sin compromiso.
              </p>

              <div className="space-y-3">
                {[
                  'Resultado inmediato, sin esperas',
                  'Sin compromiso de compra',
                  'Asesor disponible para consultas',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm" style={{ color: '#475569' }}>
                    <div className="w-5 h-5 rounded flex items-center justify-center shrink-0"
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

      {/* ═══ MODELOS VW ══════════════════════════════════════════════════════ */}
      <section id="modelos" style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-eyebrow">Volkswagen · Línea completa</span>
              <h2 className="section-title">6 modelos disponibles en 0km</h2>
              <p className="text-sm mt-1" style={{ color: '#64748B' }}>Precio oficial · Entrega desde concesionaria · Garantía de fábrica</p>
            </div>
            <div className="flex items-center gap-2 shrink-0 px-3 py-2 rounded-lg" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
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
                  <div className="relative overflow-hidden" style={{ height: '200px', background: '#0F172A' }}>
                    {hasImg ? (
                      <img
                        src={model.imagenes[0]}
                        alt={`VW ${model.nombre}`}
                        className="w-full h-full object-cover"
                        style={{ transition: 'transform .4s ease' }}
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

                    {/* Overlay badges */}
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to top, rgba(15,23,42,.7) 0%, transparent 50%)'
                    }} />
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      <span className="tag" style={{ background: 'rgba(0,30,80,.85)', color: '#fff', border: '1px solid rgba(255,255,255,.15)', backdropFilter: 'blur(6px)' }}>
                        {model.tipo}
                      </span>
                      <div className="flex gap-1.5">
                        {model.badge && (
                          <span className="tag" style={{ background: 'rgba(245,158,11,.9)', color: '#0F172A', border: 'none' }}>
                            {model.badge}
                          </span>
                        )}
                        {model.nuevo && (
                          <span className="tag" style={{ background: 'rgba(34,197,94,.9)', color: '#fff', border: 'none' }}>
                            NUEVO
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Model name overlay bottom */}
                    <div className="absolute bottom-3 left-4">
                      <p className="font-black text-white text-xl leading-none" style={{ letterSpacing: '-.02em' }}>
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
                        style={{ flex: 1, justifyContent: 'center', fontSize: '.8rem' }}
                      >
                        Ver modelo
                      </Link>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn-amber"
                        style={{ flex: 1, justifyContent: 'center', fontSize: '.8rem' }}
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
              <h2 className="section-title-white">Planes adjudicados</h2>
              <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                Tomás el plan, pagás la cesión y retirás el auto. Sin sorteos.
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
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="section-eyebrow">¿Por qué elegirnos?</span>
            <h2 className="section-title">Ventajas de comprar con Autos Welt</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VENTAJAS.map((v) => (
              <div key={v.title} className="p-6 rounded-lg" style={{ border: '1px solid #E2E8F0', background: '#FAFAFA' }}>
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-sm mb-1.5" style={{ color: '#0F172A' }}>{v.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESO ═════════════════════════════════════════════════════════ */}
      <section className="py-14" style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="section-eyebrow">Proceso</span>
            <h2 className="section-title">Tres pasos para tener tu auto</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {PROCESO.map((p) => (
              <div key={p.step} className="p-8 rounded-xl" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
                <span className="mono font-black text-4xl block mb-4"
                  style={{ color: '#F59E0B', letterSpacing: '-.03em' }}>{p.step}</span>
                <h3 className="font-bold mb-2" style={{ color: '#0F172A' }}>{p.title}</h3>
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

      {/* ═══ CTA FINAL ═══════════════════════════════════════════════════════ */}
      <section style={{ background: '#F59E0B' }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-black text-2xl mb-2" style={{ color: '#0F172A', letterSpacing: '-.02em' }}>
                ¿Encontraste lo que buscabas?
              </h2>
              <p className="text-sm" style={{ color: '#92400E' }}>
                Un asesor te responde en minutos. Sin bots, sin formularios interminables.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20cotizar%20un%20Volkswagen%200km`}
                target="_blank" rel="noopener noreferrer"
                className="btn-navy"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Cotizar por WhatsApp
              </a>
              <a href="/modelos/amarok#financiador" className="btn-navy">
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
