import { FiArrowRight } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { NOT_FOUND_SEO } from '../../content/notFoundSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import './NotFound.css'

export default function NotFound() {
  const { pathname } = useLocation()

  usePageSeo({
    title: NOT_FOUND_SEO.title,
    description: NOT_FOUND_SEO.description,
    canonicalPath: pathname,
    noIndex: true,
  })

  return (
    <main className="not-found">
      <div className="not-found__inner hnb-container">
        <p className="not-found__eyebrow">H&B Service Group</p>
        <p className="not-found__code" aria-hidden="true">
          404
        </p>
        <h1 className="not-found__title">Deze pagina bestaat niet</h1>
        <p className="not-found__lead">
          Het adres is verplaatst, verwijderd of onjuist ingevoerd. Gebruik onderstaande opties om verder te
          gaan — wij helpen u graag bij personeel en planning voor uw programma.
        </p>
        <nav className="not-found__actions" aria-label="Snelle navigatie">
          <Link className="hnb-btn hnb-btn--primary not-found__btn" to="/">
            Home
            <FiArrowRight className="not-found__btn-icon" aria-hidden />
          </Link>
          <Link className="hnb-btn hnb-btn--outline not-found__btn" to="/bedrijven/personeel-aanvragen">
            Personeel aanvragen
          </Link>
          <Link className="hnb-btn hnb-btn--outline not-found__btn" to="/freelancers/direct-aanmelden">
            Direct aanmelden
          </Link>
          <Link className="hnb-btn hnb-btn--outline not-found__btn" to="/contact">
            Contact
          </Link>
        </nav>
      </div>
    </main>
  )
}
