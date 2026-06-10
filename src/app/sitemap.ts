import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

import { VW_MODELS } from '@/data/volkswagen'
import { MODELOS_COTIZADOR } from '@/data/financiamiento'

const BASE = 'https://autoweltgroup.com.ar'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE}/cotizador`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/catalogo`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/como-funciona`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/simulador`,   lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contacto`,    lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const modelRoutes: MetadataRoute.Sitemap = VW_MODELS.map(m => ({
    url: `${BASE}/modelos/${m.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: m.slug === 'amarok' ? 0.9 : 0.7,
  }))

  const cotizadorRoutes: MetadataRoute.Sitemap = MODELOS_COTIZADOR.map(m => ({
    url: `${BASE}/cotizador/${m.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...modelRoutes, ...cotizadorRoutes]
}
