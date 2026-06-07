import { formatEuro } from '../../constants/invoices'

const COMPANY = {
  name: 'H&B Services Group',
  address: 'Nederland',
  email: 'info@hbservicegroup.com',
}

/**
 * Opens a print-friendly invoice view (save as PDF via browser print).
 * @param {Record<string, unknown>} invoice
 */
export function printInvoicePdf(invoice) {
  const html = buildInvoiceHtml(invoice)
  const printWindow = window.open('', '_blank', 'noopener,noreferrer')
  if (!printWindow) {
    throw new Error('Pop-up geblokkeerd. Sta pop-ups toe om de factuur te printen.')
  }
  printWindow.document.write(html)
  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
}

/** @param {Record<string, unknown>} invoice */
function buildInvoiceHtml(invoice) {
  const lineItems = Array.isArray(invoice.lineItems) ? invoice.lineItems : []
  const rows = lineItems
    .map(
      (line) => `
        <tr>
          <td>${escapeHtml(line.workDate)}</td>
          <td>${escapeHtml(line.assignmentTitle || '—')}</td>
          <td style="text-align:right">${Number(line.hours).toFixed(2)}</td>
          <td style="text-align:right">${formatEuro(Number(line.hourlyRate))}</td>
          <td style="text-align:right">${formatEuro(Number(line.amount))}</td>
        </tr>`,
    )
    .join('')

  const periodEnd =
    invoice.periodEnd && invoice.periodEnd !== invoice.periodStart
      ? ` – ${escapeHtml(String(invoice.periodEnd))}`
      : ''

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <title>Factuur ${escapeHtml(String(invoice.invoiceNumber))}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #111; margin: 2rem; font-size: 14px; }
    h1 { margin: 0 0 0.25rem; font-size: 1.5rem; }
    .meta { color: #555; margin-bottom: 2rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; }
    th, td { border-bottom: 1px solid #ddd; padding: 0.5rem 0.25rem; text-align: left; }
    th { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.03em; }
    .totals { margin-top: 1.5rem; text-align: right; }
    .totals strong { font-size: 1.15rem; }
    @media print { body { margin: 0.5in; } }
  </style>
</head>
<body>
  <h1>Factuur ${escapeHtml(String(invoice.invoiceNumber))}</h1>
  <p class="meta">Periode: ${escapeHtml(String(invoice.periodStart))}${periodEnd}</p>

  <div style="display:flex; justify-content:space-between; gap:2rem;">
    <div>
      <strong>Van</strong><br />
      ${escapeHtml(COMPANY.name)}<br />
      ${escapeHtml(COMPANY.address)}<br />
      ${escapeHtml(COMPANY.email)}
    </div>
    <div>
      <strong>Aan</strong><br />
      ${escapeHtml(String(invoice.freelancerName || 'Freelancer'))}<br />
      ${escapeHtml(String(invoice.freelancerEmail))}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Datum</th>
        <th>Opdracht</th>
        <th style="text-align:right">Uren</th>
        <th style="text-align:right">Tarief</th>
        <th style="text-align:right">Bedrag</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>

  <div class="totals">
    <p>Totaal uren: ${Number(invoice.totalHours).toFixed(2)}</p>
    <p><strong>Totaal: ${formatEuro(Number(invoice.totalAmount))}</strong></p>
  </div>

  ${invoice.notes ? `<p style="margin-top:2rem"><strong>Opmerking:</strong> ${escapeHtml(String(invoice.notes))}</p>` : ''}

  <p style="margin-top:3rem; color:#666; font-size:0.85rem">
    Conceptfactuur — betaling wordt handmatig verwerkt door H&amp;B Services Group.
  </p>
</body>
</html>`
}

/** @param {string} value */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
