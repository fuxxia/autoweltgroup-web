import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cómo funciona',
  description: 'Entendé cómo funciona la compra de un plan adjudicado. Proceso claro, sin sorpresas.',
}

const PASOS = [
  {
    num: 1,
    title: '¿Qué es un plan adjudicado?',
    desc: 'Un plan de ahorro es un sistema de compra grupal donde todos los participantes pagan cuotas mensuales y, a través de sorteos o licitaciones, algunos reciben el auto antes de terminar de pagar. Cuando alguien que ya fue adjudicado (ya tiene el auto asignado) necesita vender su lugar en el plan, entra en juego la cesión.',
  },
  {
    num: 2,
    title: '¿Qué es la cesión del plan?',
    desc: 'La cesión es la transferencia de los derechos del plan de una persona a otra. El titular original (cedente) te vende su posición en el plan: tiene el auto adjudicado y vos tomás el lugar pagando el precio de cesión acordado. A partir de ese momento, continuás pagando las cuotas restantes.',
  },
  {
    num: 3,
    title: '¿Por qué es conveniente?',
    desc: 'Porque el precio de cesión suele ser mucho menor al precio de lista del auto. La diferencia puede ser del 25 al 40% del valor total. Además, evitás el proceso de sorteo: el auto ya está adjudicado y podés recibirlo rápidamente.',
  },
  {
    num: 4,
    title: 'El proceso paso a paso',
    desc: '1. Elegís el adjudicado en nuestro catálogo. 2. Nos contactás y analizamos juntos si es la opción correcta para vos. 3. Firmamos el contrato de cesión entre cedente, cesionario y la administradora del plan. 4. Se tramita la transferencia en la concesionaria. 5. ¡Retirás tu auto 0km!',
  },
  {
    num: 5,
    title: '¿Qué documentación necesito?',
    desc: 'DNI (original y copia), CUIL, recibo de sueldo o comprobante de ingresos, y referencias personales. En algunos casos la administradora puede pedir datos adicionales. Nosotros te guiamos en todo el proceso para que sea simple.',
  },
  {
    num: 6,
    title: '¿Cuáles son los riesgos?',
    desc: 'Como en cualquier operación financiera, es importante verificar la legitimidad del plan. En Autos Welt trabajamos exclusivamente con planes registrados en concesionarias oficiales y administradoras habilitadas por la DNPDP. Nunca operamos fuera del circuito formal.',
  },
]

export default function ComoFuncionaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Cómo funciona</h1>
        <p className="text-gray-500 text-lg">
          Todo lo que necesitás saber antes de comprar un plan adjudicado
        </p>
      </div>

      <div className="space-y-8">
        {PASOS.map((p) => (
          <div key={p.num} className="flex gap-6">
            <div className="shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ background: '#1B3A6B' }}
              >
                {p.num}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-900 mb-2">{p.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ destacada */}
      <div className="mt-12 rounded-2xl p-8" style={{ background: '#EEF2FF' }}>
        <h2 className="font-bold text-xl text-gray-900 mb-4">¿Tenés más preguntas?</h2>
        <p className="text-gray-600 text-sm mb-6">
          Nuestros asesores te explican todo sin compromiso. También podés simular tu cuota gratis.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/simulador"
            className="px-6 py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
            style={{ background: '#1B3A6B' }}
          >
            Simular cuota
          </Link>
          <Link
            href="/contacto"
            className="px-6 py-3 rounded-xl font-semibold text-sm border-2 transition-colors"
            style={{ borderColor: '#1B3A6B', color: '#1B3A6B' }}
          >
            Consultar ahora
          </Link>
        </div>
      </div>
    </div>
  )
}
