import { useCallback, useEffect, useState, Fragment } from 'react'
import {
  DEFAULT_HOURLY_RATE,
  formatEuro,
  INVOICE_STATUS,
  invoiceStatusLabel,
} from '../../constants/invoices'
import { usePageSeo } from '../../hooks/usePageSeo'
import { fetchActiveFreelancers } from '../../lib/admin/users'
import {
  approveInvoice,
  fetchApprovedUninvoicedTimeEntries,
  fetchInvoicesForAdmin,
  generateInvoiceFromApprovedHours,
  markInvoicePaid,
} from '../../lib/invoices/invoices'
import { printInvoicePdf } from '../../lib/invoices/pdf'
import '../auth/Auth.css'

/** @param {import('firebase/firestore').Timestamp | null | undefined} value */
function formatTimestamp(value) {
  if (!value || typeof value.toDate !== 'function') return '—'
  return value.toDate().toLocaleString('nl-NL', { dateStyle: 'medium', timeStyle: 'short' })
}

const FILTER_OPTIONS = [
  { value: INVOICE_STATUS.DRAFT, label: 'Concept' },
  { value: INVOICE_STATUS.APPROVED, label: 'Goedgekeurd' },
  { value: INVOICE_STATUS.PAID, label: 'Betaald' },
  { value: 'all', label: 'Alles' },
]

