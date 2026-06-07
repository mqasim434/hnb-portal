import { useCallback, useEffect, useState, Fragment } from 'react'
import {
  COMPLIANCE_STATUS,
  COMPLIANCE_TYPE_CONFIG,
  complianceDisplayStatus,
  complianceStatusLabel,
  isComplianceExpired,
} from '../../constants/compliance'
import { usePageSeo } from '../../hooks/usePageSeo'
import {
  approveComplianceRecord,
  fetchComplianceReviewQueue,
  markComplianceExpired,
  rejectComplianceRecord,
  saveComplianceAdminNotes,
} from '../../lib/compliance/records'
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
  { value: COMPLIANCE_STATUS.PENDING, label: 'In behandeling' },
  { value: COMPLIANCE_STATUS.APPROVED, label: 'Goedgekeurd' },
  { value: COMPLIANCE_STATUS.REJECTED, label: 'Afgewezen' },
  { value: COMPLIANCE_STATUS.EXPIRED, label: 'Verlopen' },
  { value: 'all', label: 'Alles' },
]

export default function AdminCompliance() {
  usePageSeo({
    title: 'Beheer — compliance',
    description: 'Compliance-documenten beoordelen.',
    canonicalPath: '/admin/compliance',
    noIndex: true,
  })

  const [filter, setFilter] = useState(COMPLIANCE_STATUS.PENDING)
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionKey, setActionKey] = useState(null)
  const [expandedKey, setExpandedKey] = useState(null)
  const [notesDraft, setNotesDraft] = useState({})

  const loadRecords = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const rows = await fetchComplianceReviewQueue(filter)
      setRecords(rows)
      setNotesDraft((prev) => {
        const next = { ...prev }
        for (const row of rows) {
          const key = `${row.userId}:${row.type}`
          if (next[key] === undefined) next[key] = row.adminNotes ?? ''
        }
        return next
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Compliance laden mislukt.')
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    loadRecords()
  }, [loadRecords])

  async function runAction(key, action) {
    setActionKey(key)
    setError(null)
    try {
      await action()
      await loadRecords()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Actie mislukt.')
    } finally {
      setActionKey(null)
    }
  }

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Compliance — documentcontrole</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '48rem' }}>
        Beoordeel ingediende VOG, diploma&apos;s, passen en certificaten. Documenten met een verloopdatum
        in het verleden worden gemarkeerd — u kunt ze handmatig als verlopen registreren.
      </p>

      <div className="admin-onboarding-toolbar" style={{ marginTop: 'var(--space-5)' }}>
        <label className="admin-onboarding-filter" htmlFor="compliance-filter">
          Status
        </label>
        <select
          id="compliance-filter"
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
      ) : records.length === 0 ? (
        <p style={{ marginTop: 'var(--space-5)' }}>Geen documenten voor dit filter.</p>
      ) : (
        <div style={{ marginTop: 'var(--space-5)', overflowX: 'auto' }}>
          <table className="admin-users-table admin-onboarding-table">
            <thead>
              <tr>
                <th>Freelancer</th>
                <th>Document</th>
                <th>Nummer</th>
                <th>Geldig tot</th>
                <th>Status</th>
                <th>Ingediend</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => {
                const rowKey = `${record.userId}:${record.type}`
                const isExpanded = expandedKey === rowKey
                const isBusy = actionKey === rowKey
                const displayStatus = complianceDisplayStatus(record)
                const typeLabel = COMPLIANCE_TYPE_CONFIG[record.type]?.label ?? record.type
                const expiryWarning = isComplianceExpired(record)

                return (
                  <Fragment key={rowKey}>
                    <tr>
                      <td>
                        {record.userDisplayName || '—'}
                        <br />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          {record.userEmail}
                        </span>
                      </td>
                      <td>{typeLabel}</td>
                      <td>{record.documentNumber || '—'}</td>
                      <td>
                        {record.expiryDate || '—'}
                        {expiryWarning ? (
                          <span className="admin-onboarding-badge">Verloopdatum verstreken</span>
                        ) : null}
                      </td>
                      <td>{complianceStatusLabel(displayStatus)}</td>
                      <td>{formatTimestamp(record.submittedAt)}</td>
                      <td>
                        <div className="admin-users-actions">
                          <button
                            type="button"
                            className="hnb-btn hnb-btn--outline"
                            onClick={() => setExpandedKey(isExpanded ? null : rowKey)}
                          >
                            {isExpanded ? 'Sluiten' : 'Details'}
                          </button>
                          {displayStatus === COMPLIANCE_STATUS.PENDING ? (
                            <>
                              <button
                                type="button"
                                className="hnb-btn hnb-btn--freelancer"
                                disabled={isBusy}
                                onClick={() =>
                                  runAction(rowKey, () =>
                                    approveComplianceRecord(
                                      record.userId,
                                      record.type,
                                      notesDraft[rowKey],
                                    ),
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
                                  runAction(rowKey, () =>
                                    rejectComplianceRecord(
                                      record.userId,
                                      record.type,
                                      notesDraft[rowKey],
                                    ),
                                  )
                                }
                              >
                                Afwijzen
                              </button>
                            </>
                          ) : null}
                          {expiryWarning && displayStatus === COMPLIANCE_STATUS.APPROVED ? (
                            <button
                              type="button"
                              className="hnb-btn hnb-btn--outline"
                              disabled={isBusy}
                              onClick={() =>
                                runAction(rowKey, () =>
                                  markComplianceExpired(
                                    record.userId,
                                    record.type,
                                    notesDraft[rowKey],
                                  ),
                                )
                              }
                            >
                              Markeer verlopen
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                    {isExpanded ? (
                      <tr className="admin-onboarding-detail-row">
                        <td colSpan={7}>
                          <div className="admin-onboarding-detail">
                            {record.fileUrl ? (
                              <p>
                                <strong>Bestand:</strong>{' '}
                                <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
                                  {record.fileName || 'Open document'}
                                </a>
                              </p>
                            ) : null}
                            <label className="admin-onboarding-detail__label" htmlFor={`notes-${rowKey}`}>
                              Interne notities
                            </label>
                            <textarea
                              id={`notes-${rowKey}`}
                              className="admin-onboarding-detail__textarea"
                              rows={3}
                              value={notesDraft[rowKey] ?? ''}
                              onChange={(event) =>
                                setNotesDraft((prev) => ({
                                  ...prev,
                                  [rowKey]: event.target.value,
                                }))
                              }
                            />
                            <button
                              type="button"
                              className="hnb-btn hnb-btn--outline"
                              disabled={isBusy}
                              onClick={() =>
                                runAction(rowKey, () =>
                                  saveComplianceAdminNotes(
                                    record.userId,
                                    record.type,
                                    notesDraft[rowKey] ?? '',
                                  ),
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
