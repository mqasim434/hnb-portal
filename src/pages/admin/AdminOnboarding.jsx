import { useCallback, useEffect, useState, Fragment } from 'react'
import { ONBOARDING_STATUS, onboardingStatusLabel } from '../../constants/onboarding'
import { usePageSeo } from '../../hooks/usePageSeo'
import {
  approveOnboardingApplication,
  fetchOnboardingApplications,
  rejectOnboardingApplication,
  reopenOnboardingApplication,
  saveOnboardingNotes,
} from '../../lib/onboarding/applications'
import '../auth/Auth.css'

/** @param {import('firebase/firestore').Timestamp | null | undefined} value */
function formatSubmittedAt(value) {
  if (!value || typeof value.toDate !== 'function') return '—'
  return value.toDate().toLocaleString('nl-NL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

/** @param {unknown} items */
function formatList(items) {
  if (!Array.isArray(items) || items.length === 0) return '—'
  return items.join(', ')
}

const FILTER_OPTIONS = [
  { value: ONBOARDING_STATUS.PENDING, label: 'In behandeling' },
  { value: ONBOARDING_STATUS.APPROVED, label: 'Goedgekeurd' },
  { value: ONBOARDING_STATUS.REJECTED, label: 'Afgewezen' },
  { value: 'all', label: 'Alles' },
]

export default function AdminOnboarding() {
  usePageSeo({
    title: 'Beheer — onboarding',
    description: 'Freelancer-aanmeldingen beoordelen.',
    canonicalPath: '/admin/onboarding',
    noIndex: true,
  })

  const [filter, setFilter] = useState(ONBOARDING_STATUS.PENDING)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionId, setActionId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [notesDraft, setNotesDraft] = useState({})

  const loadApplications = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const rows = await fetchOnboardingApplications(filter)
      setApplications(rows)
      setNotesDraft((prev) => {
        const next = { ...prev }
        for (const row of rows) {
          if (next[row.id] === undefined) next[row.id] = row.adminNotes ?? ''
        }
        return next
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Aanmeldingen laden mislukt.')
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    loadApplications()
  }, [loadApplications])

  async function handleSaveNotes(id) {
    setActionId(id)
    setError(null)
    try {
      await saveOnboardingNotes(id, notesDraft[id] ?? '')
      await loadApplications()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Notities opslaan mislukt.')
    } finally {
      setActionId(null)
    }
  }

  async function handleApprove(application) {
    setActionId(application.id)
    setError(null)
    try {
      await approveOnboardingApplication(application.id, {
        userId: application.userId,
        adminNotes: notesDraft[application.id] ?? application.adminNotes,
      })
      await loadApplications()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Goedkeuren mislukt.')
    } finally {
      setActionId(null)
    }
  }

  async function handleReopen(application) {
    setActionId(application.id)
    setError(null)
    try {
      await reopenOnboardingApplication(application.id, notesDraft[application.id] ?? application.adminNotes)
      await loadApplications()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terugzetten mislukt.')
    } finally {
      setActionId(null)
    }
  }

  async function handleReject(application) {
    setActionId(application.id)
    setError(null)
    try {
      await rejectOnboardingApplication(application.id, {
        userId: application.userId,
        adminNotes: notesDraft[application.id] ?? application.adminNotes,
      })
      await loadApplications()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Afwijzen mislukt.')
    } finally {
      setActionId(null)
    }
  }

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Onboarding — aanmeldingen</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '48rem' }}>
        Beoordeel ingediende aanmeldingen van <strong>/freelancers/direct-aanmelden</strong>. Bij een
        gekoppeld portaalaccount wordt de gebruiker automatisch goedgekeurd of afgewezen.
      </p>

      <div className="admin-onboarding-toolbar" style={{ marginTop: 'var(--space-5)' }}>
        <label className="admin-onboarding-filter" htmlFor="onboarding-filter">
          Status
        </label>
        <select
          id="onboarding-filter"
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
      ) : applications.length === 0 ? (
        <p style={{ marginTop: 'var(--space-5)' }}>Geen aanmeldingen voor dit filter.</p>
      ) : (
        <div style={{ marginTop: 'var(--space-5)', overflowX: 'auto' }}>
          <table className="admin-users-table admin-onboarding-table">
            <thead>
              <tr>
                <th>Naam</th>
                <th>E-mail</th>
                <th>Domeinen</th>
                <th>Status</th>
                <th>Ingediend</th>
                <th>Account</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => {
                const isExpanded = expandedId === application.id
                const isBusy = actionId === application.id
                return (
                  <Fragment key={application.id}>
                    <tr key={application.id}>
                      <td>
                        {application.displayName || '—'}
                        {application.interestWithoutLicence ? (
                          <span className="admin-onboarding-badge">Interesse zonder volledige licentie</span>
                        ) : null}
                      </td>
                      <td>{application.email}</td>
                      <td>{formatList(application.domeinen)}</td>
                      <td>{onboardingStatusLabel(application.status)}</td>
                      <td>{formatSubmittedAt(application.createdAt)}</td>
                      <td>{application.userId ? 'Gekoppeld' : 'Nog geen account'}</td>
                      <td>
                        <div className="admin-users-actions">
                          <button
                            type="button"
                            className="hnb-btn hnb-btn--outline"
                            onClick={() => setExpandedId(isExpanded ? null : application.id)}
                          >
                            {isExpanded ? 'Sluiten' : 'Details'}
                          </button>
                          {application.status === ONBOARDING_STATUS.PENDING ? (
                            <>
                              <button
                                type="button"
                                className="hnb-btn hnb-btn--freelancer"
                                disabled={isBusy}
                                onClick={() => handleApprove(application)}
                              >
                                Goedkeuren
                              </button>
                              <button
                                type="button"
                                className="hnb-btn hnb-btn--outline"
                                disabled={isBusy}
                                onClick={() => handleReject(application)}
                              >
                                Afwijzen
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              className="hnb-btn hnb-btn--outline"
                              disabled={isBusy}
                              onClick={() => handleReopen(application)}
                            >
                              Terug naar in behandeling
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {isExpanded ? (
                      <tr key={`${application.id}-detail`} className="admin-onboarding-detail-row">
                        <td colSpan={7}>
                          <div className="admin-onboarding-detail">
                            <div className="admin-onboarding-detail__grid">
                              <p>
                                <strong>Telefoon:</strong> {application.telefoonnummer || '—'}
                              </p>
                              <p>
                                <strong>Woonplaats:</strong> {application.woonplaats || '—'}
                              </p>
                              <p>
                                <strong>Geboortedatum:</strong> {application.geboortedatum || '—'}
                              </p>
                              <p>
                                <strong>Ervaringsjaren:</strong> {application.ervaringsniveau || '—'}
                              </p>
                              <p>
                                <strong>Rollen:</strong> {formatList(application.voorkeursrollen)}
                              </p>
                              <p>
                                <strong>Reisbereidheid:</strong> {application.reisbereidheid || '—'}
                              </p>
                              <p>
                                <strong>Contract:</strong> {application.contractvoorkeur || '—'}
                              </p>
                              {application.domeinen.includes('beveiliging') ? (
                                <>
                                  <p>
                                    <strong>Diploma beveiliger:</strong>{' '}
                                    {application.beveilig_diploma || '—'}
                                  </p>
                                  <p>
                                    <strong>Beveiligingspassen:</strong>{' '}
                                    {formatList(application.beveilig_passen) ||
                                      application.beveilig_grijze_pas ||
                                      '—'}
                                  </p>
                                  <p>
                                    <strong>BHV:</strong> {application.beveilig_bhv || '—'}
                                  </p>
                                  <p>
                                    <strong>VOG:</strong> {application.beveilig_vog || '—'}
                                  </p>
                                </>
                              ) : null}
                              {application.domeinen.includes('hospitality') ? (
                                <>
                                  <p>
                                    <strong>SVH:</strong> {application.hosp_svh || '—'}
                                  </p>
                                  <p>
                                    <strong>BHV servicemedewerker:</strong> {application.hosp_bhv || '—'}
                                  </p>
                                </>
                              ) : null}
                            </div>
                            {application.aanvullendeInfo ? (
                              <p className="admin-onboarding-detail__notes">
                                <strong>Aanvullende info:</strong> {application.aanvullendeInfo}
                              </p>
                            ) : null}
                            <label className="admin-onboarding-detail__label" htmlFor={`notes-${application.id}`}>
                              Interne notities
                            </label>
                            <textarea
                              id={`notes-${application.id}`}
                              className="admin-onboarding-detail__textarea"
                              rows={3}
                              value={notesDraft[application.id] ?? ''}
                              onChange={(event) =>
                                setNotesDraft((prev) => ({
                                  ...prev,
                                  [application.id]: event.target.value,
                                }))
                              }
                            />
                            <button
                              type="button"
                              className="hnb-btn hnb-btn--outline"
                              disabled={isBusy}
                              onClick={() => handleSaveNotes(application.id)}
                            >
                              Notities opslaan
                            </button>
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