export default function AdminInvoices() {
  usePageSeo({
    title: 'Beheer — facturen',
    description: 'Facturen genereren en beheren.',
    canonicalPath: '/admin/invoices',
    noIndex: true,
  })

  const [filter, setFilter] = useState(INVOICE_STATUS.DRAFT)
  const [invoices, setInvoices] = useState([])
  const [freelancers, setFreelancers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionId, setActionId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [notesDraft, setNotesDraft] = useState({})

  const [generateFreelancerId, setGenerateFreelancerId] = useState('')
  const [hourlyRate, setHourlyRate] = useState(String(DEFAULT_HOURLY_RATE))
  const [generateNotes, setGenerateNotes] = useState('')
  const [previewCount, setPreviewCount] = useState(null)
  const [generating, setGenerating] = useState(false)

  const loadInvoices = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const rows = await fetchInvoicesForAdmin(filter)
      setInvoices(rows)
      setNotesDraft((prev) => {
        const next = { ...prev }
        for (const row of rows) {
          if (next[row.id] === undefined) next[row.id] = row.adminNotes ?? ''
        }
        return next
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Facturen laden mislukt.')
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    loadInvoices()
  }, [loadInvoices])

  useEffect(() => {
    fetchActiveFreelancers()
      .then(setFreelancers)
      .catch(() => setFreelancers([]))
  }, [])

  useEffect(() => {
    if (!generateFreelancerId) {
      setPreviewCount(null)
      return
    }
    fetchApprovedUninvoicedTimeEntries(generateFreelancerId)
      .then((rows) => setPreviewCount(rows.length))
      .catch(() => setPreviewCount(0))
  }, [generateFreelancerId])

  async function runAction(id, action) {
    setActionId(id)
    setError(null)
    try {
      await action()
      await loadInvoices()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Actie mislukt.')
    } finally {
      setActionId(null)
    }
  }

  async function handleGenerate(event) {
    event.preventDefault()
    if (!generateFreelancerId) return

    const freelancer = freelancers.find((row) => row.id === generateFreelancerId)
    if (!freelancer) return

    setGenerating(true)
    setError(null)
    try {
      await generateInvoiceFromApprovedHours({
        freelancerId: freelancer.id,
        freelancerName: freelancer.displayName,
        freelancerEmail: freelancer.email,
        hourlyRate: Number(hourlyRate),
        notes: generateNotes,
      })
      setGenerateFreelancerId('')
      setGenerateNotes('')
      setPreviewCount(null)
      setFilter(INVOICE_STATUS.DRAFT)
      const rows = await fetchInvoicesForAdmin(INVOICE_STATUS.DRAFT)
      setInvoices(rows)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Factuur genereren mislukt.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Facturen</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '48rem' }}>
        Genereer conceptfacturen op basis van goedgekeurde uren. Na goedkeuring ziet de freelancer de
        factuur in het portaal.
      </p>

      <form
        className="compliance-card"
        style={{ marginTop: 'var(--space-5)', maxWidth: '42rem' }}
        onSubmit={handleGenerate}
      >
        <h2 className="hnb-type-subhead">Nieuwe factuur genereren</h2>
        <div className="auth-field" style={{ marginTop: 'var(--space-4)' }}>
          <label htmlFor="invoice-freelancer">Freelancer</label>
          <select
            id="invoice-freelancer"
            className="admin-onboarding-filter__select"
            value={generateFreelancerId}
            onChange={(event) => setGenerateFreelancerId(event.target.value)}
            required
          >
            <option value="">Selecteer freelancer…</option>
            {freelancers.map((freelancer) => (
              <option key={freelancer.id} value={freelancer.id}>
                {freelancer.displayName || freelancer.email}
              </option>
            ))}
          </select>
        </div>
        <div className="auth-field">
          <label htmlFor="invoice-rate">Uurtarief (EUR)</label>
          <input
            id="invoice-rate"
            type="number"
            min="0.01"
            step="0.01"
            value={hourlyRate}
            onChange={(event) => setHourlyRate(event.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="invoice-notes">Opmerking op factuur (optioneel)</label>
          <textarea
            id="invoice-notes"
            rows={2}
            value={generateNotes}
            onChange={(event) => setGenerateNotes(event.target.value)}
          />
        </div>
        {generateFreelancerId ? (
          <p className="compliance-card__hint">
            {previewCount === null
              ? 'Beschikbare uren laden…'
              : `${previewCount} goedgekeurde urenregistratie(s) nog niet gefactureerd.`}
          </p>
        ) : null}
        <button
          type="submit"
          className="hnb-btn hnb-btn--freelancer"
          style={{ marginTop: 'var(--space-4)' }}
          disabled={generating || !generateFreelancerId || previewCount === 0}
        >
          {generating ? 'Genereren…' : 'Factuur genereren'}
        </button>
      </form>

      <div className="admin-onboarding-toolbar" style={{ marginTop: 'var(--space-6)' }}>
        <label className="admin-onboarding-filter" htmlFor="invoice-filter">
          Status
        </label>
        <select
          id="invoice-filter"
          className="admin-onboarding-filter__select"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          {FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <div className="auth-alert auth-alert--error" role="alert" style={{ marginTop: 'var(--space-4)' }}>
          {error}
        </div>
      ) : null}

      {loading ? (
        <p style={{ marginTop: 'var(--space-5)' }}>Laden…</p>
      ) : invoices.length === 0 ? (
        <p style={{ marginTop: 'var(--space-5)' }}>Geen facturen voor dit filter.</p>
      ) : (
        <div style={{ marginTop: 'var(--space-5)', overflowX: 'auto' }}>
          <table className="admin-users-table admin-onboarding-table">
            <thead>
              <tr>
                <th>Nummer</th>
                <th>Freelancer</th>
                <th>Periode</th>
                <th>Uren</th>
                <th>Bedrag</th>
                <th>Status</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => {
                const isExpanded = expandedId === invoice.id
                const isBusy = actionId === invoice.id

                return (
                  <Fragment key={invoice.id}>
                    <tr>
                      <td>{invoice.invoiceNumber}</td>
                      <td>
                        {invoice.freelancerName || '—'}
                        <br />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          {invoice.freelancerEmail}
                        </span>
                      </td>
                      <td>
                        {invoice.periodStart}
                        {invoice.periodEnd && invoice.periodEnd !== invoice.periodStart
                          ? ` – ${invoice.periodEnd}`
                          : ''}
                      </td>
                      <td>{invoice.totalHours.toFixed(2)}</td>
                      <td>{formatEuro(invoice.totalAmount)}</td>
                      <td>{invoiceStatusLabel(invoice.status)}</td>
                      <td>
                        <div className="admin-users-actions">
                          <button
                            type="button"
                            className="hnb-btn hnb-btn--outline"
                            onClick={() => setExpandedId(isExpanded ? null : invoice.id)}
                          >
                            {isExpanded ? 'Sluiten' : 'Details'}
                          </button>
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
                          {invoice.status === INVOICE_STATUS.DRAFT ? (
                            <button
                              type="button"
                              className="hnb-btn hnb-btn--freelancer"
                              disabled={isBusy}
                              onClick={() =>
                                runAction(invoice.id, () =>
                                  approveInvoice(invoice.id, notesDraft[invoice.id]),
                                )
                              }
                            >
                              Goedkeuren
                            </button>
                          ) : null}
                          {invoice.status === INVOICE_STATUS.APPROVED ? (
                            <button
                              type="button"
                              className="hnb-btn hnb-btn--freelancer"
                              disabled={isBusy}
                              onClick={() =>
                                runAction(invoice.id, () =>
                                  markInvoicePaid(invoice.id, notesDraft[invoice.id]),
                                )
                              }
                            >
                              Betaald
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                    {isExpanded ? (
                      <tr className="admin-onboarding-detail-row">
                        <td colSpan={7}>
                          <div className="admin-onboarding-detail">
                            <p>
                              <strong>Aangemaakt:</strong> {formatTimestamp(invoice.createdAt)}
                            </p>
                            <table className="admin-users-table" style={{ marginTop: 'var(--space-3)' }}>
                              <thead>
                                <tr>
                                  <th>Datum</th>
                                  <th>Opdracht</th>
                                  <th>Uren</th>
                                  <th>Bedrag</th>
                                </tr>
                              </thead>
                              <tbody>
                                {invoice.lineItems.map((line) => (
                                  <tr key={line.timeEntryId}>
                                    <td>{line.workDate}</td>
                                    <td>{line.assignmentTitle || '—'}</td>
                                    <td>{line.hours.toFixed(2)}</td>
                                    <td>{formatEuro(line.amount)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <label
                              className="admin-onboarding-detail__label"
                              htmlFor={`invoice-notes-${invoice.id}`}
                            >
                              Interne notities
                            </label>
                            <textarea
                              id={`invoice-notes-${invoice.id}`}
                              className="admin-onboarding-detail__textarea"
                              rows={2}
                              value={notesDraft[invoice.id] ?? ''}
                              onChange={(event) =>
                                setNotesDraft((prev) => ({
                                  ...prev,
                                  [invoice.id]: event.target.value,
                                }))
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
