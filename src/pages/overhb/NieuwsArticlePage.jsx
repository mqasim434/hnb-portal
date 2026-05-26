import { Link, Navigate, useParams } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import BedrijvenCtaStrip from '../../components/bedrijven/BedrijvenCtaStrip'
import NewsArticleList from '../../components/overhb/NewsArticleList'
import { getNewsArticleBySlug, getRelatedNews } from '../../content/newsArticles'
import { ABOUT_SEO } from '../../content/aboutSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import '../bedrijven/bedrijven-pages.css'
import './overhb-pages.css'

export default function NieuwsArticlePage() {
  const { slug } = useParams()
  const article = slug ? getNewsArticleBySlug(slug) : undefined

  usePageSeo({
    title: article ? article.title : ABOUT_SEO.nieuws.title,
    description: article ? article.excerpt : ABOUT_SEO.nieuws.description,
    canonicalPath: article ? `/over-hb/nieuws/${article.slug}` : ABOUT_SEO.nieuws.path,
    ogType: article ? 'article' : 'website',
  })

  if (!article) {
    return <Navigate to="/over-hb/nieuws" replace />
  }

  const relatedTeasers = getRelatedNews(article.slug).map((a) => ({
    slug: a.slug,
    monthLabel: a.monthLabel,
    isoDate: a.isoDate,
    title: a.title,
    excerpt: a.excerpt,
  }))

  return (
    <main className="ohb-page b2b-page">
      <div className="hnb-container ohb-news-detail__crumb-wrap">
        <nav className="ohb-news-breadcrumb" aria-label="Broodkruimelpad">
          <Link to="/over-hb/ons-verhaal">Over H&amp;B</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/over-hb/nieuws">Nieuws</Link>
          <span aria-hidden="true"> / </span>
          <span className="ohb-news-breadcrumb__current">{article.title}</span>
        </nav>
      </div>

      <PageHero variant="navy" eyebrow={article.monthLabel} title={article.title} lead={article.excerpt} />

      <BedrijvenTrustBadges />

      <div className="b2b-section b2b-section--surface ohb-news-detail">
        <div className="hnb-container ohb-news-detail__inner">
          <div className="ohb-news-detail__meta">
            <time dateTime={article.isoDate}>{article.monthLabel}</time>
            <span className="ohb-news-detail__author">{article.author}</span>
          </div>
          {article.sections.map((sec) => (
            <section key={sec.heading} className="ohb-news-detail__section">
              <h2>{sec.heading}</h2>
              {sec.paragraphs.map((para) => (
                <p key={para.slice(0, 60)}>{para}</p>
              ))}
            </section>
          ))}
        </div>
      </div>

      {relatedTeasers.length ? (
        <section className="b2b-section" aria-labelledby="related-news-heading">
          <div className="hnb-container">
            <h2 id="related-news-heading" className="b2b-section__title" style={{ marginBottom: 'var(--space-6)' }}>
              Meer nieuws
            </h2>
            <NewsArticleList articles={relatedTeasers} />
          </div>
        </section>
      ) : null}

      <BedrijvenCtaStrip
        title="Capaciteit of verduidelijking nodig?"
        lead="Neem contact op of dien een personeelsaanvraag in — wij reageren met vervolgstappen."
        primaryTo="/bedrijven/personeel-aanvragen"
        primaryLabel="Personeel aanvragen"
        secondaryTo="/contact"
        secondaryLabel="Contact"
      />
    </main>
  )
}
