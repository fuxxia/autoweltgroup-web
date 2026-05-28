'use client'
import { useEffect, useRef, useState } from 'react'

interface Stat {
  num: string
  label: string
}

function parseNum(str: string): { prefix: string; value: number; suffix: string } {
  const match = str.match(/^([^0-9]*)(\d+)([^0-9]*)$/)
  if (!match) return { prefix: '', value: 0, suffix: str }
  return { prefix: match[1], value: parseInt(match[2]), suffix: match[3] }
}

function Counter({ num, label }: Stat) {
  const { prefix, value, suffix } = parseNum(num)
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1400
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setCount(Math.round(eased * value))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref}>
      <div className="text-xl font-black mono" style={{ color: '#F59E0B', letterSpacing: '-.02em' }}>
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs mt-0.5 leading-tight" style={{ color: '#475569' }}>{label}</div>
    </div>
  )
}

export default function CounterStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)`, borderTop: '1px solid rgba(255,255,255,.06)', maxWidth: '420px' }}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="pt-4"
          style={{
            borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,.06)' : 'none',
            paddingRight: '1rem',
            paddingLeft: i > 0 ? '1rem' : 0,
          }}
        >
          <Counter num={s.num} label={s.label} />
        </div>
      ))}
    </div>
  )
}
