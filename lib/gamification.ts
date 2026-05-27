export interface UserProgress {
  xp: number
  level: number
  streak: number
  masteredIds: string[]
  seenIds: string[]
  categoryProgress: Record<string, { seen: number; mastered: number }>
  achievements: string[]
  lastStudied: string
}

export const XP_PER_CORRECT = 10
export const XP_PER_STREAK_BONUS = 5
export const XP_LEVELS = [0, 100, 250, 500, 900, 1400, 2100, 3000, 4200, 6000, 10000]

export const ACHIEVEMENTS = [
  { id: 'first_card', label: 'First Steps', desc: 'Study your first card', icon: '🎯', xp: 25 },
  { id: 'streak_5', label: 'On Fire', desc: '5-card streak', icon: '🔥', xp: 50 },
  { id: 'streak_10', label: 'Blazing', desc: '10-card streak', icon: '⚡', xp: 100 },
  { id: 'streak_25', label: 'Unstoppable', desc: '25-card streak', icon: '💫', xp: 250 },
  { id: 'cv_master', label: 'Cardio Expert', desc: 'Master all cardiovascular terms', icon: '🫀', xp: 200 },
  { id: 'prefix_master', label: 'Word Builder', desc: 'Master all prefixes', icon: '🔤', xp: 150 },
  { id: 'level_5', label: 'Rising Scholar', desc: 'Reach Level 5', icon: '🎓', xp: 0 },
  { id: 'level_10', label: 'Expert', desc: 'Reach Level 10', icon: '🏆', xp: 0 },
  { id: 'cards_50', label: 'Half Century', desc: 'Study 50 cards', icon: '📚', xp: 100 },
  { id: 'cards_100', label: 'Century Mark', desc: 'Study 100 cards', icon: '💯', xp: 200 },
]

export function getLevelFromXP(xp: number): number {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i]) return i + 1
  }
  return 1
}

export function xpToNextLevel(xp: number): { current: number; needed: number; pct: number } {
  const level = getLevelFromXP(xp)
  const currentLevelXP = XP_LEVELS[level - 1] ?? 0
  const nextLevelXP = XP_LEVELS[level] ?? XP_LEVELS[XP_LEVELS.length - 1]
  const range = nextLevelXP - currentLevelXP
  const progress = xp - currentLevelXP
  return { current: progress, needed: range, pct: Math.min(100, (progress / range) * 100) }
}

export function defaultProgress(): UserProgress {
  return {
    xp: 0,
    level: 1,
    streak: 0,
    masteredIds: [],
    seenIds: [],
    categoryProgress: {},
    achievements: [],
    lastStudied: new Date().toISOString(),
  }
}

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress()
  try {
    const raw = localStorage.getItem('medatlas_progress')
    return raw ? JSON.parse(raw) : defaultProgress()
  } catch {
    return defaultProgress()
  }
}

export function saveProgress(p: UserProgress) {
  if (typeof window === 'undefined') return
  localStorage.setItem('medatlas_progress', JSON.stringify(p))
}

export function recordCorrect(
  p: UserProgress,
  termId: string,
  category: string
): { updated: UserProgress; xpGained: number; newAchievements: string[] } {
  const streak = p.streak + 1
  const baseXP = XP_PER_CORRECT
  const bonusXP = streak >= 3 ? XP_PER_STREAK_BONUS * Math.floor(streak / 3) : 0
  const xpGained = baseXP + bonusXP
  const xp = p.xp + xpGained
  const seenIds = p.seenIds.includes(termId) ? p.seenIds : [...p.seenIds, termId]
  const masteredIds = p.masteredIds.includes(termId) ? p.masteredIds : [...p.masteredIds, termId]

  const catPrev = p.categoryProgress[category] ?? { seen: 0, mastered: 0 }
  const categoryProgress = {
    ...p.categoryProgress,
    [category]: {
      seen: p.seenIds.includes(termId) ? catPrev.seen : catPrev.seen + 1,
      mastered: p.masteredIds.includes(termId) ? catPrev.mastered : catPrev.mastered + 1,
    },
  }

  const newAchievements: string[] = []
  const check = (id: string, condition: boolean) => {
    if (condition && !p.achievements.includes(id)) newAchievements.push(id)
  }

  check('first_card', seenIds.length >= 1)
  check('streak_5', streak >= 5)
  check('streak_10', streak >= 10)
  check('streak_25', streak >= 25)
  check('cards_50', seenIds.length >= 50)
  check('cards_100', seenIds.length >= 100)
  check('level_5', getLevelFromXP(xp) >= 5)
  check('level_10', getLevelFromXP(xp) >= 10)

  return {
    xpGained,
    newAchievements,
    updated: {
      ...p,
      xp,
      level: getLevelFromXP(xp),
      streak,
      seenIds,
      masteredIds,
      categoryProgress,
      achievements: [...p.achievements, ...newAchievements],
      lastStudied: new Date().toISOString(),
    },
  }
}

export function recordIncorrect(p: UserProgress): UserProgress {
  return { ...p, streak: 0 }
}
