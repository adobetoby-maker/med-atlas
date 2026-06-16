'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const HeroHeart = dynamic(() => import('../components/HeroHeart'), { ssr: false, loading: () => null })

const FEATURES = [
  {
    icon: '🫀',
    label: '3D Anatomy',
    desc: 'Each card has a procedural 3D body part — heart, lungs, brain — built from real geometry, not flat icons.',
    color: '#e05c5c',
  },
  {
    icon: '🔄',
    label: 'Card Flip',
    desc: 'Spring-physics flip reveals definition, etymology, and a clinical usage example on the back face.',
    color: '#6ab8e8',
  },
  {
    icon: '🔥',
    label: 'Streak System',
    desc: 'Build daily streaks, earn XP, unlock achievements as you master terms across every module.',
    color: '#f97316',
  },
  {
    icon: '🎓',
    label: 'Cert-Mapped',
    desc: 'Content aligned to MA, CMA, CPC, and RMA exam objectives so every card counts toward your credential.',
    color: '#a78bfa',
  },
  {
    icon: '📚',
    label: '1,200+ Terms',
    desc: 'Full curriculum spanning 20+ body systems, medical specialties, word roots, and abbreviations.',
    color: '#34d399',
  },
  {
    icon: '⚛️',
    label: 'Word Roots',
    desc: 'Prefixes, suffixes, and combining forms — understand the structure of any term the moment you see it.',
    color: '#f9c74f',
  },
]

const CATEGORIES_DEMO = [
  { emoji: '🫀', name: 'Cardiovascular', color: '#e05c5c', count: 8 },
  { emoji: '🧠', name: 'Neurology', color: '#a78bfa', count: 6 },
  { emoji: '🫁', name: 'Respiratory', color: '#6ab8e8', count: 7 },
  { emoji: '🦴', name: 'Musculoskeletal', color: '#e8a84c', count: 6 },
  { emoji: '🔤', name: 'Prefixes', color: '#c084fc', count: 8 },
  { emoji: '🔡', name: 'Suffixes', color: '#fb923c', count: 8 },
]

