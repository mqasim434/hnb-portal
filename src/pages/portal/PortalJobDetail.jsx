import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  assignmentStatusLabel,
  assignmentTypeLabel,
} from '../../constants/assignments'
import { usePageSeo } from '../../hooks/usePageSeo'
import { fetchAssignmentById } from '../../lib/assignments/assignments'
import '../auth/Auth.css'

export default function PortalJobDetail() {
  const { assignmentId } = useParams()
  const { user } = useSelector((state) => state.auth)
  const [assignment, setAssignment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  usePageSeo({
    title: assignment ? `${assignment.title} — opdracht` : 'Opdracht',
    description: 'Details van uw toegewezen opdracht.',
    canonicalPath: `/portal/jobs/${assignmentId}`,
    noIndex: true,
  })

  useEffect(() => {
    if (!assignmentId) return
    setLoading(true)
    fetchAssignmentById(assignmentId)
      .then(setAssignment)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Opdracht laden mislukt.'),
      )
      .finally(() => setLoading(false))
  }, [assignmentId])

  if (!loading && assignment && user?.uid) {
    const isAssigned = assignment.assignedFreelancerIds?.includes(user.uid)
    if (!isAssigned) {
      return <Navigate to="/portal/jobs" replace />
    }
  }

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <p style={{ marginBottom: 'var(--space-4)' }}>
        <Link to="/portal/jobs">← Terug naar opdrachten</Link>
      </p>

      {loading ? (
        <p>Laden…</p>
      ) : error ? (
        <div className="auth-alert auth-alert--error" role="alert">
          {error}
        </div>
      ) : !assignment ? (
        <p>Opdracht niet gevonden.</p>
      ) : (
        <article className="compliance-card" style={{ maxWidth: '42rem' }}>
          <div className="compliance-card__header">
            <h1 className="hnb-type-section" style={{ margin: 0 }}>
              {assignment.title}
            </h1>
            <span className="compliance-badge compliance-badge--pending">
              {assignmentStatusLabel(assignment.status)}
            </span>
          </div>

          <dl className="assignment-detail-list">
            {assignment.roleLabel ? (
              <>
                <dt>Rol</dt>
                <dd>{assignment.roleLabel}</dd>
              </>
            ) : null}
            <dt>Type</dt>
            <dd>{assignmentTypeLabel(assignment.assignmentType)}</dd>
            <dt>Locatie</dt>
            <dd>{assignment.location}</dd>
            <dt>Periode</dt>
            <dd>
              {assignment.dateStart}
              {assignment.dateEnd && assignment.dateEnd !== assignment.dateStart
                ? ` – ${assignment.dateEnd}`
                : ''}
            </dd>
            {assignment.shiftStart && assignment.shiftEnd ? (
              <>
                <dt>Diensttijden</dt>
                <dd>
                  {assignment.shiftStart} – {assignment.shiftEnd}
                </dd>
              </>
            ) : null}
            {assignment.clientCompany ? (
              <>
                <dt>Opdrachtgever</dt>
                <dd>{assignment.clientCompany}</dd>
              </>
            ) : null}
            {assignment.rateNote ? (
              <>
                <dt>Tarief / toeslagen</dt>
                <dd>{assignment.rateNote}</dd>
              </>
            ) : null}
          </dl>

          {assignment.description ? (
            <div style={{ marginTop: 'var(--space-5)' }}>
              <h2 className="hnb-type-subhead">Omschrijving</h2>
              <p className="compliance-card__hint">{assignment.description}</p>
            </div>
          ) : null}

          <Link
            to={`/portal/hours/new?assignmentId=${assignment.id}`}
            className="hnb-btn hnb-btn--freelancer"
            style={{ marginTop: 'var(--space-5)' }}
          >
            Uren registreren
          </Link>
        </article>
      )}
    </main>
  )
}
