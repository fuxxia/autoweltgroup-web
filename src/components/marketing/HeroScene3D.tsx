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
      style={{ position: 'relative', width: '100%', height: '100%', minHeight: 520 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fondo R3F — estrellas y partículas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <Scene />
      </Canvas>

      {/* Imagen del auto — derecha, escena cinematográfica */}
      <div className="hero-car-panel" style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: '3%',
        pointerEvents: 'none',
      }}>
        {/* Glow ambiental — derecha, intenso */}
        <div style={{
          position: 'absolute',
          width: '75%',
          height: '70%',
          background: 'radial-gradient(ellipse at center, rgba(217,162,58,0.40) 0%, rgba(217,162,58,0.15) 38%, transparent 68%)',
          bottom: '4%',
          right: '0',
          left: 'auto',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          animation: 'glow-breathe 4.5s ease-in-out infinite',
        }} />

        {/* Spotlight desde arriba — derecha */}
        <div style={{
          position: 'absolute',
          top: '-5%',
          right: '2%',
          left: 'auto',
          width: '55%',
          height: '80%',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Imagen del auto — grande, sin marco, flotando en la derecha */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            rotateX: rotX,
            rotateY: rotY,
            transformStyle: 'preserve-3d',
            transformPerspective: 1200,
            width: '60%',
            maxWidth: 900,
            position: 'relative',
            borderRadius: 20,
            boxShadow: '0 50px 140px rgba(5,10,22,0.85), 0 0 120px rgba(217,162,58,0.18)',
          }}
        >
          <img
            src="/images/fotos/amarok/amarokfrente.jpeg"
            alt="Volkswagen Amarok 0km"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 20,
              imageRendering: 'auto',
            }}
            loading="eager"
          />
          {/* Fade inferior — integra auto al fondo oscuro */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '45%',
            background: 'linear-gradient(to top, rgba(7,17,31,0.90) 0%, rgba(7,17,31,0.30) 60%, transparent 100%)',
            borderRadius: '0 0 20px 20px',
            pointerEvents: 'none',
          }} />
          {/* Specular highlight superior */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '28%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, transparent 100%)',
            borderRadius: '20px 20px 0 0',
            pointerEvents: 'none',
          }} />
          {/* Left edge fade — se funde con el gradiente del hero */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0,
            width: '18%',
            background: 'linear-gradient(to right, rgba(7,17,31,0.60) 0%, transparent 100%)',
            borderRadius: '20px 0 0 20px',
            pointerEvents: 'none',
          }} />
        </motion.div>

        {/* Reflejo de piso */}
        <div style={{
          position: 'absolute',
          bottom: '-1%',
          right: '3%',
          left: 'auto',
          width: '50%',
          maxWidth: 540,
          overflow: 'hidden',
          opacity: 0.11,
          transform: 'scaleY(-1)',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
          borderRadius: '0 0 20px 20px',
          pointerEvents: 'none',
          filter: 'blur(2px)',
        }}>
          <img
            src="/images/fotos/amarok/amarokfrente.jpeg"
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Ground glow */}
        <div style={{
          position: 'absolute',
          bottom: '0%',
          right: '4%',
          left: 'auto',
          width: '42%',
          height: '10%',
          background: 'radial-gradient(ellipse, rgba(217,162,58,0.22) 0%, transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  )
}
