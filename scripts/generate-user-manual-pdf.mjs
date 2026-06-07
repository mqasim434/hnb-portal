/**
 * Generates docs/HNB-PORTAL-USER-MANUAL.pdf from English Markdown.
 * Uses system Chrome (no Puppeteer browser download).
 * Run: node scripts/generate-user-manual-pdf.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { marked } from 'marked'
import puppeteer from 'puppeteer-core'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const inputPath = join(root, 'docs', 'HNB-PORTAL-USER-MANUAL-EN.md')
const outputPath = join(root, 'docs', 'HNB-PORTAL-USER-MANUAL.pdf')

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
]

const executablePath = CHROME_PATHS.find((path) => {
  try {
    readFileSync(path)
    return true
  } catch {
    return false
  }
})

if (!executablePath) {
  throw new Error('Chrome or Edge not found. Install Google Chrome to generate PDF.')
}

const markdown = readFileSync(inputPath, 'utf8')
const bodyHtml = marked.parse(markdown, { gfm: true, breaks: false })

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>HNB Portal User Manual</title>
  <style>
    @page { margin: 18mm 16mm; size: A4; }
    body {
      font-family: "Segoe UI", Calibri, Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.45;
      color: #1a1a1a;
      max-width: 100%;
    }
    h1 { font-size: 22pt; color: #0d1b2a; border-bottom: 2px solid #d4a017; padding-bottom: 6px; }
    h2 { font-size: 14pt; color: #0d1b2a; margin-top: 1.4em; page-break-after: avoid; }
    h3 { font-size: 11.5pt; color: #132336; page-break-after: avoid; }
    p, li { orphans: 3; widows: 3; }
    table { width: 100%; border-collapse: collapse; margin: 0.8em 0; font-size: 9.5pt; }
    th, td { border: 1px solid #ccc; padding: 6px 8px; vertical-align: top; text-align: left; }
    th { background: #f5f1ea; font-weight: 600; }
    tr { page-break-inside: avoid; }
    code { font-size: 9pt; background: #f5f5f5; padding: 1px 4px; border-radius: 3px; }
    blockquote { border-left: 3px solid #d4a017; margin-left: 0; padding-left: 12px; color: #444; }
    a { color: #2c5aa0; text-decoration: none; }
    hr { border: none; border-top: 1px solid #ddd; margin: 1.5em 0; }
    strong { font-weight: 600; }
  </style>
</head>
<body>${bodyHtml}</body>
</html>`

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0' })
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '18mm', right: '16mm', bottom: '18mm', left: '16mm' },
  })
  console.log(`[Manual] PDF written: ${outputPath}`)
} finally {
  await browser.close()
}
