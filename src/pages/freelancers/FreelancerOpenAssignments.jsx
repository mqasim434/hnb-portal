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
import { CORPORATE_DAYLIGHT_EVENT_HERO } from '../../content/marketingHeroImages'
import { FREELANCER_SEO } from '../../content/freelancerSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import './freelancers-pages.css'

const DOMAIN_FILTERS = [
  { id: 'alle', label: 'Alle' },
  { id: 'Hospitality', label: 'Hospitality' },
  { id: 'Beveiliging', label: 'Beveiliging' },
  { id: 'Algemeen', label: 'Algemeen' },
]

const PERIOD_FILTERS = [
  { id: 'alle', label: 'Alle data' },
  { id: 'deze_week', label: 'Deze week' },
  { id: 'komende_2_weken', label: 'Komende 2 weken' },
  { id: 'volgende_maand', label: 'Volgende maand' },
]

const CITY_OPTIONS = [
  { id: 'alle', label: 'Alle steden' },
  { id: 'Amsterdam', label: 'Amsterdam' },
  { id: 'Utrecht', label: 'Utrecht' },
  { id: 'Rotterdam', label: 'Rotterdam' },
  { id: 'Haarlem', label: 'Haarlem' },
  { id: 'Den Haag', label: 'Den Haag' },
  { id: 'Eindhoven', label: 'Eindhoven' },
]

/** @typedef {{ id: string, label: string }} SortOption */

/** @type {SortOption[]} */
const SORT_OPTIONS = [
  { id: 'date_asc', label: 'Datum (eerste eerst)' },
  { id: 'date_desc', label: 'Datum (laatste eerst)' },
  { id: 'location', label: 'Locatie' },
  { id: 'status', label: 'Status' },
]

