'use client'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { VWModel } from '@/data/volkswagen'
import { WHATSAPP_NUMBER } from '@/lib/utils'
import { trackCtaClick } from '@/lib/analytics'

interface Props {
  model: VWModel
}

export default function VehicleCard({ model }: Props) {
  const hasImg  = model.imagenes.length > 0
  const waText  = encodeURIComponent(`Hola, quiero cotizar un Volkswagen ${model.nombre} 0km`)

  // Tilt effect
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 20 })
  const sy = useSpring(my, { stiffness: 80, damping: 20 })
  const rotX = useTransform(sy, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotY = useTransform(sx, [-0.5, 0.5], ['-6deg', '6deg'])

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleLeave() { mx.set(0); my.set(0) }

  return (
    <motion.div
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="car-card"
    >
      {/* Media */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 220, background: 'var(--bg-3)' }}>
        {hasImg ? (
          <img
            src={model.imagenes[0]}
            alt={`VW ${model.nombre}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s ease', display: 'block' }}
            loading="lazy"
          />
        ) : model.video ? (
          <video src={model.video} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontWeight: 900, fontSize: '2.5rem', color: 'var(--gold)', letterSpacing: '-0.04em' }}>VW</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,17,31,.9) 0%, transparent 55%)', pointerEvents: 'none' }} />

        {/* Glow hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(217,162,58,.12) 0%, transparent 65%)',
          }}
        />

        {/* Badges top */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="tag tag-slate" style={{ fontSize: '0.5625rem', backdropFilter: 'blur(8px)', background: 'rgba(7,17,31,.78)' }}>
            {model.tipo}
          </span>
          <div style={{ display: 'flex', gap: '0.375rem' }}>
            {model.badge && <span className="tag tag-gold" style={{ fontSize: '0.5625rem' }}>{model.badge}</span>}
            {model.nuevo && <span className="tag tag-green" style={{ fontSize: '0.5625rem' }}>Nuevo</span>}
          </div>
        </div>

        {/* Name bottom */}
        <div style={{ position: 'absolute', bottom: 14, left: 16, zIndex: 2 }}>
          <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.035em', fontFamily: 'var(--font-jakarta), sans-serif' }}>
            {model.nombre}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="car-card-body">
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1rem' }}>
          {model.tagline}
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-faint)', marginBottom: '0.5rem' }}>
            {model.versiones.length} {model.versiones.length === 1 ? 'versión' : 'versiones'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {model.versiones.slice(0, 3).map(v => (
              <span key={v.nombre} className="tag tag-slate">{v.nombre}</span>
            ))}
            {model.versiones.length > 3 && (
              <span className="tag tag-slate">+{model.versiones.length - 3}</span>
            )}
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--line)', display: 'flex', gap: '0.5rem' }}>
          <Link
            href={`/modelos/${model.slug}`}
            onClick={() => trackCtaClick({ label: `ver_modelo_${model.slug}`, location: 'vehicle_grid' })}
            className="btn btn-ghost-light flex-1 justify-center"
            style={{ fontSize: '0.8125rem', padding: '0.6875rem 0.5rem' }}
          >
            Ver modelo
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackCtaClick({ label: `cotizar_${model.slug}`, location: 'vehicle_grid' })}
            className="btn btn-gold flex-1 justify-center"
            style={{ fontSize: '0.8125rem', padding: '0.6875rem 0.5rem' }}
          >
            Cotizar
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
