import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageSeo } from '../../hooks/usePageSeo'
import {
  exportComplianceCsv,
  exportHoursCsv,
  exportInvoicesCsv,
  exportUsersCsv,
  fetchAdminKpis,
} from '../../lib/admin/dashboard'
import '../auth/Auth.css'

/** @typedef {{
 *   pendingUsers: number
 *   activeFreelancers: number
 *   pendingOnboarding: number
 *   newStaffRequests: number
 *   submittedHours: number
 *   pendingCompliance: number
 *   draftInvoices: number
 *   approvedInvoices: number
 * }} AdminKpis */

const KPI_CARDS = [
  {
    key: 'pendingUsers',
    label: 'Gebruikers wachtend',
    to: '/admin/users',
  },
  {
    key: 'pendingOnboarding',
    label: 'Onboarding open',
    to: '/admin/onboarding',
  },
  {
    key: 'newStaffRequests',
    label: 'Nieuwe aanvragen',
    to: '/admin/staff-requests',
  },
  {
    key: 'submittedHours',
    label: 'Uren te beoordelen',
    to: '/admin/hours',
  },
  {
    key: 'pendingCompliance',
    label: 'Compliance te beoordelen',
    to: '/admin/compliance',
  },
  {
    key: 'draftInvoices',
    label: 'Facturen (concept)',
    to: '/admin/invoices',
  },
  {
    key: 'approvedInvoices',
    label: 'Facturen openstaand',
    to: '/admin/invoices',
  },
  {
    key: 'activeFreelancers',
    label: 'Actieve freelancers',
    to: '/admin/users',
  },
]

const EXPORT_ACTIONS = [
  { id: 'users', label: 'Gebruikers exporteren', run: exportUsersCsv },
  { id: 'hours', label: 'Uren exporteren', run: exportHoursCsv },
  { id: 'compliance', label: 'Compliance exporteren', run: exportComplianceCsv },
  { id: 'invoices', label: 'Facturen exporteren', run: exportInvoicesCsv },
]

export default function AdminDashboard() {
  usePageSeo({
    title: 'Beheer — dashboard',
    description: 'Overzicht van openstaande taken en data-export.',
    canonicalPath: '/admin/dashboard',
    noIndex: true,
  })

  const [kpis, setKpis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [exportingId, setExportingId] = useState(null)

  const loadKpis = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setKpis(await fetchAdminKpis())
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Dashboard laden mislukt.'
      if (message.includes('permission') || message.includes('Permission')) {
        setError(
          'Geen toegang tot dashboardgegevens. Controleer in Firebase Console → Firestore → users → uw account: role = "admin" en accountStatus = "active" (beide lowercase). Log daarna uit en opnieuw in.',
        )
      } else {
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadKpis()
  }, [loadKpis])

  async function handleExport(exportAction) {
    setExportingId(exportAction.id)
    setError(null)
    try {
      await exportAction.run()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export mislukt.')
    } finally {
      setExportingId(null)
    }
  }

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h1 className="hnb-type-section">Dashboard</h1>
          <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '48rem' }}>
            Openstaande taken in één oogopslag. Klik op een kaart om direct naar het beheerscherm te gaan.
          </p>
        </div>
        <button
          type="button"
          className="hnb-btn hnb-btn--outline"
          onClick={loadKpis}
          disabled={loading}
        >
          Vernieuwen
        </button>
      </div>

      {error ? (
        <div className="auth-alert auth-alert--error" role="alert" style={{ marginTop: 'var(--space-4)' }}>
          {error}
        </div>
      ) : null}

      {loading ? (
        <p style={{ marginTop: 'var(--space-5)' }}>Laden…</p>
      ) : kpis ? (
        <div
          style={{
            marginTop: 'var(--space-5)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 10rem), 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {KPI_CARDS.map((card) => (
            <Link
              key={card.key}
              to={card.to}
              className="compliance-card"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                padding: 'var(--space-5)',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '2rem',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: 'var(--brand-freelancer, var(--text-primary))',
                }}
              >
                {kpis[card.key]}
              </p>
              <p className="compliance-card__hint" style={{ marginTop: 'var(--space-2)' }}>
                {card.label}
              </p>
            </Link>
          ))}
        </div>
      ) : null}

      <section className="compliance-card" style={{ marginTop: 'var(--space-6)', maxWidth: '42rem' }}>
        <h2 className="hnb-type-subhead">Data exporteren (CSV)</h2>
        <p className="compliance-card__hint" style={{ marginTop: 'var(--space-2)' }}>
          Download een momentopname voor Excel of uw administratie. Bestanden gebruiken UTF-8 met komma&apos;s
          als scheidingsteken.
        </p>
        <div
          style={{
            marginTop: 'var(--space-4)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
          }}
        >
          {EXPORT_ACTIONS.map((exportAction) => (
            <button
              key={exportAction.id}
              type="button"
              className="hnb-btn hnb-btn--outline"
              disabled={exportingId != null}
              onClick={() => handleExport(exportAction)}
            >
              {exportingId === exportAction.id ? 'Exporteren…' : exportAction.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
