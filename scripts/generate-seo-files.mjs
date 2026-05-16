/**
 * Genereert public/sitemap.xml en public/robots.txt vóór build.
 * Zet VITE_SITE_URL (productie-root, zonder slash) — zie .env.example.
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PUBLIC_SITEMAP_PATHS } from '../src/content/sitemapPaths.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')

function applyDotEnv() {
  const envPath = join(root, '.env')
  if (!existsSync(envPath)) return
  const text = readFileSync(envPath, 'utf8')
  for (const line of text.split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i === -1) continue
    const key = t.slice(0, i).trim()
    let val = t.slice(i + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if ((key === 'VITE_SITE_URL' || key === 'VITE_OG_IMAGE_URL') && !process.env[key]) {
      process.env[key] = val
    }
  }
}

applyDotEnv()

const base =
  (process.env.VITE_SITE_URL && String(process.env.VITE_SITE_URL).replace(/\/$/, '')) ||
  'https://www.hbservicegroup.com'

mkdirSync(publicDir, { recursive: true })

const locs = PUBLIC_SITEMAP_PATHS.map((p) => {
  const path = p === '/' ? '' : p
  return `${base}${path}`
})

const urlBlocks = locs
  .map((loc) => {
    const priority = loc === `${base}` || loc === `${base}/` ? '1.0' : '0.75'
    return `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  })
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlBlocks}
</urlset>
`

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8')

const robots = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`

writeFileSync(join(publicDir, 'robots.txt'), robots, 'utf8')

console.info(`[SEO] Geschreven: sitemap.xml + robots.txt (basis: ${base})`)
