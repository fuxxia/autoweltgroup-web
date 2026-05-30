'use client'

const TESTIMONIOS = [
  {
    nombre: 'Martín Ríos',
    ciudad: 'Córdoba capital',
    vehiculo: 'Amarok V6 Comfortline',
    texto:
      'Llevaba meses buscando una Amarok con buen precio y sin esperas. En Buenos Aires conseguí la que quería con entrega en 72 horas. Pablo me asesoró en todo, desde la financiación hasta el retiro. Volví manejando desde CABA.',
    rating: 5,
  },
  {
    nombre: 'Fabián Morales',
    ciudad: 'Mendoza',
    vehiculo: 'Volkswagen Taos Highline',
    texto:
      'En mi ciudad solo había una opción y con sobreprecios. Me contacté, me mandaron toda la información, viajé un viernes y el lunes ya estaba volviendo con el auto. Claridad total en cada paso.',
    rating: 5,
  },
  {
    nombre: 'Lorena Figueroa',
    ciudad: 'Rosario, Santa Fe',
    vehiculo: 'Volkswagen Polo Track',
    texto:
      'Me sorprendió la diferencia de precio con lo que cotizaba acá. Cuotas fijas, sin sorpresas, y me tomaron el usado como parte de pago. El trámite fue mucho más simple de lo que imaginaba.',
    rating: 5,
  },
]

const StarIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
)

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
)

const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="13" height="13">
    <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2h-2"/>
    <rect x="7" y="14" width="10" height="6" rx="1"/>
    <path d="M5 9l2-5h10l2 5"/>
    <circle cx="7.5" cy="17.5" r="1.5"/>
    <circle cx="16.5" cy="17.5" r="1.5"/>
  </svg>
)

export default function TestimoniosSection() {
  return (
    <section style={{ background: '#F8F5EF', borderTop: '1px solid rgba(15,23,42,.10)', borderBottom: '1px solid rgba(15,23,42,.10)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="eyebrow">Clientes reales</span>
          <h2 className="section-title section-title-dark">Lo que dicen quienes viajaron</h2>
          <div className="divider divider-center" />
          <p className="text-sm mt-4 mx-auto" style={{ color: '#64748B', maxWidth: '520px', lineHeight: '1.7' }}>
            Compradores del interior que eligieron operar desde Buenos Aires y volvieron manejando su 0km.
          </p>
        </div>

        {/* Grid testimonios */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {TESTIMONIOS.map((t) => (
            <div key={t.nombre} className="testimonial-card">

              {/* Stars */}
              <div className="stars">
                {Array.from({ length: t.rating }).map((_, i) => <StarIcon key={i} />)}
              </div>

              {/* Texto */}
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#334155', fontStyle: 'italic' }}>
                &ldquo;{t.texto}&rdquo;
              </p>

              {/* Autor */}
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>
                <p className="font-bold text-sm" style={{ color: '#0F172A' }}>{t.nombre}</p>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-xs" style={{ color: '#64748B' }}>
                    <LocationIcon />
                    {t.ciudad}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: '#64748B' }}>
                    <CarIcon />
                    {t.vehiculo}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust footer */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6" style={{ borderTop: '1px solid #E2E8F0' }}>
          {[
            { num: '+500', label: 'entregas coordinadas' },
            { num: '4.9★', label: 'satisfacción promedio' },
            { num: '100%', label: 'operaciones confirmadas antes del viaje' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5 text-center">
              <span className="font-black text-xl" style={{ color: '#0F172A', letterSpacing: '-.02em' }}>{item.num}</span>
              <span className="text-xs" style={{ color: '#64748B' }}>{item.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
