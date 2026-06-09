'use client'
import { useState } from 'react'

const COLORS_AMAROK = [
  { id: 'Gris',   hex: '#7A7E82' },
  { id: 'Blanco', hex: '#E8E4DE' },
  { id: 'Negro',  hex: '#252525' },
  { id: 'Plata',  hex: '#B8B8B0' },
  { id: 'Azul',   hex: '#1B3A5C' },
]

const ANTICIPOS_MINI = [
  { id: '5m',  label: '$5M' },
  { id: '10m', label: '$10M' },
  { id: '15m', label: '$15M' },
  { id: '20m', label: '$20M' },
  { id: '25m', label: '$25M' },
  { id: 'mas', label: '+$25M' },
]

export default function HeroMiniCotizador() {
  const [color,      setColor]    = useState('')
  const [anticipoId, setAnticipo] = useState('')
  const [provincia,  setProvincia]= useState('')

  function handleClick() {
    // Dispara evento para prefill inmediato del CotizadorWizard
    window.dispatchEvent(new CustomEvent('cw:prefill', {
      detail: { vehiculo: 'Amarok', color, anticipoId, localidad: provincia },
    }))
    const el = document.getElementById('cotizador')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className="hero-mini-cotizador"
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 15,
        background: 'rgba(4, 10, 22, 0.84)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderTop: '1px solid rgba(217,162,58,0.13)',
      }}
    >
      <div className="max-w-7xl mx-auto" style={{ padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>

          {/* Título */}
          <div style={{ flexShrink: 0 }}>
            <p style={{ fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.2rem' }}>
              Calculá tu Amarok
            </p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', lineHeight: 1 }}>
              en 30 segundos
            </p>
          </div>

          {/* Divisor */}
          <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.08)', flexShrink: 0, alignSelf: 'center' }} />

          {/* Color */}
          <div>
            <p style={{ fontSize: '0.5rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '0.4rem' }}>
              Color
            </p>
            <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
              {COLORS_AMAROK.map(c => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  title={c.id}
                  aria-label={`Color ${c.id}`}
                  style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: c.hex,
                    border: color === c.id ? '2px solid var(--gold)' : '1.5px solid rgba(255,255,255,0.18)',
                    boxShadow: color === c.id ? '0 0 0 2px rgba(217,162,58,0.30)' : 'none',
                    cursor: 'pointer', flexShrink: 0,
                    transition: 'border 0.15s, box-shadow 0.15s, transform 0.15s',
                    transform: color === c.id ? 'scale(1.18)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Anticipo */}
          <div style={{ flex: '1 1 130px', minWidth: 110 }}>
            <p style={{ fontSize: '0.5rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '0.4rem' }}>
              Anticipo
            </p>
            <select
              value={anticipoId}
              onChange={e => setAnticipo(e.target.value)}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.10)', borderRadius: 8,
                color: anticipoId ? 'var(--text)' : 'var(--text-faint)',
                fontSize: '0.875rem', fontWeight: 600,
                padding: '0.4375rem 0.625rem',
                cursor: 'pointer', outline: 'none', appearance: 'none', fontFamily: 'inherit',
              }}
            >
              <option value="" disabled>Elegí</option>
              {ANTICIPOS_MINI.map(a => (
                <option key={a.id} value={a.id} style={{ background: '#07111F' }}>{a.label}</option>
              ))}
            </select>
          </div>

          {/* Provincia */}
          <div style={{ flex: '1 1 160px', minWidth: 130 }}>
            <p style={{ fontSize: '0.5rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '0.4rem' }}>
              Provincia
            </p>
            <input
              type="text"
              placeholder="Ej: Córdoba"
              value={provincia}
              onChange={e => setProvincia(e.target.value)}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.10)', borderRadius: 8,
                color: 'var(--text)', fontSize: '0.875rem',
                padding: '0.4375rem 0.625rem',
                outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* CTA */}
          <button
            onClick={handleClick}
            className="btn btn-gold"
            style={{ padding: '0.6875rem 1.375rem', whiteSpace: 'nowrap', flexShrink: 0, fontSize: '0.9375rem' }}
          >
            Ver opciones de cuota
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

        </div>
      </div>
    </div>
  )
}
