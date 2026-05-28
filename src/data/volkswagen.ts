export interface VWVersion {
  nombre: string
  motor: string
  transmision: string
}

export interface VWModel {
  id: string
  slug: string
  nombre: string
  tipo: string
  tagline: string
  descripcion: string
  versiones: VWVersion[]
  imagenes: string[]
  video: string | null
  badge?: string
  nuevo?: boolean
}

export const VW_MODELS: VWModel[] = [
  {
    id: 'polo',
    slug: 'polo',
    nombre: 'Polo',
    tipo: 'Hatchback',
    tagline: 'El Volkswagen de tu vida.',
    descripcion:
      'Líneas renovadas y faros LED. La mejor opción del segmento hatchback. Diseño europeo, tecnología y confort en cada detalle.',
    versiones: [
      { nombre: 'Track',          motor: '1.6 MSI 110CV',  transmision: 'Manual 5 vel.' },
      { nombre: 'Comfortline AT', motor: '1.6 MSI 110CV',  transmision: 'Automática 6 vel.' },
      { nombre: 'Highline AT',    motor: '1.6 MSI 110CV',  transmision: 'Automática 6 vel.' },
    ],
    imagenes: [
      '/images/fotos/polo/polo1.jpeg',
      '/images/fotos/polo/polo4.jpeg',
      '/images/fotos/polo/polo6.jpeg',
      '/images/fotos/polo/polofrente.jpeg',
      '/images/fotos/polo/polointerior.jpeg',
      '/images/fotos/polo/polointerior2.jpeg',
      '/images/fotos/polo/polointerior3.jpeg',
      '/images/fotos/polo/polointerior4.jpeg',
    ],
    video: '/images/fotos/polo/polo.mp4',
    badge: 'MÁS VENDIDO',
  },
  {
    id: 'nivus',
    slug: 'nivus',
    nombre: 'Nivus',
    tipo: 'SUV Coupé',
    tagline: 'Conectado, tecnológico y con un diseño renovado.',
    descripcion:
      'El primer Volkswagen con sistema Mi VW Connect. SUV coupé que combina estilo, tecnología y desempeño dinámico.',
    versiones: [
      { nombre: '170TSI Trendline AT',    motor: '1.0 TSI 116CV', transmision: 'Automática 6 vel.' },
      { nombre: '200TSI Comfortline',      motor: '1.4 TSI 150CV', transmision: 'DSG 7 vel.' },
      { nombre: '200TSI Highline Outfit',  motor: '1.4 TSI 150CV', transmision: 'DSG 7 vel.' },
    ],
    imagenes: [],
    video: '/images/fotos/nivus/nivus.mp4',
    nuevo: true,
  },
  {
    id: 'taos',
    slug: 'taos',
    nombre: 'Taos',
    tipo: 'SUV',
    tagline: 'Espacio y tecnología en tu camino.',
    descripcion:
      'El Taos 2026 redefine la experiencia SUV: confort superior, interior espacioso y tecnología de última generación con motor TSI 250.',
    versiones: [
      { nombre: 'Comfortline', motor: '1.4 TSI 250CV', transmision: 'Tiptronic 8 vel.' },
      { nombre: 'Highline',    motor: '1.4 TSI 250CV', transmision: 'Tiptronic 8 vel.' },
      { nombre: 'Bi Tono',     motor: '1.4 TSI 250CV', transmision: 'Tiptronic 8 vel.' },
    ],
    imagenes: [],
    video: '/images/fotos/taos/taos.mp4',
    badge: '2026',
    nuevo: true,
  },
  {
    id: 'amarok',
    slug: 'amarok',
    nombre: 'Amarok',
    tipo: 'Pickup V6',
    tagline: '0km desde $44.900.000 · Tasa 0% · Financiación Fábrica VW',
    descripcion:
      'La pickup premium que domina en el campo y en el asfalto. Motor V6 con hasta 272CV en Overboost. La más segura del país según CESVI 2026.',
    versiones: [
      { nombre: 'Trendline 4x2',   motor: '2.0 TDI 140CV', transmision: 'Manual 6 vel.' },
      { nombre: 'Trendline 4x4',   motor: '2.0 TDI 140CV', transmision: 'Manual 6 vel.' },
      { nombre: 'V6 Comfortline',  motor: 'V6 TDI 258CV', transmision: 'Automática 10 vel.' },
      { nombre: 'V6 Highline',     motor: 'V6 TDI 258CV', transmision: 'Automática 10 vel.' },
      { nombre: 'V6 Extreme',      motor: 'V6 TDI 272CV', transmision: 'Automática 10 vel.' },
      { nombre: 'V6 Hero',         motor: 'V6 TDI 272CV', transmision: 'Automática 10 vel.' },
      { nombre: 'V6 Black Style',  motor: 'V6 TDI 272CV', transmision: 'Automática 10 vel.' },
    ],
    imagenes: [
      '/images/fotos/amarok/amarok.jpeg',
      '/images/fotos/amarok/amarok0.jpeg',
      '/images/fotos/amarok/amarok1.jpeg',
      '/images/fotos/amarok/amarokfrente.jpeg',
      '/images/fotos/amarok/amarok-interior1.jpeg',
      '/images/fotos/amarok/amarokinterior2.jpeg',
      '/images/fotos/amarok/amarokinterior3.jpeg',
      '/images/fotos/amarok/amarokinterior4.jpeg',
    ],
    video: '/images/fotos/amarok/amarok.mp4',
    badge: 'V6',
  },
  {
    id: 'tera',
    slug: 'tera',
    nombre: 'Tera',
    tipo: 'SUV 7 asientos',
    tagline: 'El nuevo ícono de Volkswagen.',
    descripcion:
      'El SUV grande producido en Sudamérica. Máxima calificación Latin NCAP. Espacio para toda la familia con el estilo y la personalidad de la marca.',
    versiones: [
      { nombre: 'Trend MSI MT',       motor: '1.4 MSI 150CV',  transmision: 'Manual 6 vel.' },
      { nombre: 'Comfort 170 TSI AT', motor: '1.4 TSI 170CV',  transmision: 'DSG 7 vel.' },
      { nombre: 'High 170 TSI AT',    motor: '1.4 TSI 170CV',  transmision: 'DSG 7 vel.' },
      { nombre: 'Outfit 170 TSI AT',  motor: '1.4 TSI 170CV',  transmision: 'DSG 7 vel.' },
    ],
    imagenes: [
      '/images/fotos/tera/tera0.jpeg',
      '/images/fotos/tera/tera1.jpeg',
      '/images/fotos/tera/tera2.jpeg',
      '/images/fotos/tera/tera3.jpeg',
      '/images/fotos/tera/teraazul1.jpeg',
      '/images/fotos/tera/teraazul2.jpeg',
      '/images/fotos/tera/teraazul3.jpeg',
      '/images/fotos/tera/teraazul4.jpeg',
    ],
    video: '/images/fotos/tera/tera.mp4',
    nuevo: true,
  },
]
