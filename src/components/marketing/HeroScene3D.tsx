'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { motion, useTransform, useScroll } from 'framer-motion'

// ── Partículas doradas atmosféricas ──────────────────────────

function Particles({ count = 38 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.010
    ref.current.rotation.x = state.clock.elapsedTime * 0.005
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#D9A23A" sizeAttenuation transparent opacity={0.28} />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.07} />
      <Stars radius={50} depth={40} count={180} factor={1.1} saturation={0} fade speed={0.20} />
      <Particles count={38} />
    </>
  )
}

// ── Hero full-bleed: imagen como fondo + parallax scroll ─────

export default function HeroScene3D() {
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 800], [0, 70])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

      {/* Full-bleed Amarok — fondo dominante con parallax scroll */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-8%',
          bottom: '-8%',
          left: 0,
          right: 0,
          y: imgY,
          willChange: 'transform',
        }}
      >
        <img
          src="/images/fotos/amarok/amarokfrente.jpeg"
          alt="Volkswagen Amarok 0km"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '62% 42%',
            display: 'block',
          }}
          loading="eager"
        />
      </motion.div>

      {/* Overlay cinematográfico — izquierda oscura para texto, derecha respira */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(108deg, rgba(7,17,31,0.93) 0%, rgba(7,17,31,0.82) 26%, rgba(7,17,31,0.54) 48%, rgba(7,17,31,0.24) 68%, rgba(7,17,31,0.42) 100%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Vignette — oscurece corners, da profundidad */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 125% 90% at 50% 50%, transparent 40%, rgba(7,17,31,0.55) 100%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Estrellas y partículas — textura atmosférica */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 38 }}
        dpr={[1, 1.4]}
        gl={{ antialias: false, alpha: true, powerPreference: 'default' }}
        style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}
      >
        <Scene />
      </Canvas>

      {/* Gold glow — lado texto, respira suave */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-8%',
        width: '52%',
        height: '52%',
        background: 'radial-gradient(ellipse at center, rgba(217,162,58,0.09) 0%, transparent 62%)',
        filter: 'blur(50px)',
        zIndex: 2,
        pointerEvents: 'none',
        animation: 'glow-breathe 5.5s ease-in-out infinite',
      }} />
    </div>
  )
}
