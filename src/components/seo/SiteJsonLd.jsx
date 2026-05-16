import { useEffect } from 'react'
import { getCanonicalOrigin } from '../../config/site'
import { SITE_NAME } from '../../config/site'

const SCRIPT_ID = 'hnb-jsonld-organization'

function buildGraph(origin) {
  const orgId = `${origin}/#organization`
  const webId = `${origin}/#website`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: SITE_NAME,
        url: `${origin}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${origin}/favicon.svg`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': webId,
        url: `${origin}/`,
        name: SITE_NAME,
        inLanguage: 'nl-NL',
        publisher: { '@id': orgId },
      },
    ],
  }
}

/** Sitewide Organization + WebSite (éénmalig in document). */
export default function SiteJsonLd() {
  useEffect(() => {
    const origin = getCanonicalOrigin()
    if (!origin) return

    let el = document.getElementById(SCRIPT_ID)
    if (!el) {
      el = document.createElement('script')
      el.id = SCRIPT_ID
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(buildGraph(origin))
  }, [])

  return null
}
