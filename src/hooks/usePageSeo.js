import { useEffect } from 'react'
import {
  SITE_LANGUAGE,
  SITE_NAME,
  getCanonicalOrigin,
  getTwitterSiteHandle,
  resolveOgImageUrl,
} from '../config/site'

const TITLE_SUFFIX = ' | H&B Service Group'

const PAGE_JSONLD_ID = 'hnb-jsonld-page'

function ensureMetaName(name) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  return el
}

function ensureMetaProperty(property) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  return el
}

function ensureLinkRel(rel) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  return el
}

/**
 * @param {object} opts
 * @param {string} opts.title — unieke titel (suffix wordt toegevoegd tenzij al "H&B Service Group")
 * @param {string} opts.description — unieke meta description
 * @param {string} [opts.canonicalPath] — pad vanaf root, bv. `/contact`
 * @param {string} [opts.ogImage] — optioneel absoluut of pad met /
 * @param {'website'|'article'} [opts.ogType]
 * @param {boolean} [opts.noIndex]
 * @param {'summary'|'summary_large_image'} [opts.twitterCard]
 * @param {object|object[]|null} [opts.jsonLd] — WebPage e.d.; wordt als JSON-LD script geplaatst
 */
export function usePageSeo({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = 'website',
  noIndex = false,
  twitterCard = 'summary_large_image',
  jsonLd = null,
}) {
  useEffect(() => {
    const fullTitle = title.includes('H&B Service Group') ? title : `${title}${TITLE_SUFFIX}`
    document.title = fullTitle

    ensureMetaName('description').setAttribute('content', description)

    const path =
      canonicalPath !== undefined && canonicalPath !== null && canonicalPath !== ''
        ? canonicalPath.startsWith('/')
          ? canonicalPath
          : `/${canonicalPath}`
        : typeof window !== 'undefined'
          ? window.location.pathname
          : '/'

    const origin = getCanonicalOrigin()
    const pageUrl = origin ? `${origin}${path === '//' ? '/' : path}` : ''

    const canonical = ensureLinkRel('canonical')
    if (pageUrl) {
      canonical.setAttribute('href', pageUrl)
    }

    ensureMetaProperty('og:title').setAttribute('content', fullTitle)
    ensureMetaProperty('og:description').setAttribute('content', description)
    ensureMetaProperty('og:type').setAttribute('content', ogType)
    ensureMetaProperty('og:site_name').setAttribute('content', SITE_NAME)
    ensureMetaProperty('og:locale').setAttribute('content', SITE_LANGUAGE.replace('-', '_'))
    if (pageUrl) {
      ensureMetaProperty('og:url').setAttribute('content', pageUrl)
    }

    const ogImg = resolveOgImageUrl(ogImage)
    ensureMetaProperty('og:image').setAttribute('content', ogImg)

    ensureMetaName('twitter:card').setAttribute('content', twitterCard)
    ensureMetaName('twitter:title').setAttribute('content', fullTitle)
    ensureMetaName('twitter:description').setAttribute('content', description)
    ensureMetaName('twitter:image').setAttribute('content', ogImg)

    const tw = getTwitterSiteHandle()
    const existingTw = document.querySelector('meta[name="twitter:site"]')
    if (tw) {
      ensureMetaName('twitter:site').setAttribute('content', tw)
    } else if (existingTw) {
      existingTw.remove()
    }

    if (noIndex) {
      ensureMetaName('robots').setAttribute('content', 'noindex, nofollow')
    } else {
      ensureMetaName('robots').setAttribute('content', 'index, follow, max-image-preview:large')
    }

    let ldEl = document.getElementById(PAGE_JSONLD_ID)
    if (!jsonLd) {
      if (ldEl) {
        ldEl.remove()
      }
      return
    }

    const payload = Array.isArray(jsonLd)
      ? { '@context': 'https://schema.org', '@graph': jsonLd }
      : jsonLd

    if (!ldEl) {
      ldEl = document.createElement('script')
      ldEl.id = PAGE_JSONLD_ID
      ldEl.type = 'application/ld+json'
      document.head.appendChild(ldEl)
    }
    ldEl.textContent = JSON.stringify(payload)
  }, [title, description, canonicalPath, ogImage, ogType, noIndex, twitterCard, jsonLd])
}
