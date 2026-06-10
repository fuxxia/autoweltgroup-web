'use client'
import { useState } from 'react'
import { WHATSAPP_NUMBER } from '@/lib/utils'

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', mensaje: '' })
  const [sent, setSent] = useState(false)

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, soy ${form.nombre || '[nombre]'}. ${form.mensaje || 'Quiero consultar por un Volkswagen 0km con entrega inmediata.'}`
  )}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contacto</h1>
        <p className="text-gray-500">Estamos para ayudarte. Escribinos y te respondemos rápido.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Form */}
        <div>
          {sent ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h2>
              <p className="text-gray-500 text-sm mb-6">Te contactamos en breve. También podés escribirnos directo por WhatsApp.</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
                style={{ background: '#25D366' }}
              >
                Ir a WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre y apellido *</label>
                <input
                  required
                  type="text"
                  placeholder="Juan García"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono / WhatsApp *</label>
                <input
                  required
                  type="tel"
                  placeholder="11 1234-5678"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="juan@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">¿En qué te podemos ayudar?</label>
                <textarea
                  rows={4}
                  placeholder="Contanos qué auto buscás o qué consulta tenés..."
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: '#1B3A6B' }}
              >
                Enviar consulta
              </button>
            </form>
          )}
        </div>

        {/* Info lateral */}
        <div className="space-y-6">
          <div className="rounded-2xl p-6" style={{ background: '#EEF2FF' }}>
            <h3 className="font-bold text-gray-900 mb-4">Formas de contacto</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-[#1B3A6B]"
                >
                  <span className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: '#25D366' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                  </span>
                  <span>+54 9 11 5607-2460</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: '#1B3A6B' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="16" height="16">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <path d="M22 6l-10 7L2 6"/>
                  </svg>
                </span>
                <span>info@autoweltgroup.com.ar</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700">
                <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: '#1B3A6B' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="16" height="16">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <span>Buenos Aires, Argentina<br /><span className="text-gray-400 text-xs">Atendemos todo el país</span></span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Horario de atención</h3>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>Lunes a Viernes: 9:00 – 18:00 hs</li>
              <li>Sábados: 9:00 – 13:00 hs</li>
              <li className="text-[#1B3A6B] font-medium">WhatsApp: disponible fuera de horario</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}
