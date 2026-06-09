import { useCallback, useEffect, useState, Fragment } from 'react'
import {
  assignmentStatusLabel,
  assignmentTypeLabel,
} from '../../constants/assignments'
import { ASSIGNMENT_STATUS_OPTIONS } from '../../constants/assignments'
import { usePageSeo } from '../../hooks/usePageSeo'
import { fetchAssignmentsForAdmin } from '../../lib/assignments/assignments'
import '../auth/Auth.css'

const FILTER_OPTIONS = [{ value: 'all', label: 'Alles' }, ...ASSIGNMENT_STATUS_OPTIONS]

/** @param {import('firebase/firestore').Timestamp | null | undefined} value */
function formatTimestamp(value) {
  if (!value || typeof value.toDate !== 'function') return '—'
  return value.toDate().toLocaleString('nl-NL', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function AdminAssignments() {
  usePageSeo({
    title: 'Beheer — opdrachten',
    description: 'Overzicht van opdrachten geplaatst door bedrijven.',
    canonicalPath: '/admin/assignments',
    noIndex: true,
  })

  const [filter, setFilter] = useState('all')
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setAssignments(await fetchAssignmentsForAdmin(filter))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opdrachten laden mislukt.')
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Opdrachten — overzicht</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '48rem' }}>
        Bedrijven plaatsen opdrachten via het bedrijfsportaal. H&amp;B ziet hier alle opdrachten.
        Freelancers solliciteren via de feed; bedrijven selecteren kandidaten (Module 4).
      </p>

      <div className="admin-onboarding-toolbar" style={{ marginTop: 'var(--space-6)' }}>
        <label className="admin-onboarding-filter" htmlFor="assignment-filter">
          Status
        </label>
        <select
          id="assignment-filter"
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
      ) : assignments.length === 0 ? (
        <p style={{ marginTop: 'var(--space-5)' }}>Geen opdrachten voor dit filter.</p>
      ) : (
        <div style={{ marginTop: 'var(--space-5)', overflowX: 'auto' }}>
          <table className="admin-users-table admin-onboarding-table">
            <thead>
              <tr>
                <th>Opdracht</th>
                <th>Bedrijf</th>
                <th>Type</th>
                <th>Locatie</th>
                <th>Periode</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => {
                const isExpanded = expandedId === assignment.id

                return (
                  <Fragment key={assignment.id}>
                    <tr>
                      <td>
                        <strong>{assignment.title}</strong>
                        {assignment.roleLabel ? (
                          <>
                            <br />
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                              {assignment.roleLabel}
                            </span>
                          </>
                        ) : null}
                      </td>
                      <td>{assignment.companyName || assignment.clientCompany || '—'}</td>
                      <td>{assignmentTypeLabel(assignment.assignmentType)}</td>
                      <td>{assignment.location || '—'}</td>
                      <td>
                        {assignment.dateStart}
                        {assignment.dateEnd && assignment.dateEnd !== assignment.dateStart
                          ? ` – ${assignment.dateEnd}`
                          : ''}
                      </td>
                      <td>{assignmentStatusLabel(assignment.status)}</td>
                      <td>
                        <button
                          type="button"
                          className="hnb-btn hnb-btn--outline"
                          onClick={() => setExpandedId(isExpanded ? null : assignment.id)}
                        >
                          {isExpanded ? 'Sluiten' : 'Bekijken'}
                        </button>
                      </td>
                    </tr>
                    {isExpanded ? (
                      <tr className="admin-onboarding-detail-row">
                        <td colSpan={7}>
                          <div className="admin-onboarding-detail">
                            <div className="admin-onboarding-detail__grid">
                              <p>
                                <span className="admin-onboarding-detail__label">Omschrijving</span>
                                <br />
                                {assignment.description || '—'}
                              </p>
                              <p>
                                <span className="admin-onboarding-detail__label">Dienst</span>
                                <br />
                                {assignment.shiftStart && assignment.shiftEnd
                                  ? `${assignment.shiftStart} – ${assignment.shiftEnd}`
                                  : '—'}
                              </p>
                              <p>
                                <span className="admin-onboarding-detail__label">Tarief</span>
                                <br />
                                {assignment.rateNote || '—'}
                              </p>
                              <p>
                                <span className="admin-onboarding-detail__label">Toegewezen</span>
                                <br />
                                {assignment.assignedFreelancers?.length ?? 0} freelancer(s)
                              </p>
                            </div>
                            <p style={{ marginTop: 'var(--space-3)', color: 'var(--text-muted)' }}>
                              Aangemaakt: {formatTimestamp(assignment.createdAt)}
                            </p>
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
