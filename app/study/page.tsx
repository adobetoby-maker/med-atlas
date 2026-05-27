import type { Metadata } from 'next'
import { StudyLoader } from '../../components/StudyLoader'

export const metadata: Metadata = {
  title: 'Study — Med Atlas 3D Medical Terminology',
  description: 'Interactive 3D flashcard study with 1,200+ medical terms. Gamified quizzes for MA, CMA, CPC certification prep.',
}

export default function StudyPage() {
  return <StudyLoader />
}
