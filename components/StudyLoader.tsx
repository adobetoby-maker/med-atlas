'use client'

import dynamic from 'next/dynamic'

const StudyClient = dynamic(() => import('./StudyClient'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center bg-[#080c14]">
      <div className="h-10 w-10 rounded-full border-2 border-[#4fffb0]/30 border-t-[#4fffb0] animate-spin" />
    </div>
  ),
})

export function StudyLoader() {
  return <StudyClient />
}
