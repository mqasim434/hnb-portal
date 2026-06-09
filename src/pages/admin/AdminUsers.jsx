import { useCallback, useEffect, useState } from 'react'
import { usePageSeo } from '../../hooks/usePageSeo'
import { ROLES } from '../../constants/roles'
import {
  approveUser,
  fetchPendingUsers,
  rejectUser,
} from '../../lib/admin/users'
import '../auth/Auth.css'

export default function AdminUsers() {
  usePageSeo({
    title: 'Beheer — gebruikers',
    description: 'Gebruikers goedkeuren en beheren.',
    canonicalPath: '/admin/users',
    noIndex: true,
  })

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionId, setActionId] = useState(null)

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setUsers(await fetchPendingUsers())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gebruikers laden mislukt.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  async function handleApprove(row) {
    setActionId(row.id)
    setError(null)
    try {
      const role =
        row.intendedRole === ROLES.COMPANY ? ROLES.COMPANY : ROLES.FREELANCER
      await approveUser(row.id, role)
      await loadUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Goedkeuren mislukt.')
    } finally {
      setActionId(null)
    }
  }

  async function handleReject(uid) {
    setActionId(uid)
    setError(null)
    try {
      await rejectUser(uid)
      await loadUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Afwijzen mislukt.')
    } finally {
      setActionId(null)
    }
  }

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Gebruikers — wachtrij</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '42rem' }}>
        Accounts met status <strong>in behandeling</strong>. Goedkeuring wijst de rol toe op basis van
        bedoelde rol (freelancer of bedrijf).
      </p>

      {error ? (
        <div className="auth-alert auth-alert--error" role="alert" style={{ marginTop: 'var(--space-4)' }}>
          {error}
        </div>
      ) : null}

      {loading ? (
        <p style={{ marginTop: 'var(--space-5)' }}>Laden…</p>
      ) : users.length === 0 ? (
        <p style={{ marginTop: 'var(--space-5)' }}>Geen openstaande aanmeldingen.</p>
      ) : (
        <div style={{ marginTop: 'var(--space-5)', overflowX: 'auto' }}>
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>Naam / bedrijf</th>
                <th>E-mail</th>
                <th>Bedoelde rol</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {users.map((row) => (
                <tr key={row.id}>
                  <td>
                    {row.companyName ? (
                      <>
                        <strong>{row.companyName}</strong>
                        {row.displayName ? (
                          <span style={{ display: 'block', fontSize: '0.85rem' }}>
                            {row.displayName}
                          </span>
                        ) : null}
                      </>
                    ) : (
                      row.displayName || '—'
                    )}
                  </td>
                  <td>{row.email}</td>
                  <td>{row.intendedRole ?? row.role ?? ROLES.FREELANCER}</td>
                  <td>
                    <div className="admin-users-actions">
                      <button
                        type="button"
                        className="hnb-btn hnb-btn--freelancer"
                        disabled={actionId === row.id}
                        onClick={() => handleApprove(row)}
                      >
                        Goedkeuren
                      </button>
                      <button
                        type="button"
                        className="hnb-btn hnb-btn--outline"
                        disabled={actionId === row.id}
                        onClick={() => handleReject(row.id)}
                      >
                        Afwijzen
                      </button>
                    </div>
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
