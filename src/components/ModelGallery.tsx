'use client'
import { useState } from 'react'

interface Props {
  imagenes: string[]
  nombre: string
}

export default function ModelGallery({ imagenes, nombre }: Props) {
  const [active, setActive] = useState(0)

  if (imagenes.length === 0) return null

  return (
    <div>
      {/* Main image */}
      <div className="relative rounded-xl overflow-hidden mb-3" style={{ background: '#E2E8F0', aspectRatio: '16/9' }}>
        <img
          src={imagenes[active]}
          alt={`${nombre} — foto ${active + 1}`}
          className="w-full h-full object-cover"
          style={{ transition: 'opacity .25s ease' }}
        />
      </div>

      {/* Thumbnails */}
      {imagenes.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {imagenes.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                flexShrink: 0,
                width: '80px',
                height: '56px',
                borderRadius: '0.375rem',
                overflow: 'hidden',
                border: i === active ? '2px solid #F59E0B' : '2px solid transparent',
                padding: 0,
                cursor: 'pointer',
                transition: 'border-color .15s',
              }}
            >
              <img
                src={src}
                alt={`${nombre} thumb ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
