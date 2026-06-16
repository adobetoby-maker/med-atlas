'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { StudyScene } from './StudyScene'
import { TERMS, CATEGORIES } from '../data/terms'

const ALL_CATS = Object.keys(CATEGORIES)

export default function StudyClient() {
  const searchParams = useSearchParams()
  const urlCat = searchParams.get('cat') ?? undefined
  const validUrlCat = urlCat && CATEGORIES[urlCat] ? urlCat : undefined
  const [activeCategory, setActiveCategory] = useState<string | undefined>(validUrlCat)

  const filteredTerms = useMemo(() => {
    if (!activeCategory) return TERMS
    return TERMS.filter(t => t.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-5 py-3 border-b border-white/5 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-black text-[#e05c5c]">Med</span>
          <span className="text-lg font-black text-white">Atlas</span>
        </Link>
        <div className="text-xs text-white/30">{filteredTerms.length} terms</div>
      </nav>

      {/* Category filter */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-none shrink-0">
        <button
          onClick={() => setActiveCategory(undefined)}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
            !activeCategory ? 'bg-[#4fffb0] text-[#080c14]' : 'bg-white/5 text-white/50 hover:bg-white/10'
          }`}
        >
          All
        </button>
        {ALL_CATS.map(cat => {
          const cfg = CATEGORIES[cat]
          const count = TERMS.filter(t => t.category === cat).length
          if (count === 0) return null
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === activeCategory ? undefined : cat)}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
              style={{
                backgroundColor: activeCategory === cat ? cfg.color : 'rgba(255,255,255,0.05)',
                color: activeCategory === cat ? '#080c14' : 'rgba(255,255,255,0.5)',
                borderColor: activeCategory === cat ? cfg.color : 'transparent',
              }}
            >
              {cfg.emoji} {cat}
            </button>
          )
        })}
      </div>

      {/* Main study area */}
      <div className="flex-1 px-4 pb-4 overflow-hidden">
        <StudyScene terms={filteredTerms} filterCategory={activeCategory} />
      </div>
    </div>
  )
}
