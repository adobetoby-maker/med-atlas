'use client'

import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const CONFIGS: Record<string, { color: string; geometry: () => ReactNode; scale: number }> = {
  heart: {
    color: '#e05c5c',
    scale: 0.56,
    geometry: () => (
      <group>
        {/* Left lobe — overlaps center */}
        <mesh position={[-0.33, 0.2, 0]}>
          <sphereGeometry args={[0.56, 32, 32]} />
          <meshPhysicalMaterial color="#e05c5c" emissive="#c93a3a" emissiveIntensity={0.4} metalness={0.08} roughness={0.42} />
        </mesh>
        {/* Right lobe — overlaps center */}
        <mesh position={[0.33, 0.2, 0]}>
          <sphereGeometry args={[0.56, 32, 32]} />
          <meshPhysicalMaterial color="#e05c5c" emissive="#c93a3a" emissiveIntensity={0.4} metalness={0.08} roughness={0.42} />
        </mesh>
        {/* Center fill — blends the two lobes together */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.44, 24, 24]} />
          <meshPhysicalMaterial color="#e05c5c" emissive="#c93a3a" emissiveIntensity={0.4} metalness={0.08} roughness={0.42} />
        </mesh>
        {/* Junction sphere — bridges lobes to cone, eliminates seam */}
        <mesh position={[0, -0.18, 0]}>
          <sphereGeometry args={[0.38, 24, 24]} />
          <meshPhysicalMaterial color="#d84848" emissive="#a02828" emissiveIntensity={0.35} metalness={0.06} roughness={0.46} />
        </mesh>
        {/* Bottom point — smooth 32-segment cone, color matches lobe tone */}
        <mesh position={[0, -0.48, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.45, 1.0, 32]} />
          <meshPhysicalMaterial color="#d44040" emissive="#8a2020" emissiveIntensity={0.28} metalness={0.05} roughness={0.5} />
        </mesh>
        {/* Specular highlight sheen */}
        <mesh position={[-0.22, 0.44, 0.34]}>
          <sphereGeometry args={[0.14, 10, 10]} />
          <meshBasicMaterial color="#ffbbbb" transparent opacity={0.42} />
        </mesh>
      </group>
    ),
  },
  lungs: {
    color: '#6ab8e8',
    scale: 0.52,
    geometry: () => (
      <group>
        {/* Left lung — larger */}
        <mesh position={[-0.48, 0.05, 0]} rotation={[0, 0, 0.18]}>
          <capsuleGeometry args={[0.36, 0.9, 10, 16]} />
          <meshPhysicalMaterial color="#6ab8e8" emissive="#2a7aaa" emissiveIntensity={0.2} roughness={0.55} transparent opacity={0.95} />
        </mesh>
        {/* Right lung — slightly smaller */}
        <mesh position={[0.46, 0.02, 0]} rotation={[0, 0, -0.18]}>
          <capsuleGeometry args={[0.32, 0.82, 10, 16]} />
          <meshPhysicalMaterial color="#6ab8e8" emissive="#2a7aaa" emissiveIntensity={0.2} roughness={0.55} transparent opacity={0.95} />
        </mesh>
        {/* Trachea */}
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.55, 12]} />
          <meshPhysicalMaterial color="#4a8ea8" emissive="#1a4e68" emissiveIntensity={0.15} roughness={0.5} />
        </mesh>
        {/* Left bronchus */}
        <mesh position={[-0.18, 0.36, 0]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.07, 0.07, 0.28, 8]} />
          <meshPhysicalMaterial color="#4a8ea8" roughness={0.5} />
        </mesh>
        {/* Right bronchus */}
        <mesh position={[0.18, 0.36, 0]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.07, 0.07, 0.28, 8]} />
          <meshPhysicalMaterial color="#4a8ea8" roughness={0.5} />
        </mesh>
      </group>
    ),
  },
  brain: {
    color: '#a78bfa',
    scale: 0.62,
    geometry: () => (
      <group>
        {/* Main brain mass */}
        <mesh>
          <sphereGeometry args={[0.72, 32, 24]} />
          <meshPhysicalMaterial color="#a78bfa" emissive="#6040b0" emissiveIntensity={0.2} roughness={0.7} />
        </mesh>
        {/* Cerebral folds - partial tori */}
        {[
          { pos: [0, 0.12, 0.2] as [number,number,number], rot: [0.3, 0, 0] as [number,number,number], r: 0.5 },
          { pos: [0, 0.12, -0.08] as [number,number,number], rot: [-0.15, 0, 0] as [number,number,number], r: 0.44 },
          { pos: [0, -0.05, 0.1] as [number,number,number], rot: [0.45, 0, 0] as [number,number,number], r: 0.38 },
        ].map((cfg, i) => (
          <mesh key={i} position={cfg.pos} rotation={cfg.rot}>
            <torusGeometry args={[cfg.r, 0.07, 8, 22, Math.PI]} />
            <meshPhysicalMaterial color="#7c5cbf" emissive="#4a2890" emissiveIntensity={0.15} roughness={0.6} />
          </mesh>
        ))}
        {/* Cerebellum lobe */}
        <mesh position={[0, -0.5, -0.3]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshPhysicalMaterial color="#8b72d4" roughness={0.65} />
        </mesh>
      </group>
    ),
  },
  bone: {
    color: '#e8e0c8',
    scale: 0.56,
    geometry: () => (
      <group>
        {/* Epiphysis top */}
        <mesh position={[0, 0.62, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshPhysicalMaterial color="#e8e0c8" emissive="#c8b898" emissiveIntensity={0.1} roughness={0.4} />
        </mesh>
        {/* Diaphysis shaft */}
        <mesh>
          <cylinderGeometry args={[0.17, 0.17, 1.2, 14]} />
          <meshPhysicalMaterial color="#d4cbb0" emissive="#a49880" emissiveIntensity={0.08} roughness={0.5} />
        </mesh>
        {/* Epiphysis bottom */}
        <mesh position={[0, -0.62, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshPhysicalMaterial color="#e8e0c8" emissive="#c8b898" emissiveIntensity={0.1} roughness={0.4} />
        </mesh>
        {/* Condyle knob top-left */}
        <mesh position={[-0.2, 0.52, 0.1]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshPhysicalMaterial color="#ddd4b8" roughness={0.4} />
        </mesh>
        {/* Condyle knob top-right */}
        <mesh position={[0.2, 0.52, 0.1]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshPhysicalMaterial color="#ddd4b8" roughness={0.4} />
        </mesh>
      </group>
    ),
  },
  kidney: {
    color: '#60a5fa',
    scale: 0.62,
    geometry: () => (
      <group>
        {/* Kidney body — wide arc */}
        <mesh>
          <torusGeometry args={[0.5, 0.32, 18, 40, Math.PI * 1.75]} />
          <meshPhysicalMaterial color="#60a5fa" emissive="#2060c0" emissiveIntensity={0.25} roughness={0.52} />
        </mesh>
        {/* Renal hilum — indented side */}
        <mesh position={[-0.35, 0, 0]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshPhysicalMaterial color="#3a85d8" roughness={0.6} />
        </mesh>
        {/* Ureter top */}
        <mesh position={[-0.28, -0.55, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.28, 8]} />
          <meshPhysicalMaterial color="#2060c0" roughness={0.5} />
        </mesh>
      </group>
    ),
  },
  cell: {
    color: '#ef4444',
    scale: 0.65,
    geometry: () => (
      <group>
        {/* Cell membrane ring */}
        <mesh>
          <torusGeometry args={[0.55, 0.22, 18, 36]} />
          <meshPhysicalMaterial color="#ef4444" emissive="#aa1111" emissiveIntensity={0.25} roughness={0.55} side={THREE.DoubleSide} />
        </mesh>
        {/* Cytoplasm disc */}
        <mesh>
          <circleGeometry args={[0.34, 36]} />
          <meshPhysicalMaterial color="#c42828" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
        {/* Nucleus */}
        <mesh position={[0, 0, 0.05]}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshPhysicalMaterial color="#7a1010" emissive="#500000" emissiveIntensity={0.4} roughness={0.4} />
        </mesh>
      </group>
    ),
  },
  pill: {
    color: '#a3e635',
    scale: 0.62,
    geometry: () => (
      <group rotation={[0, 0, Math.PI / 6]}>
        {/* Capsule shell */}
        <mesh>
          <capsuleGeometry args={[0.28, 0.82, 10, 20]} />
          <meshPhysicalMaterial color="#a3e635" emissive="#608000" emissiveIntensity={0.2} metalness={0.25} roughness={0.25} />
        </mesh>
        {/* Color divide band */}
        <mesh>
          <cylinderGeometry args={[0.29, 0.29, 0.025, 20]} />
          <meshPhysicalMaterial color="#0a0a1e" />
        </mesh>
        {/* Bottom half — different color */}
        <mesh position={[0, -0.3, 0]}>
          <capsuleGeometry args={[0.28, 0.22, 8, 16]} />
          <meshPhysicalMaterial color="#f8f8f8" emissive="#cccccc" emissiveIntensity={0.05} metalness={0.1} roughness={0.3} />
        </mesh>
      </group>
    ),
  },
  butterfly: {
    color: '#f9c74f',
    scale: 0.62,
    geometry: () => (
      <group>
        {/* Left wing lobe upper */}
        <mesh position={[-0.52, 0.18, 0]} rotation={[0, 0, 0.35]}>
          <torusGeometry args={[0.32, 0.17, 10, 24]} />
          <meshPhysicalMaterial color="#f9c74f" emissive="#c08000" emissiveIntensity={0.2} roughness={0.45} />
        </mesh>
        {/* Left wing lobe lower */}
        <mesh position={[-0.42, -0.2, 0]} rotation={[0, 0, 0.7]}>
          <torusGeometry args={[0.24, 0.14, 8, 20]} />
          <meshPhysicalMaterial color="#f4a820" emissive="#a06000" emissiveIntensity={0.2} roughness={0.5} />
        </mesh>
        {/* Right wing lobe upper */}
        <mesh position={[0.52, 0.18, 0]} rotation={[0, 0, -0.35]}>
          <torusGeometry args={[0.32, 0.17, 10, 24]} />
          <meshPhysicalMaterial color="#f9c74f" emissive="#c08000" emissiveIntensity={0.2} roughness={0.45} />
        </mesh>
        {/* Right wing lobe lower */}
        <mesh position={[0.42, -0.2, 0]} rotation={[0, 0, -0.7]}>
          <torusGeometry args={[0.24, 0.14, 8, 20]} />
          <meshPhysicalMaterial color="#f4a820" emissive="#a06000" emissiveIntensity={0.2} roughness={0.5} />
        </mesh>
        {/* Body */}
        <mesh>
          <capsuleGeometry args={[0.09, 0.5, 6, 12]} />
          <meshPhysicalMaterial color="#d4a017" emissive="#805000" emissiveIntensity={0.15} roughness={0.45} />
        </mesh>
      </group>
    ),
  },
  atom: {
    color: '#94a3b8',
    scale: 0.62,
    geometry: () => (
      <group>
        {/* Nucleus */}
        <mesh>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshPhysicalMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={0.55} metalness={0.5} roughness={0.2} />
        </mesh>
        {/* Electron orbits — 3 at different angles */}
        {[0, 1, 2].map(i => (
          <mesh key={i} rotation={[i * Math.PI / 3, i * Math.PI / 5, 0]}>
            <torusGeometry args={[0.66, 0.038, 10, 48]} />
            <meshPhysicalMaterial color="#94a3b8" emissive="#4a6080" emissiveIntensity={0.3} metalness={0.65} roughness={0.18} transparent opacity={0.85} />
          </mesh>
        ))}
        {/* Electron particles on orbits */}
        {[0, 1, 2].map(i => (
          <mesh key={`e${i}`} position={[
            Math.cos(i * Math.PI * 2 / 3) * 0.66,
            Math.sin(i * Math.PI * 2 / 3) * 0.2,
            Math.sin(i * Math.PI * 2 / 3) * 0.66,
          ]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#93c5fd" />
          </mesh>
        ))}
      </group>
    ),
  },
  shield: {
    color: '#34d399',
    scale: 0.62,
    geometry: () => (
      <group>
        {/* Shield face */}
        <mesh>
          <cylinderGeometry args={[0.62, 0.48, 0.12, 5]} />
          <meshPhysicalMaterial color="#34d399" emissive="#10a060" emissiveIntensity={0.3} metalness={0.45} roughness={0.28} />
        </mesh>
        {/* Shield bottom point */}
        <mesh position={[0, -0.38, 0]}>
          <coneGeometry args={[0.48, 0.44, 5]} />
          <meshPhysicalMaterial color="#34d399" emissive="#10a060" emissiveIntensity={0.3} metalness={0.45} roughness={0.28} />
        </mesh>
        {/* Cross emblem */}
        <mesh position={[0, 0.04, 0.07]}>
          <boxGeometry args={[0.1, 0.45, 0.06]} />
          <meshPhysicalMaterial color="#0a0a1e" transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, 0.15, 0.07]}>
          <boxGeometry args={[0.35, 0.1, 0.06]} />
          <meshPhysicalMaterial color="#0a0a1e" transparent opacity={0.5} />
        </mesh>
      </group>
    ),
  },
  colon: {
    color: '#6ee7a0',
    scale: 0.56,
    geometry: () => (
      <group>
        {/* Main colon tube */}
        <mesh>
          <torusGeometry args={[0.5, 0.2, 14, 40, Math.PI * 1.5]} />
          <meshPhysicalMaterial color="#6ee7a0" emissive="#208050" emissiveIntensity={0.2} roughness={0.58} />
        </mesh>
        {/* Haustra bulge suggestions */}
        {[-0.3, 0.1, 0.5].map((t, i) => (
          <mesh key={i} position={[
            Math.cos(t * Math.PI) * 0.5,
            Math.sin(t * Math.PI) * 0.5,
            0,
          ]}>
            <sphereGeometry args={[0.16, 8, 8]} />
            <meshPhysicalMaterial color="#4ec880" roughness={0.6} />
          </mesh>
        ))}
      </group>
    ),
  },
  skin: {
    color: '#fca5a5',
    scale: 0.65,
    geometry: () => (
      <group>
        {/* Skin cross-section layers */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[1.2, 0.22, 0.06]} />
          <meshPhysicalMaterial color="#fca5a5" emissive="#d06060" emissiveIntensity={0.12} roughness={0.75} />
        </mesh>
        <mesh position={[0, -0.04, 0]}>
          <boxGeometry args={[1.2, 0.22, 0.06]} />
          <meshPhysicalMaterial color="#e8897a" roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.26, 0]}>
          <boxGeometry args={[1.2, 0.22, 0.06]} />
          <meshPhysicalMaterial color="#c86858" roughness={0.65} />
        </mesh>
        {/* Follicle/hair shaft */}
        <mesh position={[0.2, -0.1, 0.04]}>
          <cylinderGeometry args={[0.025, 0.025, 0.55, 6]} />
          <meshPhysicalMaterial color="#8a5030" roughness={0.6} />
        </mesh>
        <mesh position={[-0.2, -0.1, 0.04]}>
          <cylinderGeometry args={[0.025, 0.025, 0.55, 6]} />
          <meshPhysicalMaterial color="#8a5030" roughness={0.6} />
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
