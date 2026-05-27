'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stars } from '@react-three/drei'
import { CardFlip } from './CardFlip'
import type { MedTerm } from '../data/terms'
import { CATEGORIES } from '../data/terms'
import { loadProgress, saveProgress, recordCorrect, recordIncorrect, xpToNextLevel, ACHIEVEMENTS } from '../lib/gamification'
import type { UserProgress } from '../lib/gamification'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function XPBar({ progress }: { progress: UserProgress }) {
  const lvl = xpToNextLevel(progress.xp)
  const accent = '#4fffb0'
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-bold text-white/50">LVL</span>
        <span className="text-lg font-black text-white">{progress.level}</span>
      </div>
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${lvl.pct}%`, backgroundColor: accent }}
        />
      </div>
      <span className="text-xs text-white/40">{progress.xp} XP</span>
    </div>
  )
}

function AchievementToast({ achievement, onDone }: { achievement: string; onDone: () => void }) {
  const a = ACHIEVEMENTS.find(x => x.id === achievement)
  useEffect(() => {
    const t = setTimeout(onDone, 3200)
    return () => clearTimeout(t)
  }, [onDone])
  if (!a) return null
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-2xl border border-[#4fffb0]/30 bg-[#0d1520]/90 backdrop-blur px-5 py-3 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
      <span className="text-2xl">{a.icon}</span>
      <div>
        <p className="text-xs font-semibold text-[#4fffb0]">Achievement Unlocked</p>
        <p className="text-sm font-bold text-white">{a.label}</p>
        <p className="text-xs text-white/50">{a.desc}</p>
      </div>
      {a.xp > 0 && <span className="ml-2 text-sm font-bold text-[#f0c060]">+{a.xp} XP</span>}
    </div>
  )
}

interface Props {
  terms: MedTerm[]
  filterCategory?: string
}

export function StudyScene({ terms, filterCategory }: Props) {
  const [deck, setDeck] = useState<MedTerm[]>([])
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [xpFlash, setXpFlash] = useState<number | null>(null)
  const [toastAchievement, setToastAchievement] = useState<string | null>(null)

  useEffect(() => {
    setProgress(loadProgress())
  }, [])

  useEffect(() => {
    const filtered = filterCategory ? terms.filter(t => t.category === filterCategory) : terms
    setDeck(shuffle(filtered))
    setIndex(0)
    setRevealed(false)
  }, [terms, filterCategory])

  const currentTerm = deck[index]

  const handleAnswer = useCallback((correct: boolean) => {
    if (!progress || !currentTerm) return
    let updated = progress
    let xpGained = 0
    let newAchievements: string[] = []

    if (correct) {
      const result = recordCorrect(progress, currentTerm.id, currentTerm.category)
      updated = result.updated
      xpGained = result.xpGained
      newAchievements = result.newAchievements
    } else {
      updated = recordIncorrect(progress)
    }

    saveProgress(updated)
    setProgress(updated)

    if (xpGained > 0) {
      setXpFlash(xpGained)
      setTimeout(() => setXpFlash(null), 1200)
    }

    if (newAchievements.length > 0) {
      setToastAchievement(newAchievements[0])
    }

    setTimeout(() => {
      setIndex(i => (i + 1) % deck.length)
      setRevealed(false)
    }, 300)
  }, [progress, currentTerm, deck])

  if (!currentTerm || !progress) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-[#4fffb0]/30 border-t-[#4fffb0] animate-spin" />
      </div>
    )
  }

  const catConfig = CATEGORIES[currentTerm.category]
  const accent = catConfig?.color ?? '#4fffb0'

  return (
    <div className="flex flex-col h-full gap-4">
      {/* HUD */}
      <div className="flex items-center gap-4 px-1">
        <div className="flex-1">
          {progress && <XPBar progress={progress} />}
        </div>

        {progress.streak >= 2 && (
          <div className="flex items-center gap-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 px-3 py-1">
            <span className="text-base">🔥</span>
            <span className="text-sm font-bold text-orange-400">{progress.streak}</span>
          </div>
        )}

        <div className="text-xs text-white/30">{index + 1}/{deck.length}</div>
      </div>

      {/* Canvas — the 3D card */}
      <div className="relative flex-1 rounded-2xl overflow-hidden" style={{ minHeight: 480 }}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          shadows
        >
          <color attach="background" args={['#080c14']} />
          <fog attach="fog" args={['#080c14', 10, 22]} />
          <Stars radius={80} depth={40} count={800} factor={3} fade speed={0.4} />
          <Environment preset="night" />
          <Suspense fallback={null}>
            <CardFlip
              key={currentTerm.id}
              term={currentTerm}
              onFlip={setRevealed}
            />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.4}
            maxPolarAngle={Math.PI / 1.6}
            rotateSpeed={0.35}
            dampingFactor={0.12}
            enableDamping
          />
        </Canvas>

        {/* XP flash overlay */}
        {xpFlash && (
          <div className="absolute top-4 right-4 pointer-events-none z-10">
            <span className="text-xl font-black text-[#f0c060] drop-shadow animate-bounce">+{xpFlash} XP</span>
          </div>
        )}

        {/* Accent glow behind card */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${accent}10 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Answer buttons — only show after reveal */}
      <div
        className="flex gap-3 transition-all duration-300"
        style={{ opacity: revealed ? 1 : 0, pointerEvents: revealed ? 'auto' : 'none' }}
      >
        <button
          onClick={() => handleAnswer(false)}
          className="flex-1 rounded-xl border border-red-500/30 bg-red-500/10 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 active:scale-95"
        >
          ✗ Still Learning
        </button>
        <button
          onClick={() => handleAnswer(true)}
          className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-3 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/20 active:scale-95"
          style={{ borderColor: `${accent}50`, backgroundColor: `${accent}15`, color: accent }}
        >
          ✓ Got it
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 pb-1">
        {deck.slice(Math.max(0, index - 4), index + 5).map((t, i) => {
          const isActive = t.id === currentTerm.id
          const isMastered = progress.masteredIds.includes(t.id)
          return (
            <div
              key={t.id}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: isActive ? 24 : 6,
                backgroundColor: isActive ? accent : isMastered ? '#34d399' : '#1e293b',
              }}
            />
          )
        })}
      </div>

      {toastAchievement && (
        <AchievementToast achievement={toastAchievement} onDone={() => setToastAchievement(null)} />
      )}
    </div>
  )
}
