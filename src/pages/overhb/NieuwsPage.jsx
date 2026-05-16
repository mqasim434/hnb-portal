import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import NewsArticleList from '../../components/overhb/NewsArticleList'
import { MARKETING_PAGES } from '../../content/marketingPages'
import { ABOUT_SEO } from '../../content/aboutSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import '../bedrijven/bedrijven-pages.css'
import './overhb-pages.css'

const copy = MARKETING_PAGES['hb-nieuws']
const articles = copy.articles ?? []

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
          <NewsArticleList articles={articles} />
        </div>
      </section>
    </main>
  )
}
