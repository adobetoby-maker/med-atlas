import Link from 'next/link'

const FEATURES = [
  { icon: '🫀', label: '3D Anatomy', desc: 'Body part models float on every card — not flat images, real 3D geometry' },
  { icon: '🔄', label: 'Card Flip', desc: 'WebGL-powered flip reveals definition, etymology, and a clinical example' },
  { icon: '🔥', label: 'Streak System', desc: 'Build streaks, earn XP, unlock achievements as you master terms' },
  { icon: '🎓', label: 'Cert-Mapped', desc: 'Content mapped to MA, CMA, CPC, and RMA exam objectives' },
  { icon: '📚', label: '1,200+ Terms', desc: 'Full curriculum across 20+ body systems and medical specialties' },
  { icon: '⚛️', label: 'Word Roots', desc: 'Prefixes, suffixes, and combining forms — understand any term at a glance' },
]

const CATEGORIES_DEMO = [
  { emoji: '🫀', name: 'Cardiovascular', color: '#e05c5c', count: 8 },
  { emoji: '🧠', name: 'Neurology', color: '#a78bfa', count: 6 },
  { emoji: '🫁', name: 'Respiratory', color: '#6ab8e8', count: 7 },
  { emoji: '🦴', name: 'Musculoskeletal', color: '#e8a84c', count: 6 },
  { emoji: '🔤', name: 'Prefixes', color: '#c084fc', count: 8 },
  { emoji: '🔡', name: 'Suffixes', color: '#fb923c', count: 8 },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080c14] text-white font-sans">

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#080c14]/80 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xl font-black text-[#4fffb0]">Med Atlas</span>
          <span className="rounded-full bg-[#4fffb0]/10 px-2 py-0.5 text-xs font-semibold text-[#4fffb0]">BETA</span>
        </div>
        <Link
          href="/study"
          className="rounded-xl bg-[#4fffb0] px-5 py-2 text-sm font-bold text-[#080c14] hover:bg-[#3de8a0] transition-colors"
        >
          Start Studying
        </Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4fffb0]/20 bg-[#4fffb0]/5 px-4 py-1.5 text-sm text-[#4fffb0]">
          <span>⚕️</span> MA · CMA · CPC · RMA Exam Prep
        </div>
        <h1 className="mt-4 text-5xl font-black leading-tight sm:text-6xl">
          Medical Terminology
          <br />
          <span className="text-[#4fffb0]">in 3D</span>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-lg text-white/60 leading-relaxed">
          Flip interactive cards with 3D anatomical models. Build streaks. Master 1,200+ terms
          mapped to your certification exam.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/study"
            className="rounded-2xl bg-[#4fffb0] px-8 py-4 text-base font-bold text-[#080c14] hover:bg-[#3de8a0] transition-all hover:scale-105 active:scale-100"
          >
            Study Free — Start Now →
          </Link>
          <a
            href="#categories"
            className="rounded-2xl border border-white/10 px-8 py-4 text-base font-semibold text-white/70 hover:bg-white/5 transition-colors"
          >
            Browse 21 Categories
          </a>
        </div>
        <p className="mt-4 text-xs text-white/25">Free to study · No account required · 1,200+ flashcards</p>
      </section>

      {/* Demo category pills */}
      <section id="categories" className="mx-auto max-w-4xl px-6 pb-16">
        <div className="flex flex-wrap gap-2.5 justify-center">
          {CATEGORIES_DEMO.map(cat => (
            <Link
              key={cat.name}
              href={`/study?cat=${encodeURIComponent(cat.name)}`}
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:scale-105"
              style={{ borderColor: `${cat.color}40`, backgroundColor: `${cat.color}10`, color: cat.color }}
            >
              {cat.emoji} {cat.name}
              <span className="ml-1 rounded-full bg-white/10 px-1.5 py-0.5 text-xs">{cat.count}</span>
            </Link>
          ))}
          <Link
            href="/study"
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/40 hover:text-white/70 transition-colors"
          >
            + 15 more categories
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="text-center text-2xl font-black mb-10">Why Med Atlas Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(f => (
            <div key={f.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-3 text-base font-bold">{f.label}</h3>
              <p className="mt-1 text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-20 text-center px-6">
        <h2 className="text-3xl font-black">Start mastering medical terms today</h2>
        <p className="mt-3 text-white/50">No account needed. Runs in your browser. Free forever.</p>
        <Link
          href="/study"
          className="mt-8 inline-block rounded-2xl bg-[#4fffb0] px-10 py-4 text-base font-bold text-[#080c14] hover:bg-[#3de8a0] transition-all hover:scale-105"
        >
          Open the 3D Flashcard Deck →
        </Link>
      </section>

      <footer className="border-t border-white/5 px-6 py-6 text-center text-xs text-white/20">
        Med Atlas · Part of the Language Threshold study suite
      </footer>
    </main>
  )
}
