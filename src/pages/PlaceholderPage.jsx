import { useLocation } from 'react-router-dom'
import { usePageSeo } from '../hooks/usePageSeo'

export default function PlaceholderPage({ title }) {
  const { pathname } = useLocation()

  usePageSeo({
    title,
    description:
      'Interne omgeving H&B Service Group — portal of tijdelijke pagina; niet bedoeld voor algemene indexering.',
    canonicalPath: pathname,
    noIndex: true,
  })

  return (
    <main className="hnb-container" style={{ padding: '4rem 0' }}>
      <h1 className="hnb-type-section">{title}</h1>
      <p
        className="hnb-type-subhead"
        style={{ marginTop: '1rem', maxWidth: '42rem' }}
      >
        Placeholderpagina voor H&amp;B Service Group — inhoud volgt.
      </p>
    </main>
  )
}
