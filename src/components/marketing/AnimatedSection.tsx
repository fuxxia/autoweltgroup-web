'use client'
import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  style?: CSSProperties
}

export default function AnimatedSection({ children, delay = 0, y = 28, className, style }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
