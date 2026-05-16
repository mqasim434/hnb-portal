const DEFAULT_WIDTHS = [640, 960, 1280, 1600, 2000]

/**
 * @param {string} url
 * @returns {boolean}
 */
export function isUnsplashImageUrl(url) {
  return typeof url === 'string' && url.includes('images.unsplash.com/')
}

/**
 * Build responsive srcsets for images.unsplash.com (AVIF / WebP / JPEG) + fallback URL.
 * @param {string} fullUrl
 * @param {number[]} [widths]
 */
export function buildUnsplashSrcSets(fullUrl, widths = DEFAULT_WIDTHS) {
  const u = new URL(fullUrl)
  const base = `${u.origin}${u.pathname}`
  const baseParams = new URLSearchParams(u.search)
  baseParams.set('auto', 'format')
  baseParams.set('fit', 'crop')
  if (!baseParams.has('q')) baseParams.set('q', '80')
  baseParams.delete('fm')
  baseParams.delete('w')

  const urlFor = (w, fm) => {
    const next = new URLSearchParams(baseParams)
    next.set('w', String(w))
    if (fm) next.set('fm', fm)
    return `${base}?${next.toString()}`
  }

  const mkSet = (fm) =>
    widths.map((w) => `${urlFor(w, fm)} ${w}w`).join(', ')

  const sorted = [...widths].sort((a, b) => a - b)
  const mid = sorted[Math.floor(sorted.length / 2)] ?? 1280

  return {
    avifSrcSet: mkSet('avif'),
    webpSrcSet: mkSet('webp'),
    jpegSrcSet: mkSet('jpg'),
    /** Safe fallback when `<picture>` is not used */
    fallbackSrc: urlFor(mid, 'jpg'),
  }
}
