import type { Metadata } from 'next'
import SimuladorForm from '@/components/SimuladorForm'

export const metadata: Metadata = {
  title: 'Simulador de cuota',
  description: 'Simulá la cuota mensual de tu plan adjudicado. Elegí marca y modelo y obtené un estimado al instante.',
}

export default function SimuladorPage() {
  return (
    <div className="min-h-screen py-12" style={{ background: '#F8F9FA' }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Simulador de cuota</h1>
          <p className="text-gray-500">
            Calculá en segundos cuánto pagarías por mes en tu plan adjudicado.
          </p>
        </div>
        <SimuladorForm />
        <p className="text-center text-xs text-gray-400 mt-4">
          Los valores son referenciales y pueden variar según disponibilidad y grupo del plan.
        </p>
      </div>
    </div>
  )
}
