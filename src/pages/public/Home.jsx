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
  FiSend,
  FiShield,
  FiUserCheck,
  FiUsers,
} from 'react-icons/fi'
import { getCanonicalOrigin, getCanonicalUrl } from '../../config/site'
import { HOME_SEO } from '../../content/homeSeo'
import ResponsivePicture from '../../components/performance/ResponsivePicture'
import MarketingBand from '../../components/marketing/MarketingBand'
import MarketingCtaStrip from '../../components/marketing/MarketingCtaStrip'
import MarketingFeatureCard from '../../components/marketing/MarketingFeatureCard'
import { usePageSeo } from '../../hooks/usePageSeo'
import './Home.css'

/* Donkere menigte / live event — achtergrond hero */
const heroImage =
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=2000&q=80'

const HERO_SIZES =
  '(max-width: 640px) 100vw, (max-width: 1200px) 100vw, min(2000px, 100vw)'

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
            alt="Publiek bij een live outdoor event — H&amp;B Service Group staffing voor hospitality en beveiliging."
            width={2000}
            height={1333}
            sizes={HERO_SIZES}
            priority
          />
        </div>
        <div className="home-hero__overlay" aria-hidden="true" />
        <div className="home-hero__grain" aria-hidden="true" />
        <div className="home-hero__inner hnb-container">
          <h1 id="home-hero-heading" className="home-hero__title">
            <span className="home-hero__title-line">Het juiste team.</span>
            <span className="home-hero__title-line">Op het juiste moment.</span>
          </h1>
          <p className="home-hero__lead">
            H&amp;B Service Group levert hospitality en beveiliging voor live
            events — vooraf gescreend, strak gebriefd en één coördinator van
            boeking tot afbouw.
          </p>
          <div className="home-hero__actions">
            <Link to="/bedrijven/personeel-aanvragen" className="hnb-btn hnb-btn--primary home-hero__btn">
              Personeel aanvragen
            </Link>
            <Link
              to="/freelancers/openstaande-opdrachten"
              className="hnb-btn hnb-btn--outline home-hero__btn home-hero__btn--outline"
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
        title="Hospitality en beveiliging in één roster"
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
        intro="Operators blijven bij ons omdat we ruis wegnemen: voorspelbare processen, minder verrassingen op site en teams die uw merk dragen."
      >
        <ul className="home-card-grid home-card-grid--2 home-card-grid--why">
          <MarketingFeatureCard
            as="li"
            variant="light"
            icon={<FiUserCheck />}
            title="Voorgecontroleerd"
            text="Werkrecht, vergunningen en rolpas vóór voorstel — minder improvisatie voor uw siteleiding."
          />
          <MarketingFeatureCard
            as="li"
            variant="light"
            icon={<FiSend />}
            title="Snel en strak gepland"
            text="Dispatch met bevestigde call times en vervanging wanneer het schuift — ook kort voor aanvang."
          />
          <MarketingFeatureCard
            as="li"
            variant="light"
            icon={<FiUsers />}
            title="Schaalbaar"
            text="Van intieme receptie tot volle zaal — hospitality en beveiliging in één plan."
          />
          <MarketingFeatureCard
            as="li"
            variant="light"
            icon={<FiHeadphones />}
            title="Eén aanspreekpunt"
            text="Dezelfde coördinator van briefing tot uitloop — minder overdracht, duidelijkere nazorg."
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
            text="Documentatie en checks die aansluiten op uw venue, verzekering en vergunning."
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

      {/* 6. Afsluitende CTA */}
      <MarketingCtaStrip
        prominent
        headingId="home-final-heading"
        title="Klaar voor het volgende event?"
        lead="Vraag personeel aan of ontdek openstaande opdrachten — wij helpen u verder binnen één werkdag."
        primaryTo="/bedrijven/personeel-aanvragen"
        primaryLabel="Personeel aanvragen"
        secondaryTo="/freelancers/openstaande-opdrachten"
        secondaryLabel="Openstaande opdrachten"
      />
    </main>
  )
}
