'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WHATSAPP_NUMBER } from '@/lib/utils'

const NAV = [
  { href: '/#modelos',                   label: 'Modelos' },
  { href: '/modelos/amarok#financiador', label: 'Financiación' },
  { href: '/simulador',                  label: 'Tomamos tu usado' },
  { href: '/#entrega',                   label: 'Entrega inmediata' },
  { href: '/como-funciona',              label: 'Cómo funciona' },
  { href: '/contacto',                   label: 'Contacto' },
]

export default function Header() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const fn = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrolled(window.scrollY > 32); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-scrolled' : 'navbar-glass'}`}
      style={{ willChange: 'transform' }}
    >
      <div className="max-w-7xl mx-auto px-6" style={{ height: '76px', display: 'flex', alignItems: 'center', gap: '2.5rem' }}>

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <img src="/images/logo/logo.svg" alt="AutoWelt Group" style={{ height: '44px', width: 'auto', display: 'block' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 flex-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150"
              style={{ color: 'var(--text-muted)', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent' }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0 ml-auto">
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
            href="#cotizador"
            className="btn btn-gold"
            style={{ fontSize: '0.875rem', padding: '0.625rem 1.375rem' }}
          >
            Cotizar ahora
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg ml-auto transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onClick={() => setOpen(o => !o)}
          aria-label="Menú"
        >
          {open
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M18 6L6 18M6 6l12 12"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          }
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden', background: 'rgba(7,17,31,.97)', borderTop: '1px solid var(--line)', backdropFilter: 'blur(20px)' }}
          >
            <nav style={{ padding: '0.5rem 1.5rem 0.75rem' }}>
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center py-3.5 text-sm font-medium border-b"
                  style={{ color: 'var(--text-muted)', borderColor: 'var(--line)', letterSpacing: '-0.01em' }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div style={{ padding: '0.625rem 1.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <a
                href="#cotizador"
                onClick={() => setOpen(false)}
                className="btn btn-gold w-full justify-center"
              >
                Cotizar ahora
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20cotizar%20un%200km`}
                target="_blank" rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn btn-ghost-light w-full justify-center"
                style={{ fontSize: '0.875rem' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
