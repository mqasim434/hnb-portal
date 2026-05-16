import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import FirebaseAuthSync from '../components/FirebaseAuthSync'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PageRouteSkeleton from '../components/performance/PageRouteSkeleton'
import SiteJsonLd from '../components/seo/SiteJsonLd'

export default function RootLayout() {
  return (
    <div className="site-shell">
      <SiteJsonLd />
      <FirebaseAuthSync />
      <Navbar />
      <div className="site-shell__main">
        <Suspense fallback={<PageRouteSkeleton />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}
