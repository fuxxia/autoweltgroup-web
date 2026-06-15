'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitLead, buildLeadWhatsApp } from '@/lib/leads'
import type { LeadData } from '@/lib/leads/schema'
import { formatARS } from '@/lib/utils'
import { MODELOS_COTIZADOR, MODELOS_MAP } from '@/data/financiamiento'
import {
  trackFormStart,
  trackStepComplete,
  trackGenerateLead,
  trackWAClick,
} from '@/lib/analytics'

// ── Datos ─────────────────────────────────────────────────────

const VEHICULOS = [
  { id: 'Amarok',          label: 'Amarok',   sub: 'Pickup V6 0km',     img: '/images/fotos/amarok/amarokfrente.jpeg', base: 44_900_000, bono: 10_100_000 },
  { id: 'Taos',            label: 'Taos',     sub: 'SUV 0km',            img: '/images/fotos/taos/taos.mp4',           base: 35_000_000, bono: 5_000_000  },
  { id: 'Nivus',           label: 'Nivus',    sub: 'SUV Coupé 0km',      img: '/images/fotos/nivus/nivus.mp4',         base: 30_000_000, bono: 4_000_000  },
  { id: 'Polo',            label: 'Polo',     sub: 'Hatchback 0km',      img: '/images/fotos/polo/polofrente.jpeg',    base: 22_000_000, bono: 2_500_000  },
  { id: 'Tera',            label: 'Tera',     sub: 'SUV 7 asientos',     img: '/images/fotos/tera/tera0.jpeg',         base: 42_000_000, bono: 6_000_000  },
  { id: 'Otro Volkswagen', label: 'Otro VW',  sub: 'Consultar versión',  img: '',                                      base: 35_000_000, bono: 4_000_000  },
]

const MODEL_COLORS: Record<string, { id: string; hex: string }[]> = {
  'Amarok': [
    { id: 'Gris Platino',   hex: '#7A7E82' },
    { id: 'Blanco Cristal', hex: '#EDEAE4' },
    { id: 'Negro',          hex: '#252525' },
    { id: 'Plata',          hex: '#B8B8B0' },
    { id: 'Azul Atlántico', hex: '#1B3A5C' },
    { id: 'Rojo Chile',     hex: '#8B1A1A' },
  ],
  'Taos': [
    { id: 'Gris Platino',   hex: '#7A7E82' },
    { id: 'Blanco Cristal', hex: '#EDEAE4' },
    { id: 'Negro',          hex: '#252525' },
    { id: 'Azul Atlántico', hex: '#1B3A5C' },
    { id: 'Rojo Chile',     hex: '#8B1A1A' },
  ],
  'Nivus': [
    { id: 'Gris Platino',   hex: '#7A7E82' },
    { id: 'Blanco Cristal', hex: '#EDEAE4' },
    { id: 'Negro',          hex: '#252525' },
    { id: 'Azul Atlántico', hex: '#1B3A5C' },
    { id: 'Rojo Flash',     hex: '#B8291A' },
    { id: 'Verde Olivo',    hex: '#3D5A3E' },
  ],
  'Polo': [
    { id: 'Gris Platino',   hex: '#7A7E82' },
    { id: 'Blanco Puro',    hex: '#EDEAE4' },
    { id: 'Negro',          hex: '#252525' },
    { id: 'Plata',          hex: '#B8B8B0' },
    { id: 'Azul Reef',      hex: '#1B3A5C' },
    { id: 'Rojo Flash',     hex: '#B8291A' },
  ],
  'Tera': [
    { id: 'Gris Platino',   hex: '#7A7E82' },
    { id: 'Blanco Cristal', hex: '#EDEAE4' },
    { id: 'Negro',          hex: '#252525' },
    { id: 'Plata',          hex: '#B8B8B0' },
    { id: 'Azul Atlántico', hex: '#1B3A5C' },
  ],
  'Otro Volkswagen': [],
}