const STATS = [
  { value: '1,200+', label: 'Flashcards' },
  { value: '21', label: 'Categories' },
  { value: '100%', label: 'Free' },
  { value: '4', label: 'Exams Covered' },
]

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Med Atlas',
  url: 'https://medterms.worker-bee.app',
  description: 'Free 3D medical terminology flashcards for MA, CMA, CPC, and RMA exam prep.',
  teaches: 'Medical Terminology',
})

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080c14] text-white font-sans overflow-x-hidden">
      {/* JSON-LD schema — server-rendered, static hardcoded data only */}
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* Dot-grid background texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#080c14]/85 backdrop-blur-xl px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xl font-black text-[#e05c5c]">Med</span>
          <span className="text-xl font-black text-white">Atlas</span>
          <span className="rounded-full bg-[#e05c5c]/12 border border-[#e05c5c]/20 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#e05c5c]">BETA</span>
        </div>
        <Link
          href="/study"
          className="rounded-xl bg-[#e05c5c] px-5 py-2 text-sm font-bold text-white hover:bg-[#c93a3a] transition-all hover:scale-105 active:scale-100"
        >
          Start Studying
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-14 pb-6 overflow-hidden">
        {/* Ambient glow behind heart column */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 50% 80% at 72% 48%, #e05c5c18 0%, transparent 68%)' }}
        />

        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0">

          {/* Left: text */}
          <div className="flex-1 lg:pr-8 text-center lg:text-left z-10">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e05c5c]/30 bg-[#e05c5c]/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#e05c5c] uppercase">
              <span>⚕️</span> MA · CMA · CPC · RMA Exam Prep
            </div>

            {/* Headline */}
            <h1 className="mt-1 text-5xl font-black leading-[1.05] sm:text-6xl lg:text-[4.5rem] tracking-tight">
              Medical
              <br />
              Terminology
              <br />
              <span className="text-[#e05c5c]">in 3D</span>
            </h1>

            {/* Subhead */}
            <p className="mt-5 max-w-sm text-[1rem] text-white/50 leading-relaxed">
              Flip cards with real 3D anatomy models. Build streaks. Master 1,200+ terms mapped to your certification exam.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/study"
                className="rounded-2xl bg-[#e05c5c] px-8 py-4 text-sm font-bold text-white hover:bg-[#c93a3a] transition-all hover:scale-105 active:scale-100 shadow-lg shadow-[#e05c5c]/20"
              >
                Study Free — Start Now →
              </Link>
              <a
                href="#categories"
                className="rounded-2xl border border-white/10 px-8 py-4 text-sm font-semibold text-white/50 hover:bg-white/5 hover:text-white/80 transition-colors"
              >
                Browse 21 Categories
              </a>
            </div>

            {/* Micro-stats */}
            <div className="mt-10 flex gap-6 justify-center lg:justify-start">
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="text-xl font-black text-white">{s.value}</div>
                  <div className="text-xs text-white/30 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D heart */}
          <div className="relative shrink-0 w-full lg:w-[520px]" style={{ height: 520 }}>
            {/* Soft glow disc behind heart */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle 200px at 50% 50%, #e05c5c1a 0%, transparent 72%)' }}
            />
            <HeroHeart />
          </div>

        </div>
      </section>

      {/* Category pills */}
      <section id="categories" className="relative z-10 mx-auto max-w-4xl px-6 pb-14">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/20 mb-5">Browse by system</p>
        <div className="flex flex-wrap gap-2.5 justify-center">
          {CATEGORIES_DEMO.map(cat => (
            <Link
              key={cat.name}
              href={`/study?cat=${encodeURIComponent(cat.name)}`}
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:scale-105 hover:brightness-110"
              style={{
                borderColor: `${cat.color}40`,
                backgroundColor: `${cat.color}12`,
                color: cat.color,
              }}
            >
              {cat.emoji} {cat.name}
              <span className="ml-0.5 rounded-full bg-white/10 px-1.5 py-0.5 text-xs font-normal opacity-70">{cat.count}</span>
            </Link>
          ))}
          <Link
            href="/study"
            className="flex items-center gap-2 rounded-full border border-white/8 px-4 py-2 text-sm font-semibold text-white/30 hover:text-white/60 hover:border-white/15 transition-colors"
          >
            + 15 more categories
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 mb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-20">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/20 mb-3">Why it works</p>
        <h2 className="text-center text-2xl font-black mb-10">Built for how memory actually sticks</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <div
              key={f.label}
              className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition-all hover:border-white/10 hover:bg-white/[0.04]"
            >
              {/* Icon with colored glow background */}
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl text-xl mb-3 transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: `${f.color}18`,
                  boxShadow: `0 0 18px ${f.color}25`,
                  border: `1px solid ${f.color}25`,
                }}
              >
                {f.icon}
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">{f.label}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t border-white/5 py-20 text-center px-6">
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, #e05c5c0e 0%, transparent 70%)' }}
        />
        <p className="text-xs font-semibold uppercase tracking-widest text-white/20 mb-4">Start today</p>
        <h2 className="text-3xl font-black">Master medical terminology before your exam</h2>
        <p className="mt-3 text-white/40 text-sm">No account needed · Runs in your browser · Free forever</p>
        <Link
          href="/study"
          className="mt-8 inline-block rounded-2xl bg-[#e05c5c] px-10 py-4 text-sm font-bold text-white hover:bg-[#c93a3a] transition-all hover:scale-105 shadow-lg shadow-[#e05c5c]/20"
        >
          Open the 3D Flashcard Deck →
        </Link>
      </section>

      <footer className="relative z-10 border-t border-white/5 px-6 py-6 text-center text-xs text-white/15">
        Med Atlas ·{' '}
        <a href="https://languagethreshold.com" className="underline underline-offset-2 hover:text-white/30 transition-colors">
          Part of the Language Threshold study suite
        </a>
      </footer>
    </main>
  )
}
