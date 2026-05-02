import { useCallback, useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/hire-staff', label: 'Hire Staff' },
  { to: '/find-work', label: 'Find Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function linkClassName({ isActive }) {
  return isActive
    ? 'site-header__link site-header__link--active'
    : 'site-header__link'
}

function loginClassName({ isActive }) {
  return isActive
    ? 'site-header__login site-header__login--active'
    : 'site-header__login'
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, closeMenu])

  return (
    <header
      className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}
    >
      <div className="site-header__inner hnb-container">
        <Link to="/" className="site-header__logo" onClick={closeMenu}>
          <span className="site-header__logo-mark">H&amp;B</span>
          <span className="site-header__logo-name">Service Group</span>
        </Link>

        <button
          type="button"
          className="site-header__menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
        >
          {menuOpen ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
        </button>

        <nav
          id="primary-navigation"
          className={`site-header__nav${menuOpen ? ' site-header__nav--open' : ''}`}
          aria-label="Primary"
        >
          <ul className="site-header__links">
            {navItems.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  {...(end ? { end: true } : {})}
                  className={linkClassName}
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="site-header__ctas">
            <Link
              to="/hire-staff"
              className="hnb-btn hnb-btn--primary"
              onClick={closeMenu}
            >
              Hire Staff
            </Link>
            <Link
              to="/find-work"
              className="hnb-btn hnb-btn--outline"
              onClick={closeMenu}
            >
              Find Work
            </Link>
          </div>

          <div className="site-header__login-wrap">
            <NavLink
              to="/login"
              className={loginClassName}
              onClick={closeMenu}
            >
              Login
            </NavLink>
          </div>
        </nav>
      </div>

      <button
        type="button"
        className={`site-header__backdrop${menuOpen ? ' site-header__backdrop--visible' : ''}`}
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
    </header>
  )
}
