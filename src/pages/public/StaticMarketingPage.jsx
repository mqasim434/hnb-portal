import { Navigate } from 'react-router-dom'
import { MARKETING_PAGES } from '../../content/marketingPages'
import InfoPage from './InfoPage'

export default function StaticMarketingPage({ pageKey }) {
  const data = MARKETING_PAGES[pageKey]
  if (!data) {
    return <Navigate to="/" replace />
  }
  return <InfoPage {...data} />
}
