'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { WHATSAPP_NUMBER } from '@/lib/utils'

const NAV = [
  { href: '/#modelos',           label: 'Modelos' },
  { href: '/modelos/amarok#financiador', label: 'Financiación' },
  { href: '/simulador',          label: 'Tomamos tu usado' },
  { href: '/#entrega',           label: 'Entrega inmediata' },
  { href: '/como-funciona',      label: 'Cómo funciona' },
  { href: '/contacto',           label: 'Contacto' },
]

export default function Header() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const fn = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20solicitar%20un%20asesor%20para%20cotizar%20un%200km`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-scrolled' : 'navbar-glass'}`}
      style={{ willChange: 'transform', WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }}
    >
      <div className="max-w-7xl mx-auto px-5" style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center" style={{ marginRight: '2rem' }}>
          <img src="/images/logo/logo.svg" alt="AutoWelt Group" style={{ height: '42px', width: 'auto' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150"
              style={{ color: '#9AA4B2', letterSpacing: '-0.01em' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#F8F5EF'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#9AA4B2'; e.currentTarget.style.background = 'transparent' }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <a
            href="https://login.autoweltgroup.com.ar/authentication/login"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost-light"
            style={{ fontSize: '0.875rem', padding: '0.5625rem 1.125rem' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            Login
          </a>
          <a
            href={waUrl}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-gold"
            style={{ fontSize: '0.875rem', padding: '0.625rem 1.25rem' }}
          >
            Solicitar asesor
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
          style={{ color: '#9AA4B2' }}
          onClick={() => setOpen(o => !o)}
          aria-label="Menú"
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#F8F5EF' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9AA4B2' }}
        >
          {open
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M18 6L6 18M6 6l12 12"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: 'rgba(7,17,31,0.97)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <nav style={{ padding: '0.5rem 1.25rem 1rem' }}>
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-center py-3.5 text-sm font-medium border-b transition-colors"
                style={{ color: '#9AA4B2', borderColor: 'rgba(255,255,255,0.06)', letterSpacing: '-0.01em' }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div style={{ padding: '0.75rem 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <a
              href={waUrl}
              target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn-gold w-full justify-center"
            >
              Solicitar asesor
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              href="https://login.autoweltgroup.com.ar/authentication/login"
              target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn-ghost-light w-full justify-center"
              style={{ fontSize: '0.875rem' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Login cliente
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
