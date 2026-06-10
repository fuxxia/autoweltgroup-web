import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Escribinos por WhatsApp, email o el formulario. Cotizamos tu Volkswagen 0km con entrega inmediata y retiro coordinado en Buenos Aires. Atendemos todo el país.',
  alternates: { canonical: '/contacto' },
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children
}
