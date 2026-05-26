import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import NetherlandsMap from '../../components/overhb/NetherlandsMap'
import { WERKGEBIED_PAGE } from '../../content/werkgebiedContent'
import { ABOUT_SEO } from '../../content/aboutSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import '../bedrijven/bedrijven-pages.css'
import './overhb-pages.css'

export default function WerkgebiedPage() {
  const seo = ABOUT_SEO.werkgebied
  const { hero, kerngebied, buitenRandstad, reisafspraken } = WERKGEBIED_PAGE

  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="ohb-page b2b-page">
      <PageHero variant="navy" eyebrow={hero.eyebrow} title={hero.title} lead={hero.subtitle} stackCtasOnMobile>
        <Link to="/bedrijven/personeel-aanvragen" className="hnb-btn hnb-btn--primary">
          Personeel aanvragen
        </Link>
        <Link to="/bedrijven/sectoren" className="hnb-btn hnb-btn--outline">
          Onze sectoren
        </Link>
      </PageHero>

      <BedrijvenTrustBadges />

      <section className="b2b-section b2b-section--surface" aria-labelledby="werkgebied-kern-heading">
        <div className="hnb-container">
          <div className="ohb-werkgebied-split">
            <article className="ohb-region-block">
              <span className="b2b-section__eyebrow">{kerngebied.eyebrow}</span>
              <h2 id="werkgebied-kern-heading" className="b2b-section__title">
                {kerngebied.title}
              </h2>
              <p className="b2b-section__lead" style={{ maxWidth: '40rem', marginBottom: 'var(--space-4)' }}>
                {kerngebied.body}
              </p>
              <ul className="ohb-region-list">
                {kerngebied.cities.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
            <div className="ohb-map-wrap">
              <NetherlandsMap />
            </div>
          </div>
        </div>
      </section>

      <section className="b2b-section">
        <div className="hnb-container">
          <article className="ohb-region-block">
            <span className="b2b-section__eyebrow">{buitenRandstad.eyebrow}</span>
            <h2 className="b2b-section__title">{buitenRandstad.title}</h2>
            <p className="b2b-section__lead" style={{ maxWidth: '44rem', marginBottom: 'var(--space-4)' }}>
              {buitenRandstad.body}
            </p>
            <ul className="ohb-region-list">
              {buitenRandstad.regions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="b2b-section b2b-section--paper" aria-labelledby="werkgebied-reis-heading">
        <div className="hnb-container">
          <article className="ohb-region-block ohb-region-block--wide">
            <h2 id="werkgebied-reis-heading" className="b2b-section__title">
              {reisafspraken.title}
            </h2>
            <p className="b2b-section__lead" style={{ maxWidth: '44rem', marginBottom: 'var(--space-4)' }}>
              {reisafspraken.body}
            </p>
            <ul className="ohb-region-list">
              {reisafspraken.bullets.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  )
}