const ANTICIPOS = [
  { id: '5m',    label: '$5.000.000',                value: 5_000_000  },
  { id: '10m',   label: '$10.000.000',               value: 10_000_000 },
  { id: '15m',   label: '$15.000.000',               value: 15_000_000 },
  { id: '20m',   label: '$20.000.000',               value: 20_000_000 },
  { id: '25m',   label: '$25.000.000',               value: 25_000_000 },
  { id: 'mas',   label: '+$25.000.000',              value: 30_000_000 },
  { id: 'usado', label: 'Tengo usado para entregar', value: 0, isUsado: true },
]

const PLAZOS = [
  { id: 'semana',     label: 'Esta semana',     desc: 'Tengo la decisión tomada' },
  { id: 'mes',        label: 'Este mes',         desc: 'Estoy cerrando la operación' },
  { id: '30-60',      label: '30 a 60 días',     desc: 'Todavía definiendo' },
  { id: 'comparando', label: 'Estoy comparando', desc: 'Evaluando opciones' },
]

// ── Lead scoring ─────────────────────────────────────────────

function calcLeadScore(
  vehiculo: string, anticipoId: string, tieneUsado: boolean,
  plazo: string, color: string, localidad: string
): number {
  let s = 0
  if (plazo === 'semana')                              s += 35
  else if (plazo === 'mes')                            s += 25
  if (['20m', '25m', 'mas'].includes(anticipoId))      s += 30
  else if (['10m', '15m'].includes(anticipoId))        s += 20
  if (tieneUsado)                                      s += 15
  if (localidad.trim())                                s += 10
  if (color)                                           s += 10
  if (vehiculo)                                        s += 10
  return s
}

function getTempLabel(score: number): 'HOT' | 'WARM' | 'COLD' {
  if (score >= 70) return 'HOT'
  if (score >= 40) return 'WARM'
  return 'COLD'
}

// ── Cálculo de plan de financiación ──────────────────────────

function calcPlan(vehiculoId: string, anticipoValue: number, tieneUsado: boolean, cuotas = 24) {
  const v = VEHICULOS.find(x => x.id === vehiculoId) ?? VEHICULOS[0]
  const ant = tieneUsado ? v.base * 0.3 : anticipoValue
  const capital = Math.max(v.base - ant - v.bono, 0)
  return {
    cuotas,
    cuotaMensual: Math.round(capital / cuotas),
    anticipo: Math.round(ant),
    capitalFinanciado: capital,
    bono: v.bono,
  }
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

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
}

// ── Componente principal ──────────────────────────────────────

type StepId = 'modelo' | 'version' | 'color' | 'anticipo' | 'plazo' | 'datos'

