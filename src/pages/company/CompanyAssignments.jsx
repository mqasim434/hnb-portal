import { useCallback, useEffect, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import AssignmentFields from '../../components/AssignmentFields'
import {
  ASSIGNMENT_STATUS,
  ASSIGNMENT_STATUS_OPTIONS,
  assignmentStatusLabel,
  assignmentTypeLabel,
} from '../../constants/assignments'
import { usePageSeo } from '../../hooks/usePageSeo'
import {
  createAssignmentForCompany,
  deleteAssignmentForCompany,
  fetchAssignmentsForCompany,
  updateAssignmentForCompany,
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
  status: ASSIGNMENT_STATUS.OPEN,
}

const FILTER_OPTIONS = [{ value: 'all', label: 'Alles' }, ...ASSIGNMENT_STATUS_OPTIONS]

/** @param {import('firebase/firestore').Timestamp | null | undefined} value */
function formatTimestamp(value) {
  if (!value || typeof value.toDate !== 'function') return '—'
  return value.toDate().toLocaleString('nl-NL', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function CompanyAssignments() {
  const { user, profile } = useSelector((state) => state.auth)

  usePageSeo({
    title: 'Bedrijfsportaal — opdrachten',
    description: 'Plaats opdrachten voor freelancers.',
    canonicalPath: '/company/assignments',
    noIndex: true,
  })

  const [filter, setFilter] = useState('all')
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionId, setActionId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [createForm, setCreateForm] = useState(EMPTY_FORM)
  const [editForms, setEditForms] = useState({})

  const loadData = useCallback(async () => {
    if (!user?.uid) return
    setLoading(true)
    setError(null)
    try {
      const rows = await fetchAssignmentsForCompany(user.uid, filter)
      setAssignments(rows)
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
              status: row.status,
            }
          }
        }
        return next
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opdrachten laden mislukt.')
    } finally {
      setLoading(false)
    }
  }, [filter, user?.uid])

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
    if (!user?.uid) return
    setActionId('create')
    setError(null)
    try {
      await createAssignmentForCompany(createForm, {
        uid: user.uid,
        companyName: profile?.companyName,
        email: user.email,
      })
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

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Opdrachten</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '48rem' }}>
        Plaats opdrachten voor jouw evenementen. Zet de status op <strong>Open</strong> om ze zichtbaar
        te maken voor freelancers (feed volgt in Module 3). Sollicitaties en selectie volgen in Module 4.
      </p>

      <section
        className="compliance-card"
        style={{ marginTop: 'var(--space-6)', maxWidth: '48rem' }}
        aria-labelledby="company-create-assignment-title"
      >
        <h2 id="company-create-assignment-title" className="compliance-card__title">
          Nieuwe opdracht plaatsen
        </h2>
        <form className="compliance-card__form" onSubmit={handleCreate} noValidate>
          <AssignmentFields
            variant="company"
            values={createForm}
            onChange={(field, value) => setCreateForm((prev) => ({ ...prev, [field]: value }))}
          />
          <button
            type="submit"
            className="hnb-btn hnb-btn--primary"
            disabled={actionId === 'create'}
          >
            {actionId === 'create' ? 'Opslaan…' : 'Opdracht plaatsen'}
          </button>
        </form>
      </section>

      <div className="admin-onboarding-toolbar" style={{ marginTop: 'var(--space-6)' }}>
        <label className="admin-onboarding-filter" htmlFor="company-assignment-filter">
          Status
        </label>
        <select
          id="company-assignment-filter"
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
        <p style={{ marginTop: 'var(--space-5)' }}>
          Nog geen opdrachten. Maak hierboven je eerste opdracht aan.
        </p>
      ) : (
        <div style={{ marginTop: 'var(--space-5)', overflowX: 'auto' }}>
          <table className="admin-users-table admin-onboarding-table">
            <thead>
              <tr>
                <th>Opdracht</th>
                <th>Type</th>
                <th>Locatie</th>
                <th>Periode</th>
                <th>Status</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => {
                const isExpanded = expandedId === assignment.id
                const isBusy = actionId === assignment.id
                const edit = editForms[assignment.id] ?? EMPTY_FORM
                const isAssigned = assignment.status === ASSIGNMENT_STATUS.ASSIGNED

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
                      <td>{assignmentStatusLabel(assignment.status)}</td>
                      <td>
                        <button
                          type="button"
                          className="hnb-btn hnb-btn--outline"
                          onClick={() => setExpandedId(isExpanded ? null : assignment.id)}
                        >
                          {isExpanded ? 'Sluiten' : 'Beheren'}
                        </button>
                      </td>
                    </tr>
                    {isExpanded ? (
                      <tr className="admin-onboarding-detail-row">
                        <td colSpan={6}>
                          <div className="admin-onboarding-detail">
                            {isAssigned ? (
                              <div className="auth-alert auth-alert--info" role="status">
                                Deze opdracht is toegewezen. Bewerken is niet meer mogelijk.
                              </div>
                            ) : (
                              <form
                                className="compliance-card__form"
                                onSubmit={(event) => {
                                  event.preventDefault()
                                  if (!user?.uid) return
                                  runAction(assignment.id, () =>
                                    updateAssignmentForCompany(
                                      assignment.id,
                                      user.uid,
                                      editForms[assignment.id],
                                    ),
                                  )
                                }}
                              >
                                <h3 className="hnb-type-subhead">Opdracht bewerken</h3>
                                <AssignmentFields
                                  variant="company"
                                  values={edit}
                                  idPrefix={`${assignment.id}-`}
                                  onChange={(field, value) =>
                                    updateEditForm(assignment.id, field, value)
                                  }
                                />
                                <div className="admin-users-actions">
                                  <button
                                    type="submit"
                                    className="hnb-btn hnb-btn--primary"
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
                                        deleteAssignmentForCompany(assignment.id, user.uid),
                                      )
                                    }
                                  >
                                    Verwijderen
                                  </button>
                                </div>
                              </form>
                            )}

                            <p style={{ marginTop: 'var(--space-4)', color: 'var(--text-muted)' }}>
                              Geplaatst: {formatTimestamp(assignment.createdAt)}
                              {assignment.applicationCount > 0
                                ? ` · ${assignment.applicationCount} sollicitatie(s)`
                                : ''}
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
