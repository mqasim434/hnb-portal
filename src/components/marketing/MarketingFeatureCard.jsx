import { Link } from 'react-router-dom'

/**
 * Feature-tegel: homepage (`home-card*`) of freelancer hub (`fl-hub-card*`).
 * Styles komen uit de pagina-CSS (Home.css / freelancers-pages.css).
 * @param {'article' | 'li'} [props.as]
 * @param {'light' | 'mid' | 'hub'} props.variant
 * @param {string} [props.label] — alleen hub
 * @param {import('react').ReactNode} [props.icon] — light/mid
 * @param {string} props.title
 * @param {string} props.text
 * @param {string} [props.linkTo]
 * @param {string} [props.linkText]
 */
export default function MarketingFeatureCard({
  as: Tag = 'article',
  variant,
  label,
  icon,
  title,
  text,
  linkTo,
  linkText,
}) {
  if (variant === 'hub') {
    return (
      <Tag className="fl-hub-card">
        {label ? <span className="fl-hub-card__label">{label}</span> : null}
        <h3 className="fl-hub-card__title">{title}</h3>
        <p className="fl-hub-card__text">{text}</p>
        {linkTo && linkText ? (
          <Link to={linkTo} className="fl-hub-card__link">
            {linkText}
          </Link>
        ) : null}
      </Tag>
    )
  }

  const isMid = variant === 'mid'
  const rootClass = isMid ? 'home-card home-card--mid' : 'home-card home-card--light'
  const iconClass = isMid
    ? 'home-card__icon home-card__icon--on-dark'
    : 'home-card__icon'
  const titleClass = isMid
    ? 'home-card__title home-card__title--on-dark'
    : 'home-card__title'
  const textClass = isMid
    ? 'home-card__text home-card__text--muted-dark'
    : 'home-card__text'

  return (
    <Tag className={rootClass}>
      {icon ? (
        <div className={iconClass} aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <h3 className={titleClass}>{title}</h3>
      <p className={textClass}>{text}</p>
      {linkTo && linkText ? (
        <Link to={linkTo} className="home-card__link">
          {linkText}
        </Link>
      ) : null}
    </Tag>
  )
}