export default function CotizadorWizard() {
  const [step,       setStep]      = useState(1)
  const [direction,  setDir]       = useState(1)
  const [vehiculo,   setVehiculo]  = useState('')
  const [versionSlug, setVersion]  = useState('')
  const [color,      setColor]     = useState('')
  const [anticipoId, setAnticipo]  = useState('')
  const [plazo,      setPlazo]     = useState('')
  const [tieneUsado, setUsado]     = useState(false)
  const [nombre,     setNombre]    = useState('')
  const [telefono,   setTelefono]  = useState('')
  const [localidad,  setLocalidad] = useState('')
  const [errors,     setErrors]    = useState<Record<string, string>>({})
  const [submitting, setSubmit]    = useState(false)
  const [done,       setDone]      = useState(false)
  const [waUrl,      setWaUrl]     = useState('')
  const hasStarted = useRef(false)

  // Escucha prefill desde HeroMiniCotizador
  useEffect(() => {
    function onPrefill(e: CustomEvent) {
      const d = e.detail as { vehiculo?: string; color?: string; anticipoId?: string; localidad?: string }
      if (d.vehiculo)   setVehiculo(d.vehiculo)
      if (d.color)      setColor(d.color)
      if (d.anticipoId) setAnticipo(d.anticipoId)
      if (d.localidad)  setLocalidad(d.localidad)
    }
    window.addEventListener('cw:prefill', onPrefill as EventListener)
    return () => window.removeEventListener('cw:prefill', onPrefill as EventListener)
  }, [])

  const anticipoObj    = ANTICIPOS.find(a => a.id === anticipoId)
  const vehiculoColors = vehiculo ? (MODEL_COLORS[vehiculo] ?? []) : []

  // Amarok tiene financiación real por versión: paso extra de versión
  const isAmarok    = vehiculo === 'Amarok'
  const versionData = isAmarok && versionSlug ? (MODELOS_MAP[versionSlug] ?? null) : null
  const planVersion = versionData
    ? (versionData.planes.find(p => p.destacado) ?? versionData.planes[0])
    : null

  const STEP_IDS: StepId[] = isAmarok
    ? ['modelo', 'version', 'color', 'anticipo', 'plazo', 'datos']
    : ['modelo', 'color', 'anticipo', 'plazo', 'datos']

  const TOTAL  = STEP_IDS.length
  const stepId = STEP_IDS[step - 1]

  // Estimación genérica (modelos sin financiación cargada por versión)
  const plan = vehiculo && anticipoId && !versionData
    ? calcPlan(vehiculo, anticipoObj?.value ?? 0, tieneUsado)
    : null

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
    if (stepId === 'modelo') {
      if (!vehiculo) { setErrors({ vehiculo: 'Elegí un vehículo.' }); return }
      setErrors({})
      trackStart()
      trackStepComplete('cotizador_wizard', step, 'Vehículo')
      nav(step + 1)
    } else if (stepId === 'version') {
      if (!versionSlug) { setErrors({ version: 'Elegí la versión de tu Amarok.' }); return }
      setErrors({})
      trackStepComplete('cotizador_wizard', step, 'Versión')
      nav(step + 1)
    } else if (stepId === 'color') {
      // Color is optional
      setErrors({})
      trackStepComplete('cotizador_wizard', step, 'Color')
      nav(step + 1)
    } else if (stepId === 'anticipo') {
      if (!anticipoId) { setErrors({ anticipo: 'Elegí una opción de anticipo.' }); return }
      setErrors({})
      trackStepComplete('cotizador_wizard', step, 'Anticipo')
      nav(step + 1)
    } else if (stepId === 'plazo') {
      if (!plazo) { setErrors({ plazo: 'Seleccioná tu plazo de compra.' }); return }
      setErrors({})
      trackStepComplete('cotizador_wizard', step, 'Plazo')
      nav(step + 1)
    }
  }

  function handleWASubmit() {
    const errs: Record<string, string> = {}
    if (!nombre.trim() || nombre.trim().length < 2) errs.nombre = 'Ingresá tu nombre.'
    if (!telefono.trim() || telefono.trim().length < 8) errs.telefono = 'Ingresá tu WhatsApp.'
    if (!localidad.trim()) errs.localidad = 'Ingresá tu ciudad o provincia.'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSubmit(true)

    const score         = calcLeadScore(vehiculo, anticipoId, tieneUsado, plazo, color, localidad)
    const temperature   = getTempLabel(score)
    const plazoLabel    = PLAZOS.find(p => p.id === plazo)?.label ?? plazo
    const anticipoLabel = tieneUsado ? 'Entrega de usado' : (anticipoObj?.label ?? '')
    const modeloLabel   = versionData ? `Amarok ${versionData.version}` : vehiculo

    const leadData: LeadData = {
      nombre:           nombre.trim(),
      telefono:         telefono.trim(),
      email:            '',
      localidad:        localidad.trim(),
      tipoCompra:       '0km',
      modelo:           modeloLabel,
      tieneUsado,
      canalPreferido:   'whatsapp',
      source:           'cotizador_wizard_v4',
      preferred_color:  color || undefined,
      plazo_compra:     plazoLabel,
      anticipo_label:   anticipoLabel,
      lead_score:       score,
      lead_temperature: temperature,
    }

    const url = buildLeadWhatsApp(leadData)

    // Open WA immediately — before any async operation so popup blockers don't fire
    window.open(url, '_blank', 'noopener,noreferrer')

    // Fire-and-forget
    submitLead(leadData).catch(() => {})
    trackGenerateLead({ vehicleModel: modeloLabel, vehicleType: '0km', locality: localidad, formLocation: 'cotizador_homepage', hasUsado: tieneUsado })
    trackWAClick('cotizador_final')

    setWaUrl(url)
    setDone(true)
    setSubmit(false)
  }

  function reset() {
    setStep(1); setDir(1)
    setVehiculo(''); setVersion(''); setColor(''); setAnticipo(''); setPlazo('')
    setUsado(false); setNombre(''); setTelefono(''); setLocalidad('')
    setErrors({}); setDone(false); setWaUrl('')
    hasStarted.current = false
  }

  // ── Success ────────────────────────────────────────────────
  if (done) {
    return (
      <div className="cw-wrap">
        <div style={{ background: 'linear-gradient(135deg, rgba(217,162,58,.08) 0%, transparent 60%)', padding: '2.5rem 2rem', textAlign: 'center' }}>
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,.12)', border: '2px solid rgba(34,197,94,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" width="28" height="28">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </motion.div>
          <p className="cw-eyebrow" style={{ textAlign: 'center' }}>WhatsApp abierto</p>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.028em', lineHeight: 1.2, marginBottom: '0.75rem', fontFamily: 'var(--font-jakarta), sans-serif' }}>
            {`Todo listo${nombre ? `, ${nombre.split(' ')[0]}` : ''}.`}
          </h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.75rem' }}>
            WhatsApp se abrió con tu cotización completa. Si se cerró, tocá el botón de abajo.
          </p>
          {waUrl && (
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="btn btn-wa w-full justify-center"
              style={{ fontSize: '0.9375rem', marginBottom: '0.75rem' }}
            >
              <WaIcon />
              Abrir WhatsApp nuevamente
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
          <p className="cw-eyebrow" style={{ marginBottom: 0 }}>Paso {step} de {TOTAL}</p>
          <div style={{ display: 'flex', gap: '0.375rem' }}>
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i < step ? 'var(--gold)' : 'var(--line-mid)', transition: 'background 0.3s' }} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* ── Step: Modelo ── */}
          {stepId === 'modelo' && (
            <div className="cw-body">
              <h2 className="cw-title">Elegí tu vehículo</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem', marginBottom: '1rem' }}>
                {VEHICULOS.map(v => {
                  const isVideo    = v.img.endsWith('.mp4')
                  const isSelected = vehiculo === v.id
                  return (
                    <button
                      key={v.id}
                      onClick={() => { setVehiculo(v.id); setVersion(''); setColor(''); setErrors({}) }}
                      className={`cw-vehicle${isSelected ? ' selected' : ''}`}
                      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 0 }}
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
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,17,31,.9) 0%, rgba(7,17,31,.15) 60%)', pointerEvents: 'none' }} />
                      {isSelected && (
                        <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

          {/* ── Step: Versión (solo Amarok — financiación real por versión) ── */}
          {stepId === 'version' && (
            <div className="cw-body">
              <h2 className="cw-title">¿Qué Amarok buscás?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {MODELOS_COTIZADOR.map(m => {
                  const isSelected = versionSlug === m.slug
                  const destacado  = m.planes.find(p => p.destacado) ?? m.planes[0]
                  return (
                    <button
                      key={m.slug}
                      onClick={() => { setVersion(m.slug); setErrors({}) }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem',
                        padding: '0.875rem 1.125rem',
                        background: isSelected ? 'rgba(217,162,58,0.08)' : 'var(--bg-3)',
                        border: `1.5px solid ${isSelected ? 'var(--gold)' : 'rgba(255,255,255,0.055)'}`,
                        borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                        transition: 'border-color 0.18s, background 0.18s',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: isSelected ? 'var(--gold-bright)' : 'var(--text)', lineHeight: 1.1, marginBottom: 3 }}>
                          {m.version}
                        </p>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-faint)', fontWeight: 500 }}>
                          {m.motor} · {m.transmision}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: 800, color: isSelected ? 'var(--gold-bright)' : 'var(--text)', lineHeight: 1.1, marginBottom: 3, fontVariantNumeric: 'tabular-nums' }}>
                          {formatARS(m.ofertaPatentar)}
                        </p>
                        <p style={{ fontSize: '0.625rem', color: 'var(--text-faint)', fontWeight: 500 }}>
                          {destacado.cuotas} cuotas de {formatARS(destacado.montoCuota)}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
              <p style={{ fontSize: '0.5625rem', color: 'var(--text-faint)', marginBottom: '1rem', lineHeight: 1.4 }}>
                Oferta para patentar con bonificación incluida. Valores orientativos sujetos a disponibilidad y validación comercial.
              </p>
              {errors.version && <p className="cw-error" style={{ marginBottom: '0.75rem' }}>{errors.version}</p>}
              <div style={{ display: 'flex', gap: '0.625rem' }}>
                <button onClick={() => nav(step - 1)} className="btn btn-ghost-light" style={{ padding: '1rem 1.25rem' }}>← Volver</button>
                <button onClick={goNext} className="btn btn-gold btn-gold-lg flex-1 justify-center">
                  Continuar <ArrowR />
                </button>
              </div>
            </div>
          )}

          {/* ── Step: Color del modelo ── */}
          {stepId === 'color' && (
            <div className="cw-body">
              <h2 className="cw-title">¿Qué color preferís?</h2>

              {vehiculoColors.length > 0 ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem', marginBottom: '0.875rem' }}>
                    {vehiculoColors.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setColor(c.id)}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                          padding: '0.875rem 0.5rem',
                          background: color === c.id ? 'rgba(217,162,58,0.07)' : 'var(--bg-3)',
                          border: `1.5px solid ${color === c.id ? 'var(--gold)' : 'rgba(255,255,255,0.06)'}`,
                          borderRadius: 12, cursor: 'pointer',
                          transition: 'border-color 0.18s, background 0.18s',
                        }}
                      >
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: c.hex,
                          border: color === c.id ? '2.5px solid var(--gold)' : '2px solid rgba(255,255,255,0.18)',
                          boxShadow: color === c.id ? '0 0 0 3px rgba(217,162,58,0.25)' : 'none',
                          transition: 'border 0.18s, box-shadow 0.18s, transform 0.15s',
                          transform: color === c.id ? 'scale(1.12)' : 'scale(1)',
                          flexShrink: 0,
                        }} />
                        <span style={{
                          fontSize: '0.5625rem', fontWeight: color === c.id ? 700 : 500, textAlign: 'center',
                          color: color === c.id ? 'var(--gold-bright)' : 'var(--text-faint)',
                          lineHeight: 1.3, transition: 'color 0.18s',
                        }}>
                          {c.id}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.5625rem', color: 'var(--text-faint)', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                    Color sujeto a disponibilidad de stock. Se confirma antes de la operación.
                  </p>
                </>
              ) : (
                <div style={{
                  background: 'var(--bg-3)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 14, padding: '1.75rem', textAlign: 'center', marginBottom: '1.25rem',
                }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    El color se define según el modelo elegido.<br />
                    Un asesor te muestra las opciones disponibles.
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.625rem' }}>
                <button onClick={() => nav(step - 1)} className="btn btn-ghost-light" style={{ padding: '1rem 1.25rem' }}>← Volver</button>
                <button onClick={goNext} className="btn btn-gold btn-gold-lg flex-1 justify-center">
                  {color ? 'Confirmar color' : 'Salteá este paso'} <ArrowR />
                </button>
              </div>
            </div>
          )}

          {/* ── Step: Anticipo ── */}
          {stepId === 'anticipo' && (
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
                <button onClick={() => nav(step - 1)} className="btn btn-ghost-light" style={{ padding: '1rem 1.25rem' }}>← Volver</button>
                <button onClick={goNext} className="btn btn-gold btn-gold-lg flex-1 justify-center">
                  Ver opciones <ArrowR />
                </button>
              </div>
              <p className="cw-disclaimer">Valores orientativos. Condiciones sujetas a disponibilidad y validación.</p>
            </div>
          )}

          {/* ── Step: Plazo ── */}
          {stepId === 'plazo' && (
            <div className="cw-body">
              <h2 className="cw-title">¿Cuándo pensás comprar?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {PLAZOS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { setPlazo(p.id); setErrors({}) }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '1rem 1.125rem',
                      background: plazo === p.id ? 'rgba(217,162,58,0.08)' : 'var(--bg-3)',
                      border: `1.5px solid ${plazo === p.id ? 'var(--gold)' : 'rgba(255,255,255,0.055)'}`,
                      borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                      transition: 'border-color 0.18s, background 0.18s',
                    }}
                  >
                    <div>
                      <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: plazo === p.id ? 'var(--gold-bright)' : 'var(--text)', lineHeight: 1, marginBottom: 3 }}>
                        {p.label}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', fontWeight: 500 }}>{p.desc}</p>
                    </div>
                    {plazo === p.id && (
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckIcon size={12} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {errors.plazo && <p className="cw-error" style={{ marginBottom: '0.75rem' }}>{errors.plazo}</p>}
              <div style={{ display: 'flex', gap: '0.625rem' }}>
                <button onClick={() => nav(step - 1)} className="btn btn-ghost-light" style={{ padding: '1rem 1.25rem' }}>← Volver</button>
                <button onClick={goNext} className="btn btn-gold btn-gold-lg flex-1 justify-center">
                  Continuar <ArrowR />
                </button>
              </div>
            </div>
          )}

          {/* ── Step: Reward + Contacto + WhatsApp ── */}
          {stepId === 'datos' && (
            <div className="cw-body">
              {/* Reward screen */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(217,162,58,0.07) 0%, rgba(217,162,58,0.02) 100%)',
                border: '1px solid rgba(217,162,58,0.20)',
                borderRadius: 14, padding: '1.125rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(217,162,58,0.45), transparent)' }} />
                <p className="cw-eyebrow" style={{ marginBottom: '0.75rem' }}>Tu cotización incluye</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {((versionData && planVersion
                    ? [
                        `Modelo: Amarok ${versionData.version}`,
                        color ? `Color preferido: ${color}` : null,
                        `Bonificación vigente: ${formatARS(versionData.descuento)}`,
                        `Oferta para patentar: ${formatARS(versionData.ofertaPatentar)}`,
                        `Financiación tasa 0%: ${planVersion.cuotas} cuotas fijas de ${formatARS(planVersion.montoCuota)}`,
                        'Coordinación de entrega antes de que viajes',
                      ]
                    : [
                        `Modelo: ${vehiculo}`,
                        color ? `Color preferido: ${color}` : null,
                        plan ? `Bonificación vigente: hasta ${formatARS(plan.bono)}` : 'Bonificación vigente aplicada',
                        plan ? `Cuota orientativa: ${formatARS(plan.cuotaMensual)}/mes (24 cuotas)` : 'Cuota orientativa calculada',
                        plan ? `Anticipo estimado: ${formatARS(plan.anticipo)}` : 'Anticipo estimado',
                        'Coordinación de entrega antes de que viajes',
                      ]
                  ) as (string | null)[]).filter(Boolean).map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" width="13" height="13" style={{ flexShrink: 0, marginTop: 2 }}>
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <h2 className="cw-title" style={{ marginBottom: '0.375rem' }}>Dejá tus datos</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-faint)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                Sin spam. Sin bots. Atención real por WhatsApp.
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
                  <input id="cw-tel" type="tel" placeholder="Ej: 11 5601-0329" value={telefono}
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
              </div>

              <div style={{ display: 'flex', gap: '0.625rem' }}>
                <button onClick={() => nav(step - 1)} className="btn btn-ghost-light" style={{ padding: '1rem 1.25rem' }}>← Volver</button>
                <button
                  onClick={handleWASubmit}
                  disabled={submitting}
                  className="btn btn-wa flex-1 justify-center"
                  style={{ opacity: submitting ? 0.7 : 1, fontSize: '0.9375rem' }}
                >
                  <WaIcon />
                  {submitting ? 'Abriendo WhatsApp…' : 'Hablar por WhatsApp'}
                </button>
              </div>
              <p className="cw-disclaimer">
                Tus datos se usan solo para enviarte la propuesta. No los compartimos con terceros.
              </p>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  )
}
