import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import NewsArticleList from '../../components/overhb/NewsArticleList'
import { NEWS_ARTICLES } from '../../content/newsArticles'
import { MARKETING_PAGES } from '../../content/marketingPages'
import { ABOUT_SEO } from '../../content/aboutSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import '../bedrijven/bedrijven-pages.css'
import './overhb-pages.css'

const copy = MARKETING_PAGES['hb-nieuws']

const teasers = NEWS_ARTICLES.map((a) => ({
  slug: a.slug,
  monthLabel: a.monthLabel,
  isoDate: a.isoDate,
  title: a.title,
  excerpt: a.excerpt,
}))

export default function NieuwsPage() {
  const seo = ABOUT_SEO.nieuws
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="ohb-page b2b-page">
      <PageHero variant="navy" eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead}>
        <Link to="/contact" className="hnb-btn hnb-btn--primary">
          Persvraag of samenwerking
        </Link>
      </PageHero>

      <BedrijvenTrustBadges />

      <section className="b2b-section b2b-section--surface" aria-label="Nieuwsberichten">
        <div className="hnb-container">
          <NewsArticleList articles={teasers} />
        </div>
      </section>
    </main>
  )
}
