import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  FiAward,
  FiBriefcase,
  FiCoffee,
  FiHeadphones,
  FiMapPin,
  FiMoon,
  FiMusic,
  FiShield,
  FiUserCheck,
} from 'react-icons/fi'
import { getCanonicalOrigin, getCanonicalUrl } from '../../config/site'
import { HOME_SEO } from '../../content/homeSeo'
import { CORPORATE_DAYLIGHT_EVENT_HERO } from '../../content/marketingHeroImages'
import ResponsivePicture from '../../components/performance/ResponsivePicture'
import MarketingBand from '../../components/marketing/MarketingBand'
import MarketingCtaStrip from '../../components/marketing/MarketingCtaStrip'
import MarketingFeatureCard from '../../components/marketing/MarketingFeatureCard'
import { usePageSeo } from '../../hooks/usePageSeo'
import './Home.css'

const { src: heroImage, width: heroWidth, height: heroHeight, alt: heroAlt } =
  CORPORATE_DAYLIGHT_EVENT_HERO

const HERO_SIZES =
  '(max-width: 640px) 100vw, (max-width: 1200px) 100vw, min(2400px, 100vw)'

export default function Home() {
  const homeJsonLd = useMemo(() => {
    const origin = getCanonicalOrigin()
    if (!origin) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: HOME_SEO.title,
      description: HOME_SEO.description,
      url: getCanonicalUrl('/'),
      isPartOf: { '@id': `${origin}/#website` },
    }
  }, [])

  usePageSeo({
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    canonicalPath: HOME_SEO.canonicalPath,
    jsonLd: homeJsonLd,
    ogImage: heroImage,
  })

  return (
    <main className="home-page">
      {/* 1. Hero */}
      <section className="home-hero" aria-labelledby="home-hero-heading">
        <div className="home-hero__media">
          <ResponsivePicture
            className="home-hero__picture"
            imgClassName="home-hero__img-el"
            src={heroImage}
            alt={heroAlt}
            width={heroWidth}
            height={heroHeight}
            sizes={HERO_SIZES}
            priority
          />
        </div>
        <div className="home-hero__overlay" aria-hidden="true" />
        <div className="home-hero__grain" aria-hidden="true" />
        <div className="home-hero__inner hnb-container">
          <h1 id="home-hero-heading" className="home-hero__title">
            <span className="home-hero__title-line">
              Hospitality én beveiliging voor live events.
            </span>
            <span className="home-hero__title-line home-hero__title-line--secondary">
              Eén briefing. Eén coördinator. Compliance op orde.
            </span>
          </h1>
          <p className="home-hero__lead">
            H&amp;B Service Group levert vooraf gescreend hospitality- en beveiligingspersoneel
            voor festivals, venues en zakelijke events — met één vaste coördinator van boeking tot
            afbouw.
          </p>
          <div className="home-hero__actions">
            <Link to="/bedrijven/personeel-aanvragen" className="hnb-btn hnb-btn--primary home-hero__btn">
              Personeel aanvragen
            </Link>
            <Link
              to="/freelancers/openstaande-opdrachten"
              className="hnb-btn hnb-btn--freelancer home-hero__btn"
            >
              Openstaande opdrachten
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Wat wij leveren — licht, witte kaarten */}
      <MarketingBand
        tone="light"
        titleId="home-leveren-heading"
        eyebrow="Wat wij leveren"
        title="Hospitality en beveiliging in één rooster"
        intro="Van gastgericht team tot gecontroleerde toegang — wij matchen het juiste profiel aan het tempo, de risico’s en de compliance van uw event."
      >
        <div className="home-card-grid home-card-grid--2">
          <MarketingFeatureCard
            variant="light"
            icon={<FiCoffee />}
            title="Hospitality-medewerkers"
            text="Hosts, barteams en ondersteuning voor hoge drukte — afgestemd op uw programma, merkstandaarden en verantwoorde service."
            linkTo="/bedrijven/functies"
            linkText="Functieprofielen bekijken"
          />
          <MarketingFeatureCard
            variant="light"
            icon={<FiShield />}
            title="Beveiligingsmedewerkers"
            text="Bevoegde portiers en eventbeveiliging met focus op toegang, de-escalatie en heldere lijn met uw productie — zonder de gastbeleving te schaden."
            linkTo="/bedrijven/functies"
            linkText="Functieprofielen bekijken"
          />
        </div>
      </MarketingBand>

      {/* 3. Waar wij actief zijn — donker, mid-navy kaarten */}
      <MarketingBand
        tone="dark"
        titleId="home-actief-heading"
        eyebrow="Waar wij actief zijn"
        title="Gebouwd voor veeleisende omgevingen"
        intro="Korte lijnen, wisselende bezetting en pieken tot laat horen bij ons vak — we schalen mee zonder kwaliteit te verliezen."
      >
        <ul className="home-card-grid home-card-grid--4">
          <MarketingFeatureCard
            as="li"
            variant="mid"
            icon={<FiMusic />}
            title="Festivals"
            text="Opbouw, perimeter en backstage — teams die pieken aankunnen als het programma versnelt."
          />
          <MarketingFeatureCard
            as="li"
            variant="mid"
            icon={<FiBriefcase />}
            title="Zakelijke events"
            text="Galas en launches met discrete uniformen en beveiliging die op de achtergrond blijft."
          />
          <MarketingFeatureCard
            as="li"
            variant="mid"
            icon={<FiMoon />}
            title="Nachtleven"
            text="Clubs en late locaties: ID, zaal en bar met het juiste ritme."
          />
          <MarketingFeatureCard
            as="li"
            variant="mid"
            icon={<FiMapPin />}
            title="Locaties"
            text="Arena&apos;s en theaters met terugkerende bezetting en vaste gezichten waar u dat wilt."
          />
        </ul>
      </MarketingBand>

      {/* 4. Waarom H&B — licht, witte kaarten */}
      <MarketingBand
        tone="lightAlt"
        titleId="home-waarom-heading"
        eyebrow="Waarom H&amp;B"
        title="Een partner op de vloer, geen lijst met namen"
        intro="Operators blijven bij ons omdat we ruis wegnemen: voorspelbare processen, minder verrassingen op locatie en teams die uw merk dragen."
      >
        <ul className="home-card-grid home-card-grid--3">
          <MarketingFeatureCard
            as="li"
            variant="light"
            icon={<FiUserCheck />}
            title="Voorgecontroleerde professionals"
            text="Werkrecht, certificaten en referenties gecontroleerd vóór bevestiging op het rooster."
          />
          <MarketingFeatureCard
            as="li"
            variant="light"
            icon={<FiHeadphones />}
            title="Eén vaste coördinator"
            text="Van briefing tot afbouw — minder overdracht, snellere besluiten als het programma schuift."
          />
          <MarketingFeatureCard
            as="li"
            variant="light"
            icon={<FiShield />}
            title="Compliance-first"
            text="Roosters afgestemd op locatie, RI&amp;E en vergunningen — aantoonbaar in orde voor de eerste shift."
          />
        </ul>
      </MarketingBand>

      {/* 5. Vertrouwen — donker, mid-navy kaarten */}
      <MarketingBand
        tone="dark"
        titleId="home-trust-heading"
        eyebrow="Vertrouwen"
        title="Wat u van ons mag verwachten"
        intro="Transparantie, naleving en mensen die zich professioneel gedragen — op elke shift."
      >
        <ul className="home-card-grid home-card-grid--3">
          <MarketingFeatureCard
            as="li"
            variant="mid"
            icon={<FiShield />}
            title="Compliance op orde"
            text="Documentatie en checks die aansluiten op uw locatie, verzekering en vergunning."
          />
          <MarketingFeatureCard
            as="li"
            variant="mid"
            icon={<FiAward />}
            title="Kwaliteit op de vloer"
            text="Ervaren coördinatoren en teams die weten wat er gebeurt als de zaal volstroomt."
          />
          <MarketingFeatureCard
            as="li"
            variant="mid"
            icon={<FiUserCheck />}
            title="Afspraak is afspraak"
            text="Heldere verwachtingen over planning, vergoeding en communicatie — voor opdrachtgever en professional."
          />
        </ul>
      </MarketingBand>

      {/* 6. Sectoren — teaser naar sectorenpagina */}
      <MarketingBand
        tone="lightAlt"
        titleId="home-sectoren-heading"
        eyebrow="SECTOREN"
        title="Waar we werken"
        intro="Van festivalterrein tot zakelijke receptie. Elk segment vraagt een andere verhouding tussen hospitality en beveiliging — wij stemmen het rooster af op uw programma, niet op een standaardpakket."
      >
        <ul className="home-sector-grid">
          <li className="home-sector-grid__item">
            <Link to="/bedrijven/sectoren" className="home-sector-tile">
              Festivals &amp; buitenprogramma&apos;s
            </Link>
          </li>
          <li className="home-sector-grid__item">
            <Link to="/bedrijven/sectoren" className="home-sector-tile">
              Corporate &amp; private events
            </Link>
          </li>
          <li className="home-sector-grid__item">
            <Link to="/bedrijven/sectoren" className="home-sector-tile">
              Nachtleven &amp; venues
            </Link>
          </li>
          <li className="home-sector-grid__item">
            <Link to="/bedrijven/sectoren" className="home-sector-tile">
              Theaters, arena&apos;s &amp; multifunctionele locaties
            </Link>
          </li>
        </ul>
      </MarketingBand>

      {/* 7. Zo werkt het — preview met link naar volledige aanpak */}
      <MarketingBand tone="light" titleId="home-how-heading" title="Zo werkt het">
        <ol className="home-how__steps">
          <li className="home-how__step">
            <span className="home-how__step-num" aria-hidden="true">
              1
            </span>
            <div className="home-how__step-copy">
              <h3 className="home-how__step-title">Verkenning &amp; scope</h3>
              <p className="home-how__step-text">
                Wij brengen data, bezetting en risicoprofiel in kaart.
              </p>
            </div>
          </li>
          <li className="home-how__step">
            <span className="home-how__step-num" aria-hidden="true">
              2
            </span>
            <div className="home-how__step-copy">
              <h3 className="home-how__step-title">Rooster &amp; akkoord</h3>
              <p className="home-how__step-text">
                Voorstel met rollen en call times, definitief na uw goedkeuring.
              </p>
            </div>
          </li>
          <li className="home-how__step">
            <span className="home-how__step-num" aria-hidden="true">
              3
            </span>
            <div className="home-how__step-copy">
              <h3 className="home-how__step-title">Briefing &amp; inzet</h3>
              <p className="home-how__step-text">
                Één pakket: locatie, dresscode, escalatie, contacten.
              </p>
            </div>
          </li>
          <li className="home-how__step">
            <span className="home-how__step-num" aria-hidden="true">
              4
            </span>
            <div className="home-how__step-copy">
              <h3 className="home-how__step-title">Op locatie &amp; evaluatie</h3>
              <p className="home-how__step-text">
                Coördinator bereikbaar tijdens het event, nabespreking na afloop.
              </p>
            </div>
          </li>
        </ol>
        <div className="home-how__cta-wrap">
          <Link to="/over-hb/onze-aanpak" className="home-how__cta">
            Lees de volledige aanpak →
          </Link>
        </div>
      </MarketingBand>

      {/* 8. Afsluitende CTA */}
      <MarketingCtaStrip
        prominent
        headingId="home-final-heading"
        title="Klaar voor uw volgende event?"
        lead="Vertel ons over programma, locatie en bezetting — wij reageren binnen één werkdag met capaciteit en vervolgstappen."
        primaryTo="/bedrijven/personeel-aanvragen"
        primaryLabel="Personeel aanvragen"
        secondaryTo="/freelancers/direct-aanmelden"
        secondaryLabel="Freelancer worden"
      />
    </main>
  )
}
