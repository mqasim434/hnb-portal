import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { usePageSeo } from '../../hooks/usePageSeo'
import { fetchFreelancerDashboardStats } from '../../lib/portal/dashboardStats'
import '../auth/Auth.css'

const QUICK_LINKS = [
  {
    to: '/portal/feed',
    title: 'Open opdrachten',
    description: 'Solliciteer op opdrachten van opdrachtgevers.',
    statKey: 'openAssignments',
    statLabel: 'open',
  },
  {
    to: '/portal/jobs',
    title: 'Mijn opdrachten',
    description: 'Opdrachten waarvoor je bent geselecteerd.',
    statKey: 'assignedJobs',
    statLabel: 'toegewezen',
  },
  {
    to: '/portal/hours',
    title: 'Uren',
    description: 'Registreer en dien gewerkte uren in.',
    statKey: 'hoursPending',
    statLabel: 'in behandeling',
  },
  {
    to: '/portal/invoices',
    title: 'Facturen',
    description: 'Goedgekeurde en betaalde facturen.',
  },
  {
    to: '/portal/compliance',
    title: 'Compliance',
    description: 'Upload en beheer verplichte documenten.',
    statKey: 'complianceApproved',
    statSuffixKey: 'complianceTotal',
    statLabel: 'goedgekeurd',
  },
]

export default function PortalDashboard() {
  usePageSeo({
    title: 'Freelancer — dashboard',
    description: 'Freelancerportaal H&B Service Group.',
    canonicalPath: '/portal/dashboard',
    noIndex: true,
  })

  const { user } = useSelector((state) => state.auth)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (!user?.uid) return
    fetchFreelancerDashboardStats(user.uid)
      .then(setStats)
      .catch(() => setStats(null))
  }, [user?.uid])

  const complianceIncomplete = stats && !stats.complianceComplete

  return (
    <main className="hnb-container portal-dashboard" style={{ paddingBlock: 'var(--space-6)' }}>
      {complianceIncomplete ? (
        <div className="portal-compliance-alert" role="alert">
          <strong>Compliance vereist vóór je kunt werken</strong>
          <p>
            Kerndocumenten: <strong>{stats.complianceApproved}</strong> / {stats.complianceTotal}{' '}
            goedgekeurd
            {stats.compliancePending > 0 ? (
              <>
                {' '}
                · <strong>{stats.compliancePending}</strong> in behandeling
              </>
            ) : null}
            . Zonder goedgekeurde documenten kun je niet worden ingezet.
          </p>
          <Link to="/portal/compliance" className="hnb-btn hnb-btn--primary">
            Documenten uploaden
          </Link>
        </div>
      ) : null}

      <h1 className="hnb-type-section">Dashboard</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '42rem' }}>
        Welkom{user?.displayName ? `, ${user.displayName}` : ''}. Beheer je opdrachten, uren,
        documenten en facturen vanuit één portaal.
      </p>

      <div className="portal-dashboard__grid">
        {QUICK_LINKS.map((link) => {
          const statValue =
            link.statKey && stats ? stats[link.statKey] : null
          const statSuffix =
            link.statSuffixKey && stats ? stats[link.statSuffixKey] : null

          return (
            <Link key={link.to} to={link.to} className="portal-dashboard__tile">
              <p className="portal-dashboard__tile-stat" aria-hidden={statValue == null}>
                {statValue != null ? (
                  <>
                    <span className="portal-dashboard__tile-num">{statValue}</span>
                    {statSuffix != null ? (
                      <span className="portal-dashboard__tile-suffix">/{statSuffix}</span>
                    ) : null}
                    <span className="portal-dashboard__tile-unit">{link.statLabel}</span>
                  </>
                ) : (
                  <span className="portal-dashboard__tile-num portal-dashboard__tile-num--muted">—</span>
                )}
              </p>
              <h2 className="portal-dashboard__tile-title">{link.title}</h2>
              <p className="portal-dashboard__tile-desc">{link.description}</p>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
