import { useCallback, useEffect, useState, Fragment } from 'react'
import {
  ASSIGNMENT_STATUS,
  ASSIGNMENT_STATUS_OPTIONS,
  ASSIGNMENT_TYPE_OPTIONS,
  assignmentStatusLabel,
  assignmentTypeLabel,
} from '../../constants/assignments'
import TimeField from '../../components/TimeField'
import { usePageSeo } from '../../hooks/usePageSeo'
import { fetchActiveFreelancers } from '../../lib/admin/users'
import {
  assignFreelancersToAssignment,
  createAssignment,
  deleteAssignment,
  fetchAssignmentsForAdmin,
  updateAssignment,
} from '../../lib/assignments/assignments'
import '../auth/Auth.css'

const EMPTY_FORM = {
  title: '',
  roleLabel: '',
  description: '',
  assignmentType: 'hospitality',
  location: '',
  dateStart: '',
  dateEnd: '',
  shiftStart: '',
  shiftEnd: '',
  rateNote: '',
  clientCompany: '',
  adminNotes: '',
  status: ASSIGNMENT_STATUS.OPEN,
}

const FILTER_OPTIONS = [{ value: 'all', label: 'Alles' }, ...ASSIGNMENT_STATUS_OPTIONS]

/** @param {import('firebase/firestore').Timestamp | null | undefined} value */
function formatTimestamp(value) {
  if (!value || typeof value.toDate !== 'function') return '—'
  return value.toDate().toLocaleString('nl-NL', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function AdminAssignments() {
  usePageSeo({
    title: 'Beheer — opdrachten',
    description: 'Opdrachten aanmaken en freelancers toewijzen.',
    canonicalPath: '/admin/assignments',
    noIndex: true,
  })

  const [filter, setFilter] = useState('all')
  const [assignments, setAssignments] = useState([])
  const [freelancers, setFreelancers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionId, setActionId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [createForm, setCreateForm] = useState(EMPTY_FORM)
  const [editForms, setEditForms] = useState({})
  const [assignSelection, setAssignSelection] = useState({})

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [rows, fl] = await Promise.all([
        fetchAssignmentsForAdmin(filter),
        fetchActiveFreelancers(),
      ])
      setAssignments(rows)
      setFreelancers(fl)
      setEditForms((prev) => {
        const next = { ...prev }
        for (const row of rows) {
          if (!next[row.id]) {
            next[row.id] = {
              title: row.title,
              roleLabel: row.roleLabel,
              description: row.description,
              assignmentType: row.assignmentType,
              location: row.location,
              dateStart: row.dateStart,
              dateEnd: row.dateEnd,
              shiftStart: row.shiftStart,
              shiftEnd: row.shiftEnd,
              rateNote: row.rateNote,
              clientCompany: row.clientCompany,
              adminNotes: row.adminNotes,
              status: row.status,
            }
          }
        }
        return next
      })
      setAssignSelection((prev) => {
        const next = { ...prev }
        for (const row of rows) {
          if (!next[row.id]) next[row.id] = row.assignedFreelancerIds ?? []
        }
        return next
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opdrachten laden mislukt.')
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function runAction(id, action) {
    setActionId(id)
    setError(null)
    try {
      await action()
      await loadData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Actie mislukt.')
    } finally {
      setActionId(null)
    }
  }

  async function handleCreate(event) {
    event.preventDefault()
    setActionId('create')
    setError(null)
    try {
      await createAssignment(createForm)
      setCreateForm(EMPTY_FORM)
      await loadData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opdracht aanmaken mislukt.')
    } finally {
      setActionId(null)
    }
  }

  function updateEditForm(id, field, value) {
    setEditForms((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }))
  }

  function toggleAssign(id, freelancerId) {
    setAssignSelection((prev) => {
      const current = prev[id] ?? []
      const next = current.includes(freelancerId)
        ? current.filter((uid) => uid !== freelancerId)
        : [...current, freelancerId]
      return { ...prev, [id]: next }
    })
  }

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Opdrachten</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '48rem' }}>
        Maak opdrachten aan en wijs actieve freelancers toe. Toegewezen opdrachten verschijnen in het
        freelancerportaal onder <strong>Opdrachten</strong>.
      </p>

      <section
        className="compliance-card"
        style={{ marginTop: 'var(--space-6)', maxWidth: '48rem' }}
        aria-labelledby="create-assignment-title"
      >
        <h2 id="create-assignment-title" className="compliance-card__title">
          Nieuwe opdracht
        </h2>
        <form className="compliance-card__form" onSubmit={handleCreate} noValidate>
          <AssignmentFields
            values={createForm}
            onChange={(field, value) => setCreateForm((prev) => ({ ...prev, [field]: value }))}
          />
          <button
            type="submit"
            className="hnb-btn hnb-btn--freelancer"
            disabled={actionId === 'create'}
          >
            {actionId === 'create' ? 'Opslaan…' : 'Opdracht aanmaken'}
          </button>
        </form>
      </section>

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
                <th>Type</th>
                <th>Locatie</th>
                <th>Periode</th>
                <th>Freelancers</th>
                <th>Status</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => {
                const isExpanded = expandedId === assignment.id
                const isBusy = actionId === assignment.id
                const edit = editForms[assignment.id] ?? EMPTY_FORM

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
                      <td>{assignmentTypeLabel(assignment.assignmentType)}</td>
                      <td>{assignment.location || '—'}</td>
                      <td>
                        {assignment.dateStart}
                        {assignment.dateEnd && assignment.dateEnd !== assignment.dateStart
                          ? ` – ${assignment.dateEnd}`
                          : ''}
                      </td>
                      <td>{assignment.assignedFreelancers?.length ?? 0}</td>
                      <td>{assignmentStatusLabel(assignment.status)}</td>
                      <td>
                        <div className="admin-users-actions">
                          <button
                            type="button"
                            className="hnb-btn hnb-btn--outline"
                            onClick={() => setExpandedId(isExpanded ? null : assignment.id)}
                          >
                            {isExpanded ? 'Sluiten' : 'Beheren'}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded ? (
                      <tr className="admin-onboarding-detail-row">
                        <td colSpan={7}>
                          <div className="admin-onboarding-detail">
                            <form
                              className="compliance-card__form"
                              onSubmit={(event) => {
                                event.preventDefault()
                                runAction(assignment.id, () =>
                                  updateAssignment(assignment.id, edit),
                                )
                              }}
                            >
                              <h3 className="hnb-type-subhead">Opdracht bewerken</h3>
                              <AssignmentFields
                                values={edit}
                                idPrefix={`${assignment.id}-`}
                                onChange={(field, value) =>
                                  updateEditForm(assignment.id, field, value)
                                }
                              />
                              <div className="admin-users-actions">
                                <button
                                  type="submit"
                                  className="hnb-btn hnb-btn--freelancer"
                                  disabled={isBusy}
                                >
                                  Wijzigingen opslaan
                                </button>
                                <button
                                  type="button"
                                  className="hnb-btn hnb-btn--outline"
                                  disabled={isBusy}
                                  onClick={() =>
                                    runAction(assignment.id, () =>
                                      deleteAssignment(assignment.id),
                                    )
                                  }
                                >
                                  Verwijderen
                                </button>
                              </div>
                            </form>

                            <div style={{ marginTop: 'var(--space-5)' }}>
                              <h3 className="hnb-type-subhead">Freelancers toewijzen</h3>
                              {freelancers.length === 0 ? (
                                <p>Geen actieve freelancers gevonden.</p>
                              ) : (
                                <div className="compliance-grid" style={{ marginTop: 'var(--space-3)' }}>
                                  {freelancers.map((fl) => (
                                    <label key={fl.id} className="admin-check-row">
                                      <input
                                        type="checkbox"
                                        checked={(assignSelection[assignment.id] ?? []).includes(fl.id)}
                                        onChange={() => toggleAssign(assignment.id, fl.id)}
                                      />
                                      <span>
                                        {fl.displayName || fl.email}{' '}
                                        <span style={{ color: 'var(--text-muted)' }}>({fl.email})</span>
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              )}
                              <button
                                type="button"
                                className="hnb-btn hnb-btn--primary"
                                style={{ marginTop: 'var(--space-4)' }}
                                disabled={isBusy}
                                onClick={() =>
                                  runAction(assignment.id, () => {
                                    const selected = freelancers.filter((fl) =>
                                      (assignSelection[assignment.id] ?? []).includes(fl.id),
                                    )
                                    return assignFreelancersToAssignment(assignment.id, selected)
                                  })
                                }
                              >
                                Toewijzing opslaan
                              </button>
                            </div>

                            <p style={{ marginTop: 'var(--space-4)', color: 'var(--text-muted)' }}>
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

/**
 * @param {{ values: Record<string, string>, onChange: (field: string, value: string) => void, idPrefix?: string }} props
 */
function AssignmentFields({ values, onChange, idPrefix = '' }) {
  const id = (name) => `${idPrefix}${name}`
  return (
    <>
      <div className="auth-field">
        <label htmlFor={id('assignment-title')}>Titel opdracht</label>
        <input
          id={id('assignment-title')}
          type="text"
          required
          value={values.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>
      <div className="auth-field">
        <label htmlFor={id('assignment-role')}>Rol / functie</label>
        <input
          id={id('assignment-role')}
          type="text"
          placeholder="Bijv. Portier nachtclub"
          value={values.roleLabel}
          onChange={(e) => onChange('roleLabel', e.target.value)}
        />
      </div>
      <div className="auth-field">
        <label htmlFor={id('assignment-type')}>Type</label>
        <select
          id={id('assignment-type')}
          value={values.assignmentType}
          onChange={(e) => onChange('assignmentType', e.target.value)}
        >
          {ASSIGNMENT_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="auth-field">
        <label htmlFor={id('assignment-location')}>Locatie</label>
        <input
          id={id('assignment-location')}
          type="text"
          required
          value={values.location}
          onChange={(e) => onChange('location', e.target.value)}
        />
      </div>
      <div className="admin-onboarding-detail__grid">
        <div className="auth-field">
          <label htmlFor={id('assignment-date-start')}>Startdatum</label>
          <input
            id={id('assignment-date-start')}
            type="date"
            required
            value={values.dateStart}
            onChange={(e) => onChange('dateStart', e.target.value)}
          />
        </div>
        <div className="auth-field">
          <label htmlFor={id('assignment-date-end')}>Einddatum</label>
          <input
            id={id('assignment-date-end')}
            type="date"
            value={values.dateEnd}
            onChange={(e) => onChange('dateEnd', e.target.value)}
          />
        </div>
        <TimeField
          id={id('assignment-shift-start')}
          label="Dienst start"
          value={values.shiftStart}
          onChange={(value) => onChange('shiftStart', value)}
        />
        <TimeField
          id={id('assignment-shift-end')}
          label="Dienst eind"
          value={values.shiftEnd}
          onChange={(value) => onChange('shiftEnd', value)}
        />
      </div>
      <div className="auth-field">
        <label htmlFor={id('assignment-client')}>Opdrachtgever (optioneel)</label>
        <input
          id={id('assignment-client')}
          type="text"
          value={values.clientCompany}
          onChange={(e) => onChange('clientCompany', e.target.value)}
        />
      </div>
      <div className="auth-field">
        <label htmlFor={id('assignment-rate')}>Tarief / toeslagen (optioneel)</label>
        <input
          id={id('assignment-rate')}
          type="text"
          value={values.rateNote}
          onChange={(e) => onChange('rateNote', e.target.value)}
        />
      </div>
      <div className="auth-field">
        <label htmlFor={id('assignment-description')}>Omschrijving</label>
        <textarea
          id={id('assignment-description')}
          rows={3}
          value={values.description}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>
      <div className="auth-field">
        <label htmlFor={id('assignment-status')}>Status</label>
        <select
          id={id('assignment-status')}
          value={values.status}
          onChange={(e) => onChange('status', e.target.value)}
        >
          {ASSIGNMENT_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="auth-field">
        <label htmlFor={id('assignment-notes')}>Interne notities</label>
        <textarea
          id={id('assignment-notes')}
          rows={2}
          value={values.adminNotes}
          onChange={(e) => onChange('adminNotes', e.target.value)}
        />
      </div>
    </>
  )
}
