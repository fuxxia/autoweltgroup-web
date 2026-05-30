'use client'
import dynamic from 'next/dynamic'

export const HeroVisual = dynamic(
  () => import('@/components/marketing/HeroVisual'),
  { ssr: false }
)

export const StickyMobileCTA = dynamic(
  () => import('@/components/marketing/StickyMobileCTA'),
  { ssr: false }
)
