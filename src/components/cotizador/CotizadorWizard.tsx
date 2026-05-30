'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitLead, buildLeadWhatsApp } from '@/lib/leads'
import type { LeadData } from '@/lib/leads/schema'
import { formatARS } from '@/lib/utils'
import {
  trackFormStart,
  trackStepComplete,
  trackGenerateLead,
  trackWAClick,
} from '@/lib/analytics'

// ── Datos ─────────────────────────────────────────────────────

const VEHICULOS = [
  { id: 'Amarok',      label: 'Amarok',  sub: 'Pickup V6 0km', img: '/images/fotos/amarok/amarokfrente.jpeg', base: 44_900_000, bono: 10_100_000 },
  { id: 'Taos',        label: 'Taos',    sub: 'SUV 0km',       img: '/images/fotos/taos/taos.mp4',            base: 35_000_000, bono: 5_000_000  },
  { id: 'Nivus',       label: 'Nivus',   sub: 'SUV Coupé 0km', img: '/images/fotos/nivus/nivus.mp4',          base: 30_000_000, bono: 4_000_000  },
  { id: 'Polo',        label: 'Polo',    sub: 'Hatchback 0km', img: '/images/fotos/polo/polofrente.jpeg',     base: 22_000_000, bono: 2_500_000  },
  { id: 'Tera',        label: 'Tera',    sub: 'SUV 7 asientos', img: '/images/fotos/tera/tera0.jpeg',         base: 42_000_000, bono: 6_000_000  },
  { id: 'Otro Volkswagen', label: 'Otro VW', sub: 'Consultar versión', img: '',                               base: 35_000_000, bono: 4_000_000  },
]

const ANTICIPOS = [
  { id: '5m',    label: '$5.000.000',  value: 5_000_000  },
  { id: '10m',   label: '$10.000.000', value: 10_000_000 },
  { id: '15m',   label: '$15.000.000', value: 15_000_000 },
  { id: '20m',   label: '$20.000.000', value: 20_000_000 },
  { id: '25m',   label: '$25.000.000', value: 25_000_000 },
  { id: 'mas',   label: '+$25.000.000', value: 30_000_000 },
  { id: 'usado', label: 'Tengo usado para entregar', value: 0, isUsado: true },
]

interface Plan {
  id: string
  label: string
  cuotas: number
  cuotaMensual: number
  anticipo: number
  capitalFinanciado: number
  bono: number
  destacado: boolean
}

function calcularPlanes(vehiculoId: string, anticipoValue: number, tieneUsado: boolean): Plan[] {
  const v = VEHICULOS.find(x => x.id === vehiculoId) ?? VEHICULOS[0]
  const anticipoEfectivo = tieneUsado ? v.base * 0.3 : anticipoValue
  const capitalFinanciado = Math.max(v.base - anticipoEfectivo - v.bono, 0)

  return [
    {
      id: '12c',
      label: 'Acceso rápido',
      cuotas: 12,
      cuotaMensual: Math.round(capitalFinanciado / 12),
      anticipo: Math.round(anticipoEfectivo),
      capitalFinanciado,
      bono: v.bono,
      destacado: false,
    },
    {
      id: '24c',
      label: 'El más elegido',
      cuotas: 24,
      cuotaMensual: Math.round(capitalFinanciado / 24),
      anticipo: Math.round(anticipoEfectivo),
      capitalFinanciado,
      bono: v.bono,
      destacado: true,
    },
    {
      id: '36c',
      label: 'Cuota mínima',
      cuotas: 36,
      cuotaMensual: Math.round(capitalFinanciado / 36),
      anticipo: Math.round(anticipoEfectivo),
      capitalFinanciado,
      bono: v.bono,
      destacado: false,
    },
  ]
}

// ── Íconos ────────────────────────────────────────────────────

const CheckIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width={size} height={size}>
    <path d="M20 6L9 17l-5-5"/>
  </svg>
)

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

const ArrowR = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

// ── Animación de slide ────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
}

// ── Componente principal ──────────────────────────────────────

