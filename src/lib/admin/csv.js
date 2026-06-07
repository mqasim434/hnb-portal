/**
 * @param {unknown} value
 */
function escapeCsvCell(value) {
  const str = value == null ? '' : String(value)
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

/**
 * @param {import('firebase/firestore').Timestamp | null | undefined} value
 */
export function formatTimestampForCsv(value) {
  if (!value || typeof value.toDate !== 'function') return ''
  return value.toDate().toISOString()
}

/**
 * @param {string} filename
 * @param {string[]} headers
 * @param {unknown[][]} rows
 */
export function downloadCsv(filename, headers, rows) {
  const lines = [
    headers.map(escapeCsvCell).join(','),
    ...rows.map((row) => row.map(escapeCsvCell).join(',')),
  ]
  const blob = new Blob([`\ufeff${lines.join('\r\n')}`], {
    type: 'text/csv;charset=utf-8;',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
