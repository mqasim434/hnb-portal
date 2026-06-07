import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  assignmentStatusLabel,
  assignmentTypeLabel,
} from '../../constants/assignments'
import { usePageSeo } from '../../hooks/usePageSeo'
import { fetchAssignmentsForFreelancer } from '../../lib/assignments/assignments'
import '../auth/Auth.css'

export default function PortalJobs() {
  usePageSeo({
    title: 'Freelancer — opdrachten',
    description: 'Jouw toegewezen opdrachten bij H&B Service Group.',
    canonicalPath: '/portal/jobs',
    noIndex: true,
  })

  const { user } = useSelector((state) => state.auth)
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.uid) return
    setLoading(true)
    fetchAssignmentsForFreelancer(user.uid)
      .then(setAssignments)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Opdrachten laden mislukt.'),
      )
      .finally(() => setLoading(false))
  }, [user?.uid])

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Mijn opdrachten</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '42rem' }}>
        Opdrachten die H&amp;B aan jou heeft toegewezen. Registreer uren via de opdrachtdetailpagina
        of via <Link to="/portal/hours">Urenregistratie</Link>.
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
          Er zijn nog geen opdrachten aan je toegewezen. Zodra H&amp;B je inplant, verschijnen ze hier.
        </p>
      ) : (
        <div className="compliance-grid" style={{ marginTop: 'var(--space-5)' }}>
          {assignments.map((assignment) => (
            <article key={assignment.id} className="compliance-card">
              <div className="compliance-card__header">
                <h2 className="compliance-card__title">{assignment.title}</h2>
                <span className={`compliance-badge compliance-badge--pending`}>
                  {assignmentStatusLabel(assignment.status)}
                </span>
              </div>
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
              <Link
                to={`/portal/jobs/${assignment.id}`}
                className="hnb-btn hnb-btn--freelancer"
                style={{ marginTop: 'var(--space-3)' }}
              >
                Details bekijken
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
