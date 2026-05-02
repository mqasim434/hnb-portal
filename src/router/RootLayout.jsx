import { Outlet } from 'react-router-dom'
import FirebaseAuthSync from '../components/FirebaseAuthSync'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function RootLayout() {
  return (
    <div className="site-shell">
      <FirebaseAuthSync />
      <Navbar />
      <div className="site-shell__main">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
