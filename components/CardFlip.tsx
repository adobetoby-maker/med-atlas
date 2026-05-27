'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, RoundedBox } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'
import { BodyPart } from './BodyPart'
import type { MedTerm } from '../data/terms'
import { CATEGORIES } from '../data/terms'

const MAX_CHARS = 60

function truncate(str: string, max = MAX_CHARS) {
  return str.length > max ? str.slice(0, max - 1) + '…' : str
}

interface Props {
  term: MedTerm
  onFlip?: (isRevealed: boolean) => void
}

export function CardFlip({ term, onFlip }: Props) {
  const [flipped, setFlipped] = useState(false)
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Group>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  const catConfig = CATEGORIES[term.category] ?? CATEGORIES['General Terminology']
  const accent = catConfig?.color ?? '#4fffb0'
  const modelType = catConfig?.model ?? 'atom'

  const { rotation } = useSpring({
    rotation: flipped ? Math.PI : 0,
    config: { tension: 280, friction: 28 },
  })

  const { cardScale } = useSpring({
    cardScale: hovered ? 1.03 : 1.0,
    config: { tension: 300, friction: 20 },
  })

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.8) * 2
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.8) * 2
    }
  })

  const handleClick = () => {
    const next = !flipped
    setFlipped(next)
    onFlip?.(next)
  }

  const cardColor = '#0d1a2e'
  const cardW = 3.6
  const cardH = 5.0
  const cardD = 0.08

  return (
    <group>
      <pointLight ref={lightRef} color={accent} intensity={hovered ? 1.5 : 0.6} distance={6} position={[1, 2, 2]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 3]} intensity={0.8} castShadow />

      <animated.group
        rotation-y={rotation}
        scale={cardScale}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* FRONT FACE */}
        <group position={[0, 0, cardD / 2 + 0.001]}>
          <RoundedBox args={[cardW, cardH, cardD]} radius={0.12} smoothness={4}>
            <meshPhysicalMaterial color={cardColor} metalness={0.15} roughness={0.6} />
          </RoundedBox>

          {/* Accent border glow */}
          <RoundedBox args={[cardW + 0.04, cardH + 0.04, cardD - 0.01]} radius={0.14} smoothness={4} position={[0, 0, -0.001]}>
            <meshPhysicalMaterial color={accent} metalness={0.3} roughness={0.4} emissive={accent} emissiveIntensity={hovered ? 0.8 : 0.3} transparent opacity={0.25} />
          </RoundedBox>

          {/* 3D body part model — positioned ON the card face */}
          <group position={[0, 0.7, 0.5]}>
            <BodyPart model={modelType} isHovered={hovered} />
          </group>

          {/* Category badge */}
          <Text
            position={[0, 1.85, 0.1]}
            fontSize={0.16}
            color={accent}
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-SemiBold.ttf"
          >
            {(catConfig?.emoji ?? '⚕️') + ' ' + term.category.toUpperCase()}
          </Text>

          {/* Term name */}
          <Text
            position={[0, -0.95, 0.1]}
            fontSize={0.26}
            color="#f0f4ff"
            maxWidth={3.0}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.ttf"
          >
            {term.term}
          </Text>

          {/* Tap hint */}
          <Text
            position={[0, -1.9, 0.1]}
            fontSize={0.15}
            color={hovered ? accent : '#475569'}
            anchorX="center"
            anchorY="middle"
          >
            tap to reveal definition
          </Text>

          {/* Module chip */}
          <Text
            position={[1.3, -2.2, 0.1]}
            fontSize={0.13}
            color="#334155"
            anchorX="right"
            anchorY="bottom"
          >
            {`Module ${term.module}`}
          </Text>
        </group>

        {/* BACK FACE — rotated 180° on Y so it shows when card is flipped */}
        <group position={[0, 0, -(cardD / 2 + 0.001)]} rotation={[0, Math.PI, 0]}>
          <RoundedBox args={[cardW, cardH, cardD]} radius={0.12} smoothness={4}>
            <meshPhysicalMaterial color="#0a1828" metalness={0.1} roughness={0.7} />
          </RoundedBox>

          <RoundedBox args={[cardW + 0.04, cardH + 0.04, cardD - 0.01]} radius={0.14} smoothness={4} position={[0, 0, 0.001]}>
            <meshPhysicalMaterial color={accent} metalness={0.3} roughness={0.4} emissive={accent} emissiveIntensity={0.25} transparent opacity={0.2} />
          </RoundedBox>

          {/* Definition header */}
          <Text position={[0, 2.1, 0.1]} fontSize={0.17} color={accent} anchorX="center" anchorY="middle">
            DEFINITION
          </Text>

          {/* Definition text */}
          <Text
            position={[0, 1.1, 0.1]}
            fontSize={0.19}
            color="#e2e8f0"
            maxWidth={3.1}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            lineHeight={1.5}
          >
            {truncate(term.definition, 140)}
          </Text>

          {/* Divider */}
          <mesh position={[0, 0.1, 0.1]}>
            <planeGeometry args={[2.6, 0.02]} />
            <meshBasicMaterial color={accent} transparent opacity={0.3} />
          </mesh>

          {/* Etymology */}
          <Text position={[-1.5, -0.1, 0.1]} fontSize={0.14} color={accent} anchorX="left" anchorY="top">
            Etymology:
          </Text>
          <Text
            position={[0, -0.45, 0.1]}
            fontSize={0.15}
            color="#94a3b8"
            maxWidth={3.0}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            lineHeight={1.4}
          >
            {truncate(term.etymology, 100)}
          </Text>

          {/* Example divider */}
          <mesh position={[0, -1.05, 0.1]}>
            <planeGeometry args={[2.6, 0.02]} />
            <meshBasicMaterial color={accent} transparent opacity={0.2} />
          </mesh>

          {/* Example */}
          <Text position={[-1.5, -1.2, 0.1]} fontSize={0.14} color={accent} anchorX="left" anchorY="top">
            Example:
          </Text>
          <Text
            position={[0, -1.65, 0.1]}
            fontSize={0.14}
            color="#7c8fa8"
            maxWidth={3.1}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            lineHeight={1.4}
          >
            {truncate(term.example, 120)}
          </Text>

          {/* Term name reminder */}
          <Text position={[0, -2.2, 0.1]} fontSize={0.18} color="#f0f4ff" anchorX="center" anchorY="bottom" fontWeight={700}>
            {term.term}
          </Text>
        </group>
      </animated.group>
    </group>
  )
}
