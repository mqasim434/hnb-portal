/**
 * Alternerende homepage-band (matcht bestaande `.home-band*` in Home.css).
 * @param {'light' | 'lightAlt' | 'dark'} props.tone
 * @param {string} props.titleId — id van de h2 (aria-labelledby op section)
 * @param {string} [props.eyebrow] — weggelaten of leeg: geen eyebrow
 * @param {string} props.title
 * @param {string} [props.intro] — weggelaten of leeg: geen introparagraaf
 * @param {import('react').ReactNode} props.children
 */
export default function MarketingBand({
  tone,
  titleId,
  eyebrow,
  title,
  intro,
  children,
}) {
  const hasEyebrow = eyebrow != null && String(eyebrow).trim() !== ''
  const hasIntro = intro != null && String(intro).trim() !== ''
  const bandClass =
    tone === 'dark'
      ? 'home-band home-band--dark'
      : tone === 'lightAlt'
        ? 'home-band home-band--light home-band--light-alt'
        : 'home-band home-band--light'

  const headerClass =
    tone === 'dark'
      ? 'home-band__header home-band__header--on-dark'
      : 'home-band__header'

  const eyebrowClass =
    tone === 'dark'
      ? 'home-band__eyebrow home-band__eyebrow--on-dark'
      : 'home-band__eyebrow'

  const titleClass =
    tone === 'dark'
      ? 'home-band__title home-band__title--on-dark'
      : 'home-band__title'

  const introClass =
    tone === 'dark'
      ? 'home-band__intro home-band__intro--on-dark'
      : 'home-band__intro'

  return (
    <section className={bandClass} aria-labelledby={titleId}>
      <div className="home-band__inner hnb-container">
        <header className={headerClass}>
          {hasEyebrow ? <p className={eyebrowClass}>{eyebrow}</p> : null}
          <h2 id={titleId} className={titleClass}>
            {title}
          </h2>
          {hasIntro ? <p className={introClass}>{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  )
}
