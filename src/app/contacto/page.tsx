'use client'
import { useState } from 'react'
import { WHATSAPP_NUMBER } from '@/lib/utils'

const WaIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', mensaje: '' })
  const [sent, setSent] = useState(false)

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, soy ${form.nombre || '[nombre]'}. ${form.mensaje || 'Quiero consultar por un Volkswagen 0km con entrega inmediata.'}`
  )}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto px-6 py-20">

        <div className="text-center mb-14">
          <span className="eyebrow">Estamos para ayudarte</span>
          <h1 className="section-title section-title-light" style={{ marginBottom: '0.75rem' }}>Contacto</h1>
          <div className="divider divider-center" style={{ marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
            Escribinos y te respondemos en el día. Sin bots, atención real.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Form */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            {sent ? (
              <div className="text-center py-10">
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,.12)', border: '2px solid rgba(34,197,94,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" width="28" height="28" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', marginBottom: '0.625rem', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                  ¡Consulta enviada!
                </h2>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  WhatsApp se abrió con tu mensaje. Si se cerró, tocá el botón de abajo.
                </p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-wa justify-center">
                  <WaIcon size={16} />
                  Abrir WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="cw-label" htmlFor="ct-nombre">Nombre y apellido</label>
                  <input
                    id="ct-nombre"
                    required
                    type="text"
                    placeholder="Tu nombre"
                    autoComplete="name"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="cw-input"
                  />
                </div>
                <div>
                  <label className="cw-label" htmlFor="ct-tel">Teléfono / WhatsApp</label>
                  <input
                    id="ct-tel"
                    required
                    type="tel"
                    placeholder="Ej: 11 5607-2460"
                    autoComplete="tel"
                    value={form.telefono}
                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                    className="cw-input"
                  />
                </div>
                <div>
                  <label className="cw-label" htmlFor="ct-email">Email <span style={{ color: 'var(--text-faint)', fontWeight: 400 }}>(opcional)</span></label>
                  <input
                    id="ct-email"
                    type="email"
                    placeholder="tu@email.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="cw-input"
                  />
                </div>
                <div>
                  <label className="cw-label" htmlFor="ct-msj">¿En qué te podemos ayudar?</label>
                  <textarea
                    id="ct-msj"
                    rows={4}
                    placeholder="Contanos qué 0km buscás o qué consulta tenés..."
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    className="cw-input"
                    style={{ resize: 'none' }}
                  />
                </div>
                <button type="submit" className="btn btn-wa w-full justify-center" style={{ padding: '1rem 1.875rem' }}>
                  <WaIcon size={16} />
                  Enviar por WhatsApp
                </button>
                <p style={{ fontSize: '0.6875rem', color: 'var(--text-faint)', textAlign: 'center', lineHeight: 1.6 }}>
                  Tus datos se usan solo para responderte. No los compartimos con terceros.
                </p>
              </form>
            )}
          </div>

          {/* Info lateral */}
          <div className="space-y-5">
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1.25rem', letterSpacing: '-0.015em' }}>Formas de contacto</h2>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, quiero consultar por un Volkswagen 0km.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: '#1DB954' }}>
                      <WaIcon />
                    </span>
                    <span style={{ color: 'var(--text)' }}>+54 9 11 5607-2460</span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--gold-subtle)', border: '1px solid var(--gold-border)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" width="15" height="15" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <path d="M22 6l-10 7L2 6"/>
                    </svg>
                  </span>
                  <a href="mailto:info@autoweltgroup.com.ar" style={{ color: 'var(--text)' }} className="hover:underline">
                    info@autoweltgroup.com.ar
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'var(--gold-subtle)', border: '1px solid var(--gold-border)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" width="15" height="15" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span>
                    <span style={{ color: 'var(--text)' }}>Buenos Aires, Argentina</span>
                    <br />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>Atendemos todo el país</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.875rem', letterSpacing: '-0.015em' }}>Horario de atención</h2>
              <ul className="text-sm space-y-1.5" style={{ color: 'var(--text-muted)' }}>
                <li>Lunes a Viernes: 9:00 – 18:00 hs</li>
                <li>Sábados: 9:00 – 13:00 hs</li>
                <li style={{ color: 'var(--gold-bright)', fontWeight: 600 }}>WhatsApp: disponible fuera de horario</li>
              </ul>
            </div>

            <div className="glass-card glass-card-gold" style={{ padding: '1.75rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                ¿Ya sabés qué modelo querés? Cotizalo en un minuto y recibí la propuesta por WhatsApp.
              </p>
              <a href="/#cotizador" className="btn btn-gold" style={{ marginTop: '1rem' }}>
                Ir al cotizador
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
