import type { Metadata } from 'next'
import CotizadorElite from '@/components/CotizadorElite'
import { AMAROK_TRENDLINE_4X2 } from '@/data/financiamiento'

export const metadata: Metadata = {
  title: 'Cotizador Amarok Trendline 4x2 0km — Autos Welt | Financiación VW Tasa 0%',
  description: 'Cotizá tu Volkswagen Amarok Trendline 4x2 0km. $10.100.000 de descuento · Financiación Fábrica Volkswagen a tasa 0% en cuotas fijas en pesos · Entrega inmediata.',
  keywords: [
    'amarok 0km precio',
    'volkswagen amarok trendline',
    'amarok financiacion tasa 0',
    'cotizador amarok argentina',
    'amarok 4x2 precio 2026',
    'volkswagen 0km financiado',
    'plan de financiamiento auto 0km',
  ],
  openGraph: {
    title: 'Amarok Trendline 4x2 — Oferta Abril | Autos Welt',
    description: '$10.100.000 de descuento · Tasa 0% · Cuotas fijas en pesos · Entrega inmediata.',
    siteName: 'Autos Welt',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Volkswagen Amarok Trendline 4x2 0km',
  description: 'Volkswagen Amarok Trendline 4x2 2.0 TDI 140CV Manual. Precio oferta para patentar $44.900.000. Financiación Fábrica Volkswagen a tasa 0%. Entrega inmediata. Flete y formulario incluidos.',
  brand: {
    '@type': 'Brand',
    name: 'Volkswagen',
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'ARS',
    price: '44900000',
    priceValidUntil: '2026-04-30',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'AutoDealer',
      name: 'Autos Welt',
      url: 'https://autoweltgroup.com.ar',
    },
  },
}

export default function CotizadorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CotizadorElite modelo={AMAROK_TRENDLINE_4X2} />
    </>
  )
}
