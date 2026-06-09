import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { usePageSeo } from '../../hooks/usePageSeo'
import '../auth/Auth.css'

export default function CompanyDashboard() {
  const { profile, user } = useSelector((state) => state.auth)
  const companyName = profile?.companyName || user?.displayName || 'jouw bedrijf'

  usePageSeo({
    title: 'Bedrijfsportaal — dashboard',
    description: 'Beheer opdrachten en freelancerselectie.',
    canonicalPath: '/company/dashboard',
    noIndex: true,
  })

  return (
    <main className="hnb-container" style={{ paddingBlock: 'var(--space-6)' }}>
      <h1 className="hnb-type-section">Dashboard</h1>
      <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '42rem' }}>
        Welkom, <strong>{companyName}</strong>. Plaats opdrachten waar freelancers op kunnen reageren.
      </p>

      <div
        style={{
          marginTop: 'var(--space-5)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
          gap: 'var(--space-4)',
          maxWidth: '42rem',
        }}
      >
        <Link to="/company/assignments" className="compliance-card" style={{ textDecoration: 'none', color: 'inherit', padding: 'var(--space-5)' }}>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-b2b, #d35400)' }}>
            Opdrachten
          </p>
          <p className="compliance-card__hint" style={{ marginTop: 'var(--space-2)' }}>
            Nieuwe opdracht plaatsen of bestaande beheren
          </p>
        </Link>
      </div>

      <section className="compliance-card" style={{ marginTop: 'var(--space-6)', maxWidth: '42rem' }}>
        <h2 className="hnb-type-subhead">Hoe het werkt</h2>
        <ol style={{ marginTop: 'var(--space-3)', paddingLeft: '1.25rem', lineHeight: 1.7 }}>
          <li>Plaats een opdracht met status <strong>Open</strong></li>
          <li>Freelancers zien open opdrachten in hun feed (Module 3)</li>
          <li>Jij bekijkt sollicitaties en selecteert een freelancer (Module 4)</li>
        </ol>
      </section>
    </main>
  )
}
