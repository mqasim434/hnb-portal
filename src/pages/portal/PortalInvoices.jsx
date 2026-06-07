import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatEuro, invoiceStatusLabel } from '../../constants/invoices'
import { usePageSeo } from '../../hooks/usePageSeo'
import { fetchInvoicesForFreelancer } from '../../lib/invoices/invoices'
import { printInvoicePdf } from '../../lib/invoices/pdf'
import '../auth/Auth.css'

/** @param {import('firebase/firestore').Timestamp | null | undefined} value */
function formatTimestamp(value) {
  if (!value || typeof value.toDate !== 'function') return '—'
  return value.toDate().toLocaleDateString('nl-NL', { dateStyle: 'medium' })
}

export default function PortalInvoices() {
  usePageSeo({
    title: 'Freelancer — facturen',
    description: 'Overzicht van goedgekeurde en betaalde facturen.',
    canonicalPath: '/portal/invoices',
    noIndex: true,
  })

  const { user } = useSelector((state) => state.auth)
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.uid) return
    setLoading(true)
    fetchInvoicesForFreelancer(user.uid)
      .then(setInvoices)
      .catch((err) => setError(err instanceof Error ? err.message : 'Facturen laden mislukt.'))
      .finally(() => setLoading(false))
  }, [user?.uid])

  const totals = useMemo(() => {
    let open = 0
    let paid = 0
    for (const invoice of invoices) {
      if (invoice.status === 'approved') open += invoice.totalAmount
      if (invoice.status === 'paid') paid += invoice.totalAmount
    }
    return { open, paid }
  }, [invoices])

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Facturen</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '42rem' }}>
        Goedgekeurde facturen op basis van uw goedgekeurde uren. Betaling wordt handmatig verwerkt door
        H&amp;B Services Group.
      </p>

      <p className="compliance-summary" style={{ marginTop: 'var(--space-4)' }}>
        Openstaand: <strong>{formatEuro(totals.open)}</strong> · Betaald:{' '}
        <strong>{formatEuro(totals.paid)}</strong>
      </p>

      {error ? (
        <div className="auth-alert auth-alert--error" role="alert" style={{ marginTop: 'var(--space-4)' }}>
          {error}
        </div>
      ) : null}

      {loading ? (
        <p style={{ marginTop: 'var(--space-5)' }}>Laden…</p>
      ) : invoices.length === 0 ? (
        <p style={{ marginTop: 'var(--space-5)' }}>
          Nog geen goedgekeurde facturen. Na goedkeuring van uw uren kan H&amp;B een factuur voor u
          aanmaken.
        </p>
      ) : (
        <div style={{ marginTop: 'var(--space-5)', overflowX: 'auto' }}>
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>Nummer</th>
                <th>Periode</th>
                <th>Uren</th>
                <th>Bedrag</th>
                <th>Status</th>
                <th>Datum</th>
                <th>Actie</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>
                    {invoice.periodStart}
                    {invoice.periodEnd && invoice.periodEnd !== invoice.periodStart
                      ? ` – ${invoice.periodEnd}`
                      : ''}
                  </td>
                  <td>{invoice.totalHours.toFixed(2)}</td>
                  <td>{formatEuro(invoice.totalAmount)}</td>
                  <td>{invoiceStatusLabel(invoice.status)}</td>
                  <td>{formatTimestamp(invoice.approvedAt || invoice.createdAt)}</td>
                  <td>
                    <button
                      type="button"
                      className="hnb-btn hnb-btn--outline"
                      onClick={() => {
                        try {
                          printInvoicePdf(invoice)
                        } catch (err) {
                          setError(err instanceof Error ? err.message : 'PDF openen mislukt.')
                        }
                      }}
                    >
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
