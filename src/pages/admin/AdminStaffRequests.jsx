import { useCallback, useEffect, useState, Fragment } from 'react'
import {
  eventTypeLabel,
  STAFF_REQUEST_STATUS,
  staffRequestStatusLabel,
  staffTypeLabel,
} from '../../constants/staffRequests'
import { usePageSeo } from '../../hooks/usePageSeo'
import {
  fetchStaffRequests,
  saveStaffRequestNotes,
  updateStaffRequestStatus,
} from '../../lib/staffRequests/requests'
import '../auth/Auth.css'

/** @param {import('firebase/firestore').Timestamp | null | undefined} value */
function formatTimestamp(value) {
  if (!value || typeof value.toDate !== 'function') return '—'
  return value.toDate().toLocaleString('nl-NL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

const FILTER_OPTIONS = [
  { value: STAFF_REQUEST_STATUS.NEW, label: 'Nieuw' },
  { value: STAFF_REQUEST_STATUS.IN_PROGRESS, label: 'In behandeling' },
  { value: STAFF_REQUEST_STATUS.CLOSED, label: 'Afgerond' },
  { value: 'all', label: 'Alles' },
]

export default function AdminStaffRequests() {
  usePageSeo({
    title: 'Beheer — personeelsaanvragen',
    description: 'B2B personeelsaanvragen beheren.',
    canonicalPath: '/admin/staff-requests',
    noIndex: true,
  })

  const [filter, setFilter] = useState(STAFF_REQUEST_STATUS.NEW)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionId, setActionId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [notesDraft, setNotesDraft] = useState({})

  const loadRequests = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const rows = await fetchStaffRequests(filter)
      setRequests(rows)
      setNotesDraft((prev) => {
        const next = { ...prev }
        for (const row of rows) {
          if (next[row.id] === undefined) next[row.id] = row.adminNotes ?? ''
        }
        return next
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Aanvragen laden mislukt.')
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    loadRequests()
  }, [loadRequests])

  async function runAction(id, action) {
    setActionId(id)
    setError(null)
    try {
      await action()
      await loadRequests()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Actie mislukt.')
    } finally {
      setActionId(null)
    }
  }

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Personeelsaanvragen (B2B)</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '48rem' }}>
        Aanvragen via <strong>/bedrijven/personeel-aanvragen</strong> en gerelateerde B2B-formulieren.
        Beheer status en interne notities voor opvolging.
      </p>

      <div className="admin-onboarding-toolbar" style={{ marginTop: 'var(--space-5)' }}>
        <label className="admin-onboarding-filter" htmlFor="staff-request-filter">
          Status
        </label>
        <select
          id="staff-request-filter"
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
      ) : requests.length === 0 ? (
        <p style={{ marginTop: 'var(--space-5)' }}>Geen aanvragen voor dit filter.</p>
      ) : (
        <div style={{ marginTop: 'var(--space-5)', overflowX: 'auto' }}>
          <table className="admin-users-table admin-onboarding-table">
            <thead>
              <tr>
                <th>Bedrijf</th>
                <th>Contact</th>
                <th>Type</th>
                <th>Periode</th>
                <th>Bezetting</th>
                <th>Status</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => {
                const isExpanded = expandedId === request.id
                const isBusy = actionId === request.id

                return (
                  <Fragment key={request.id}>
                    <tr>
                      <td>{request.companyName}</td>
                      <td>
                        {request.contactPerson}
                        <br />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          {request.email}
                        </span>
                      </td>
                      <td>{staffTypeLabel(request.staffType)}</td>
                      <td>{request.eventDates || `${request.eventDateStart} – ${request.eventDateEnd}`}</td>
                      <td>{request.numberOfWorkers ?? '—'}</td>
                      <td>{staffRequestStatusLabel(request.status)}</td>
                      <td>
                        <div className="admin-users-actions">
                          <button
                            type="button"
                            className="hnb-btn hnb-btn--outline"
                            onClick={() => setExpandedId(isExpanded ? null : request.id)}
                          >
                            {isExpanded ? 'Sluiten' : 'Details'}
                          </button>
                          {request.status === STAFF_REQUEST_STATUS.NEW ? (
                            <button
                              type="button"
                              className="hnb-btn hnb-btn--freelancer"
                              disabled={isBusy}
                              onClick={() =>
                                runAction(request.id, () =>
                                  updateStaffRequestStatus(
                                    request.id,
                                    STAFF_REQUEST_STATUS.IN_PROGRESS,
                                    notesDraft[request.id],
                                  ),
                                )
                              }
                            >
                              Oppakken
                            </button>
                          ) : null}
                          {request.status !== STAFF_REQUEST_STATUS.CLOSED ? (
                            <button
                              type="button"
                              className="hnb-btn hnb-btn--outline"
                              disabled={isBusy}
                              onClick={() =>
                                runAction(request.id, () =>
                                  updateStaffRequestStatus(
                                    request.id,
                                    STAFF_REQUEST_STATUS.CLOSED,
                                    notesDraft[request.id],
                                  ),
                                )
                              }
                            >
                              Afgerond
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                    {isExpanded ? (
                      <tr className="admin-onboarding-detail-row">
                        <td colSpan={7}>
                          <div className="admin-onboarding-detail">
                            <div className="admin-onboarding-detail__grid">
                              <p>
                                <strong>Telefoon:</strong> {request.phone || '—'}
                              </p>
                              <p>
                                <strong>Eventtype:</strong> {eventTypeLabel(request.eventType)}
                              </p>
                              <p>
                                <strong>Locatie:</strong> {request.location || '—'}
                              </p>
                              <p>
                                <strong>Ingediend:</strong> {formatTimestamp(request.createdAt)}
                              </p>
                            </div>
                            {request.additionalNotes ? (
                              <p className="admin-onboarding-detail__notes">
                                <strong>Aanvullende details:</strong> {request.additionalNotes}
                              </p>
                            ) : null}
                            <label className="admin-onboarding-detail__label" htmlFor={`notes-${request.id}`}>
                              Interne notities
                            </label>
                            <textarea
                              id={`notes-${request.id}`}
                              className="admin-onboarding-detail__textarea"
                              rows={3}
                              value={notesDraft[request.id] ?? ''}
                              onChange={(event) =>
                                setNotesDraft((prev) => ({
                                  ...prev,
                                  [request.id]: event.target.value,
                                }))
                              }
                            />
                            <button
                              type="button"
                              className="hnb-btn hnb-btn--outline"
                              disabled={isBusy}
                              onClick={() =>
                                runAction(request.id, () =>
                                  saveStaffRequestNotes(request.id, notesDraft[request.id] ?? ''),
                                )
                              }
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
