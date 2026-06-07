import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { timeEntryStatusLabel, canFreelancerEditTimeEntry } from '../../constants/timeEntries'
import { usePageSeo } from '../../hooks/usePageSeo'
import { fetchTimeEntriesForFreelancer } from '../../lib/timeEntries/entries'
import '../auth/Auth.css'

/** @param {import('firebase/firestore').Timestamp | null | undefined} value */
function formatTimestamp(value) {
  if (!value || typeof value.toDate !== 'function') return '—'
  return value.toDate().toLocaleString('nl-NL', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function PortalHours() {
  usePageSeo({
    title: 'Freelancer — uren',
    description: 'Overzicht van ingediende uren.',
    canonicalPath: '/portal/hours',
    noIndex: true,
  })

  const { user } = useSelector((state) => state.auth)
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.uid) return
    setLoading(true)
    fetchTimeEntriesForFreelancer(user.uid)
      .then(setEntries)
      .catch((err) => setError(err instanceof Error ? err.message : 'Uren laden mislukt.'))
      .finally(() => setLoading(false))
  }, [user?.uid])

  const totals = useMemo(() => {
    let submitted = 0
    let approved = 0
    for (const entry of entries) {
      if (entry.status === 'submitted') submitted += entry.totalHours
      if (entry.status === 'approved') approved += entry.totalHours
    }
    return { submitted, approved }
  }, [entries])

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h1 className="hnb-type-section">Urenregistratie</h1>
          <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '42rem' }}>
            Dien gewerkte uren per opdracht in. Concepten kunt u later bewerken; ingediende uren wachten op
            goedkeuring door H&amp;B.
          </p>
        </div>
        <Link to="/portal/hours/new" className="hnb-btn hnb-btn--freelancer">
          Uren registreren
        </Link>
      </div>

      <p className="compliance-summary" style={{ marginTop: 'var(--space-4)' }}>
        Goedgekeurd: <strong>{totals.approved.toFixed(2)}</strong> uur · In behandeling:{' '}
        <strong>{totals.submitted.toFixed(2)}</strong> uur
      </p>

      {error ? (
        <div className="auth-alert auth-alert--error" role="alert" style={{ marginTop: 'var(--space-4)' }}>
          {error}
        </div>
      ) : null}

      {loading ? (
        <p style={{ marginTop: 'var(--space-5)' }}>Laden…</p>
      ) : entries.length === 0 ? (
        <p style={{ marginTop: 'var(--space-5)' }}>
          Nog geen uren geregistreerd.{' '}
          <Link to="/portal/hours/new">Registreer uw eerste dienst</Link>.
        </p>
      ) : (
        <div style={{ marginTop: 'var(--space-5)', overflowX: 'auto' }}>
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>Datum</th>
                <th>Opdracht</th>
                <th>Tijd</th>
                <th>Uren</th>
                <th>Status</th>
                <th>Actie</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.workDate}</td>
                  <td>{entry.assignmentTitle || '—'}</td>
                  <td>
                    {entry.startTime}–{entry.endTime}
                    {entry.breakMinutes ? ` (pauze ${entry.breakMinutes} min)` : ''}
                  </td>
                  <td>{entry.totalHours.toFixed(2)}</td>
                  <td>{timeEntryStatusLabel(entry.status)}</td>
                  <td>
                    {canFreelancerEditTimeEntry(entry.status) ? (
                      <Link to={`/portal/hours/new?edit=${entry.id}`} className="hnb-btn hnb-btn--outline">
                        Bewerken
                      </Link>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {formatTimestamp(entry.submittedAt)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
