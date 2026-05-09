import { Link } from 'react-router-dom'
import './InfoPage.css'

/**
 * @param {object} props
 * @param {string} [props.eyebrow]
 * @param {string} props.title
 * @param {string} props.lead
 * @param {{ heading?: string, paragraphs?: string[], bullets?: string[] }[]} [props.sections]
 * @param {{ title: string, date?: string, excerpt: string }[]} [props.articles]
 * @param {{ to: string, label: string, primary?: boolean }[]} [props.ctas]
 */
export default function InfoPage({ eyebrow, title, lead, sections = [], articles, ctas }) {
  return (
    <main className="info-page">
      <header className="info-page__hero hnb-container">
        {eyebrow ? (
          <p className="info-page__eyebrow">{eyebrow}</p>
        ) : null}
        <h1 className="info-page__title hnb-type-section">{title}</h1>
        <p className="info-page__lead hnb-type-subhead">{lead}</p>
      </header>

      {articles?.length ? (
        <section className="info-page__block hnb-container" aria-label="Nieuwsberichten">
          <ul className="info-page__articles">
            {articles.map((a) => (
              <li key={a.title} className="info-page__article">
                {a.date ? (
                  <span className="info-page__article-date">{a.date}</span>
                ) : null}
                <h2 className="info-page__article-title">{a.title}</h2>
                <p className="info-page__article-excerpt">{a.excerpt}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {sections.map((section, index) => (
        <section
          key={section.heading || `section-${index}`}
          className="info-page__block hnb-container"
        >
          {section.heading ? (
            <h2 className="info-page__heading">{section.heading}</h2>
          ) : null}
          {section.paragraphs?.map((p) => (
            <p key={p.slice(0, 48)} className="info-page__text">
              {p}
            </p>
          ))}
          {section.bullets?.length ? (
            <ul className="info-page__list">
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      {ctas?.length ? (
        <section className="info-page__ctas hnb-container">
          <div className="info-page__cta-row">
            {ctas.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className={
                  c.primary
                    ? 'hnb-btn hnb-btn--primary'
                    : 'hnb-btn hnb-btn--outline'
                }
              >
                {c.label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}
