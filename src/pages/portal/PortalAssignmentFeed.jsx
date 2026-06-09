import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { applicationStatusLabel, APPLICATION_STATUS } from '../../constants/assignmentApplications'
import { assignmentTypeLabel } from '../../constants/assignments'
import { usePageSeo } from '../../hooks/usePageSeo'
import {
  applyToAssignment,
  fetchFreelancerApplicationsByAssignment,
} from '../../lib/assignments/applications'
import { fetchOpenAssignmentsForFeed } from '../../lib/assignments/assignments'
import '../auth/Auth.css'

export default function PortalAssignmentFeed() {
  usePageSeo({
    title: 'Freelancer — open opdrachten',
    description: 'Bekijk open opdrachten van opdrachtgevers en solliciteer direct.',
    canonicalPath: '/portal/feed',
    noIndex: true,
  })

  const { user } = useSelector((state) => state.auth)
  const [assignments, setAssignments] = useState([])
  const [applications, setApplications] = useState(new Map())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [applyingId, setApplyingId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [applyMessages, setApplyMessages] = useState({})

  const loadFeed = useCallback(async () => {
    if (!user?.uid) return
    setLoading(true)
    setError(null)
    try {
      const [rows, applicationMap] = await Promise.all([
        fetchOpenAssignmentsForFeed(),
        fetchFreelancerApplicationsByAssignment(user.uid),
      ])
      setAssignments(rows)
      setApplications(applicationMap)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Feed laden mislukt.')
    } finally {
      setLoading(false)
    }
  }, [user?.uid])

  useEffect(() => {
    loadFeed()
  }, [loadFeed])

  async function handleApply(assignment) {
    if (!user?.uid) return
    setApplyingId(assignment.id)
    setError(null)
    try {
      await applyToAssignment(
        assignment,
        {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        },
        applyMessages[assignment.id] ?? '',
      )
      await loadFeed()
      setExpandedId(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Solliciteren mislukt.')
    } finally {
      setApplyingId(null)
    }
  }

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Open opdrachten</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '42rem' }}>
        Opdrachten geplaatst door opdrachtgevers. Solliciteer op opdrachten die bij je passen. Na
        selectie verschijnen toegewezen opdrachten onder{' '}
        <Link to="/portal/jobs">Mijn opdrachten</Link>.
      </p>

      {error ? (
        <div className="auth-alert auth-alert--error" role="alert" style={{ marginTop: 'var(--space-4)' }}>
          {error}
        </div>
      ) : null}

      {loading ? (
        <p style={{ marginTop: 'var(--space-5)' }}>Laden…</p>
      ) : assignments.length === 0 ? (
        <p style={{ marginTop: 'var(--space-5)' }}>
          Er zijn momenteel geen open opdrachten. Kom later terug of bekijk je{' '}
          <Link to="/portal/jobs">toegewezen opdrachten</Link>.
        </p>
      ) : (
        <div className="compliance-grid" style={{ marginTop: 'var(--space-5)' }}>
          {assignments.map((assignment) => {
            const application = applications.get(assignment.id)
            const hasApplied = Boolean(application)
            const isExpanded = expandedId === assignment.id
            const isApplying = applyingId === assignment.id

            return (
              <article key={assignment.id} className="compliance-card">
                <div className="compliance-card__header">
                  <h2 className="compliance-card__title">{assignment.title}</h2>
                  {hasApplied ? (
                    <span className="compliance-badge compliance-badge--approved">
                      {applicationStatusLabel(application.status)}
                    </span>
                  ) : (
                    <span className="compliance-badge compliance-badge--pending">Open</span>
                  )}
                </div>

                {assignment.companyName ? (
                  <p className="compliance-card__hint">
                    <strong>{assignment.companyName}</strong>
                  </p>
                ) : null}

                {assignment.roleLabel ? (
                  <p className="compliance-card__hint">{assignment.roleLabel}</p>
                ) : null}

                <p className="compliance-card__hint">
                  {assignmentTypeLabel(assignment.assignmentType)} · {assignment.location}
                </p>
                <p className="compliance-card__hint">
                  {assignment.dateStart}
                  {assignment.dateEnd && assignment.dateEnd !== assignment.dateStart
                    ? ` – ${assignment.dateEnd}`
                    : ''}
                  {assignment.shiftStart && assignment.shiftEnd
                    ? ` · ${assignment.shiftStart}–${assignment.shiftEnd}`
                    : ''}
                </p>

                {assignment.rateNote ? (
                  <p className="compliance-card__hint">Tarief: {assignment.rateNote}</p>
                ) : null}

                {isExpanded && assignment.description ? (
                  <p style={{ marginTop: 'var(--space-3)', lineHeight: 1.55 }}>{assignment.description}</p>
                ) : null}

                {isExpanded && !hasApplied ? (
                  <div className="auth-field" style={{ marginTop: 'var(--space-3)' }}>
                    <label htmlFor={`apply-message-${assignment.id}`}>
                      Korte motivatie (optioneel)
                    </label>
                    <textarea
                      id={`apply-message-${assignment.id}`}
                      rows={2}
                      value={applyMessages[assignment.id] ?? ''}
                      onChange={(event) =>
                        setApplyMessages((prev) => ({
                          ...prev,
                          [assignment.id]: event.target.value,
                        }))
                      }
                      disabled={isApplying}
                    />
                  </div>
                ) : null}

                <div
                  style={{
                    marginTop: 'var(--space-4)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-3)',
                  }}
                >
                  <button
                    type="button"
                    className="hnb-btn hnb-btn--outline"
                    onClick={() => setExpandedId(isExpanded ? null : assignment.id)}
                  >
                    {isExpanded ? 'Minder info' : 'Meer info'}
                  </button>

                  {hasApplied ? (
                    application.status === APPLICATION_STATUS.ACCEPTED ? (
                      <Link to="/portal/jobs" className="hnb-btn hnb-btn--freelancer">
                        Naar mijn opdrachten
                      </Link>
                    ) : (
                      <span className="compliance-card__hint" style={{ alignSelf: 'center' }}>
                        Sollicitatie verstuurd — wacht op selectie door opdrachtgever.
                      </span>
                    )
                  ) : (
                    <button
                      type="button"
                      className="hnb-btn hnb-btn--freelancer"
                      disabled={isApplying}
                      onClick={() => handleApply(assignment)}
                    >
                      {isApplying ? 'Bezig…' : 'Solliciteren'}
                    </button>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </main>
  )
}
