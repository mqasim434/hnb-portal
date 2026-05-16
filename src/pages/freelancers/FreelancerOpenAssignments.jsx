import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiCalendar,
  FiClock,
  FiCreditCard,
  FiMessageSquare,
} from 'react-icons/fi'
import AssignmentCard from '../../components/freelancers/AssignmentCard'
import MarketingCtaStrip from '../../components/marketing/MarketingCtaStrip'
import PageHero from '../../components/marketing/PageHero'
import { FREELANCER_ASSIGNMENTS_SAMPLE } from '../../content/freelancerAssignments'
import { FREELANCER_SEO } from '../../content/freelancerSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import './freelancers-pages.css'

const FILTERS = [
  { id: 'alle', label: 'Alles' },
  { id: 'Hospitality', label: 'Hospitality' },
  { id: 'Beveiliging', label: 'Beveiliging' },
  { id: 'Algemeen', label: 'Algemeen' },
]

export default function FreelancerOpenAssignments() {
  const seo = FREELANCER_SEO.openstaande
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
    ogImage:
      'https://images.unsplash.com/photo-1470229722913-2c2291e34933?auto=format&fit=crop&w=1600&q=80',
  })

  const [filter, setFilter] = useState('alle')

  const list = useMemo(() => {
    if (filter === 'alle') return FREELANCER_ASSIGNMENTS_SAMPLE
    return FREELANCER_ASSIGNMENTS_SAMPLE.filter((a) => a.role === filter)
  }, [filter])

  return (
    <main className="fl-page">
      <PageHero
        variant="dark"
        imageUrl="https://images.unsplash.com/photo-1470229722913-2c2291e34933?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Team achter de schermen bij een live event — openstaande freelanceropdrachten via H&amp;B."
        eyebrow="Freelancers"
        title="Openstaande opdrachten"
        lead="Onderstaande voorbeelden tonen het soort shifts die wij inplannen. Definitieve beschikbaarheid en matching gebeuren na goedkeuring van uw profiel en certificaten."
        stackCtasOnMobile
      >
        <Link to="/freelancers/direct-aanmelden" className="hnb-btn hnb-btn--primary">
          Direct aanmelden
        </Link>
        <Link to="/freelancers/hoe-het-werkt" className="hnb-btn hnb-btn--outline">
          Hoe het werkt
        </Link>
      </PageHero>

      <section className="fl-section hnb-container" aria-labelledby="fl-assignments-title">
        <header className="fl-section__head">
          <span className="fl-section__eyebrow">Actueel</span>
          <h2 id="fl-assignments-title" className="fl-section__title">
            Opdrachten in het overzicht
          </h2>
          <p className="fl-section__lead">
            Filter op domein. Status geeft aan of er nog ruimte is op het roster — &quot;Gesloten&quot; betekent
            dat deze shift vervuld is.
          </p>
        </header>
        <div className="fl-filter-row" role="group" aria-label="Filter op type opdracht">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`fl-filter-btn${filter === f.id ? ' fl-filter-btn--active' : ''}`}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="fl-assignments-grid">
          {list.map((a) => (
            <AssignmentCard
              key={a.id}
              typeLabel={a.typeLabel}
              dateLabel={a.dateLabel}
              city={a.city}
              hoursLabel={a.hoursLabel}
              roleLabel={a.roleLabel}
              certification={a.certification}
              status={a.status}
              statusLabel={a.statusLabel}
            />
          ))}
        </div>
      </section>

      <section className="fl-section fl-section--surface hnb-container" aria-label="Waarom H&amp;B">
        <header className="fl-section__head">
          <span className="fl-section__eyebrow">Voordelen</span>
          <h2 className="fl-section__title">Gemaakt voor professionals op de vloer</h2>
          <p className="fl-section__lead">
            Eerlijke planning, voorspelbare afhandeling en bereikbare coördinatoren wanneer het schuift.
          </p>
        </header>
        <ul className="fl-benefits">
          <li className="fl-benefit">
            <div className="fl-benefit__icon" aria-hidden="true">
              <FiClock />
            </div>
            <h3>Flexibele uren</h3>
            <p>Call time en verwachte eindtijd vooraf, zodat u uw week kunt verdelen.</p>
          </li>
          <li className="fl-benefit">
            <div className="fl-benefit__icon" aria-hidden="true">
              <FiCreditCard />
            </div>
            <h3>Heldere uitbetaling</h3>
            <p>Mutaties en facturatie volgens afspraak — minder ruis, meer overzicht.</p>
          </li>
          <li className="fl-benefit">
            <div className="fl-benefit__icon" aria-hidden="true">
              <FiMessageSquare />
            </div>
            <h3>Eén briefinglijn</h3>
            <p>Locatie, dresscode en contacten gebundeld — geen versnipperde chats.</p>
          </li>
          <li className="fl-benefit">
            <div className="fl-benefit__icon" aria-hidden="true">
              <FiCalendar />
            </div>
            <h3>Variatie in events</h3>
            <p>Van corporate tot nachtprogramma — bouw ervaring binnen uw vergunning.</p>
          </li>
        </ul>
      </section>

      <MarketingCtaStrip
        headingId="fl-assignments-cta-heading"
        title="Klaar voor de volgende stap?"
        lead="Meld u aan — wij begeleiden screening en eerste shift-selectie persoonlijk."
        primaryTo="/freelancers/direct-aanmelden"
        primaryLabel="Start aanmelding"
        secondaryTo="/contact"
        secondaryLabel="Stel een vraag"
      />
    </main>
  )
}
