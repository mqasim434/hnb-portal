import './PageRouteSkeleton.css'

/**
 * Route transition skeleton: reserves main column height to limit CLS while lazy chunks load.
 */
export default function PageRouteSkeleton() {
  return (
    <div className="page-route-skel" aria-busy="true" aria-label="Pagina laden">
      <div className="page-route-skel__hero" />
      <div className="page-route-skel__inner">
        <div className="page-route-skel__line page-route-skel__line--lg" />
        <div className="page-route-skel__line" />
        <div className="page-route-skel__line page-route-skel__line--short" />
        <div className="page-route-skel__grid">
          <div className="page-route-skel__card" />
          <div className="page-route-skel__card" />
          <div className="page-route-skel__card" />
        </div>
      </div>
    </div>
  )
}
