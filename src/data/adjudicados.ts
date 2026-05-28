export type MarcaId = 'volkswagen' | 'fiat' | 'peugeot' | 'renault' | 'toyota' | 'chevrolet' | 'ford'

export interface Adjudicado {
  id: string
  slug: string
  marca: MarcaId
  modelo: string
  version: string
  fotos: string[]
  valorUnidad: number
  cuotasPagas: number
  cuotasTotal: number
  cuotaMensual: number
  precioCesion: number
  tipoPlan: string
  disponible: boolean
  descripcion?: string
}

export const MARCAS: { id: MarcaId; nombre: string; color: string }[] = [
  { id: 'volkswagen', nombre: 'Volkswagen', color: '#001E50' },
  { id: 'fiat',       nombre: 'Fiat',       color: '#B12024' },
  { id: 'peugeot',   nombre: 'Peugeot',    color: '#1A1A1A' },
  { id: 'renault',   nombre: 'Renault',    color: '#FFCD11' },
  { id: 'toyota',    nombre: 'Toyota',     color: '#EB0A1E' },
  { id: 'chevrolet', nombre: 'Chevrolet',  color: '#C8A84B' },
  { id: 'ford',      nombre: 'Ford',       color: '#003478' },
]

export const ADJUDICADOS: Adjudicado[] = [
  {
    id: '1',
    slug: 'volkswagen-polo-trendline',
    marca: 'volkswagen',
    modelo: 'Polo',
    version: 'Trendline 1.6 MT',
    fotos: [
      '/images/fotos/polo/polofrente.jpeg',
      '/images/fotos/polo/polo1.jpeg',
      '/images/fotos/polo/polo4.jpeg',
      '/images/fotos/polo/polointerior.jpeg',
    ],
    valorUnidad: 22_500_000,
    cuotasPagas: 32,
    cuotasTotal: 84,
    cuotaMensual: 195_000,
    precioCesion: 4_800_000,
    tipoPlan: 'Plan Volkswagen — Grupo 180',
    disponible: true,
    descripcion: 'Volkswagen Polo adjudicado. Unidad disponible para entrega inmediata. Cuotas al día, documentación completa.',
  },
  {
    id: '2',
    slug: 'volkswagen-amarok-v6',
    marca: 'volkswagen',
    modelo: 'Amarok',
    version: 'V6 Highline 258CV',
    fotos: [
      '/images/fotos/amarok/amarokfrente.jpeg',
      '/images/fotos/amarok/amarok.jpeg',
      '/images/fotos/amarok/amarok1.jpeg',
      '/images/fotos/amarok/amarok-interior1.jpeg',
    ],
    valorUnidad: 68_000_000,
    cuotasPagas: 28,
    cuotasTotal: 84,
    cuotaMensual: 580_000,
    precioCesion: 14_500_000,
    tipoPlan: 'Plan Volkswagen — Grupo 310',
    disponible: true,
    descripcion: 'Amarok V6 adjudicada. La pickup premium de Volkswagen con motor V6 TDI 258CV. 28 cuotas ya pagas, documentación completa.',
  },
  {
    id: '3',
    slug: 'volkswagen-tera-high',
    marca: 'volkswagen',
    modelo: 'Tera',
    version: 'High 170 TSI AT',
    fotos: [
      '/images/fotos/tera/tera1.jpeg',
      '/images/fotos/tera/tera2.jpeg',
      '/images/fotos/tera/teraazul1.jpeg',
      '/images/fotos/tera/tera3.jpeg',
    ],
    valorUnidad: 48_000_000,
    cuotasPagas: 15,
    cuotasTotal: 84,
    cuotaMensual: 420_000,
    precioCesion: 9_800_000,
    tipoPlan: 'Plan Volkswagen — Grupo 255',
    disponible: true,
    descripcion: 'Volkswagen Tera recién adjudicada. El nuevo SUV 7 asientos de VW. Unidad 0km con máxima calificación Latin NCAP.',
  },
  {
    id: '4',
    slug: 'renault-sandero-life',
    marca: 'renault',
    modelo: 'Sandero',
    version: 'Life 1.6 MT',
    fotos: [
      'https://placehold.co/800x500/E2E8F0/64748B?text=Renault+Sandero',
      'https://placehold.co/800x500/E2E8F0/64748B?text=Renault+Sandero+Int',
    ],
    valorUnidad: 17_400_000,
    cuotasPagas: 28,
    cuotasTotal: 60,
    cuotaMensual: 175_000,
    precioCesion: 3_900_000,
    tipoPlan: 'Plan Renault — Grupo 55',
    disponible: true,
    descripcion: 'Renault Sandero en plan de 60 cuotas. Más de la mitad ya pagada. Entrega rápida y precio de cesión conveniente.',
  },
  {
    id: '5',
    slug: 'toyota-corolla-xei',
    marca: 'toyota',
    modelo: 'Corolla',
    version: 'XEi 2.0 CVT',
    fotos: [
      'https://placehold.co/800x500/E2E8F0/64748B?text=Toyota+Corolla',
      'https://placehold.co/800x500/E2E8F0/64748B?text=Toyota+Corolla+Int',
    ],
    valorUnidad: 40_500_000,
    cuotasPagas: 18,
    cuotasTotal: 84,
    cuotaMensual: 345_000,
    precioCesion: 9_200_000,
    tipoPlan: 'Plan Toyota — Grupo 210',
    disponible: true,
    descripcion: 'Toyota Corolla XEi adjudicado. La opción premium de nuestra cartera. Equipamiento completo, confiabilidad Toyota garantizada.',
  },
  {
    id: '6',
    slug: 'chevrolet-tracker-premier',
    marca: 'chevrolet',
    modelo: 'Tracker',
    version: 'Premier 1.2T AT',
    fotos: [
      'https://placehold.co/800x500/E2E8F0/64748B?text=Chevrolet+Tracker',
      'https://placehold.co/800x500/E2E8F0/64748B?text=Chevrolet+Tracker+Int',
    ],
    valorUnidad: 34_000_000,
    cuotasPagas: 36,
    cuotasTotal: 84,
    cuotaMensual: 285_000,
    precioCesion: 6_800_000,
    tipoPlan: 'Plan Chevrolet — Grupo 145',
    disponible: true,
    descripcion: 'Chevrolet Tracker Premier con 36 cuotas pagas. SUV versátil con tecnología a bordo. Mitad del plan ya pagado.',
  },
]
