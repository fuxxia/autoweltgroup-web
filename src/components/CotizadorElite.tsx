'use client'

import { useState, useRef } from 'react'
import { type ModeloFinanciamiento, type PlanCredito } from '@/data/financiamiento'
import { formatARS, WHATSAPP_NUMBER } from '@/lib/utils'

// VW brand palette
const VW = {
  blue:     '#001E50',
  blueMid:  '#0040C1',
  blueLight:'#E8F0FE',
  silver:   '#DFE4EA',
  silverBg: '#F5F6F7',
  text:     '#000000',
  muted:    '#6A7280',
  green:    '#2CA836',
  white:    '#FFFFFF',
}

function buildWAUrl(nombre: string, telefono: string, email: string, plan: PlanCredito, modelo: ModeloFinanciamiento): string {
  const msg = [
    `¡Hola! Me interesa el *Volkswagen ${modelo.nombre} ${modelo.version}* 0km.`,
    ``,
    `📋 *Plan elegido:*`,
    `• ${plan.cuotas} cuotas de ${formatARS(plan.montoCuota)}/mes`,
    `• Anticipo: ${formatARS(plan.anticipo)}`,
    `• Capital financiado: ${formatARS(plan.capitalMaximo)}`,
    plan.gastosFinanciacion > 0
      ? `• Gastos de financiación: ${formatARS(plan.gastosFinanciacion)}`
      : `• Sin gastos de financiación`,
    ``,
    `👤 *Mis datos:*`,
    `• Nombre: ${nombre}`,
    `• Teléfono: ${telefono}`,
    email ? `• Email: ${email}` : null,
    ``,
    `¿Me pueden contactar para coordinar?`,
  ].filter(Boolean).join('\n')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export default function CotizadorElite({ modelo }: { modelo: ModeloFinanciamiento }) {
  const [selectedPlan, setSelectedPlan] = useState<PlanCredito>(
    modelo.planes.find(p => p.destacado) ?? modelo.planes[0]
  )
  const [step, setStep]   = useState<'plan' | 'form'>('plan')
  const [nombre, setNombre]     = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail]       = useState('')
  const [error, setError]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const handleSubmit = () => {
    if (!nombre.trim())   { setError('Ingresá tu nombre.'); return }
    if (!telefono.trim()) { setError('Ingresá tu teléfono o WhatsApp.'); return }
    setError('')
    setSubmitted(true)
    window.open(buildWAUrl(nombre, telefono, email, selectedPlan, modelo), '_blank', 'noopener,noreferrer')
  }

  const goToForm = () => {
    setStep('form')
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const STEPS = [
    { key: 'plan',  label: 'Financiación' },
    { key: 'form',  label: 'Contacto' },
  ]

  return (
    <div style={{ background: VW.white, minHeight: '100vh', paddingTop: 68 }}>

      {/* ══════════════════════════════════════════════
          HEADER DEL CONFIGURADOR
      ══════════════════════════════════════════════ */}
      <div style={{
        borderBottom: `1px solid ${VW.silver}`,
        background: VW.white,
        position: 'sticky', top: 68, zIndex: 30,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 52 }}>
          <div className="cotiz-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: VW.muted, letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Volkswagen
            </span>
            <span style={{ color: VW.silver }}>›</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: VW.blue, letterSpacing: '.06em', textTransform: 'uppercase' }}>
              {modelo.nombre} {modelo.version}
            </span>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', gap: 0 }}>
            {STEPS.map((s, i) => (
              <button
                key={s.key}
                onClick={() => {
                  setStep(s.key as 'plan' | 'form')
                  if (s.key === 'form') setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
                }}
                style={{
                  padding: '0 16px',
                  height: 52, border: 'none',
                  borderBottom: step === s.key ? `2px solid ${VW.blue}` : '2px solid transparent',
                  background: 'none',
                  fontSize: '0.72rem', fontWeight: step === s.key ? 700 : 500,
                  color: step === s.key ? VW.blue : VW.muted,
                  cursor: 'pointer', letterSpacing: '.04em',
                  display: 'flex', alignItems: 'center', gap: 7,
                  transition: 'color .15s, border-color .15s',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: step === s.key ? VW.blue : VW.silver,
                  color: step === s.key ? '#fff' : VW.muted,
                  fontSize: '0.6rem', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                {s.label}
              </button>
            ))}
          </div>

          <div className="cotiz-entrega" style={{ fontSize: '0.72rem', color: VW.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: VW.green, display: 'inline-block',
            }} />
            Entrega inmediata
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          CAR HERO — imagen + precio oferta
      ══════════════════════════════════════════════ */}
      <div style={{ background: VW.silverBg, borderBottom: `1px solid ${VW.silver}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 40, alignItems: 'center' }}
               className="cotiz-hero-grid">

            {/* Car hero — video or image */}
            <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', aspectRatio: '16/9', background: '#E8ECF0' }}>
              {modelo.imagenHero?.endsWith('.mp4') ? (
                <video
                  src={modelo.imagenHero}
                  autoPlay muted loop playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%', display: 'block' }}
                />
              ) : (
                <img
                  src={modelo.imagenHero || modelo.imagenPrincipal}
                  alt={`Volkswagen ${modelo.nombre} ${modelo.version}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%', display: 'block' }}
                />
              )}
            </div>

            {/* Price card */}
            <div style={{
              background: VW.white,
              border: `1px solid ${VW.silver}`,
              borderBottom: 'none',
              borderRadius: '12px 12px 0 0',
              padding: '28px 28px 32px',
            }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{
                  display: 'inline-block',
                  background: VW.blue, color: VW.white,
                  fontSize: '0.6rem', fontWeight: 700, letterSpacing: '.14em',
                  padding: '4px 10px', borderRadius: 4,
                  textTransform: 'uppercase', marginBottom: 12,
                }}>
                  {modelo.badge}
                </div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: VW.text, lineHeight: 1.15, margin: 0 }}>
                  {modelo.nombre}
                </h1>
                <p style={{ fontSize: '0.9rem', color: VW.muted, margin: '4px 0 0', fontWeight: 500 }}>
                  {modelo.version} · {modelo.motor} · {modelo.transmision}
                </p>
              </div>

              {/* Price breakdown */}
              <div style={{
                borderTop: `1px solid ${VW.silver}`,
                paddingTop: 16, marginBottom: 16,
              }}>
                {/* Bono destacado */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)',
                  borderRadius: 6, padding: '7px 12px', marginBottom: 10,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(0,0,0,.55)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em' }}>
                      🎁 Bono especial
                    </span>
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-.01em' }}>
                    − {formatARS(modelo.descuento)}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: VW.muted }}>Precio de lista</span>
                  <span style={{ fontSize: '0.85rem', color: VW.muted, textDecoration: 'line-through' }}>
                    {formatARS(modelo.precioLista)}
                  </span>
                </div>
                <div style={{
                  background: VW.blue,
                  borderRadius: 8, padding: '12px 16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 2 }}>
                      Oferta para patentar
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: VW.white, letterSpacing: '-.02em', lineHeight: 1 }}>
                      {formatARS(modelo.ofertaPatentar)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,.5)', marginBottom: 2 }}>✓ Flete incluido</div>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,.5)' }}>✓ Formulario incluido</div>
                  </div>
                </div>
              </div>

              <button
                onClick={goToForm}
                style={{
                  width: '100%', padding: '16px 20px', marginBottom: 10,
                  background: VW.blue, color: VW.white,
                  fontWeight: 800, fontSize: '0.95rem',
                  letterSpacing: '.04em', textTransform: 'uppercase',
                  border: 'none', borderRadius: 8,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  transition: 'background .15s, box-shadow .15s',
                  boxShadow: '0 4px 16px rgba(0,30,80,.25)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0040C1'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,30,80,.4)' }}
                onMouseLeave={e => { e.currentTarget.style.background = VW.blue; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,30,80,.25)' }}
              >
                Solicitar cotización
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          PLANES — selector horizontal estilo VW
      ══════════════════════════════════════════════ */}
      <section style={{ padding: '56px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, alignItems: 'start' }}
               className="cotiz-body-grid">

            {/* Left — plan selector */}
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: VW.muted, marginBottom: 6 }}>
                Financiación Fábrica Volkswagen · Tasa 0%
              </p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: VW.text, marginBottom: 6, letterSpacing: '-.02em' }}>
                Plan de financiación
              </h2>
              <p style={{ fontSize: '0.85rem', color: VW.muted, marginBottom: 32, lineHeight: 1.6 }}>
                Crédito con cuotas fijas en pesos. Sin intereses. Directo con Fábrica Volkswagen.
              </p>

              {/* Plan cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {modelo.planes.map((plan) => {
                  const sel = selectedPlan.id === plan.id
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '28px 1fr 1fr 1fr',
                        gap: 0,
                        alignItems: 'center',
                        background: sel ? VW.blue : VW.white,
                        border: sel ? `1.5px solid ${VW.blue}` : `1.5px solid ${VW.silver}`,
                        borderRadius: 8,
                        padding: '16px 20px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all .15s',
                        position: 'relative',
                      }}
                      onMouseEnter={e => { if (!sel) e.currentTarget.style.borderColor = VW.blue }}
                      onMouseLeave={e => { if (!sel) e.currentTarget.style.borderColor = VW.silver }}
                    >
                      {plan.destacado && (
                        <span style={{
                          position: 'absolute', top: -9, left: 56,
                          background: '#F59E0B', color: '#000',
                          fontSize: '0.55rem', fontWeight: 800, letterSpacing: '.1em',
                          padding: '2px 8px', borderRadius: 99, textTransform: 'uppercase',
                        }}>
                          ★ {plan.label}
                        </span>
                      )}

                      {/* Radio */}
                      <div style={{
                        width: 18, height: 18, borderRadius: '50%',
                        border: sel ? `5px solid ${VW.white}` : `2px solid ${VW.silver}`,
                        background: sel ? VW.white : 'transparent',
                        boxShadow: sel ? `0 0 0 2px ${VW.white}` : 'none',
                        flexShrink: 0,
                      }} />

                      {/* Cuotas */}
                      <div style={{ paddingLeft: 12 }}>
                        <div style={{ fontSize: '0.62rem', fontWeight: 600, color: sel ? 'rgba(255,255,255,.55)' : VW.muted, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 2 }}>
                          Plazo
                        </div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: sel ? VW.white : VW.text, letterSpacing: '-.01em' }}>
                          {plan.cuotas} cuotas
                        </div>
                      </div>

                      {/* Cuota mensual */}
                      <div>
                        <div style={{ fontSize: '0.62rem', fontWeight: 600, color: sel ? 'rgba(255,255,255,.55)' : VW.muted, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 2 }}>
                          Cuota
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: sel ? VW.white : VW.text }}>
                          {formatARS(plan.montoCuota)}
                          <span style={{ fontSize: '0.7rem', fontWeight: 500, color: sel ? 'rgba(255,255,255,.5)' : VW.muted }}>/mes</span>
                        </div>
                      </div>

                      {/* Anticipo */}
                      <div>
                        <div style={{ fontSize: '0.62rem', fontWeight: 600, color: sel ? 'rgba(255,255,255,.55)' : VW.muted, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 2 }}>
                          Anticipo
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: sel ? '#F59E0B' : VW.text }}>
                          {formatARS(plan.anticipo)}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <p style={{ fontSize: '0.7rem', color: VW.muted, marginTop: 16, lineHeight: 1.6 }}>
                * Valores orientativos vigentes al momento de la consulta. Sujeto a disponibilidad y aprobación crediticia.
              </p>
            </div>

            {/* Right — resumen sticky */}
            <div style={{ position: 'sticky', top: 132 }}>
              <div style={{
                border: `1px solid ${VW.silver}`,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
                <div style={{
                  background: VW.blue,
                  padding: '16px 20px',
                }}>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,.55)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                    Plan seleccionado
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: VW.white, lineHeight: 1 }}>
                    {selectedPlan.cuotas} cuotas × {formatARS(selectedPlan.montoCuota)}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,.55)', marginTop: 4 }}>
                    {modelo.nombre} {modelo.version}
                  </div>
                </div>

                <div style={{ padding: '0 20px', background: VW.white }}>
                  {[
                    { label: 'Anticipo requerido', val: formatARS(selectedPlan.anticipo), strong: true },
                    { label: 'Capital financiado', val: formatARS(selectedPlan.capitalMaximo) },
                    { label: 'Gastos de financiación', val: selectedPlan.gastosFinanciacion > 0 ? formatARS(selectedPlan.gastosFinanciacion) : 'Sin gastos' },
                    { label: 'Total de cuotas', val: formatARS(selectedPlan.montoCuota * selectedPlan.cuotas) },
                    { label: 'Oferta para patentar', val: formatARS(modelo.ofertaPatentar), strong: true },
                  ].map((row, i) => (
                    <div key={row.label} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: i < 4 ? `1px solid ${VW.silver}` : 'none',
                    }}>
                      <span style={{ fontSize: '0.75rem', color: VW.muted }}>{row.label}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: row.strong ? 800 : 600, color: row.strong ? VW.blue : VW.text }}>
                        {row.val}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '16px 20px', borderTop: `1px solid ${VW.silver}`, background: VW.silverBg }}>
                  <button
                    onClick={goToForm}
                    style={{
                      width: '100%', padding: '15px 20px',
                      background: VW.blue, color: VW.white,
                      fontWeight: 800, fontSize: '0.9rem',
                      letterSpacing: '.04em', textTransform: 'uppercase',
                      border: 'none', borderRadius: 8, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      transition: 'background .15s, box-shadow .15s',
                      boxShadow: '0 4px 16px rgba(0,30,80,.25)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = VW.blueMid; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,30,80,.4)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = VW.blue; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,30,80,.25)' }}
                  >
                    Solicitar este crédito
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FORMULARIO DE CONTACTO
      ══════════════════════════════════════════════ */}
      <section ref={formRef} style={{ background: VW.silverBg, borderTop: `1px solid ${VW.silver}`, padding: '56px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 520px', gap: 64, alignItems: 'start' }}
               className="cotiz-form-grid">

            {/* Left — copy */}
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: VW.muted, marginBottom: 6 }}>
                Paso 2
              </p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: VW.text, marginBottom: 12, letterSpacing: '-.02em' }}>
                Solicitá tu cotización
              </h2>
              <p style={{ fontSize: '0.9rem', color: VW.muted, lineHeight: 1.7, marginBottom: 28 }}>
                Completá tus datos y un asesor de AutoWelt Group te contacta en minutos con todos los detalles de tu cotización.
              </p>

              {/* Selected plan summary */}
              <div style={{
                background: VW.white,
                border: `1px solid ${VW.silver}`,
                borderRadius: 8, padding: '16px 20px',
              }}>
                <div style={{ fontSize: '0.6rem', color: VW.muted, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Tu plan
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.8rem', color: VW.muted }}>{modelo.nombre} {modelo.version}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: VW.text }}>{selectedPlan.cuotas} cuotas</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.8rem', color: VW.muted }}>Cuota mensual</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: VW.blue }}>{formatARS(selectedPlan.montoCuota)}/mes</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', color: VW.muted }}>Anticipo</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: VW.blue }}>{formatARS(selectedPlan.anticipo)}</span>
                </div>
              </div>

              {/* Trust signals */}
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  'Tasa 0% — sin intereses',
                  'Cuotas fijas en pesos',
                  '+30 años en el mercado',
                  '+2.500 autos entregados',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: VW.muted }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: VW.blueLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke={VW.blue} strokeWidth="3" width="8" height="8">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div>
              {!submitted ? (
                <div style={{
                  background: VW.white,
                  border: `1px solid ${VW.silver}`,
                  borderRadius: 10, padding: '32px',
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 24 }}>
                    {[
                      { label: 'Nombre y apellido *', type: 'text', ph: 'Ej: Juan García', val: nombre, set: setNombre },
                      { label: 'Teléfono / WhatsApp *', type: 'tel', ph: 'Ej: 11 5678-9012', val: telefono, set: setTelefono },
                      { label: 'Email (opcional)', type: 'email', ph: 'Ej: juan@gmail.com', val: email, set: setEmail },
                    ].map(field => (
                      <div key={field.label}>
                        <label style={{
                          fontSize: '0.72rem', fontWeight: 700, color: VW.text,
                          display: 'block', marginBottom: 6, letterSpacing: '.02em',
                        }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.ph}
                          value={field.val}
                          onChange={e => field.set(e.target.value)}
                          style={{
                            width: '100%', padding: '11px 14px',
                            background: VW.white,
                            border: `1.5px solid ${VW.silver}`,
                            borderRadius: 6, color: VW.text, fontSize: '0.875rem',
                            outline: 'none', boxSizing: 'border-box',
                            transition: 'border-color .15s',
                          }}
                          onFocus={e => { e.currentTarget.style.borderColor = VW.blue }}
                          onBlur={e => { e.currentTarget.style.borderColor = VW.silver }}
                        />
                      </div>
                    ))}
                  </div>

                  {error && (
                    <p style={{ color: '#DC2626', fontSize: '0.78rem', marginBottom: 12 }}>⚠ {error}</p>
                  )}

                  {/* Primary CTA — WhatsApp */}
                  <button
                    onClick={handleSubmit}
                    style={{
                      width: '100%', padding: '17px 20px', marginBottom: 12,
                      background: '#25D366', color: '#fff',
                      fontWeight: 800, fontSize: '1rem', letterSpacing: '.02em',
                      border: 'none', borderRadius: 8, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      transition: 'background .15s, box-shadow .15s',
                      boxShadow: '0 4px 18px rgba(37,211,102,.35)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#1FB855'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(37,211,102,.5)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(37,211,102,.35)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    Enviar por WhatsApp
                  </button>

                  {/* Secondary CTA — phone */}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '100%', padding: '11px 20px',
                      background: 'none',
                      border: `1.5px solid ${VW.silver}`,
                      borderRadius: 6, color: VW.text,
                      fontWeight: 600, fontSize: '0.82rem', letterSpacing: '.02em',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      textDecoration: 'none', cursor: 'pointer',
                      transition: 'border-color .15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = VW.blue }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = VW.silver }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.19 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                    Prefiero que me llamen
                  </a>

                  <p style={{ textAlign: 'center', fontSize: '0.67rem', color: VW.muted, marginTop: 14, lineHeight: 1.5 }}>
                    Tu información es confidencial. No compartimos datos con terceros.
                  </p>
                </div>
              ) : (
                /* Success */
                <div style={{
                  background: VW.white, border: `1px solid ${VW.silver}`,
                  borderRadius: 10, padding: '40px 32px', textAlign: 'center',
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'rgba(44,168,54,.1)', border: `2px solid ${VW.green}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '1.4rem',
                  }}>✓</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: VW.text, marginBottom: 8 }}>
                    Solicitud enviada
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: VW.muted, lineHeight: 1.7, marginBottom: 24 }}>
                    Si WhatsApp no se abrió, usá el botón de abajo.
                  </p>
                  <a
                    href={buildWAUrl(nombre, telefono, email, selectedPlan, modelo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '11px 24px', background: '#25D366', color: '#fff',
                      fontWeight: 700, fontSize: '0.875rem', borderRadius: 6, textDecoration: 'none',
                    }}
                  >
                    Abrir WhatsApp
                  </a>
                  <div style={{ marginTop: 16 }}>
                    <button
                      onClick={() => setSubmitted(false)}
                      style={{ background: 'none', border: 'none', color: VW.muted, fontSize: '0.78rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Modificar datos
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .cotiz-hero-grid  { grid-template-columns: 1fr !important; }
          .cotiz-body-grid  { grid-template-columns: 1fr !important; }
          .cotiz-form-grid  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .cotiz-breadcrumb { display: none !important; }
          .cotiz-entrega    { display: none !important; }
          .cotiz-body-grid > div:first-child button {
            grid-template-columns: 22px 1fr 1fr !important;
          }
          .cotiz-body-grid > div:first-child button > div:last-child {
            display: none !important;
          }
        }
        input::placeholder { color: #A0AEC0; }
      `}</style>
    </div>
  )
}
