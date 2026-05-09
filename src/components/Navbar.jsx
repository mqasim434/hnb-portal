import { useCallback, useEffect, useId, useState } from 'react'
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { HEADER_CTAS, NAV_GROUPS } from '../content/navigation'
import './Navbar.css'

function linkClassName({ isActive }) {
  return isActive ? 'site-header__sublink site-header__sublink--active' : 'site-header__sublink'
}

function loginClassName({ isActive }) {
  return isActive
    ? 'site-header__login site-header__login--active'
    : 'site-header__login'
}

function groupIsActive(prefix, pathname) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

export default function Navbar() {
  const menuId = useId()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpenGroup, setMobileOpenGroup] = useState(null)
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
    setMobileOpenGroup(null)
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

  const toggleMobileGroup = (id) => {
    setMobileOpenGroup((g) => (g === id ? null : id))
  }

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
          aria-controls={menuId}
          aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
          onClick={toggleMenu}
        >
          {menuOpen ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
        </button>

        <nav
          id={menuId}
          className={`site-header__nav${menuOpen ? ' site-header__nav--open' : ''}`}
          aria-label="Hoofdnavigatie"
        >
          <ul className="site-header__groups">
            {NAV_GROUPS.map((group) => {
              const active = groupIsActive(group.pathPrefix, location.pathname)
              return (
                <li
                  key={group.id}
                  className={`site-header__group${active ? ' site-header__group--active' : ''}${mobileOpenGroup === group.id ? ' site-header__group--mobile-open' : ''}`}
                >
                  <button
                    type="button"
                    className="site-header__group-trigger site-header__group-trigger--mobile"
                    aria-expanded={mobileOpenGroup === group.id}
                    onClick={() => toggleMobileGroup(group.id)}
                  >
                    <span>{group.label}</span>
                    <FiChevronDown
                      className={`site-header__chev${mobileOpenGroup === group.id ? ' site-header__chev--open' : ''}`}
                      aria-hidden
                    />
                  </button>
                  <span className="site-header__group-label site-header__group-label--desktop">
                    {group.label}
                    <FiChevronDown className="site-header__chev-desktop" aria-hidden />
                  </span>
                  <div className="site-header__dropdown-shell">
                    <ul className="site-header__dropdown">
                      {group.items.map(({ to, label }) => (
                        <li key={to}>
                          <NavLink
                            to={to}
                            className={linkClassName}
                            onClick={closeMenu}
                          >
                            {label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="site-header__ctas">
            {HEADER_CTAS.map(({ to, label, variant }) => (
              <Link
                key={to}
                to={to}
                className={
                  variant === 'primary'
                    ? 'hnb-btn hnb-btn--primary'
                    : 'hnb-btn hnb-btn--outline'
                }
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="site-header__login-wrap">
            <NavLink
              to="/login"
              className={loginClassName}
              onClick={closeMenu}
            >
              Inloggen
            </NavLink>
          </div>
        </nav>
      </div>

      <button
        type="button"
        className={`site-header__backdrop${menuOpen ? ' site-header__backdrop--visible' : ''}`}
        aria-label="Menu sluiten"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
    </header>
  )
}
