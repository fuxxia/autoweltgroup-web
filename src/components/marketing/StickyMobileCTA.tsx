'use client'
import { useEffect, useState } from 'react'
import { WHATSAPP_NUMBER } from '@/lib/utils'
import { trackStickyCtaClick, trackWAClick } from '@/lib/analytics'

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="sticky-cta lg:hidden">
      <a
        href="#cotizador"
        onClick={() => trackStickyCtaClick('scroll_to_cotizador')}
        className="btn-amber keep-dark flex-1 justify-center"
        style={{ fontSize: '0.875rem', padding: '0.75rem 1rem' }}
      >
        Cotizar ahora
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20cotizar%20un%20Volkswagen%200km`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWAClick('sticky_mobile_cta')}
        className="btn-wa"
        style={{ padding: '0.75rem 1.25rem', fontSize: '0.875rem' }}
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
    </div>
  )
}
