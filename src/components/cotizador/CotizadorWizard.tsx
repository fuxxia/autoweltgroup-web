'use client'
import { useState, useEffect, useRef } from 'react'
import { submitLead, buildLeadWhatsApp } from '@/lib/leads'
import type { LeadData } from '@/lib/leads/schema'
import {
  trackFormStart,
  trackStepComplete,
  trackGenerateLead,
  trackWAClick,
} from '@/lib/analytics'

// ── Datos de opciones ─────────────────────────────────────────

const TIPOS_COMPRA = [
  { value: '0km',          label: '0km',          desc: 'Auto nuevo, directo de fábrica', icon: '🚗' },
  { value: 'adjudicado',   label: 'Plan adjudicado', desc: 'Hasta 40% más barato que lista', icon: '📋' },
  { value: 'financiacion', label: 'Financiación', desc: 'Cuotas fijas en pesos', icon: '💳' },
]

const MODELOS = [
  { value: 'Amarok V6',  label: 'Amarok',  sub: 'Pickup 0km · desde $44.9M' },
  { value: 'Polo',       label: 'Polo',    sub: 'Hatchback · desde $22M' },
  { value: 'Taos',       label: 'Taos',    sub: 'SUV · desde $35M' },
  { value: 'Nivus',      label: 'Nivus',   sub: 'SUV Coupé · desde $30M' },
  { value: 'Tera',       label: 'Tera',    sub: 'SUV 7 asientos · próximamente' },
  { value: 'Otro modelo',label: 'Otro',    sub: 'Consultar disponibilidad' },
]

const ANTICIPOS = [
  { value: 'ninguno', label: 'Sin anticipo inicial' },
  { value: '20-30%',  label: 'Anticipo del 20-30%' },
  { value: '50%+',    label: 'Anticipo del 50% o más' },
]

// ── Tipos internos ────────────────────────────────────────────

type TipoCompra = '0km' | 'adjudicado' | 'financiacion'
type Canal      = 'whatsapp' | 'email' | 'ambos'

interface WizardState {
  tipoCompra:      TipoCompra | ''
  modelo:          string
  localidad:       string
  tieneUsado:      boolean | null
  anticipoAprox:   string
  nombre:          string
  telefono:        string
  email:           string
  canalPreferido:  Canal
}

type FieldErrors = Partial<Record<keyof WizardState, string>>

const INITIAL: WizardState = {
  tipoCompra:     '',
  modelo:         '',
  localidad:      '',
  tieneUsado:     null,
  anticipoAprox:  'ninguno',
  nombre:         '',
  telefono:       '',
  email:          '',
  canalPreferido: 'whatsapp',
}

const TOTAL_STEPS = 3

// ── Íconos ────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
)

const WaIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

// ── Componente principal ──────────────────────────────────────

