import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { usePageSeo } from '../../hooks/usePageSeo'
import { COMPLIANCE_STATUS, CORE_COMPLIANCE_TYPES, complianceDisplayStatus } from '../../constants/compliance'
import { fetchUserComplianceRecords } from '../../lib/compliance/records'
import '../auth/Auth.css'

const QUICK_LINKS = [
  {
    to: '/portal/jobs',
    title: 'Opdrachten',
    description: 'Bekijk toegewezen shifts en opdrachtdetails.',
  },
  {
    to: '/portal/hours',
    title: 'Uren',
    description: 'Registreer en dien gewerkte uren in.',
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
  const [approvedCount, setApprovedCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    if (!user?.uid) return
    fetchUserComplianceRecords(user.uid)
      .then((records) => {
        let approved = 0
        let pending = 0
        for (const type of CORE_COMPLIANCE_TYPES) {
          const status = complianceDisplayStatus(records[type])
          if (status === COMPLIANCE_STATUS.APPROVED) approved += 1
          if (status === COMPLIANCE_STATUS.PENDING) pending += 1
        }
        setApprovedCount(approved)
        setPendingCount(pending)
      })
      .catch(() => {})
  }, [user?.uid])

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Dashboard</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '42rem' }}>
        Welkom{user?.displayName ? `, ${user.displayName}` : ''}. Beheer je opdrachten, uren,
        documenten en facturen vanuit één portaal.
      </p>

      <div
        style={{
          marginTop: 'var(--space-6)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="compliance-card"
            style={{ textDecoration: 'none', color: 'inherit', padding: 'var(--space-5)' }}
          >
            <h2 className="hnb-type-subhead" style={{ margin: 0 }}>
              {link.title}
            </h2>
            <p className="compliance-card__hint" style={{ marginTop: 'var(--space-2)' }}>
              {link.description}
            </p>
          </Link>
        ))}
      </div>

      <section
        className="compliance-card"
        style={{
          marginTop: 'var(--space-5)',
          maxWidth: '36rem',
          padding: 'var(--space-6)',
        }}
      >
        <h2 className="hnb-type-subhead" style={{ marginBottom: 'var(--space-3)' }}>
          Compliance-documenten
        </h2>
        <p className="hnb-type-subhead" style={{ marginBottom: 'var(--space-4)' }}>
          Kerndocumenten goedgekeurd: <strong>{approvedCount}</strong> / {CORE_COMPLIANCE_TYPES.length}
          {pendingCount > 0 ? (
            <>
              {' '}
              · <strong>{pendingCount}</strong> in behandeling
            </>
          ) : null}
        </p>
        <Link to="/portal/compliance" className="hnb-btn hnb-btn--freelancer">
          Documenten beheren
        </Link>
      </section>
    </main>
  )
}
