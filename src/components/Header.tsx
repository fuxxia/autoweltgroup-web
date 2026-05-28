'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { WHATSAPP_NUMBER } from '@/lib/utils'
const NAV = [
  { href: '/#modelos',       label: 'Modelos' },
  { href: '/catalogo',       label: 'Adjudicados' },
  { href: '/modelos/amarok', label: 'Cotizador Amarok' },
  { href: '/simulador',      label: 'Simulador' },
  { href: '/como-funciona',  label: 'Cómo funciona' },
  { href: '/contacto',       label: 'Contacto' },
]

export default function Header() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const fn = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleOpen = () => setOpen(o => !o)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-200"
      style={{
        background: '#0F172A',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,.4)' : 'none',
        willChange: 'transform',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between" style={{ height: '68px' }}>

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <img src="/images/logo/logo.svg" alt="Autos Welt" className="w-auto" style={{ height: 'clamp(36px, 9vw, 54px)' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="px-4 py-2 text-sm font-medium rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right side desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://login.autoweltgroup.com.ar/authentication/login"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-white"
            style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            Login
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20consultar%20sobre%20planes%20adjudicados`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amber text-xs px-4 py-2"
            style={{ borderRadius: '.5rem' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Consultar
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10"
            onClick={handleOpen}
            aria-label="Menú"
          >
            {open ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/10" style={{ background: '#1E293B' }}>

          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 border-b border-white/5 transition-colors"
            >
              {n.label}
            </Link>
          ))}
          <a
            href="https://login.autoweltgroup.com.ar/authentication/login"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 border-b border-white/5 transition-colors"
          >
            Login
          </a>
          <div className="p-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20consultar%20sobre%20planes%20adjudicados`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber w-full justify-center"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
