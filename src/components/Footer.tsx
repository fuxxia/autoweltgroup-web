import Link from 'next/link'
import { WHATSAPP_NUMBER } from '@/lib/utils'

export default function Footer() {
  return (
    <footer style={{ background: '#0F172A' }} className="text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/images/logo/logo.svg" alt="Autos Welt" style={{ height: '36px', width: 'auto' }} />
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#94A3B8' }}>
              Especialistas en planes adjudicados y autos 0km en Argentina.
              Más de 10 años ayudando a familias a acceder a su auto al mejor precio.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20consultar%20sobre%20planes%20adjudicados`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber inline-flex text-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Escribinos ahora
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#F59E0B' }}>Navegación</h3>
            <ul className="space-y-2.5 text-sm" style={{ color: '#94A3B8' }}>
              {[
                { href: '/catalogo',      label: 'Catálogo de adjudicados' },
                { href: '/simulador',     label: 'Simulador de cuota' },
                { href: '/como-funciona', label: 'Cómo funciona' },
                { href: '/contacto',      label: 'Contacto' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#F59E0B' }}>Contacto</h3>
            <ul className="space-y-3 text-sm" style={{ color: '#94A3B8' }}>
              <li>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" style={{ color: '#25D366', flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  +54 9 11 5607-2460
                </a>
              </li>
              <li>
                <a href="mailto:info@autoweltgroup.com.ar" className="hover:text-white transition-colors">
                  info@autoweltgroup.com.ar
                </a>
              </li>
              <li>Buenos Aires, Argentina</li>
              <li className="text-xs" style={{ color: '#64748B' }}>
                Lun–Vie 9:00–18:00 · Sáb 9:00–13:00
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs border-t" style={{ borderColor: '#1E293B', color: '#475569' }}>
          <p>© {new Date().getFullYear()} Autos Welt · Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://login.autoweltgroup.com.ar/authentication/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Acceso clientes
            </a>
            <p>Diseño web <a href="https://fuxxia.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Fuxxia.com</a> 🇦🇷</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
