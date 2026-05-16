import ResponsivePicture from '../performance/ResponsivePicture'
import './PageHero.css'

/**
 * Herbruikbare marketinghero (mobiel-eerst).
 * @param {'light' | 'dark' | 'navy'} [props.variant]
 * @param {string} [props.eyebrow]
 * @param {import('react').ReactNode} props.title
 * @param {string} [props.lead]
 * @param {string} [props.imageUrl] — alleen bij variant dark + image overlay
 * @param {string} [props.imageAlt]
 * @param {number} [props.imageWidth] — intrinsieke breedte (CLS)
 * @param {number} [props.imageHeight] — intrinsieke hoogte (CLS)
 * @param {boolean} [props.imagePriority] — LCP / boven de vouw (Unsplash responsive + prioriteit)
 * @param {React.ReactNode} [props.children]
 * @param {boolean} [props.stackCtasOnMobile]
 */
export default function PageHero({
  variant = 'light',
  eyebrow,
  title,
  lead,
  imageUrl,
  imageAlt = '',
  imageWidth = 1600,
  imageHeight = 1000,
  imagePriority = true,
  children,
  stackCtasOnMobile = false,
}) {
  const useImage = Boolean(imageUrl) && variant === 'dark'
  const imgDecorative = !imageAlt

  return (
    <header
      className={`page-hero page-hero--${variant}${useImage ? ' page-hero--with-image' : ''}`}
      aria-labelledby="page-hero-title"
    >
      {useImage ? (
        <div className="page-hero__visual" aria-hidden={imgDecorative ? true : undefined}>
          <ResponsivePicture
            className="page-hero__picture"
            imgClassName="page-hero__img"
            src={imageUrl}
            alt={imgDecorative ? '' : imageAlt}
            width={imageWidth}
            height={imageHeight}
            sizes="100vw"
            priority={imagePriority}
          />
          <div className="page-hero__scrim" />
        </div>
      ) : null}
      <div className="page-hero__inner hnb-container">
        {eyebrow ? (
          <p className="page-hero__eyebrow">{eyebrow}</p>
        ) : null}
        <h1 id="page-hero-title" className="page-hero__title">
          {title}
        </h1>
        {lead ? <p className="page-hero__lead">{lead}</p> : null}
        {children ? (
          <div
            className={`page-hero__slot${stackCtasOnMobile ? ' page-hero__slot--mobile-stack' : ''}`}
          >
            {children}
          </div>
        ) : null}
      </div>
    </header>
  )
}
