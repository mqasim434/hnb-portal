import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { usePageSeo } from '../../hooks/usePageSeo'
import { fetchCompanyDashboardStats } from '../../lib/portal/dashboardStats'
import '../auth/Auth.css'

export default function CompanyDashboard() {
  const { profile, user } = useSelector((state) => state.auth)
  const companyName = profile?.companyName || user?.displayName || 'jouw bedrijf'
  const [stats, setStats] = useState(null)

  usePageSeo({
    title: 'Bedrijfsportaal — dashboard',
    description: 'Beheer opdrachten en freelancerselectie.',
    canonicalPath: '/company/dashboard',
    noIndex: true,
  })

  useEffect(() => {
    if (!user?.uid) return
    fetchCompanyDashboardStats(user.uid)
      .then(setStats)
      .catch(() => setStats(null))
  }, [user?.uid])

  return (
    <main className="hnb-container portal-dashboard" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Dashboard</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '42rem' }}>
        Welkom, <strong>{companyName}</strong>. Plaats opdrachten waar freelancers op kunnen reageren.
      </p>

      <div className="portal-dashboard__grid" style={{ maxWidth: '48rem' }}>
        <Link to="/company/assignments" className="portal-dashboard__tile">
          <p className="portal-dashboard__tile-stat">
            {stats ? (
              <>
                <span className="portal-dashboard__tile-num">{stats.openAssignments}</span>
                <span className="portal-dashboard__tile-unit">open</span>
              </>
            ) : (
              <span className="portal-dashboard__tile-num portal-dashboard__tile-num--muted">—</span>
            )}
          </p>
          <h2 className="portal-dashboard__tile-title">Opdrachten</h2>
          <p className="portal-dashboard__tile-desc">Nieuwe opdracht plaatsen of bestaande beheren</p>
        </Link>

        <Link to="/company/assignments" className="portal-dashboard__tile">
          <p className="portal-dashboard__tile-stat">
            {stats ? (
              <>
                <span className="portal-dashboard__tile-num">{stats.pendingApplications}</span>
                <span className="portal-dashboard__tile-unit">sollicitaties</span>
              </>
            ) : (
              <span className="portal-dashboard__tile-num portal-dashboard__tile-num--muted">—</span>
            )}
          </p>
          <h2 className="portal-dashboard__tile-title">Sollicitaties</h2>
          <p className="portal-dashboard__tile-desc">Bekijk en selecteer freelancers per opdracht</p>
        </Link>

        <Link to="/company/assignments" className="portal-dashboard__tile">
          <p className="portal-dashboard__tile-stat">
            {stats ? (
              <>
                <span className="portal-dashboard__tile-num">{stats.assignedAssignments}</span>
                <span className="portal-dashboard__tile-unit">toegewezen</span>
              </>
            ) : (
              <span className="portal-dashboard__tile-num portal-dashboard__tile-num--muted">—</span>
            )}
          </p>
          <h2 className="portal-dashboard__tile-title">Toegewezen</h2>
          <p className="portal-dashboard__tile-desc">Opdrachten met een geselecteerde freelancer</p>
        </Link>
      </div>

      <section className="compliance-card" style={{ marginTop: 'var(--space-6)', maxWidth: '42rem' }}>
        <h2 className="hnb-type-subhead">Hoe het werkt</h2>
        <ol style={{ marginTop: 'var(--space-3)', paddingLeft: '1.25rem', lineHeight: 1.7 }}>
          <li>Plaats een opdracht met status <strong>Open</strong></li>
          <li>Freelancers solliciteren via <strong>Open opdrachten</strong> in hun portaal</li>
          <li>Jij bekijkt sollicitaties en selecteert een freelancer onder <strong>Opdrachten</strong></li>
        </ol>
      </section>
    </main>
  )
}
