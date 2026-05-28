'use client'
import { useEffect, useState } from 'react'

const CHARS = ['S', '.', 'R', '.', 'L', '.']

export function SRLAnimated({ size = 'md', animKey = 0 }: { size?: 'sm' | 'md' | 'lg'; animKey?: number }) {
  const styles: Record<string, { fontSize: string; letterSpacing: string; gap: string }> = {
    sm: { fontSize: '0.5rem',  letterSpacing: '.32em', gap: '1px' },
    md: { fontSize: '0.72rem', letterSpacing: '.38em', gap: '1px' },
    lg: { fontSize: '1.05rem', letterSpacing: '.44em', gap: '2px' },
  }
  const s = styles[size]
  return (
    <>
      <div
        key={animKey}
        style={{
          display: 'flex', alignItems: 'center', gap: s.gap,
          fontSize: s.fontSize, fontWeight: 800,
          letterSpacing: s.letterSpacing,
          color: '#94A3B8',
          textTransform: 'uppercase',
          userSelect: 'none',
        }}
      >
        {CHARS.map((ch, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              animation: `srl-char .45s cubic-bezier(.4,0,.2,1) both`,
              animationDelay: `${900 + i * 70}ms`,
            }}
          >
            {ch}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes srl-char {
          from { opacity: 0; transform: translateY(8px); filter: blur(4px); }
          to   { opacity: 1; transform: translateY(0);  filter: blur(0); }
        }
      `}</style>
    </>
  )
}

export default function Preloader() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fading'), 2200)
    const t2 = setTimeout(() => setPhase('gone'),   2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'gone') return null

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0F172A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity .6s ease',
        opacity: phase === 'fading' ? 0 : 1,
        pointerEvents: phase === 'fading' ? 'none' : 'all',
      }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        animation: 'pl-pop .6s cubic-bezier(.34,1.56,.64,1) .05s both',
      }}>

        {/* Logo + shimmer sweep */}
        <div style={{ position: 'relative', display: 'inline-block', overflow: 'hidden' }}>
          <img
            src="/images/logo/logo.svg"
            alt="Autos Welt"
            style={{ height: 80, width: 'auto', display: 'block' }}
          />
          <span aria-hidden style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,.75) 50%, rgba(255,255,255,.2) 58%, transparent 70%)',
            transform: 'translateX(-110%)',
            animation: 'logo-shine 1.1s cubic-bezier(.25,0,.1,1) .55s both',
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }} />
        </div>

        {/* S.R.L. — letra por letra */}
        <SRLAnimated size="lg" />
      </div>

      {/* Barra de progreso ámbar */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: 3,
        background: 'rgba(255,255,255,.05)',
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #F59E0B, #D97706)',
          animation: 'pl-bar 2.1s cubic-bezier(.4,0,.2,1) forwards',
        }} />
      </div>

      <style>{`
        @keyframes pl-pop {
          from { opacity: 0; transform: scale(.84); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes logo-shine {
          from { transform: translateX(-110%); }
          to   { transform: translateX(160%);  }
        }
        @keyframes pl-bar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  )
}
