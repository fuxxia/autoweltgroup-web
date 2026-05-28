'use client'
import { useState, useEffect } from 'react'

interface VideoModalProps {
  src: string
  label: string
  sublabel: string
  dark?: boolean
}

export default function VideoModal({ src, label, sublabel, dark }: VideoModalProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="w-full mt-4 p-4 rounded-lg flex items-center gap-3 text-left transition-colors"
        style={{
          background: dark ? 'rgba(255,255,255,.05)' : '#F8FAFC',
          border: `1px solid ${dark ? 'rgba(255,255,255,.08)' : '#E2E8F0'}`,
          cursor: 'pointer',
        }}
      >
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#0F172A' }}>
          <svg viewBox="0 0 24 24" fill="#F59E0B" width="18" height="18"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: dark ? '#F1F5F9' : '#0F172A' }}>{label}</p>
          <p className="text-xs" style={{ color: '#94A3B8' }}>{sublabel}</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-lg shrink-0"
          style={{ background: 'rgba(245,158,11,.12)', color: '#F59E0B', border: '1px solid rgba(245,158,11,.25)' }}>
          Ver
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: 'rgba(0,0,0,.85)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ maxWidth: '860px', background: '#000' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 flex items-center justify-center rounded-full"
              style={{ width: 36, height: 36, background: 'rgba(0,0,0,.6)', border: '1px solid rgba(255,255,255,.15)', color: '#fff', cursor: 'pointer' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <video
              src={src}
              controls
              autoPlay
              playsInline
              className="w-full"
              style={{ aspectRatio: '16/9', display: 'block' }}
            />
          </div>
        </div>
      )}
    </>
  )
}
