import { FiCoffee, FiShield } from 'react-icons/fi'
import { B2B_DISCIPLINES_SECTION } from '../../content/bedrijvenDisciplinesSection'

/** Hospitality / beveiliging split (definitieve copy). */
export default function BedrijvenHospitalitySecuritySplit() {
  const d = B2B_DISCIPLINES_SECTION

  return (
    <section className="b2b-split hnb-container" aria-labelledby="b2b-split-title">
      <header className="b2b-split__head">
        <span className="b2b-split__eyebrow">{d.eyebrow}</span>
        <h2 id="b2b-split-title" className="b2b-split__title">
          {d.title}
        </h2>
        <p className="b2b-split__lead">{d.intro}</p>
      </header>
      <div className="b2b-split__grid">
        <article className="b2b-split__panel b2b-split__panel--hospitality">
          <h3>
            <FiCoffee aria-hidden /> Servicemedewerkers (hosts)
          </h3>
          <p className="b2b-split__panel-text">{d.hospitalityBody}</p>
        </article>
        <article className="b2b-split__panel b2b-split__panel--security">
          <h3>
            <FiShield aria-hidden /> Beveiliging
          </h3>
          <ul>
            {d.securityBullets.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
