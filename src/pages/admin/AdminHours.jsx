import { useCallback, useEffect, useState, Fragment } from 'react'
import { TIME_ENTRY_STATUS, timeEntryStatusLabel } from '../../constants/timeEntries'
import { usePageSeo } from '../../hooks/usePageSeo'
import {
  approveTimeEntry,
  fetchTimeEntriesForAdmin,
  rejectTimeEntry,
} from '../../lib/timeEntries/entries'
import '../auth/Auth.css'

/** @param {import('firebase/firestore').Timestamp | null | undefined} value */
function formatTimestamp(value) {
  if (!value || typeof value.toDate !== 'function') return '—'
  return value.toDate().toLocaleString('nl-NL', { dateStyle: 'medium', timeStyle: 'short' })
}

const FILTER_OPTIONS = [
  { value: TIME_ENTRY_STATUS.SUBMITTED, label: 'Ingediend' },
  { value: TIME_ENTRY_STATUS.APPROVED, label: 'Goedgekeurd' },
  { value: TIME_ENTRY_STATUS.REJECTED, label: 'Afgewezen' },
  { value: TIME_ENTRY_STATUS.DRAFT, label: 'Concept' },
  { value: 'all', label: 'Alles' },
]

export default function AdminHours() {
  usePageSeo({
    title: 'Beheer — uren',
    description: 'Ingediende uren goedkeuren of afwijzen.',
    canonicalPath: '/admin/hours',
    noIndex: true,
  })

  const [filter, setFilter] = useState(TIME_ENTRY_STATUS.SUBMITTED)
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionId, setActionId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [notesDraft, setNotesDraft] = useState({})

  const loadEntries = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const rows = await fetchTimeEntriesForAdmin(filter)
      setEntries(rows)
      setNotesDraft((prev) => {
        const next = { ...prev }
        for (const row of rows) {
          if (next[row.id] === undefined) next[row.id] = row.adminNotes ?? ''
        }
        return next
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Uren laden mislukt.')
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    loadEntries()
  }, [loadEntries])

  async function runAction(id, action) {
    setActionId(id)
    setError(null)
    try {
      await action()
      await loadEntries()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Actie mislukt.')
    } finally {
      setActionId(null)
    }
  }

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Uren — goedkeuring</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '48rem' }}>
        Beoordeel ingediende uren van freelancers. Goedgekeurde uren kunnen later worden gebruikt voor
        facturatie (Module 8).
      </p>

      <div className="admin-onboarding-toolbar" style={{ marginTop: 'var(--space-5)' }}>
        <label className="admin-onboarding-filter" htmlFor="hours-filter">
          Status
        </label>
        <select
          id="hours-filter"
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
      ) : entries.length === 0 ? (
        <p style={{ marginTop: 'var(--space-5)' }}>Geen uren voor dit filter.</p>
      ) : (
        <div style={{ marginTop: 'var(--space-5)', overflowX: 'auto' }}>
          <table className="admin-users-table admin-onboarding-table">
            <thead>
              <tr>
                <th>Freelancer</th>
                <th>Opdracht</th>
                <th>Datum</th>
                <th>Uren</th>
                <th>Status</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                const isExpanded = expandedId === entry.id
                const isBusy = actionId === entry.id

                return (
                  <Fragment key={entry.id}>
                    <tr>
                      <td>
                        {entry.freelancerName || '—'}
                        <br />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          {entry.freelancerEmail}
                        </span>
                      </td>
                      <td>{entry.assignmentTitle || '—'}</td>
                      <td>{entry.workDate}</td>
                      <td>{entry.totalHours.toFixed(2)}</td>
                      <td>{timeEntryStatusLabel(entry.status)}</td>
                      <td>
                        <div className="admin-users-actions">
                          <button
                            type="button"
                            className="hnb-btn hnb-btn--outline"
                            onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                          >
                            {isExpanded ? 'Sluiten' : 'Details'}
                          </button>
                          {entry.status === TIME_ENTRY_STATUS.SUBMITTED ? (
                            <>
                              <button
                                type="button"
                                className="hnb-btn hnb-btn--freelancer"
                                disabled={isBusy}
                                onClick={() =>
                                  runAction(entry.id, () =>
                                    approveTimeEntry(entry.id, notesDraft[entry.id]),
                                  )
                                }
                              >
                                Goedkeuren
                              </button>
                              <button
                                type="button"
                                className="hnb-btn hnb-btn--outline"
                                disabled={isBusy}
                                onClick={() =>
                                  runAction(entry.id, () =>
                                    rejectTimeEntry(entry.id, notesDraft[entry.id]),
                                  )
                                }
                              >
                                Afwijzen
                              </button>
                            </>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                    {isExpanded ? (
                      <tr className="admin-onboarding-detail-row">
                        <td colSpan={6}>
                          <div className="admin-onboarding-detail">
                            <div className="admin-onboarding-detail__grid">
                              <p>
                                <strong>Tijd:</strong> {entry.startTime}–{entry.endTime}
                              </p>
                              <p>
                                <strong>Pauze:</strong> {entry.breakMinutes} min
                              </p>
                              <p>
                                <strong>Ingediend:</strong> {formatTimestamp(entry.submittedAt)}
                              </p>
                            </div>
                            {entry.notes ? (
                              <p className="admin-onboarding-detail__notes">
                                <strong>Opmerking freelancer:</strong> {entry.notes}
                              </p>
                            ) : null}
                            <label className="admin-onboarding-detail__label" htmlFor={`notes-${entry.id}`}>
                              Interne notities / feedback
                            </label>
                            <textarea
                              id={`notes-${entry.id}`}
                              className="admin-onboarding-detail__textarea"
                              rows={3}
                              value={notesDraft[entry.id] ?? ''}
                              onChange={(event) =>
                                setNotesDraft((prev) => ({
                                  ...prev,
                                  [entry.id]: event.target.value,
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
