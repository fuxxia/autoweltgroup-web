import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ADJUDICADOS } from '@/data/adjudicados'
import { formatARS, buildWhatsAppAdjudicado } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return ADJUDICADOS.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const a = ADJUDICADOS.find((x) => x.slug === slug)
  if (!a) return {}
  return {
    title: `${a.marca.charAt(0).toUpperCase() + a.marca.slice(1)} ${a.modelo} ${a.version} — Plan Adjudicado`,
    description: `${a.tipoPlan}. Precio de cesión: ${formatARS(a.precioCesion)}. ${a.cuotasPagas} cuotas pagas de ${a.cuotasTotal}. Cuota mensual: ${formatARS(a.cuotaMensual)}.`,
  }
}

export default async function AdjudicadoPage({ params }: Props) {
  const { slug } = await params
  const a = ADJUDICADOS.find((x) => x.slug === slug)
  if (!a) notFound()

  const cuotasRestantes = a.cuotasTotal - a.cuotasPagas
  const porcentajePagado = Math.round((a.cuotasPagas / a.cuotasTotal) * 100)
  const totalRestante = cuotasRestantes * a.cuotaMensual
  const ahorroEstimado = a.valorUnidad - a.precioCesion - totalRestante
  const whatsappUrl = buildWhatsAppAdjudicado(a.modelo, a.marca, a.precioCesion)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#1B3A6B]">Inicio</Link>
        <span>/</span>
        <Link href="/catalogo" className="hover:text-[#1B3A6B]">Catálogo</Link>
        <span>/</span>
        <span className="text-gray-900">{a.modelo}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Galería */}
        <div>
          <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-video mb-3">
            <img
              src={a.fotos[0]}
              alt={`${a.marca} ${a.modelo}`}
              className="w-full h-full object-cover"
            />
          </div>
          {a.fotos.length > 1 && (
            <div className="flex gap-3">
              {a.fotos.map((foto, i) => (
                <div key={i} className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100 border-2 border-[#1B3A6B]">
                  <img src={foto} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-full capitalize">
            {a.marca}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            {a.modelo}
            <span className="text-xl font-normal text-gray-500 ml-2">{a.version}</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1 mb-4">{a.tipoPlan}</p>

          {a.descripcion && (
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{a.descripcion}</p>
          )}

          {/* Precio principal */}
          <div className="rounded-2xl p-5 mb-4" style={{ background: '#EEF2FF' }}>
            <p className="text-sm text-gray-600 mb-1">Precio de cesión</p>
            <p className="text-4xl font-bold" style={{ color: '#1B3A6B' }}>{formatARS(a.precioCesion)}</p>
            {ahorroEstimado > 0 && (
              <p className="text-sm text-green-600 font-semibold mt-1">
                Ahorro estimado: {formatARS(ahorroEstimado)} vs precio de lista
              </p>
            )}
          </div>

          {/* Datos del plan */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Valor de la unidad</span>
              <span className="text-sm font-semibold">{formatARS(a.valorUnidad)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Cuota mensual</span>
              <span className="text-sm font-semibold">{formatARS(a.cuotaMensual)}/mes</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Cuotas pagas / Total</span>
              <span className="text-sm font-semibold">{a.cuotasPagas} / {a.cuotasTotal}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Cuotas restantes</span>
              <span className="text-sm font-semibold">{cuotasRestantes} cuotas</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-600">Total restante a pagar</span>
              <span className="text-sm font-semibold">{formatARS(totalRestante)}</span>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{porcentajePagado}% del plan ya está pagado</span>
              <span>{100 - porcentajePagado}% restante</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${porcentajePagado}%`, background: '#1B3A6B' }}
              />
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-white text-base transition-opacity hover:opacity-90"
              style={{ background: '#25D366' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.084 1.507 5.8L.057 23.25a.75.75 0 00.921.921l5.45-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.497-5.214-1.37l-.374-.214-3.88 1.034 1.034-3.88-.214-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Consultar por WhatsApp
            </a>
            <Link
              href="/simulador"
              className="flex items-center justify-center w-full py-3 rounded-xl font-semibold text-sm border-2 transition-colors"
              style={{ borderColor: '#1B3A6B', color: '#1B3A6B' }}
            >
              Simular otra opción
            </Link>
          </div>
        </div>
      </div>

      {/* Otros adjudicados */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Otros adjudicados disponibles</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADJUDICADOS.filter((x) => x.id !== a.id).slice(0, 3).map((x) => (
            <Link key={x.id} href={`/catalogo/${x.slug}`} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#1B3A6B] hover:shadow-sm transition-all">
              <img src={x.fotos[0]} alt={x.modelo} className="w-16 h-12 object-cover rounded-lg bg-gray-100" />
              <div>
                <p className="font-semibold text-sm text-gray-900">{x.modelo}</p>
                <p className="text-xs text-gray-500 capitalize">{x.marca}</p>
                <p className="text-sm font-bold" style={{ color: '#1B3A6B' }}>{formatARS(x.precioCesion)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
