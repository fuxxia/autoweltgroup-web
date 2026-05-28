'use client'
import { useEffect, useState } from 'react'

export default function LogoAnimated({ height = 42 }: { height?: number }) {
  const [ready, setReady] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    // pequeño delay para que el layout esté pintado antes de animar
    const t = setTimeout(() => setReady(true), 280)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', cursor: 'pointer', overflow: 'hidden' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo — reveal de izquierda a derecha + glow on hover */}
      <img
        src="/images/logo/logo.svg"
        alt="Autos Welt"
        style={{
          height: `${height}px`,
          width: 'auto',
          display: 'block',
          // clip-path reveal: empieza oculto desde la derecha, se abre hacia la izquierda
          clipPath: ready
            ? 'inset(0 0% 0 0 round 2px)'
            : 'inset(0 100% 0 0 round 2px)',
          transition: ready
            ? 'clip-path 1.0s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease'
            : 'filter 0.4s ease',
          // glow: sutil siempre, intenso en hover — igual que HÍVRIDA
          filter: hovered
            ? 'drop-shadow(0 0 14px rgba(245,158,11,0.62))'
            : 'drop-shadow(0 0 5px rgba(245,158,11,0.18))',
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
          transitionProperty: 'clip-path, filter, transform',
        }}
      />

      {/* Sweep amber — igual al efecto de HÍVRIDA, corre una sola vez al revelar */}
      {ready && <div className="logo-sweep" aria-hidden="true" />}
    </div>
  )
}
