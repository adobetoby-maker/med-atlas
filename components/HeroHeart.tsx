'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Heart({ accent = '#e05c5c' }: { accent?: string }) {
  const groupRef = useRef<THREE.Group>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    // Lub-dub heartbeat: two quick pulses per beat cycle
    const beat = Math.max(0, Math.sin(t * 2.4) * 0.5 + Math.sin(t * 4.8) * 0.15)
    const scale = 1.0 + beat * 0.08
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scale)
      groupRef.current.rotation.y = t * 0.35
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.06
    }
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshBasicMaterial
      m.opacity = 0.08 + beat * 0.14
    }
  })

  return (
    <group>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial color={accent} transparent opacity={0.08} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Heart geometry */}
      <group ref={groupRef}>
        {/* Left lobe */}
        <mesh position={[-0.38, 0.18, 0]}>
          <sphereGeometry args={[0.58, 24, 24]} />
          <meshPhysicalMaterial color={accent} metalness={0.05} roughness={0.45} emissive={accent} emissiveIntensity={0.25} />
        </mesh>
        {/* Right lobe */}
        <mesh position={[0.38, 0.18, 0]}>
          <sphereGeometry args={[0.58, 24, 24]} />
          <meshPhysicalMaterial color={accent} metalness={0.05} roughness={0.45} emissive={accent} emissiveIntensity={0.25} />
        </mesh>
        {/* Bottom point */}
        <mesh position={[0, -0.42, 0]} rotation={[0, 0, Math.PI / 4]}>
          <coneGeometry args={[0.64, 1.05, 4]} />
          <meshPhysicalMaterial color="#c93a3a" metalness={0.05} roughness={0.5} emissive="#c93a3a" emissiveIntensity={0.15} />
        </mesh>
        {/* Highlight sheen */}
        <mesh position={[-0.18, 0.38, 0.38]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshBasicMaterial color="#ffaaaa" transparent opacity={0.35} />
        </mesh>
      </group>
    </group>
  )
}

function Particles({ count = 280, accent = '#e05c5c' }: { count?: number; accent?: string }) {
  const ref = useRef<THREE.Points>(null!)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 3.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.cos(phi)
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
      sz[i] = 0.015 + Math.random() * 0.04
    }
    return [pos, sz]
  }, [count])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))
    return g
  }, [positions, sizes])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.06
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.09) * 0.04
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.032}
        color={accent}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function PulseRing({ radius, speed, accent }: { radius: number; speed: number; accent: string }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = (clock.elapsedTime * speed) % 1
    ref.current.scale.setScalar(1 + t * 1.4)
    const m = ref.current.material as THREE.MeshBasicMaterial
    m.opacity = (1 - t) * 0.18
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.012, 8, 60]} />
      <meshBasicMaterial color={accent} transparent opacity={0.18} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

export default function HeroHeart() {
  const accent = '#e05c5c'
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.8], fov: 48 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 4, 3]} intensity={2.5} color="#ffcccc" />
      <pointLight position={[-3, -2, 2]} intensity={1.4} color={accent} />
      <pointLight position={[0, -3, 1]} intensity={0.8} color="#c93a3a" />

      <Particles accent={accent} />
      <PulseRing radius={1.55} speed={0.38} accent={accent} />
      <PulseRing radius={1.85} speed={0.28} accent={accent} />
      <Heart accent={accent} />
    </Canvas>
  )
}
