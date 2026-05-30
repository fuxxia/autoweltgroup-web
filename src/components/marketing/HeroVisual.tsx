'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function HeroVisual() {
  const ref         = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x    = useSpring(rawX, { stiffness: 60, damping: 22 })
  const y    = useSpring(rawY, { stiffness: 60, damping: 22 })

  const rotateX = useTransform(y, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(x, [-0.5, 0.5], ['-8deg', '8deg'])

  useEffect(() => {
    setReady(true)
    const el = ref.current
    if (!el) return

    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const nx   = (e.clientX - rect.left) / rect.width  - 0.5
      const ny   = (e.clientY - rect.top)  / rect.height - 0.5
      rawX.set(nx)
      rawY.set(ny)
    }
    const reset = () => { rawX.set(0); rawY.set(0) }

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', reset)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', reset)
    }
  }, [rawX, rawY])

  return (
    <div ref={ref} style={{ perspective: '900px', width: '100%', userSelect: 'none' }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Car image container */}
        <div style={{
          position: 'relative',
          borderRadius: 24,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(11,22,38,.95) 0%, rgba(15,30,53,.9) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 32px 80px rgba(5,10,22,.6), inset 0 1px 0 rgba(255,255,255,.06)',
          aspectRatio: '16/10',
        }}>
          {/* Ambient glow top */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
            background: 'radial-gradient(ellipse at 50% -10%, rgba(217,162,58,.12) 0%, transparent 65%)',
          }} />

          {/* Car image */}
          <img
            src="/images/fotos/amarok/amarokfrente.jpeg"
            alt="Volkswagen Amarok 0km"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 40%',
              display: 'block',
              transform: 'translateZ(0)',
            }}
            loading="eager"
          />

          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
            background: 'linear-gradient(to top, rgba(7,17,31,.85) 0%, rgba(7,17,31,.1) 50%, transparent 100%)',
          }} />

          {/* Bottom info */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', zIndex: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,.45)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 4 }}>
                  Volkswagen · 0km
                </p>
                <p style={{ fontSize: '1.375rem', fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em', fontFamily: 'var(--font-jakarta), var(--font-inter), sans-serif' }}>
                  Amarok V6
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.625rem', color: 'rgba(217,162,58,.7)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                  Bonificación
                </p>
                <p style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#D9A23A', lineHeight: 1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                  $10.100.000
                </p>
              </div>
            </div>
          </div>

          {/* 3D shine layer */}
          {ready && (
            <motion.div
              style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
                background: 'linear-gradient(135deg, rgba(255,255,255,.04) 0%, transparent 50%, rgba(217,162,58,.03) 100%)',
                rotateX, rotateY,
              }}
            />
          )}
        </div>

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: -12, right: -12,
            background: 'linear-gradient(135deg, #D9A23A 0%, #E0AA3E 100%)',
            borderRadius: 12,
            padding: '0.5rem 1rem',
            boxShadow: '0 8px 24px rgba(217,162,58,.4)',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: '0.5rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(7,17,31,.65)', marginBottom: 1 }}>
            Oferta vigente
          </span>
          <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#07111F', letterSpacing: '-0.02em', lineHeight: 1 }}>
            Entrega inmediata
          </span>
        </motion.div>

        {/* Floating spec badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            bottom: 20, left: -16,
            background: 'rgba(7,17,31,.92)',
            border: '1px solid rgba(255,255,255,.12)',
            borderRadius: 10,
            padding: '0.625rem 0.875rem',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', animation: 'pulse-live 2s infinite' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#F8F5EF', letterSpacing: '-0.01em' }}>
            Stock disponible
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
