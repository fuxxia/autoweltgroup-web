'use client'
import { MARCAS, MarcaId } from '@/data/adjudicados'

interface Props {
  selected: MarcaId | 'todas'
  onChange: (m: MarcaId | 'todas') => void
}

export default function MarcaFilter({ selected, onChange }: Props) {
  const isAll = selected === 'todas'
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('todas')}
        className="px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all"
        style={{
          background: isAll ? '#F59E0B' : 'white',
          borderColor: isAll ? '#F59E0B' : '#E2E8F0',
          color: isAll ? '#0F172A' : '#64748B',
        }}
      >
        Todos
      </button>
      {MARCAS.map((m) => {
        const active = selected === m.id
        return (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            className="px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all"
            style={{
              background: active ? '#0F172A' : 'white',
              borderColor: active ? '#0F172A' : '#E2E8F0',
              color: active ? '#F59E0B' : '#64748B',
            }}
          >
            {m.nombre}
          </button>
        )
      })}
    </div>
  )
}