function startOfDay(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

/** Maandag als eerste weekdag (ISO-achtig). */
function startOfISOWeek(d) {
  const x = startOfDay(d)
  const day = x.getDay()
  const diff = day === 0 ? -6 : 1 - day
  x.setDate(x.getDate() + diff)
  return x
}

function endOfISOWeek(d) {
  const s = startOfISOWeek(d)
  const e = new Date(s)
  e.setDate(e.getDate() + 7)
  e.setMilliseconds(-1)
  return e
}

/** @param {string} dateISO */
function parseLocalDate(dateISO) {
  const [y, m, da] = dateISO.split('-').map(Number)
  return new Date(y, m - 1, da)
}

/**
 * @param {string} dateISO
 * @param {string} period
 * @param {Date} [now]
 */
function matchesPeriod(dateISO, period, now = new Date()) {
  const d = startOfDay(parseLocalDate(dateISO))
  const today = startOfDay(now)
  if (period === 'alle') return true
  if (period === 'deze_week') {
    return d >= startOfISOWeek(now) && d <= endOfISOWeek(now)
  }
  if (period === 'komende_2_weken') {
    const end = new Date(today)
    end.setDate(end.getDate() + 14)
    return d >= today && d <= end
  }
  if (period === 'volgende_maand') {
    const nextStart = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    const nextEnd = new Date(now.getFullYear(), now.getMonth() + 2, 0, 23, 59, 59, 999)
    return d >= nextStart && d <= nextEnd
  }
  return true
}

/** @param {'open' | 'bijna_vol' | 'gesloten'} status */
function statusRank(status) {
  if (status === 'open') return 0
  if (status === 'bijna_vol') return 1
  return 2
}

/**
 * @param {typeof FREELANCER_ASSIGNMENTS_SAMPLE} list
 * @param {string} sortKey
 */
function sortAssignments(list, sortKey) {
  const next = [...list]
  if (sortKey === 'date_asc') {
    next.sort((a, b) => a.dateISO.localeCompare(b.dateISO))
  } else if (sortKey === 'date_desc') {
    next.sort((a, b) => b.dateISO.localeCompare(a.dateISO))
  } else if (sortKey === 'location') {
    next.sort((a, b) => a.locationLine.localeCompare(b.locationLine, 'nl'))
  } else if (sortKey === 'status') {
    next.sort((a, b) => statusRank(a.status) - statusRank(b.status))
  }
  return next
}

export default function FreelancerOpenAssignments() {
  const seo = FREELANCER_SEO.openstaande
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
    ogImage: CORPORATE_DAYLIGHT_EVENT_HERO.src,
  })

  const [domainFilter, setDomainFilter] = useState('alle')
  const [periodFilter, setPeriodFilter] = useState('alle')
  const [cityFilter, setCityFilter] = useState('alle')
  const [sortKey, setSortKey] = useState('date_asc')

  const filteredList = useMemo(() => {
    const rows = FREELANCER_ASSIGNMENTS_SAMPLE.filter((a) => {
      if (domainFilter !== 'alle' && a.domain !== domainFilter) return false
      if (cityFilter !== 'alle' && a.cityFilter !== cityFilter) return false
      if (!matchesPeriod(a.dateISO, periodFilter)) return false
      return true
    })
    return sortAssignments(rows, sortKey)
  }, [domainFilter, periodFilter, cityFilter, sortKey])

  const resultLabel = useMemo(() => {
    const n = filteredList.length
    if (n === 1) return '1 openstaande shift gevonden'
    return `${n} openstaande shifts gevonden`
  }, [filteredList.length])

  return (
    <main className="fl-page">
      <PageHero
        variant="dark"
        imageUrl={CORPORATE_DAYLIGHT_EVENT_HERO.src}
        imageAlt={CORPORATE_DAYLIGHT_EVENT_HERO.alt}
        imageWidth={CORPORATE_DAYLIGHT_EVENT_HERO.width}
        imageHeight={CORPORATE_DAYLIGHT_EVENT_HERO.height}
        eyebrow="Freelancers"
        title="Openstaande opdrachten"
        lead="Hieronder vindt u actuele shifts die wij inplannen. Definitieve beschikbaarheid en matching gebeuren na goedkeuring van uw profiel en certificaten."
        stackCtasOnMobile
      >
        <Link to="/freelancers/direct-aanmelden" className="hnb-btn hnb-btn--freelancer">
          Direct aanmelden
        </Link>
        <Link to="/freelancers/hoe-het-werkt" className="hnb-btn hnb-btn--outline">
          Hoe het werkt
        </Link>
      </PageHero>

      <section
        className="fl-section hnb-container"
        aria-labelledby="fl-assignments-title"
        id="fl-opdrachten-lijst"
      >
        <header className="fl-section__head">
          <span className="fl-section__eyebrow">Actueel</span>
          <h2 id="fl-assignments-title" className="fl-section__title">
            Opdrachten in het overzicht
          </h2>
          <p className="fl-section__lead">
            Filter op domein, periode en stad. Sorteer op datum, locatie of status. &quot;Gesloten&quot; betekent dat
            deze shift vervuld is.
          </p>
        </header>

        <div className="fl-assign-filters">
          <div className="fl-filter-row" role="group" aria-label="Filter op domein">
            {DOMAIN_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`fl-filter-btn${domainFilter === f.id ? ' fl-filter-btn--active' : ''}`}
                onClick={() => setDomainFilter(f.id)}
                aria-pressed={domainFilter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="fl-filter-row" role="group" aria-label="Filter op periode">
            {PERIOD_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`fl-filter-btn${periodFilter === f.id ? ' fl-filter-btn--active' : ''}`}
                onClick={() => setPeriodFilter(f.id)}
                aria-pressed={periodFilter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="fl-assign-filters__controls">
            <div className="fl-assign-filters__field">
              <label className="fl-assign-filters__label" htmlFor="fl-assign-city">
                Locatie
              </label>
              <select
                id="fl-assign-city"
                className="fl-assign-filters__select"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              >
                {CITY_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="fl-assign-filters__field">
              <label className="fl-assign-filters__label" htmlFor="fl-assign-sort">
                Sorteren op
              </label>
              <select
                id="fl-assign-sort"
                className="fl-assign-filters__select"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <p className="fl-assign-filters__count" role="status" aria-live="polite">
              {resultLabel}
            </p>
          </div>
        </div>

        <div className="fl-assignments-grid">
          {filteredList.map((a) => (
            <AssignmentCard
              key={a.id}
              eventType={a.eventType}
              roleLabel={a.roleLabel}
              dateLabel={a.dateLabel}
              locationLine={a.locationLine}
              hoursLabel={a.hoursLabel}
              crewLine={a.crewLine}
              rateLabel={a.rateLabel}
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
        primaryVariant="freelancer"
        secondaryVariant="outline"
      />
    </main>
  )
}
