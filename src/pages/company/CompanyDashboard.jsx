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
        Welkom, <strong>{companyName}</strong>. Vanuit dit portaal plaats je opdrachten waar freelancers
        op kunnen reageren.
      </p>

      <section className="compliance-card" style={{ marginTop: 'var(--space-5)', maxWidth: '42rem' }}>
        <h2 className="hnb-type-subhead">Volgende stap</h2>
        <p className="compliance-card__hint" style={{ marginTop: 'var(--space-2)' }}>
          Module 2 voegt <strong>Opdrachten plaatsen</strong> toe aan dit portaal. Freelancers krijgen
          daarna een feed om te solliciteren; jij selecteert wie wordt toegewezen.
        </p>
        <ul style={{ marginTop: 'var(--space-4)', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
          <li>Opdracht aanmaken en publiceren</li>
          <li>Sollicitaties van freelancers bekijken</li>
          <li>Freelancer selecteren voor de opdracht</li>
        </ul>
      </section>
    </main>
  )
}
