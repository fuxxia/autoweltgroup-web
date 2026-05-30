'use client'
import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, useTexture, Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// ── Car card flotante con textura real ────────────────────────

function CarCard() {
  const groupRef = useRef<THREE.Group>(null)
  const { mouse, viewport } = useThree()

  const texture = useTexture('/images/fotos/amarok/amarokfrente.jpeg')
  texture.colorSpace = THREE.SRGBColorSpace

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.22,
      0.045
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.y * 0.12,
      0.045
    )
  })

  const w = Math.min(viewport.width * 0.82, 4.8)
  const h = w * 0.6

  return (
    <group ref={groupRef}>
      <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.28}>

        {/* Card principal — imagen del auto */}
        <mesh castShadow position={[0, 0, 0]}>
          <planeGeometry args={[w, h, 1, 1]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.25}
            metalness={0.15}
            toneMapped={false}
          />
        </mesh>

        {/* Borde/marco dorado sutil */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[w + 0.06, h + 0.06, 1, 1]} />
          <meshBasicMaterial color="#D9A23A" opacity={0.18} transparent />
        </mesh>

        {/* Reflejo inferior tenue */}
        <mesh position={[0, -(h * 0.6), -0.08]} rotation={[Math.PI, 0, 0]}>
          <planeGeometry args={[w, h * 0.4, 1, 1]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.9}
            metalness={0}
            opacity={0.12}
            transparent
          />
        </mesh>

      </Float>
    </group>
  )
}

// ── Partículas flotantes ──────────────────────────────────────

function Particles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 8
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
    ref.current.rotation.x = state.clock.elapsedTime * 0.01
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#D9A23A" sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

// ── Escena completa ───────────────────────────────────────────

function Scene() {
  return (
    <>
      {/* Iluminación tipo showroom */}
      <ambientLight intensity={0.4} />
      <pointLight position={[-4, 3, 4]} intensity={3.5} color="#D9A23A" distance={12} />
      <pointLight position={[4, -2, 3]} intensity={2.5} color="#3B82F6" distance={10} />
      <spotLight
        position={[0, 6, 5]}
        intensity={2}
        angle={0.4}
        penumbra={0.6}
        color="#F8F5EF"
      />

      {/* Estrellas de fondo */}
      <Stars radius={40} depth={30} count={300} factor={1.5} saturation={0} fade speed={0.4} />

      {/* Partículas doradas */}
      <Particles count={50} />

      {/* Car card 3D */}
      <Suspense fallback={null}>
        <CarCard />
      </Suspense>
    </>
  )
}

// ── Export con Canvas ─────────────────────────────────────────

export default function HeroScene3D() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 380 }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
