'use client'
import { useState } from 'react'
import { buildWhatsAppSimulador, formatARS } from '@/lib/utils'

const VW_MODELOS = ['Polo', 'Nivus', 'Taos', 'Amarok', 'Tera']

const MODELO_IMG: Record<string, string> = {
  Polo:   '/images/fotos/polo/polofrente.jpeg',
  Nivus:  '/images/fotos/nivus/nivus.mp4',
  Taos:   '/images/fotos/taos/taos.mp4',
  Amarok: '/images/fotos/amarok/amarokfrente.jpeg',
  Tera:   '/images/fotos/tera/tera0.jpeg',
}

const CUOTAS_ESTIMADAS: Record<string, number> = {
  Polo:   195_000,
  Nivus:  245_000,
  Taos:   310_000,
  Amarok: 580_000,
  Tera:   420_000,
}

interface FormData {
  marca: string
  modelo: string
  nombre: string
  telefono: string
}

export default function SimuladorForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({ marca: 'volkswagen', modelo: 'Amarok', nombre: '', telefono: '' })
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const [cuota, setCuota] = useState(0)
  const [error, setError] = useState('')

  const handleStep1 = () => {
    if (!form.modelo) { setError('Seleccioná un modelo.'); return }
    setError('')
    setStep(2)
  }

  const handleStep2 = () => {
    if (!form.nombre.trim() || !form.telefono.trim()) { setError('Completá nombre y teléfono.'); return }
    setError('')
    const cuotaEstimada = CUOTAS_ESTIMADAS[form.modelo] ?? 200_000
    setCuota(cuotaEstimada)
    setWhatsappUrl(buildWhatsAppSimulador(form.nombre, 'volkswagen', form.modelo, cuotaEstimada))
    setStep(3)
  }

  const reset = () => {
    setStep(1)
    setForm({ marca: 'volkswagen', modelo: 'Amarok', nombre: '', telefono: '' })
    setWhatsappUrl('')
    setError('')
  }

  const STEP_LABELS = ['Modelo', 'Tus datos', 'Cotización']

  return (
    <div className="sim-outer-grid">

      {/* Desktop image panel */}
      <div className="sim-img-panel">
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{
            borderRadius: 12, overflow: 'hidden',
            background: '#0F172A',
            aspectRatio: '4/3',
            position: 'relative',
          }}>
            {MODELO_IMG[form.modelo]?.endsWith('.mp4') ? (
              <video
                key={form.modelo}
                src={MODELO_IMG[form.modelo]}
                autoPlay muted loop playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }}
              />
            ) : (
              <img
                key={form.modelo}
                src={MODELO_IMG[form.modelo]}
                alt={`Volkswagen ${form.modelo}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }}
              />
            )}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(15,23,42,.85) 0%, rgba(15,23,42,.1) 60%)',
            }} />
            <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
              <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,.5)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 2 }}>
                Volkswagen
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                {form.modelo}
              </div>
            </div>
          </div>
        </div>
      </div>

    <div className="sim-card">

      {/* Steps bar */}
      <div className="sim-step-bar">
        {STEP_LABELS.map((label, i) => {
          const s = i + 1
          return (
            <div
              key={s}
              className={`sim-step ${step === s ? 'active' : step > s ? 'done' : ''}`}
            >
              {step > s ? '✓ ' : ''}{label}
            </div>
          )
        })}
      </div>

      <div className="sim-body">

        {/* PASO 1 — Modelo */}
        {step === 1 && (
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '.1em' }}>Paso 1</p>
            <h2 className="font-bold mb-1" style={{ fontSize: '1.125rem', color: '#0F172A' }}>¿Qué modelo estás buscando?</h2>
            <p className="text-xs mb-5" style={{ color: '#94A3B8' }}>Elegí para ver la cuota estimada del plan.</p>

            {/* Preview foto mobile */}
            {form.modelo && (
              <div className="lg:hidden mb-4 rounded-xl overflow-hidden" style={{ height: '160px', background: '#0F172A' }}>
                {MODELO_IMG[form.modelo]?.endsWith('.mp4') ? (
                  <video src={MODELO_IMG[form.modelo]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={MODELO_IMG[form.modelo]} alt={form.modelo} className="w-full h-full object-cover" />
                )}
              </div>
            )}

            <div className="sim-choice-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
              {VW_MODELOS.map((mod) => (
                <button
                  key={mod}
                  onClick={() => setForm({ ...form, marca: 'volkswagen', modelo: mod })}
                  className={`sim-choice${form.modelo === mod ? ' selected' : ''}`}
                  style={{ padding: '0.75rem', fontSize: '0.875rem' }}
                >
                  {mod}
                </button>
              ))}
            </div>

            {error && <p className="text-xs mt-2" style={{ color: '#EF4444' }}>{error}</p>}

            <button
              onClick={handleStep1}
              className="btn-amber keep-dark w-full justify-center mt-5"
              disabled={!form.modelo}
              style={{ opacity: !form.modelo ? 0.5 : 1, padding: '1.1rem 2rem', fontSize: '1rem' }}
            >
              Siguiente
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}

        {/* PASO 2 — Datos */}
        {step === 2 && (
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '.1em' }}>Paso 2</p>
            <h2 className="font-bold mb-1" style={{ fontSize: '1.125rem', color: '#0F172A' }}>¿A quién le mandamos el resultado?</h2>
            <p className="text-xs mb-5" style={{ color: '#94A3B8' }}>
              Cuota estimada para <strong style={{ color: '#0F172A' }}>Volkswagen {form.modelo}</strong>.
            </p>

            <div style={{ marginBottom: '0.75rem' }}>
              <label className="text-xs font-semibold block mb-1" style={{ color: '#475569' }}>Nombre y apellido</label>
              <input
                type="text"
                placeholder="Ej: Juan García"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="sim-input"
              />
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <label className="text-xs font-semibold block mb-1" style={{ color: '#475569' }}>Teléfono / WhatsApp</label>
              <input
                type="tel"
                placeholder="Ej: 11 1234-5678"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                className="sim-input"
              />
            </div>

            {error && <p className="text-xs mt-2" style={{ color: '#EF4444' }}>{error}</p>}

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => { setStep(1); setError('') }}
                className="btn-navy"
                style={{ flex: '0 0 auto', padding: '0.7rem 1rem' }}
              >
                ← Atrás
              </button>
              <button
                onClick={handleStep2}
                className="btn-amber keep-dark w-full justify-center"
              >
                Ver mi cuota
              </button>
            </div>
          </div>
        )}

        {/* PASO 3 — Resultado */}
        {step === 3 && (
          <div className="text-center">
            <div className="sim-result-box">
              <p className="text-xs mb-2" style={{ color: '#94A3B8', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                Cuota mensual estimada
              </p>
              <p className="mono font-black" style={{ fontSize: '2rem', color: '#F59E0B', letterSpacing: '-.02em', lineHeight: 1 }}>
                {formatARS(cuota)}
                <span className="font-normal text-sm" style={{ color: '#64748B' }}>/mes</span>
              </p>
              <p className="text-xs mt-3" style={{ color: '#475569' }}>
                {form.marca} {form.modelo} · valor referencial
              </p>
            </div>

            <p className="text-xs mb-4" style={{ color: '#94A3B8' }}>
              * La cuota real puede variar según el grupo y el momento de la adjudicación.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber w-full justify-center mb-3"
              style={{ background: '#25D366' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Hablar con un asesor
            </a>

            {form.modelo === 'Amarok' && (
              <a
                href="/modelos/amarok#financiador"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', padding: '0.7rem 1rem', marginBottom: '0.75rem',
                  background: 'rgba(245,158,11,.1)',
                  border: '1.5px solid rgba(245,158,11,.4)',
                  borderRadius: 8,
                  color: '#B45309',
                  fontWeight: 700, fontSize: '0.8rem', letterSpacing: '.03em',
                  textDecoration: 'none',
                  transition: 'background .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,158,11,.18)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,158,11,.1)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Cotizador Amarok 0km · Fábrica VW
              </a>
            )}

            <button
              onClick={reset}
              className="btn-ghost w-full justify-center"
            >
              Hacer otra simulación
            </button>
          </div>
        )}

      </div>
    </div>
    </div>
  )
}
