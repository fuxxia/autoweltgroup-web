'use client'
import dynamic from 'next/dynamic'

// 3D hero — lazy load, sin SSR
export const HeroScene3D = dynamic(
  () => import('@/components/marketing/HeroScene3D'),
  { ssr: false, loading: () => <div style={{ width: '100%', height: '100%', minHeight: 380 }} /> }
)

// 3D parallax card (fallback liviano para Framer Motion)
export const HeroVisual = dynamic(
  () => import('@/components/marketing/HeroVisual'),
  { ssr: false }
)

// Sticky mobile CTA
export const StickyMobileCTA = dynamic(
  () => import('@/components/marketing/StickyMobileCTA'),
  { ssr: false }
)
