import { redirect } from 'next/navigation'

// Slugs de las fichas viejas de adjudicados: se mantienen solo para
// redirigir URLs ya indexadas al catálogo 0km (output: export exige params estáticos).
const OLD_SLUGS = [
  'volkswagen-polo-trendline',
  'volkswagen-amarok-v6',
  'volkswagen-tera-high',
  'renault-sandero-life',
  'toyota-corolla-xei',
  'chevrolet-tracker-premier',
]

export function generateStaticParams() {
  return OLD_SLUGS.map((slug) => ({ slug }))
}

export default function CatalogoSlugRedirect() {
  redirect('/catalogo')
}
