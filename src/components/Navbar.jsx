import { useCallback, useEffect, useId, useState } from 'react'
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  HEADER_CTAS,
  MOBILE_MENU_PRIMARY_CTA,
  MOBILE_MENU_SECONDARY_CTA,
  NAV_GROUPS,
} from '../content/navigation'
import './Navbar.css'

function sublinkClassName({ isActive }) {
  return isActive
    ? 'site-header__sublink site-header__sublink--active'
    : 'site-header__sublink'
}

function loginClassName({ isActive }) {
  return isActive
    ? 'site-header__login site-header__login--active'
    : 'site-header__login'
}

function groupIsActive(group, pathname) {
  if (pathname.startsWith(group.pathPrefix)) return true
  if (group.id === 'freelancers' && pathname.startsWith('/register')) return true
  return group.items.some((item) => {
    if (item.to === '/register') return pathname.startsWith('/register')
    return pathname === item.to || pathname.startsWith(`${item.to}/`)
  })
}

export default function Navbar() {
  const menuId = useId()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpenGroup, setMobileOpenGroup] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
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
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), [])

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
      <div className="site-header__bar hnb-container">
        <Link to="/" className="site-header__logo" onClick={closeMenu}>
          <span className="site-header__logo-mark">H&amp;B</span>
          <span className="site-header__logo-name">Service Group</span>
        </Link>

        <nav
          className="site-header__nav-desktop"
          aria-label="Hoofdnavigatie"
        >
          <ul className="site-header__groups site-header__groups--desktop">
            {NAV_GROUPS.map((group) => {
              const active = groupIsActive(group, location.pathname)
              return (
                <li
                  key={group.id}
                  className={`site-header__group${active ? ' site-header__group--active' : ''}`}
                >
                  <span className="site-header__group-label">
                    {group.label}
                    <FiChevronDown className="site-header__chev-desktop" aria-hidden />
                  </span>
                  <div className="site-header__dropdown-shell">
                    <ul className="site-header__dropdown">
                      {group.items.map(({ to, label }) => (
                        <li key={to}>
                          <NavLink
                            to={to}
                            className={sublinkClassName}
                            end={to === '/register'}
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
        </nav>

        <div className="site-header__actions-desktop">
          {HEADER_CTAS.map(({ to, label, variant }) => (
            <Link
              key={to}
              to={to}
              className={
                variant === 'primary'
                  ? 'site-header__btn site-header__btn--primary'
                  : 'site-header__btn site-header__btn--outline'
              }
            >
              {label}
            </Link>
          ))}
          <NavLink to="/login" className={loginClassName}>
            Inloggen
          </NavLink>
        </div>

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
      </div>

      <div
        id={menuId}
        className={`site-header__drawer${menuOpen ? ' site-header__drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobiel menu"
      >
        <div className="site-header__drawer-scroll">
          <ul className="site-header__groups site-header__groups--mobile">
            {NAV_GROUPS.map((group) => {
              const open = mobileOpenGroup === group.id
              return (
                <li key={group.id} className="site-header__accordion">
                  <button
                    type="button"
                    className="site-header__accordion-trigger"
                    aria-expanded={open}
                    id={`${menuId}-${group.id}-btn`}
                    aria-controls={`${menuId}-${group.id}-panel`}
                    onClick={() => toggleMobileGroup(group.id)}
                  >
                    <span>{group.label}</span>
                    <FiChevronDown
                      className={`site-header__chev${open ? ' site-header__chev--open' : ''}`}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={`${menuId}-${group.id}-panel`}
                    role="region"
                    aria-labelledby={`${menuId}-${group.id}-btn`}
                    className={`site-header__accordion-panel${open ? ' site-header__accordion-panel--open' : ''}`}
                  >
                    <ul className="site-header__dropdown site-header__dropdown--mobile">
                      {group.items.map(({ to, label }) => (
                        <li key={to}>
                          <NavLink
                            to={to}
                            className={sublinkClassName}
                            end={to === '/register'}
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

          <div className="site-header__drawer-cta">
            <Link
              to={MOBILE_MENU_PRIMARY_CTA.to}
              className="site-header__btn site-header__btn--primary site-header__btn--block"
              onClick={closeMenu}
            >
              {MOBILE_MENU_PRIMARY_CTA.label}
            </Link>
            <Link
              to={MOBILE_MENU_SECONDARY_CTA.to}
              className="site-header__btn site-header__btn--outline site-header__btn--block"
              onClick={closeMenu}
            >
              {MOBILE_MENU_SECONDARY_CTA.label}
            </Link>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `site-header__login site-header__login--block${isActive ? ' site-header__login--active' : ''}`
              }
              onClick={closeMenu}
            >
              Inloggen
            </NavLink>
          </div>

          <div className="site-header__drawer-contact">
            <p className="site-header__drawer-contact-title">Contact</p>
            <ul className="site-header__drawer-contact-list">
              <li>
                <a href="mailto:bookings@hbservicegroup.com">
                  bookings@hbservicegroup.com
                </a>
              </li>
              <li>
                <a href="tel:+31200000000">+31 (0) 20 000 0000</a>
              </li>
              <li>
                <span className="site-header__drawer-contact-muted">
                  Amsterdam, Nederland
                </span>
              </li>
            </ul>
          </div>
        </div>
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