export default function CotizadorWizard() {
  const [step,       setStep]     = useState(1)
  const [direction,  setDir]      = useState(1)
  const [vehiculo,   setVehiculo] = useState('')
  const [anticipoId, setAnticipo] = useState('')
  const [planId,     setPlan]     = useState('24c')
  const [tieneUsado, setUsado]    = useState(false)
  const [nombre,     setNombre]   = useState('')
  const [telefono,   setTelefono] = useState('')
  const [localidad,  setLocalidad]= useState('')
  const [errors,     setErrors]   = useState<Record<string,string>>({})
  const [submitting, setSubmit]   = useState(false)
  const [done,       setDone]     = useState(false)
  const [waUrl,      setWaUrl]    = useState('')
  const [submitErr,  setSubmitErr]= useState('')
  const hasStarted = useRef(false)

  const anticipoObj  = ANTICIPOS.find(a => a.id === anticipoId)
  const vehiculoObj  = VEHICULOS.find(v => v.id === vehiculo)
  const planes       = vehiculo && anticipoId ? calcularPlanes(vehiculo, anticipoObj?.value ?? 0, tieneUsado) : []
  const selectedPlan = planes.find(p => p.id === planId) ?? planes.find(p => p.destacado) ?? planes[0]

  const TOTAL = 4

  function nav(next: number) {
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  function trackStart() {
    if (!hasStarted.current) {
      hasStarted.current = true
      trackFormStart('cotizador_wizard')
    }
  }

  function goNext() {
    if (step === 1) {
      if (!vehiculo) { setErrors({ vehiculo: 'Elegí un vehículo.' }); return }
      setErrors({})
      trackStart()
      trackStepComplete('cotizador_wizard', 1, 'Vehículo')
      nav(2)
    } else if (step === 2) {
      if (!anticipoId) { setErrors({ anticipo: 'Elegí una opción de anticipo.' }); return }
      setErrors({})
      trackStepComplete('cotizador_wizard', 2, 'Anticipo')
      nav(3)
    } else if (step === 3) {
      trackStepComplete('cotizador_wizard', 3, 'Plan')
      nav(4)
    }
  }

  async function handleSubmit() {
    const errs: Record<string,string> = {}
    if (!nombre.trim() || nombre.trim().length < 2) errs.nombre = 'Ingresá tu nombre.'
    if (!telefono.trim() || telefono.trim().length < 8) errs.telefono = 'Ingresá tu WhatsApp.'
    if (!localidad.trim()) errs.localidad = 'Ingresá tu ciudad o provincia.'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSubmit(true)
    setSubmitErr('')

    const leadData: LeadData = {
      nombre:         nombre.trim(),
      telefono:       telefono.trim(),
      email:          '',
      localidad:      localidad.trim(),
      tipoCompra:     '0km',
      modelo:         vehiculo,
      tieneUsado,
      canalPreferido: 'whatsapp',
      source:         'cotizador_wizard_v2',
    }

    const result = await submitLead(leadData)

    trackGenerateLead({
      vehicleModel:  vehiculo,
      vehicleType:   '0km',
      locality:      localidad,
      formLocation:  'cotizador_homepage',
      hasUsado:      tieneUsado,
    })

    setWaUrl(buildLeadWhatsApp(leadData))
    if (!result.ok) setSubmitErr(result.error ?? '')
    setDone(true)
    setSubmit(false)
  }

  function reset() {
    setStep(1); setDir(1)
    setVehiculo(''); setAnticipo(''); setPlan('24c')
    setUsado(false); setNombre(''); setTelefono(''); setLocalidad('')
    setErrors({}); setDone(false); setWaUrl(''); setSubmitErr('')
    hasStarted.current = false
  }

  // ── Success ────────────────────────────────────────────────
  if (done) {
    return (
      <div className="cw-wrap">
        <div style={{
          background: 'linear-gradient(135deg, rgba(217,162,58,.08) 0%, transparent 60%)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}>
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            style={{
              width: 64, height: 64,
              borderRadius: '50%',
              background: 'rgba(34,197,94,.12)',
              border: '2px solid rgba(34,197,94,.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" width="28" height="28">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </motion.div>

          <p className="cw-eyebrow" style={{ textAlign: 'center' }}>
            {submitErr ? 'Un paso más' : 'Propuesta recibida'}
          </p>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.028em', lineHeight: 1.2, marginBottom: '0.75rem', fontFamily: 'var(--font-jakarta), sans-serif' }}>
            {submitErr
              ? 'Escribinos directamente por WhatsApp'
              : `Todo listo${nombre ? `, ${nombre.split(' ')[0]}` : ''}.`}
          </h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.75rem' }}>
            {submitErr
              ? submitErr
              : `Un asesor te va a contactar hoy con la propuesta exacta para el ${vehiculo}. Podés también escribir ahora si preferís.`}
          </p>

          {waUrl && (
            <a
              href={waUrl}
              target="_blank" rel="noopener noreferrer"
              onClick={() => trackWAClick('cotizador_success')}
              className="btn btn-wa w-full justify-center"
              style={{ fontSize: '0.9375rem', marginBottom: '0.75rem' }}
            >
              <WaIcon />
              {submitErr ? 'Escribir por WhatsApp ahora' : 'Hablar con un asesor ahora'}
            </a>
          )}

          <button onClick={reset} className="btn btn-ghost-light w-full justify-center" style={{ fontSize: '0.875rem' }}>
            Hacer otra cotización
          </button>

          <p className="cw-disclaimer">
            Valores orientativos. Financiación sujeta a validación y disponibilidad.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="cw-wrap" style={{ overflow: 'hidden' }}>
      {/* Header */}
      <div className="cw-header" style={{ paddingBottom: '1.25rem' }}>
        <div className="cw-progress">
          <div className="cw-progress-fill" style={{ width: `${(step / TOTAL) * 100}%` }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p className="cw-eyebrow" style={{ marginBottom: 0 }}>
            Paso {step} de {TOTAL}
          </p>
          <div style={{ display: 'flex', gap: '0.375rem' }}>
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: '50%',
                background: i < step ? 'var(--gold)' : 'var(--line-mid)',
                transition: 'background 0.3s',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* ── Step 1: Vehículo ── */}
          {step === 1 && (
            <div className="cw-body">
              <h2 className="cw-title">Elegí tu vehículo</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem', marginBottom: '1.5rem' }}>
                {VEHICULOS.map(v => {
                  const isVideo = v.img.endsWith('.mp4')
                  return (
                    <button
                      key={v.id}
                      onClick={() => { setVehiculo(v.id); setErrors({}) }}
                      className={`cw-vehicle${vehiculo === v.id ? ' selected' : ''}`}
                      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 0, border: undefined }}
                    >
                      {v.img && !isVideo && (
                        <img src={v.img} alt={v.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                      )}
                      {v.img && isVideo && (
                        <video src={v.img} autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                      {!v.img && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.03em' }}>VW</span>
                        </div>
                      )}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(7,17,31,.9) 0%, rgba(7,17,31,.15) 60%)',
                        pointerEvents: 'none',
                      }} />
                      {vehiculo === v.id && (
                        <div style={{
                          position: 'absolute', top: 8, right: 8,
                          width: 22, height: 22, borderRadius: '50%',
                          background: 'var(--gold)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <CheckIcon size={12} />
                        </div>
                      )}
                      <div style={{ position: 'relative', zIndex: 1, padding: '0.625rem 0.75rem' }}>
                        <p style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 2, letterSpacing: '-0.02em' }}>{v.label}</p>
                        <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,.55)', fontWeight: 500 }}>{v.sub}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
              {errors.vehiculo && <p className="cw-error" style={{ marginBottom: '0.75rem' }}>{errors.vehiculo}</p>}
              <button onClick={goNext} className="btn btn-gold btn-gold-lg w-full justify-center">
                Continuar <ArrowR />
              </button>
            </div>
          )}

          {/* ── Step 2: Anticipo ── */}
          {step === 2 && (
            <div className="cw-body">
              <h2 className="cw-title">¿Con cuánto anticipo contás?</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {ANTICIPOS.map(a => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setAnticipo(a.id)
                      if ('isUsado' in a && a.isUsado) setUsado(true)
                      else setUsado(false)
                      setErrors({})
                    }}
                    className={`cw-anticipo${anticipoId === a.id ? ' selected' : ''}`}
                    style={{ gridColumn: 'isUsado' in a && a.isUsado ? '1 / -1' : undefined }}
                  >
                    {'isUsado' in a && a.isUsado ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                          <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
                        </svg>
                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: anticipoId === a.id ? 'var(--gold-bright)' : 'var(--text)' }}>
                          {a.label}
                        </span>
                      </div>
                    ) : (
                      <>
                        <p style={{ fontSize: '1rem', fontWeight: 800, color: anticipoId === a.id ? 'var(--gold-bright)' : 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 2 }}>
                          {a.label}
                        </p>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-faint)', fontWeight: 500 }}>de anticipo</p>
                      </>
                    )}
                  </button>
                ))}
              </div>
              {errors.anticipo && <p className="cw-error" style={{ marginBottom: '0.75rem' }}>{errors.anticipo}</p>}
              <div style={{ display: 'flex', gap: '0.625rem' }}>
                <button onClick={() => nav(1)} className="btn btn-ghost-light" style={{ padding: '1rem 1.25rem' }}>← Volver</button>
                <button onClick={goNext} className="btn btn-gold btn-gold-lg flex-1 justify-center">
                  Ver opciones <ArrowR />
                </button>
              </div>
              <p className="cw-disclaimer">Los valores son orientativos. Condiciones sujetas a disponibilidad y validación.</p>
            </div>
          )}

          {/* ── Step 3: Planes ── */}
          {step === 3 && (
            <div className="cw-body">
              <h2 className="cw-title">Elegí la opción que más te conviene</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {planes.map(plan => (
                  <button
                    key={plan.id}
                    onClick={() => setPlan(plan.id)}
                    className={`cw-plan${(planId === plan.id || (!planId && plan.destacado)) ? ' selected' : ''}`}
                    style={{ textAlign: 'left', width: '100%' }}
                  >
                    {plan.destacado && <div className="cw-plan-recommended">Recomendado</div>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.875rem', marginTop: plan.destacado ? '0.75rem' : 0 }}>
                      <div>
                        <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>{plan.label}</p>
                        <p style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                          {formatARS(plan.cuotaMensual)}<span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>/mes</span>
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-faint)', marginBottom: 2 }}>{plan.cuotas} cuotas fijas</p>
                        {(planId === plan.id || (!planId && plan.destacado)) && (
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <CheckIcon size={12} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', borderTop: '1px solid var(--line)', paddingTop: '0.75rem' }}>
                      <div>
                        <p style={{ fontSize: '0.5625rem', color: 'var(--text-faint)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 2 }}>Anticipo</p>
                        <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>{formatARS(plan.anticipo)}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.5625rem', color: 'var(--text-faint)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 2 }}>Capital</p>
                        <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>{formatARS(plan.capitalFinanciado)}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.5625rem', color: 'var(--gold)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 2 }}>Bonificación</p>
                        <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--gold-bright)', lineHeight: 1 }}>{formatARS(plan.bono)}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.625rem' }}>
                <button onClick={() => nav(2)} className="btn btn-ghost-light" style={{ padding: '1rem 1.25rem' }}>← Volver</button>
                <button onClick={goNext} className="btn btn-gold btn-gold-lg flex-1 justify-center">
                  Quiero esta opción <ArrowR />
                </button>
              </div>
              <p className="cw-disclaimer">Valores orientativos. Sin gastos ocultos. Financiación sujeta a validación y documentación.</p>
            </div>
          )}

          {/* ── Step 4: Contacto ── */}
          {step === 4 && (
            <div className="cw-body">
              <h2 className="cw-title">Recibí la propuesta exacta</h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.65 }}>
                Un asesor te va a contactar por WhatsApp con la propuesta real para el <strong style={{ color: 'var(--text)' }}>{vehiculo}</strong>.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label className="cw-label" htmlFor="cw-nombre">Nombre</label>
                  <input id="cw-nombre" type="text" placeholder="Tu nombre" value={nombre}
                    onChange={e => { setNombre(e.target.value); setErrors(p => ({...p, nombre: ''})) }}
                    className={`cw-input${errors.nombre ? ' error' : ''}`} autoComplete="given-name" />
                  {errors.nombre && <p className="cw-error">{errors.nombre}</p>}
                </div>
                <div>
                  <label className="cw-label" htmlFor="cw-tel">WhatsApp</label>
                  <input id="cw-tel" type="tel" placeholder="Ej: 11 5607-2460" value={telefono}
                    onChange={e => { setTelefono(e.target.value); setErrors(p => ({...p, telefono: ''})) }}
                    className={`cw-input${errors.telefono ? ' error' : ''}`} autoComplete="tel" />
                  {errors.telefono && <p className="cw-error">{errors.telefono}</p>}
                </div>
                <div>
                  <label className="cw-label" htmlFor="cw-loc">Provincia / Localidad</label>
                  <input id="cw-loc" type="text" placeholder="Ej: Córdoba, Mendoza, Rosario..." value={localidad}
                    onChange={e => { setLocalidad(e.target.value); setErrors(p => ({...p, localidad: ''})) }}
                    className={`cw-input${errors.localidad ? ' error' : ''}`} autoComplete="address-level2" />
                  {errors.localidad && <p className="cw-error">{errors.localidad}</p>}
                </div>

                {/* Resumen del plan elegido */}
                {selectedPlan && (
                  <div style={{ background: 'var(--gold-subtle)', border: '1px solid var(--gold-border)', borderRadius: 12, padding: '1rem 1.125rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontSize: '0.6875rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 3 }}>
                        Plan elegido · {vehiculo}
                      </p>
                      <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {selectedPlan.cuotas} cuotas · {formatARS(selectedPlan.cuotaMensual)}/mes
                      </p>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--gold-bright)', fontWeight: 700 }}>
                      Bonif. {formatARS(selectedPlan.bono)}
                    </p>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.625rem' }}>
                <button onClick={() => nav(3)} className="btn btn-ghost-light" style={{ padding: '1rem 1.25rem' }}>← Volver</button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn btn-gold btn-gold-lg flex-1 justify-center"
                  style={{ opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Enviando…' : 'Enviar y recibir propuesta'}
                  {!submitting && <CheckIcon />}
                </button>
              </div>
              <p className="cw-disclaimer">
                Tus datos se usan solo para enviarte la propuesta. No compartimos tu información con terceros.
              </p>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  )
}
