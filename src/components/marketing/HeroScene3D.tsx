'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// ── Partículas doradas (solo fondo) ──────────────────────────

function Particles({ count = 55 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 12
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.018
    ref.current.rotation.x = state.clock.elapsedTime * 0.009
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#D9A23A" sizeAttenuation transparent opacity={0.55} />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <Stars radius={45} depth={35} count={280} factor={1.4} saturation={0} fade speed={0.35} />
      <Particles count={55} />
    </>
  )
}

// ── Componente principal: fondo R3F + imagen nativa ──────────

export default function HeroScene3D() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 18 })
  const sy = useSpring(my, { stiffness: 55, damping: 18 })
  const rotX = useTransform(sy, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotY = useTransform(sx, [-0.5, 0.5], ['-9deg', '9deg'])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleMouseLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%', minHeight: 420 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fondo R3F — estrellas y partículas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <Scene />
      </Canvas>

      {/* Imagen del auto — calidad nativa + tilt Framer Motion */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        {/* Glow ambiental dorado detrás del auto */}
        <div style={{
          position: 'absolute',
          width: '75%',
          height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(217,162,58,0.20) 0%, rgba(217,162,58,0.06) 45%, transparent 70%)',
          bottom: '10%',
          left: '12.5%',
          filter: 'blur(28px)',
          pointerEvents: 'none',
        }} />

        {/* Card del auto con tilt */}
        <motion.div
          style={{
            rotateX: rotX,
            rotateY: rotY,
            transformStyle: 'preserve-3d',
            transformPerspective: 1100,
            width: '86%',
            maxWidth: 510,
            position: 'relative',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 28px 80px rgba(5,10,22,0.65), 0 0 0 1px rgba(217,162,58,0.22)',
          }}
        >
          <img
            src="/images/fotos/amarok/amarokfrente.jpeg"
            alt="Volkswagen Amarok 0km"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              imageRendering: 'auto',
            }}
            loading="eager"
          />
          {/* Gradiente inferior */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '45%',
            background: 'linear-gradient(to top, rgba(7,17,31,0.75) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          {/* Marco dorado sutil */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 16,
            boxShadow: 'inset 0 0 0 1px rgba(217,162,58,0.18)',
            pointerEvents: 'none',
          }} />
        </motion.div>

        {/* Reflejo inferior */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '80%',
          maxWidth: 460,
          overflow: 'hidden',
          opacity: 0.09,
          transform: 'scaleY(-1)',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          borderRadius: '0 0 16px 16px',
          pointerEvents: 'none',
        }}>
          <img
            src="/images/fotos/amarok/amarokfrente.jpeg"
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>
    </div>
  )
}
