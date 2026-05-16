import { FiCoffee, FiShield } from 'react-icons/fi'
import { MARKETING_PAGES } from '../../content/marketingPages'

/** Hospitality / beveiliging split met marketingcopy uit bv-ons-aanbod. */
export default function BedrijvenHospitalitySecuritySplit() {
  const data = MARKETING_PAGES['bv-ons-aanbod']
  const bullets = data.sections[0]?.bullets ?? []
  const hospitalityLine = bullets[0]
  const securityLines = bullets.slice(1)

  return (
    <section className="b2b-split hnb-container" aria-labelledby="b2b-split-title">
      <header className="b2b-split__head">
        <span className="b2b-split__eyebrow">Disciplines</span>
        <h2 id="b2b-split-title" className="b2b-split__title">
          Hospitality en beveiliging naast elkaar
        </h2>
        <p className="b2b-split__lead">
          Eén briefing en afgestemde call times — ideaal wanneer gastbeleving en gecontroleerde toegang samenkomen.
        </p>
      </header>
      <div className="b2b-split__grid">
        <article className="b2b-split__panel b2b-split__panel--hospitality">
          <h3>
            <FiCoffee aria-hidden /> Hospitality
          </h3>
          <ul>{hospitalityLine ? <li key={hospitalityLine}>{hospitalityLine}</li> : null}</ul>
        </article>
        <article className="b2b-split__panel b2b-split__panel--security">
          <h3>
            <FiShield aria-hidden /> Beveiliging &amp; support
          </h3>
          <ul>
            {securityLines.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
