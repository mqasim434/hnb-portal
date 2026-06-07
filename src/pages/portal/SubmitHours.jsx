import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { computeTotalHours, canFreelancerEditTimeEntry } from '../../constants/timeEntries'
import { usePageSeo } from '../../hooks/usePageSeo'
import { fetchAssignmentsForFreelancer } from '../../lib/assignments/assignments'
import {
  createTimeEntry,
  fetchTimeEntryById,
  submitTimeEntry,
  updateTimeEntry,
} from '../../lib/timeEntries/entries'
import '../auth/Auth.css'

const EMPTY_FORM = {
  assignmentId: '',
  workDate: '',
  startTime: '',
  endTime: '',
  breakMinutes: '0',
  notes: '',
}

export default function SubmitHours() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const presetAssignmentId = searchParams.get('assignmentId')

  const { user } = useSelector((state) => state.auth)
  const [assignments, setAssignments] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  usePageSeo({
    title: editId ? 'Uren bewerken' : 'Uren registreren',
    description: 'Registreer gewerkte uren voor een opdracht.',
    canonicalPath: '/portal/hours/new',
    noIndex: true,
  })

  useEffect(() => {
    if (!user?.uid) return
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const assignmentRows = await fetchAssignmentsForFreelancer(user.uid)
        if (cancelled) return
        setAssignments(assignmentRows)

        if (editId) {
          const entry = await fetchTimeEntryById(editId)
          if (!entry || entry.freelancerId !== user.uid) {
            throw new Error('Urenregistratie niet gevonden.')
          }
          if (!canFreelancerEditTimeEntry(entry.status)) {
            throw new Error('Deze registratie kan niet meer worden bewerkt.')
          }
          setForm({
            assignmentId: entry.assignmentId,
            workDate: entry.workDate,
            startTime: entry.startTime,
            endTime: entry.endTime,
            breakMinutes: String(entry.breakMinutes ?? 0),
            notes: entry.notes ?? '',
          })
        } else if (presetAssignmentId) {
          setForm((prev) => ({ ...prev, assignmentId: presetAssignmentId }))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Laden mislukt.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [user?.uid, editId, presetAssignmentId])

  const previewHours = computeTotalHours(
    form.startTime,
    form.endTime,
    Number(form.breakMinutes),
  )

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function persist(submitAfterSave) {
    if (!user?.uid) return
    if (!form.assignmentId) {
      setError('Selecteer een opdracht.')
      return
    }

    const assignment = assignments.find((row) => row.id === form.assignmentId)
    const payload = {
      ...form,
      assignmentTitle: assignment?.title ?? '',
      breakMinutes: Number(form.breakMinutes) || 0,
    }

    setSaving(true)
    setError(null)
    try {
      let entryId = editId
      if (editId) {
        await updateTimeEntry(editId, payload)
      } else {
        const created = await createTimeEntry(payload, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
        entryId = created.id
      }

      if (submitAfterSave && entryId) {
        await submitTimeEntry(entryId)
      }

      navigate('/portal/hours')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opslaan mislukt.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <p style={{ marginBottom: 'var(--space-4)' }}>
        <Link to="/portal/hours">← Terug naar urenoverzicht</Link>
      </p>

      <h1 className="hnb-type-section">{editId ? 'Uren bewerken' : 'Uren registreren'}</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '42rem' }}>
        Koppel uren aan een toegewezen opdracht. Sla op als concept of dien direct in ter goedkeuring.
      </p>

      {loading ? (
        <p style={{ marginTop: 'var(--space-5)' }}>Laden…</p>
      ) : assignments.length === 0 ? (
        <div className="auth-alert auth-alert--info" role="status" style={{ marginTop: 'var(--space-5)' }}>
          U heeft nog geen toegewezen opdrachten.{' '}
          <Link to="/portal/jobs">Bekijk opdrachten</Link>.
        </div>
      ) : (
        <section className="compliance-card" style={{ marginTop: 'var(--space-5)', maxWidth: '36rem' }}>
          <form
            className="compliance-card__form"
            onSubmit={(event) => {
              event.preventDefault()
              persist(true)
            }}
          >
            <div className="auth-field">
              <label htmlFor="hours-assignment">Opdracht</label>
              <select
                id="hours-assignment"
                required
                value={form.assignmentId}
                onChange={(e) => updateField('assignmentId', e.target.value)}
                disabled={saving}
              >
                <option value="">Selecteer opdracht…</option>
                {assignments.map((assignment) => (
                  <option key={assignment.id} value={assignment.id}>
                    {assignment.title}
                    {assignment.dateStart ? ` (${assignment.dateStart})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="auth-field">
              <label htmlFor="hours-date">Werkdatum</label>
              <input
                id="hours-date"
                type="date"
                required
                value={form.workDate}
                onChange={(e) => updateField('workDate', e.target.value)}
                disabled={saving}
              />
            </div>

            <div className="admin-onboarding-detail__grid">
              <div className="auth-field">
                <label htmlFor="hours-start">Starttijd</label>
                <input
                  id="hours-start"
                  type="time"
                  required
                  value={form.startTime}
                  onChange={(e) => updateField('startTime', e.target.value)}
                  disabled={saving}
                />
              </div>
              <div className="auth-field">
                <label htmlFor="hours-end">Eindtijd</label>
                <input
                  id="hours-end"
                  type="time"
                  required
                  value={form.endTime}
                  onChange={(e) => updateField('endTime', e.target.value)}
                  disabled={saving}
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="hours-break">Pauze (minuten)</label>
              <input
                id="hours-break"
                type="number"
                min={0}
                step={1}
                value={form.breakMinutes}
                onChange={(e) => updateField('breakMinutes', e.target.value)}
                disabled={saving}
              />
            </div>

            {previewHours != null ? (
              <p className="compliance-summary">
                Totaal: <strong>{previewHours.toFixed(2)}</strong> uur
              </p>
            ) : form.startTime && form.endTime ? (
              <p className="auth-alert auth-alert--error" role="alert">
                Controleer starttijd, eindtijd en pauze.
              </p>
            ) : null}

            <div className="auth-field">
              <label htmlFor="hours-notes">Opmerkingen (optioneel)</label>
              <textarea
                id="hours-notes"
                rows={3}
                value={form.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                disabled={saving}
              />
            </div>

            {error ? (
              <div className="auth-alert auth-alert--error" role="alert">
                {error}
              </div>
            ) : null}

            <div className="admin-users-actions">
              <button type="submit" className="hnb-btn hnb-btn--freelancer" disabled={saving}>
                {saving ? 'Bezig…' : 'Indienen ter goedkeuring'}
              </button>
              <button
                type="button"
                className="hnb-btn hnb-btn--outline"
                disabled={saving}
                onClick={() => persist(false)}
              >
                Opslaan als concept
              </button>
            </div>
          </form>
        </section>
      )}
    </main>
  )
}
