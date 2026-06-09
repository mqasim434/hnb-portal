import { useCallback, useEffect, useId, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { NavLink, useLocation } from 'react-router-dom'

/**
 * @param {{
 *   eyebrow: string
 *   links: Array<{ to: string, label: string }>
 *   userLabel?: string | null
 *   onLogout: () => void | Promise<void>
 *   navLabel: string
 * }} props
 */
export default function AppShellHeader({ eyebrow, links, userLabel, onLogout, navLabel }) {
  const menuId = useId()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    closeMenu()
  }, [location.pathname, closeMenu])

  useEffect(() => {
    if (!menuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, closeMenu])

  function navLinkClass(isActive) {
    return `app-shell__nav-link${isActive ? ' app-shell__nav-link--active' : ''}`
  }

  return (
    <>
      <header className="app-shell__header">
        <div className="app-shell__header-main">
          <div className="app-shell__brand">
            <span className="app-shell__eyebrow">{eyebrow}</span>
            <strong>H&amp;B Service Group</strong>
          </div>

          <nav className="app-shell__nav app-shell__nav--desktop" aria-label={navLabel}>
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => navLinkClass(isActive)}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="app-shell__user app-shell__user--desktop">
            {userLabel ? <span className="app-shell__email">{userLabel}</span> : null}
            <button
              type="button"
              className="hnb-btn hnb-btn--outline app-shell__logout"
              onClick={onLogout}
            >
              Uitloggen
            </button>
          </div>

          <button
            type="button"
            className="app-shell__menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
          </button>
        </div>
      </header>

      <div
        id={menuId}
        className={`app-shell__drawer${menuOpen ? ' app-shell__drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={navLabel}
      >
        <nav className="app-shell__nav app-shell__nav--mobile" aria-label={navLabel}>
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => navLinkClass(isActive)}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="app-shell__drawer-footer">
          {userLabel ? <span className="app-shell__email app-shell__email--drawer">{userLabel}</span> : null}
          <button
            type="button"
            className="hnb-btn hnb-btn--outline app-shell__logout app-shell__logout--block"
            onClick={() => {
              closeMenu()
              onLogout()
            }}
          >
            Uitloggen
          </button>
        </div>
      </div>

      <button
        type="button"
        className={`app-shell__backdrop${menuOpen ? ' app-shell__backdrop--visible' : ''}`}
        aria-label="Menu sluiten"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
    </>
  )
}
