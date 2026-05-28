export interface PlanCredito {
  id: string
  cuotas: number
  montoCuota: number
  anticipo: number
  capitalMaximo: number
  gastosFinanciacion: number
  destacado?: boolean
  label: string
}

export interface ModeloFinanciamiento {
  slug: string
  nombre: string
  version: string
  motor: string
  transmision: string
  precioLista: number
  descuento: number
  ofertaPatentar: number
  patentamiento: number
  incluyeFlete: boolean
  entregaInmediata: boolean
  imagenPrincipal: string
  imagenHero?: string
  badge?: string
  planes: PlanCredito[]
}

const PLANES_BASE = (anticipos: [number, number, number, number]): PlanCredito[] => [
  {
    id: 'plan-12-44m',
    cuotas: 12,
    montoCuota: 3_666_520,
    anticipo: anticipos[0],
    capitalMaximo: 44_000_000,
    gastosFinanciacion: 6_122_600,
    label: 'Menor anticipo',
  },
  {
    id: 'plan-18-28m',
    cuotas: 18,
    montoCuota: 1_555_680,
    anticipo: anticipos[1],
    capitalMaximo: 28_000_000,
    gastosFinanciacion: 4_065_600,
    label: 'Cuota cómoda',
  },
  {
    id: 'plan-24-20m',
    cuotas: 24,
    montoCuota: 833_400,
    anticipo: anticipos[2],
    capitalMaximo: 20_000_000,
    gastosFinanciacion: 2_662_000,
    label: 'Menor cuota mensual',
  },
  {
    id: 'plan-12-21m',
    cuotas: 12,
    montoCuota: 1_791_595,
    anticipo: anticipos[3],
    capitalMaximo: 21_500_000,
    gastosFinanciacion: 0,
    destacado: true,
    label: 'Sin gastos de financiación',
  },
]

export const AMAROK_TRENDLINE_4X2: ModeloFinanciamiento = {
  slug: 'amarok-trendline-4x2',
  nombre: 'Amarok',
  version: 'Trendline 4x2',
  motor: '2.0 TDI 140CV',
  transmision: 'Manual 6 vel.',
  precioLista: 55_000_000,
  descuento: 10_100_000,
  ofertaPatentar: 44_900_000,
  patentamiento: 3_300_000,
  incluyeFlete: true,
  entregaInmediata: true,
  imagenPrincipal: '/images/fotos/amarok/amarokfrente.jpeg',
  imagenHero: '/images/fotos/amarok/amarok.mp4',
  badge: 'OFERTA ABRIL',
  planes: PLANES_BASE([10_322_600, 24_265_600, 30_862_000, 26_700_000]),
}

export const AMAROK_TRENDLINE_4X4: ModeloFinanciamiento = {
  slug: 'amarok-trendline-4x4',
  nombre: 'Amarok',
  version: 'Trendline 4x4',
  motor: '2.0 TDI 140CV',
  transmision: 'Manual 6 vel.',
  precioLista: 63_700_000,
  descuento: 7_700_000,
  ofertaPatentar: 56_000_000,
  patentamiento: 3_822_000,
  incluyeFlete: true,
  entregaInmediata: true,
  imagenPrincipal: '/images/fotos/amarok/amarokfrente.jpeg',
  imagenHero: '/images/fotos/amarok/amarok.mp4',
  badge: 'OFERTA ABRIL',
  planes: PLANES_BASE([21_944_600, 35_887_600, 42_484_000, 38_322_000]),
}

export const AMAROK_V6_COMFORTLINE: ModeloFinanciamiento = {
  slug: 'amarok-v6-comfortline',
  nombre: 'Amarok',
  version: 'V6 Comfortline',
  motor: '3.0 TDI 258CV',
  transmision: 'Automático 8 vel.',
  precioLista: 79_200_000,
  descuento: 19_200_000,
  ofertaPatentar: 60_000_000,
  patentamiento: 4_752_000,
  incluyeFlete: false,
  entregaInmediata: true,
  imagenPrincipal: '/images/fotos/amarok/amarokfrente.jpeg',
  imagenHero: '/images/fotos/amarok/amarok.mp4',
  badge: 'OFERTA ABRIL',
  planes: PLANES_BASE([26_874_600, 40_817_600, 47_414_000, 43_252_000]),
}

export const AMAROK_V6_HIGHLINE: ModeloFinanciamiento = {
  slug: 'amarok-v6-highline',
  nombre: 'Amarok',
  version: 'V6 Highline',
  motor: '3.0 TDI 258CV',
  transmision: 'Automático 8 vel.',
  precioLista: 92_900_000,
  descuento: 22_600_000,
  ofertaPatentar: 70_300_000,
  patentamiento: 5_574_000,
  incluyeFlete: false,
  entregaInmediata: true,
  imagenPrincipal: '/images/fotos/amarok/amarokfrente.jpeg',
  imagenHero: '/images/fotos/amarok/amarok.mp4',
  badge: 'OFERTA ABRIL',
  planes: PLANES_BASE([37_996_600, 51_939_600, 58_536_000, 54_374_000]),
}

export const AMAROK_V6_EXTREME: ModeloFinanciamiento = {
  slug: 'amarok-v6-extreme',
  nombre: 'Amarok',
  version: 'V6 Extreme',
  motor: '3.0 TDI 258CV',
  transmision: 'Automático 8 vel.',
  precioLista: 99_100_000,
  descuento: 25_200_000,
  ofertaPatentar: 73_900_000,
  patentamiento: 5_946_000,
  incluyeFlete: false,
  entregaInmediata: true,
  imagenPrincipal: '/images/fotos/amarok/amarokfrente.jpeg',
  imagenHero: '/images/fotos/amarok/amarok.mp4',
  badge: 'OFERTA ABRIL',
  planes: PLANES_BASE([41_968_600, 55_911_600, 62_508_000, 58_346_000]),
}

export const MODELOS_COTIZADOR: ModeloFinanciamiento[] = [
  AMAROK_TRENDLINE_4X2,
  AMAROK_TRENDLINE_4X4,
  AMAROK_V6_COMFORTLINE,
  AMAROK_V6_HIGHLINE,
  AMAROK_V6_EXTREME,
]

export const MODELOS_MAP: Record<string, ModeloFinanciamiento> = Object.fromEntries(
  MODELOS_COTIZADOR.map(m => [m.slug, m])
)
