import './NetherlandsMap.css'

/** Vereenvoudigde kaart van Nederland met accent op Randstad / Amsterdam. */
export default function NetherlandsMap({ className = '' }) {
  return (
    <figure className={`ohb-map ${className}`.trim()} aria-label="Werkgebied Nederland">
      <svg
        className="ohb-map__svg"
        viewBox="0 0 100 120"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="false"
      >
        <title>Werkgebied Nederland — focus Randstad</title>
        <defs>
          <linearGradient id="ohb-land" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-mid-navy)" />
            <stop offset="100%" stopColor="var(--color-deep-navy)" />
          </linearGradient>
        </defs>
        {/* Vereenvoudigde omtrek Nederland */}
        <path
          className="ohb-map__land"
          fill="url(#ohb-land)"
          stroke="color-mix(in srgb, var(--color-gold) 40%, transparent)"
          strokeWidth="0.6"
          d="M 48 8 L 62 10 L 78 22 L 88 38 L 92 58 L 85 78 L 72 95 L 52 108 L 32 105 L 18 88 L 12 65 L 14 42 L 22 24 L 35 12 Z"
        />
        {/* Randstad approximatie (licht gebied) */}
        <ellipse
          className="ohb-map__randstad"
          cx="46"
          cy="44"
          rx="22"
          ry="16"
          fill="color-mix(in srgb, var(--color-gold) 12%, transparent)"
          stroke="color-mix(in srgb, var(--color-gold) 35%, transparent)"
          strokeWidth="0.4"
          strokeDasharray="2 2"
        />
        <circle className="ohb-map__dot" cx="48" cy="42" r="3.2" />
        <text className="ohb-map__label" x="54" y="40" fontSize="6" fill="var(--color-warm-white)">
          Amsterdam
        </text>
      </svg>
      <figcaption className="ohb-map__caption">
        Thuisbasis in de Randstad — landelijke programma&apos;s en multi-city reeksen op aanvraag.
      </figcaption>
    </figure>
  )
}