export default function CotizadorWizard() {
  const [step,       setStep]    = useState(1)
  const [state,      setState]   = useState<WizardState>(INITIAL)
  const [errors,     setErrors]  = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [submitErr,  setSubmitErr]  = useState('')
  const [waUrl,      setWaUrl]    = useState('')
  const hasStarted = useRef(false)

  const progress = (step / TOTAL_STEPS) * 100

  function set<K extends keyof WizardState>(key: K, value: WizardState[K]) {
    setState(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
    if (!hasStarted.current) {
      hasStarted.current = true
      trackFormStart('cotizador_wizard')
    }
  }

  // Validación por paso
  function validateStep(s: number): FieldErrors {
    const e: FieldErrors = {}
    if (s === 1) {
      if (!state.tipoCompra) e.tipoCompra = 'Seleccioná el tipo de compra.'
      if (!state.modelo)     e.modelo     = 'Seleccioná un modelo.'
    }
    if (s === 2) {
      if (!state.localidad.trim()) e.localidad = 'Ingresá tu ciudad o provincia.'
    }
    if (s === 3) {
      if (!state.nombre.trim() || state.nombre.trim().length < 2)
        e.nombre = 'Ingresá tu nombre.'
      if (!state.telefono.trim() || state.telefono.trim().length < 8)
        e.telefono = 'Ingresá un teléfono válido (WhatsApp).'
      if (!state.email.trim() || !/\S+@\S+\.\S+/.test(state.email))
        e.email = 'Ingresá un email válido.'
    }
    return e
  }

  function goNext() {
    const e = validateStep(step)
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setErrors({})
    const stepNames = ['', 'Vehículo', 'Tu operación', 'Datos de contacto']
    trackStepComplete('cotizador_wizard', step, stepNames[step])
    setStep(s => s + 1)
  }

  function goBack() {
    setErrors({})
    setStep(s => s - 1)
  }

  async function handleSubmit() {
    const e = validateStep(3)
    if (Object.keys(e).length > 0) { setErrors(e); return }

    setSubmitting(true)
    setSubmitErr('')

    const leadData: LeadData = {
      nombre:         state.nombre.trim(),
      telefono:       state.telefono.trim(),
      email:          state.email.trim(),
      localidad:      state.localidad.trim(),
      tipoCompra:     state.tipoCompra as TipoCompra,
      modelo:         state.modelo,
      tieneUsado:     state.tieneUsado ?? false,
      anticipoAprox:  state.anticipoAprox as LeadData['anticipoAprox'],
      canalPreferido: state.canalPreferido,
      source:         'cotizador_wizard_homepage',
    }

    const result = await submitLead(leadData)

    trackGenerateLead({
      vehicleModel:      state.modelo,
      vehicleType:       state.tipoCompra,
      locality:          state.localidad,
      channelPreference: state.canalPreferido,
      formLocation:      'cotizador_homepage',
      hasUsado:          state.tieneUsado ?? false,
    })

    const wa = buildLeadWhatsApp(leadData)
    setWaUrl(wa)

    if (result.ok) {
      setSubmitted(true)
    } else {
      setSubmitErr('Hubo un problema al enviar. Podés contactarnos directamente por WhatsApp.')
      setSubmitted(true)
    }

    setSubmitting(false)
  }

  function reset() {
    setState(INITIAL)
    setStep(1)
    setErrors({})
    setSubmitted(false)
    setSubmitErr('')
    setWaUrl('')
    hasStarted.current = false
  }

  // ── Success state ───────────────────────────────────────────
  if (submitted) {
    return (
      <div className="cw-card">
        <div className="cw-success">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(34,197,94,.15)', border: '2px solid rgba(34,197,94,.3)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" width="28" height="28">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(212,162,68,.8)' }}>
            {submitErr ? 'Necesitamos otro camino' : 'Cotización recibida'}
          </p>
          <h3 className="font-black text-white mb-2"
            style={{ fontSize: '1.375rem', letterSpacing: '-.025em', lineHeight: 1.2 }}>
            {submitErr
              ? 'Escribinos por WhatsApp'
              : `Hola ${state.nombre.split(' ')[0]}, ya tenemos tu consulta.`
            }
          </h3>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>
            {submitErr
              ? submitErr
              : `Pablo te va a contactar en el día por ${state.canalPreferido === 'email' ? 'email' : 'WhatsApp'} con una propuesta real sobre el ${state.modelo}.`
            }
          </p>

          {waUrl && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWAClick('cotizador_success')}
              className="btn-wa w-full justify-center mb-4"
              style={{ fontSize: '0.9375rem' }}
            >
              <WaIcon />
              {submitErr ? 'Escribir ahora por WhatsApp' : 'Hablar con Pablo ahora'}
            </a>
          )}

          <button onClick={reset} className="btn-ghost w-full justify-center" style={{ fontSize: '0.875rem' }}>
            Hacer otra cotización
          </button>

          <p className="cw-disclaimer mt-5">
            Tus datos se usan solo para enviarte la propuesta y coordinar la consulta.
          </p>
        </div>
      </div>
    )
  }

  // ── Wizard steps ────────────────────────────────────────────
  return (
    <div className="cw-card" style={{ padding: '2rem' }}>

      {/* Progress */}
      <div className="cw-progress">
        <div className="cw-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <p className="cw-step-label">Paso {step} de {TOTAL_STEPS}</p>

      {/* ── Step 1: Vehículo ── */}
      {step === 1 && (
        <div>
          <h2 className="cw-title">¿Qué buscás?</h2>

          {/* Tipo de compra */}
          <div className="mb-5">
            <p className="cw-label">Tipo de compra</p>
            <div className="flex flex-col gap-2">
              {TIPOS_COMPRA.map((t) => (
                <button
                  key={t.value}
                  onClick={() => set('tipoCompra', t.value as TipoCompra)}
                  className={`cw-option${state.tipoCompra === t.value ? ' selected' : ''}`}
                >
                  <span className="cw-dot" />
                  <span className="text-lg" style={{ minWidth: 24 }}>{t.icon}</span>
                  <span className="flex flex-col items-start gap-0.5 flex-1">
                    <span className="font-bold text-sm">{t.label}</span>
                    <span className="text-xs font-normal" style={{ color: 'var(--text-muted-light)' }}>{t.desc}</span>
                  </span>
                </button>
              ))}
            </div>
            {errors.tipoCompra && <p className="cw-error">{errors.tipoCompra}</p>}
          </div>

          {/* Modelo */}
          <div className="mb-6">
            <p className="cw-label">Modelo de interés</p>
            <div className="grid grid-cols-2 gap-2">
              {MODELOS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => set('modelo', m.value)}
                  className={`cw-option${state.modelo === m.value ? ' selected' : ''}`}
                  style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2, padding: '0.75rem' }}
                >
                  <span className="font-bold text-sm">{m.label}</span>
                  <span className="text-xs" style={{ color: 'var(--text-muted-light)', fontWeight: 400 }}>{m.sub}</span>
                </button>
              ))}
            </div>
            {errors.modelo && <p className="cw-error">{errors.modelo}</p>}
          </div>

          <button onClick={goNext} className="btn-amber keep-dark w-full justify-center" style={{ fontSize: '0.9375rem' }}>
            Siguiente
            <ArrowIcon />
          </button>
        </div>
      )}

      {/* ── Step 2: Tu operación ── */}
      {step === 2 && (
        <div>
          <h2 className="cw-title">Contanos un poco más</h2>

          {/* Localidad */}
          <div className="mb-4">
            <label className="cw-label">¿Desde dónde comprás?</label>
            <input
              type="text"
              placeholder="Ej: Córdoba, Mendoza, Rosario..."
              value={state.localidad}
              onChange={e => set('localidad', e.target.value)}
              className={`cw-input${errors.localidad ? ' error' : ''}`}
              autoComplete="address-level2"
            />
            {errors.localidad
              ? <p className="cw-error">{errors.localidad}</p>
              : <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Atendemos en todo el país · muchos viajan y retiran en Buenos Aires</p>
            }
          </div>

          {/* Usado */}
          <div className="mb-4">
            <p className="cw-label">¿Tenés un usado para dar en parte de pago?</p>
            <div className="flex gap-2">
              {[
                { val: true,  label: 'Sí, tengo un usado' },
                { val: false, label: 'No por ahora' },
              ].map(opt => (
                <button
                  key={String(opt.val)}
                  onClick={() => set('tieneUsado', opt.val)}
                  className={`cw-option${state.tieneUsado === opt.val ? ' selected' : ''}`}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <span className="cw-dot" />
                  <span className="text-sm font-semibold">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Anticipo (solo si no es adjudicado) */}
          {state.tipoCompra !== 'adjudicado' && (
            <div className="mb-4">
              <p className="cw-label">Anticipo aproximado</p>
              <div className="flex flex-col gap-2">
                {ANTICIPOS.map(a => (
                  <button
                    key={a.value}
                    onClick={() => set('anticipoAprox', a.value)}
                    className={`cw-option${state.anticipoAprox === a.value ? ' selected' : ''}`}
                  >
                    <span className="cw-dot" />
                    <span className="text-sm font-semibold">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button onClick={goBack} className="btn-navy" style={{ padding: '0.875rem 1.25rem' }}>
              ← Atrás
            </button>
            <button onClick={goNext} className="btn-amber keep-dark flex-1 justify-center">
              Siguiente
              <ArrowIcon />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Datos de contacto ── */}
      {step === 3 && (
        <div>
          <h2 className="cw-title">¿Cómo te contactamos?</h2>
          <p className="text-sm mb-5" style={{ color: 'var(--text-muted-light)', lineHeight: 1.6 }}>
            Necesitamos solo tus datos para enviarte la propuesta real.
            <span className="font-semibold" style={{ color: 'var(--text)' }}> Sin spam. Sin bots.</span>
          </p>

          {/* Nombre */}
          <div className="mb-3">
            <label className="cw-label" htmlFor="cw-nombre">Nombre y apellido</label>
            <input
              id="cw-nombre"
              type="text"
              placeholder="Ej: Juan García"
              value={state.nombre}
              onChange={e => set('nombre', e.target.value)}
              className={`cw-input${errors.nombre ? ' error' : ''}`}
              autoComplete="name"
            />
            {errors.nombre && <p className="cw-error">{errors.nombre}</p>}
          </div>

          {/* Teléfono */}
          <div className="mb-3">
            <label className="cw-label" htmlFor="cw-tel">WhatsApp / Teléfono</label>
            <input
              id="cw-tel"
              type="tel"
              placeholder="Ej: 11 5607-2460"
              value={state.telefono}
              onChange={e => set('telefono', e.target.value)}
              className={`cw-input${errors.telefono ? ' error' : ''}`}
              autoComplete="tel"
            />
            {errors.telefono && <p className="cw-error">{errors.telefono}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="cw-label" htmlFor="cw-email">Email</label>
            <input
              id="cw-email"
              type="email"
              placeholder="Ej: juan@empresa.com"
              value={state.email}
              onChange={e => set('email', e.target.value)}
              className={`cw-input${errors.email ? ' error' : ''}`}
              autoComplete="email"
            />
            {errors.email && <p className="cw-error">{errors.email}</p>}
          </div>

          {/* Canal */}
          <div className="mb-5">
            <p className="cw-label">¿Cómo preferís recibir la propuesta?</p>
            <div className="flex flex-col sm:flex-row gap-2">
              {([
                { val: 'whatsapp', label: 'WhatsApp' },
                { val: 'email',   label: 'Email' },
                { val: 'ambos',   label: 'Ambos' },
              ] as { val: Canal; label: string }[]).map(c => (
                <button
                  key={c.val}
                  onClick={() => set('canalPreferido', c.val)}
                  className={`cw-option${state.canalPreferido === c.val ? ' selected' : ''}`}
                  style={{ flex: 1, justifyContent: 'center', padding: '0.75rem' }}
                >
                  <span className="cw-dot" />
                  <span className="text-sm font-semibold">{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button onClick={goBack} className="btn-navy" style={{ padding: '0.875rem 1.25rem' }}>
              ← Atrás
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-amber keep-dark flex-1 justify-center"
              style={{ opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? 'Enviando…' : 'Quiero mi cotización'}
              {!submitting && <CheckIcon />}
            </button>
          </div>

          <p className="cw-disclaimer">
            Tus datos se usan solo para enviarte la propuesta y coordinar la consulta.
            No compartimos tu información con terceros.
          </p>
        </div>
      )}

    </div>
  )
}
