import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CotizadorElite from '@/components/CotizadorElite'
import { MODELOS_MAP, MODELOS_COTIZADOR } from '@/data/financiamiento'
import { formatARS } from '@/lib/utils'

export function generateStaticParams() {
  return MODELOS_COTIZADOR.map(m => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const modelo = MODELOS_MAP[slug]
  if (!modelo) return {}
  return {
    title: `Cotizador ${modelo.nombre} ${modelo.version} 0km — Autos Welt | Financiación VW Tasa 0%`,
    description: `Cotizá tu Volkswagen ${modelo.nombre} ${modelo.version} 0km. ${formatARS(modelo.descuento)} de descuento · Financiación Fábrica Volkswagen a tasa 0% en cuotas fijas en pesos · Entrega inmediata.`,
    keywords: [
      `${modelo.nombre.toLowerCase()} ${modelo.version.toLowerCase()} 0km`,
      `volkswagen ${modelo.nombre.toLowerCase()} ${modelo.version.toLowerCase()}`,
      `${modelo.nombre.toLowerCase()} financiacion tasa 0`,
      `cotizador ${modelo.nombre.toLowerCase()} argentina`,
      'volkswagen 0km financiado',
      'plan de financiamiento auto 0km',
    ],
    openGraph: {
      title: `${modelo.nombre} ${modelo.version} — Oferta Abril | Autos Welt`,
      description: `${formatARS(modelo.descuento)} de descuento · Tasa 0% · Cuotas fijas en pesos · Entrega inmediata.`,
      siteName: 'Autos Welt',
    },
  }
}

export default async function CotizadorSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const modelo = MODELOS_MAP[slug]
  if (!modelo) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Volkswagen ${modelo.nombre} ${modelo.version} 0km`,
    description: `Volkswagen ${modelo.nombre} ${modelo.version} ${modelo.motor}. Precio oferta para patentar ${formatARS(modelo.ofertaPatentar)}. Financiación a tasa 0% con VW Financial Service. Entrega inmediata.`,
    brand: { '@type': 'Brand', name: 'Volkswagen' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ARS',
      price: String(modelo.ofertaPatentar),
      priceValidUntil: '2026-04-30',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'AutoDealer',
        name: 'Autos Welt',
        url: 'https://autoweltgroup.com.ar',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CotizadorElite modelo={modelo} />
    </>
  )
}
