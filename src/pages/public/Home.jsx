import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  FiAward,
  FiBriefcase,
  FiHeadphones,
  FiMapPin,
  FiShield,
  FiUserCheck,
  FiUsers,
} from 'react-icons/fi'
import { getCanonicalOrigin, getCanonicalUrl } from '../../config/site'
import { CLIENT_PROCESS_STEPS } from '../../content/clientProcessSteps'
import { HOME_SEO } from '../../content/homeSeo'
import { HOME_PAGE_HERO } from '../../content/marketingHeroImages'
import ResponsivePicture from '../../components/performance/ResponsivePicture'
import MarketingBand from '../../components/marketing/MarketingBand'
import MarketingCtaStrip from '../../components/marketing/MarketingCtaStrip'
import MarketingFeatureCard from '../../components/marketing/MarketingFeatureCard'
import { usePageSeo } from '../../hooks/usePageSeo'
import './Home.css'

const { src: heroImage, width: heroWidth, height: heroHeight, alt: heroAlt } = HOME_PAGE_HERO

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
              Servicemedewerkers en beveiliging voor uw organisatie.
            </span>
            <span className="home-hero__title-line home-hero__title-line--secondary">
              Één contactpersoon. Duidelijke afspraken.
            </span>
          </h1>
          <p className="home-hero__lead">
            Gescreend personeel voor ISG, COA, horeca, objecten, kermissen en bedrijven — van intake tot
            evaluatie, met één vaste coördinator.
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

      {/* 2. Wat wij leveren */}
      <MarketingBand
        tone="light"
        titleId="home-leveren-heading"
        eyebrow="Wat wij leveren"
        title="Twee hoofdcategorieën, één aanspreekpunt"
        intro="Servicemedewerkers (hosts) en beveiliging — afgestemd op uw sector, locatie en compliance-eisen."
      >
        <div className="home-card-grid home-card-grid--2">
          <MarketingFeatureCard
            variant="light"
            icon={<FiUsers />}
            title="Servicemedewerkers (hosts)"
            text="Ontvangst, routing en representatie voor horeca, evenementen, bedrijven en publieke locaties — professioneel en afgestemd op uw verwachtingen."
            linkTo="/bedrijven/functies"
            linkText="Functieprofielen bekijken"
          />
          <MarketingFeatureCard
            variant="light"
            icon={<FiShield />}
            title="Beveiliging"
            text="Portiers, eventbeveiliging en objectbeveiliging met focus op toegang, de-escalatie en heldere lijn met uw locatie — conform diploma en beveiligingspas."
            linkTo="/bedrijven/functies"
            linkText="Functieprofielen bekijken"
          />
        </div>
      </MarketingBand>

      {/* 3. Waar wij actief zijn */}
      <MarketingBand
        tone="dark"
        titleId="home-actief-heading"
        eyebrow="Waar wij actief zijn"
        title="Breed inzetbaar in Nederland"
        intro="Van ISG en COA tot horeca, objecten en kermissen — wij schalen mee zonder kwaliteit te verliezen."
      >
        <ul className="home-card-grid home-card-grid--4">
          <MarketingFeatureCard
            as="li"
            variant="mid"
            icon={<FiBriefcase />}
            title="ISG & evenementen"
            text="Servicemedewerkers en beveiliging voor festivals en evenementenprogramma's."
          />
          <MarketingFeatureCard
            as="li"
            variant="mid"
            icon={<FiMapPin />}
            title="COA & publieke sector"
            text="Inzet voor COA-locaties, gemeenten en publieke opdrachtgevers."
          />
          <MarketingFeatureCard
            as="li"
            variant="mid"
            icon={<FiUsers />}
            title="Bedrijven & horeca"
            text="Hosts en beveiliging voor recepties, congressen en horecalocaties."
          />
          <MarketingFeatureCard
            as="li"
            variant="mid"
            icon={<FiShield />}
            title="Objecten & kermissen"
            text="Objectbeveiliging en serviceteams voor vaste locaties en terreinen."
          />
        </ul>
      </MarketingBand>

      {/* 4. Waarom H&B */}
      <MarketingBand
        tone="lightAlt"
        titleId="home-waarom-heading"
        eyebrow="Waarom H&amp;B"
        title="Een partner op de vloer"
        intro="Opdrachtgevers kiezen voor ons omdat we zekerheid bieden: heldere processen, betrouwbare teams en personeel dat uw locatie begrijpt."
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
            text="Van intake tot evaluatie — minder overdracht en snellere besluiten als het programma schuift."
          />
          <MarketingFeatureCard
            as="li"
            variant="light"
            icon={<FiShield />}
            title="Compliance-first"
            text="Documentatie en screening vóór inzet — diploma's, passen en identiteit digitaal beheerd via ons portaal, aantoonbaar voor uw locatie en verzekeraar."
          />
        </ul>
      </MarketingBand>

      {/* 5. Vertrouwen */}
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
            text="Digitale documentatie en checks die aansluiten op uw locatie, verzekering en vergunningscontext."
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

      {/* 6. Sectoren */}
      <MarketingBand
        tone="lightAlt"
        titleId="home-sectoren-heading"
        eyebrow="SECTOREN"
        title="Waar we werken"
        intro="ISG, COA, bedrijven, gemeenten, horeca, evenementen, objecten en kermissen — wij stemmen bezetting af op uw programma, niet op een standaardpakket."
      >
        <ul className="home-sector-grid">
          <li className="home-sector-grid__item">
            <Link to="/bedrijven/sectoren" className="home-sector-tile">
              ISG &amp; evenementen
            </Link>
          </li>
          <li className="home-sector-grid__item">
            <Link to="/bedrijven/sectoren" className="home-sector-tile">
              COA &amp; publieke sector
            </Link>
          </li>
          <li className="home-sector-grid__item">
            <Link to="/bedrijven/sectoren" className="home-sector-tile">
              Bedrijven &amp; horeca
            </Link>
          </li>
          <li className="home-sector-grid__item">
            <Link to="/bedrijven/sectoren" className="home-sector-tile">
              Objecten &amp; kermissen
            </Link>
          </li>
        </ul>
      </MarketingBand>

      {/* 7. Zo werkt het */}
      <MarketingBand tone="light" titleId="home-how-heading" title="Zo werkt het">
        <ol className="home-how__steps">
          {CLIENT_PROCESS_STEPS.map((step, index) => (
            <li key={step.title} className="home-how__step">
              <span className="home-how__step-num" aria-hidden="true">
                {index + 1}
              </span>
              <div className="home-how__step-copy">
                <h3 className="home-how__step-title">{step.title}</h3>
                <p className="home-how__step-text">{step.body}</p>
              </div>
            </li>
          ))}
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
        title="Klaar om personeel aan te vragen?"
        lead="Deel uw vraag. Wij reageren binnen 24 uur met capaciteit en een prijsopgave op aanvraag."
        primaryTo="/bedrijven/personeel-aanvragen"
        primaryLabel="Personeel aanvragen"
        secondaryTo="/freelancers/openstaande-opdrachten"
        secondaryLabel="Openstaande opdrachten"
      />
    </main>
  )
}
