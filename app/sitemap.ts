import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://medterms.worker-bee.app'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/study`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ]
}
