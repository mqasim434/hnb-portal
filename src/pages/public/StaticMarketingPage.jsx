import { useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import { getCanonicalOrigin, getCanonicalUrl } from '../../config/site'
import { MARKETING_CANONICAL_PATH } from '../../content/marketingCanonicalPaths'
import { MARKETING_PAGES } from '../../content/marketingPages'
import { usePageSeo } from '../../hooks/usePageSeo'
import InfoPage from './InfoPage'

export default function StaticMarketingPage({ pageKey }) {
  const data = MARKETING_PAGES[pageKey]
  const canonicalPath = MARKETING_CANONICAL_PATH[pageKey]

  const webPageJsonLd = useMemo(() => {
    const entry = MARKETING_PAGES[pageKey]
    const path = MARKETING_CANONICAL_PATH[pageKey]
    if (!entry || !path) return null
    const origin = getCanonicalOrigin()
    if (!origin) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: entry.title,
      description: entry.lead,
      url: getCanonicalUrl(path),
      isPartOf: { '@id': `${origin}/#website` },
    }
  }, [pageKey])

  usePageSeo({
    title: data?.title ?? 'H&B Service Group',
    description: data?.lead ?? '',
    canonicalPath: data && canonicalPath ? canonicalPath : undefined,
    jsonLd: webPageJsonLd,
    ogType: 'article',
    noIndex: !data,
  })

  if (!data) {
    return <Navigate to="/" replace />
  }

  return <InfoPage {...data} />
}
