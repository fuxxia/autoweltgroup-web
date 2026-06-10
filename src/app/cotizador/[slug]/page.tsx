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
    title: `Cotizador ${modelo.nombre} ${modelo.version} 0km | Financiación VW Tasa 0%`,
    description: `Cotizá tu Volkswagen ${modelo.nombre} ${modelo.version} 0km. ${formatARS(modelo.descuento)} de bonificación · Financiación Fábrica Volkswagen a tasa 0% en cuotas fijas en pesos · Entrega inmediata sujeta a disponibilidad.`,
    keywords: [
      `${modelo.nombre.toLowerCase()} ${modelo.version.toLowerCase()} 0km`,
      `volkswagen ${modelo.nombre.toLowerCase()} ${modelo.version.toLowerCase()}`,
      `${modelo.nombre.toLowerCase()} financiacion tasa 0`,
      `cotizador ${modelo.nombre.toLowerCase()} argentina`,
      'volkswagen 0km financiado',
      'financiacion auto 0km',
    ],
    alternates: { canonical: `/cotizador/${slug}` },
    openGraph: {
      title: `${modelo.nombre} ${modelo.version} — Bonificación vigente | AutoWelt Group`,
      description: `${formatARS(modelo.descuento)} de bonificación · Tasa 0% · Cuotas fijas en pesos · Entrega inmediata sujeta a disponibilidad.`,
      siteName: 'AutoWelt Group',
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
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'AutoDealer',
        name: 'AutoWelt Group',
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
