/**
 * Analytics helpers — AutoWelt Group
 *
 * Soporta:
 *   - Google Ads (AW-17888545559) — ya existente
 *   - GA4 (NEXT_PUBLIC_GA4_ID) — opcional
 *   - Meta Pixel (NEXT_PUBLIC_META_PIXEL_ID) — opcional
 *
 * Setup:
 *   GA4:  agregar NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX a .env.local y Vercel
 *   Meta: agregar NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXX a .env.local y Vercel
 *
 * Custom dimensions GA4 recomendadas (configurar en GA4 > Admin > Custom definitions):
 *   vehicle_model, vehicle_type, interest_type, locality, channel_preference
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

// ── Helpers internos ──────────────────────────────────────────

function isClient(): boolean {
  return typeof window !== 'undefined'
}

function hasGtag(): boolean {
  return isClient() && typeof window.gtag === 'function'
}

function hasFbq(): boolean {
  return isClient() && typeof window.fbq === 'function'
}

// ── Tipos ─────────────────────────────────────────────────────

export interface LeadEventParams {
  vehicleModel?:      string
  vehicleType?:       string  // '0km' | 'adjudicado' | 'financiacion'
  interestType?:      string
  locality?:          string
  channelPreference?: string  // 'whatsapp' | 'email' | 'ambos'
  formLocation?:      string  // 'hero' | 'cotizador' | 'simulador' | 'contacto'
  hasUsado?:          boolean
}

export interface CtaClickParams {
  label:    string
  location: string
  url?:     string
}

// ── GA4 ───────────────────────────────────────────────────────

function gtagEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!hasGtag()) return
  window.gtag!('event', eventName, params ?? {})
}

// ── Meta Pixel ────────────────────────────────────────────────

function fbqEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!hasFbq()) return
  window.fbq!('track', eventName, params ?? {})
}

// ── API pública ───────────────────────────────────────────────

/**
 * Disparo en submit exitoso del cotizador / formulario.
 * GA4: generate_lead
 * Meta: Lead
 * Google Ads: conversion
 */
export function trackGenerateLead(params: LeadEventParams = {}): void {
  const gaParams = {
    event_category:    'lead',
    vehicle_model:     params.vehicleModel     ?? undefined,
    vehicle_type:      params.vehicleType      ?? undefined,
    interest_type:     params.interestType     ?? undefined,
    locality:          params.locality         ?? undefined,
    channel_preference:params.channelPreference?? undefined,
    form_location:     params.formLocation     ?? undefined,
  }

  // GA4
  gtagEvent('generate_lead', gaParams)

  // Google Ads conversion (mantiene integración existente)
  gtagEvent('conversion', {
    send_to: 'AW-17888545559/lead',
    ...gaParams,
  })

  // Meta Pixel
  fbqEvent('Lead', {
    content_category: params.vehicleType  ?? 'unknown',
    content_name:     params.vehicleModel ?? 'unknown',
  })
}

/**
 * Click en CTA relevante para negocio (WhatsApp, cotizador, etc.)
 */
export function trackCtaClick(params: CtaClickParams): void {
  gtagEvent('cta_click', {
    event_category: 'engagement',
    event_label:    params.label,
    cta_location:   params.location,
    link_url:       params.url ?? undefined,
  })
}

/**
 * Click específico en WhatsApp (alta prioridad comercial)
 */
export function trackWAClick(location: string): void {
  gtagEvent('whatsapp_click', {
    event_category: 'engagement',
    cta_location:   location,
  })
  fbqEvent('Contact', { content_name: 'whatsapp_click', content_category: location })
}

/**
 * Usuario empieza a interactuar con un formulario / wizard
 */
export function trackFormStart(formName: string): void {
  gtagEvent('form_start', {
    event_category: 'engagement',
    form_name:      formName,
  })
  fbqEvent('InitiateCheckout', { content_name: formName })
}

/**
 * Usuario completa un paso del wizard
 */
export function trackStepComplete(formName: string, step: number, stepName: string): void {
  gtagEvent('form_step_complete', {
    event_category: 'engagement',
    form_name:      formName,
    step_number:    step,
    step_name:      stepName,
  })
}

/**
 * Vista de ficha de vehículo clave
 */
export function trackVehicleView(model: string): void {
  gtagEvent('view_item', {
    event_category: 'vehicle',
    item_name:      model,
    item_category:  'automobile',
  })
  fbqEvent('ViewContent', { content_name: model, content_category: 'vehicle' })
}

/**
 * Click en sticky mobile CTA
 */
export function trackStickyCtaClick(action: string): void {
  gtagEvent('sticky_cta_click', {
    event_category: 'mobile_engagement',
    action,
  })
}
