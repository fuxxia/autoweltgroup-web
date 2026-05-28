'use client'
import { useState, useEffect } from 'react'

interface HeroImageSliderProps {
  imagenes: string[]
  nombre: string
  alts?: string[]
}

export default function HeroImageSlider({ imagenes, nombre, alts }: HeroImageSliderProps) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)

  useEffect(() => {
    if (imagenes.length <= 1) return
    const timer = setInterval(() => {
      setPrev(current)
      setCurrent((c) => (c + 1) % imagenes.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [current, imagenes.length])

  return (
    <div className="relative w-full h-full select-none" style={{ minHeight: '400px', background: 'transparent' }}>
      {imagenes.map((src, i) => {
        const isActive = i === current
        const isLeaving = i === prev
        return (
          <img
            key={src}
            src={src}
            alt={alts?.[i] ?? `${nombre} ${i + 1}`}
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              opacity: isActive ? 1 : isLeaving ? 0 : 0,
              transform: isActive ? 'scale(1)' : isLeaving ? 'scale(1.03)' : 'scale(.97)',
              transition: isActive
                ? 'opacity .75s ease, transform .9s cubic-bezier(.16,1,.3,1)'
                : isLeaving
                ? 'opacity .55s ease, transform .7s ease'
                : 'none',
              zIndex: isActive ? 2 : isLeaving ? 1 : 0,
              pointerEvents: 'none',
            }}
          />
        )
      })}

      {/* Dots */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1.5" style={{ zIndex: 10 }}>
        {imagenes.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setCurrent(i) }}
            style={{
              width: i === current ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === current ? '#F59E0B' : 'rgba(255,255,255,.3)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all .4s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
