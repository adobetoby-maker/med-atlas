'use client'

import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const CONFIGS: Record<string, { color: string; geometry: () => ReactNode; scale: number }> = {
  heart: {
    color: '#e05c5c',
    scale: 0.55,
    geometry: () => (
      <group>
        <mesh position={[-0.3, 0.15, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshPhysicalMaterial color="#e05c5c" metalness={0.1} roughness={0.5} />
        </mesh>
        <mesh position={[0.3, 0.15, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshPhysicalMaterial color="#e05c5c" metalness={0.1} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
          <coneGeometry args={[0.55, 0.9, 4]} />
          <meshPhysicalMaterial color="#c93a3a" metalness={0.1} roughness={0.5} />
        </mesh>
      </group>
    ),
  },
  lungs: {
    color: '#6ab8e8',
    scale: 0.5,
    geometry: () => (
      <group>
        <mesh position={[-0.5, 0, 0]} rotation={[0, 0, 0.2]}>
          <capsuleGeometry args={[0.35, 0.8, 8, 12]} />
          <meshPhysicalMaterial color="#6ab8e8" metalness={0.0} roughness={0.6} transparent opacity={0.9} />
        </mesh>
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, -0.2]}>
          <capsuleGeometry args={[0.35, 0.8, 8, 12]} />
          <meshPhysicalMaterial color="#6ab8e8" metalness={0.0} roughness={0.6} transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.6, 8]} />
          <meshPhysicalMaterial color="#4a8ea8" metalness={0.1} roughness={0.5} />
        </mesh>
      </group>
    ),
  },
  brain: {
    color: '#a78bfa',
    scale: 0.6,
    geometry: () => (
      <group>
        <mesh>
          <sphereGeometry args={[0.72, 32, 24]} />
          <meshPhysicalMaterial color="#a78bfa" metalness={0.0} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.1, 0.2]} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[0.5, 0.08, 8, 20, Math.PI]} />
          <meshPhysicalMaterial color="#7c5cbf" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.1, -0.1]} rotation={[-0.2, 0, 0]}>
          <torusGeometry args={[0.44, 0.07, 8, 20, Math.PI]} />
          <meshPhysicalMaterial color="#7c5cbf" roughness={0.6} />
        </mesh>
      </group>
    ),
  },
  bone: {
    color: '#e8e0c8',
    scale: 0.55,
    geometry: () => (
      <group>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.32, 12, 12]} />
          <meshPhysicalMaterial color="#e8e0c8" metalness={0.0} roughness={0.4} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.16, 0.16, 1.2, 10]} />
          <meshPhysicalMaterial color="#d4cbb0" metalness={0.0} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.6, 0]}>
          <sphereGeometry args={[0.32, 12, 12]} />
          <meshPhysicalMaterial color="#e8e0c8" metalness={0.0} roughness={0.4} />
        </mesh>
      </group>
    ),
  },
  kidney: {
    color: '#60a5fa',
    scale: 0.6,
    geometry: () => (
      <mesh>
        <torusGeometry args={[0.5, 0.32, 16, 32, Math.PI * 1.8]} />
        <meshPhysicalMaterial color="#60a5fa" metalness={0.05} roughness={0.55} />
      </mesh>
    ),
  },
  cell: {
    color: '#ef4444',
    scale: 0.65,
    geometry: () => (
      <group>
        <mesh>
          <torusGeometry args={[0.55, 0.22, 16, 32]} />
          <meshPhysicalMaterial color="#ef4444" metalness={0.0} roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.34, 32]} />
          <meshPhysicalMaterial color="#c42828" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>
    ),
  },
  pill: {
    color: '#a3e635',
    scale: 0.6,
    geometry: () => (
      <group rotation={[0, 0, Math.PI / 6]}>
        <mesh>
          <capsuleGeometry args={[0.28, 0.8, 8, 16]} />
          <meshPhysicalMaterial color="#a3e635" metalness={0.2} roughness={0.3} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.29, 0.29, 0.02, 16]} />
          <meshPhysicalMaterial color="#1a1a2e" />
        </mesh>
      </group>
    ),
  },
  butterfly: {
    color: '#f9c74f',
    scale: 0.6,
    geometry: () => (
      <group>
        <mesh position={[-0.5, 0.1, 0]} rotation={[0, 0, 0.4]}>
          <torusGeometry args={[0.35, 0.18, 8, 20]} />
          <meshPhysicalMaterial color="#f9c74f" metalness={0.1} roughness={0.5} />
        </mesh>
        <mesh position={[0.5, 0.1, 0]} rotation={[0, 0, -0.4]}>
          <torusGeometry args={[0.35, 0.18, 8, 20]} />
          <meshPhysicalMaterial color="#f9c74f" metalness={0.1} roughness={0.5} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />
          <meshPhysicalMaterial color="#d4a017" roughness={0.5} />
        </mesh>
      </group>
    ),
  },
  atom: {
    color: '#94a3b8',
    scale: 0.6,
    geometry: () => (
      <group>
        <mesh>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshPhysicalMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={0.4} metalness={0.5} roughness={0.2} />
        </mesh>
        {[0, 1, 2].map(i => (
          <mesh key={i} rotation={[i * Math.PI / 3, i * Math.PI / 5, 0]}>
            <torusGeometry args={[0.65, 0.04, 8, 32]} />
            <meshPhysicalMaterial color="#94a3b8" metalness={0.6} roughness={0.2} transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
    ),
  },
  shield: {
    color: '#34d399',
    scale: 0.6,
    geometry: () => (
      <group>
        <mesh>
          <cylinderGeometry args={[0.6, 0.45, 0.1, 5]} />
          <meshPhysicalMaterial color="#34d399" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.35, 0]}>
          <coneGeometry args={[0.45, 0.4, 5]} />
          <meshPhysicalMaterial color="#34d399" metalness={0.4} roughness={0.3} />
        </mesh>
      </group>
    ),
  },
  colon: {
    color: '#6ee7a0',
    scale: 0.55,
    geometry: () => (
      <mesh>
        <torusGeometry args={[0.5, 0.2, 10, 30, Math.PI * 1.5]} />
        <meshPhysicalMaterial color="#6ee7a0" metalness={0.0} roughness={0.6} />
      </mesh>
    ),
  },
  skin: {
    color: '#fca5a5',
    scale: 0.65,
    geometry: () => (
      <group>
        <mesh>
          <planeGeometry args={[1.2, 1.0, 8, 8]} />
          <meshPhysicalMaterial color="#fca5a5" metalness={0.0} roughness={0.8} side={THREE.DoubleSide} />
        </mesh>
      </group>
    ),
  },
}

function getConfig(model: string) {
  return CONFIGS[model] ?? CONFIGS['atom']
}

export function BodyPart({ model, isHovered }: { model: string; isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const config = getConfig(model)
  const Geo = config.geometry

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * (isHovered ? 1.2 : 0.4)
    const targetY = isHovered ? 0.25 : 0
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.08
  })

  return (
    <Float speed={isHovered ? 2.5 : 1.2} floatIntensity={isHovered ? 0.6 : 0.25} rotationIntensity={0.15}>
      <group ref={groupRef} scale={config.scale}>
        <Geo />
      </group>
    </Float>
  )
}
