'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { ADJUDICADOS, MarcaId } from '@/data/adjudicados'
import AdjudicadoCard from '@/components/AdjudicadoCard'
import MarcaFilter from '@/components/MarcaFilter'

function CatalogoContent() {
  const searchParams = useSearchParams()
  const [marca, setMarca] = useState<MarcaId | 'todas'>('todas')

  useEffect(() => {
    const m = searchParams.get('marca') as MarcaId | null
    if (m) setMarca(m)
  }, [searchParams])

  const filtrados = marca === 'todas'
    ? ADJUDICADOS
    : ADJUDICADOS.filter((a) => a.marca === marca)

  return (
    <>
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Catálogo de adjudicados</h1>
          <p className="text-gray-500 text-sm mb-4">{ADJUDICADOS.length} unidades disponibles · Filtrado: {filtrados.length}</p>
          <MarcaFilter selected={marca} onChange={setMarca} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {filtrados.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium">No hay adjudicados de esa marca por ahora.</p>
            <button
              onClick={() => setMarca('todas')}
              className="mt-4 text-sm font-semibold underline"
              style={{ color: '#1B3A6B' }}
            >
              Ver todos
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtrados.map((a) => (
              <AdjudicadoCard key={a.id} adjudicado={a} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">Cargando catálogo...</div>}>
      <CatalogoContent />
    </Suspense>
  )
}
