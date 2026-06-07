/**
 * Dutch marketing copy for info pages (keyed for StaticMarketingPage).
 */

export const MARKETING_PAGES = {
  'fl-zo-werkt-het': {
    eyebrow: 'FREELANCERS',
    title: 'Hoe het werkt',
    lead: 'Van aanmelding tot definitieve bevestiging op de planning: heldere stappen en vaste afspraken, zodat u weet wat u kunt verwachten.',
    sections: [],
  },

  'fl-inkomsten-betalingen': {
    eyebrow: 'Freelancers',
    title: 'Inkomsten & betalingen',
    lead: 'Eerlijke afspraken over tarieven, doorbelasting en betaaltermijnen — zodat u zich op het werk kunt concentreren.',
    sections: [
      {
        heading: 'Structuur van vergoedingen',
        paragraphs: [
          'Vergoedingen zijn gekoppeld aan functie, type evenement en geldende cao- of ketenafspraken waar van toepassing. Voor elke shift ontvangt u vooraf inzicht in het overeengekomen tarief of de vergoedingsregel.',
        ],
      },
      {
        heading: 'Uren en facturatie',
        paragraphs: [
          "Gewerkte uren worden vastgelegd volgens het mutatieproces van de opdrachtgever en H&B. Werkt u in loondienst of via payroll, dan verloopt de afhandeling via het voorgeschreven kanaal. Werkt u als zzp'er, dan factureert u volgens de geldende richtlijn en de modelovereenkomst die wij met u afsluiten. Alle stappen vindt u terug in het portaal.",
        ],
      },
      {
        heading: 'Welk contract krijgt u?',
        paragraphs: [
          'Wij werken vanuit drie kanalen: loondienst (oproep- of min-max-contract), payroll via een gespecialiseerde partner, of zzp via een door de Belastingdienst geaccepteerde modelovereenkomst. Welk kanaal voor u geldt, hangt af van uw situatie en het type opdracht.',
        ],
        bullets: [
          'Loondienst: voor structurele inzet, met opbouw van vakantiegeld en pensioenrechten waar van toepassing.',
          'Payroll: voor flexibele inzet zonder eigen administratie — uw werkgeverschap loopt via onze payrollpartner.',
          'zzp: alleen mogelijk wanneer u aantoonbaar voor meerdere opdrachtgevers werkt en de modelovereenkomst Wet DBA is ondertekend.',
        ],
        closing:
          'Twijfelt u welk kanaal bij u past? Uw coördinator denkt mee — dat voorkomt problemen achteraf voor u én voor de opdrachtgever.',
      },
      {
        heading: 'Betaaltermijn',
        bullets: [
          'Standaard verwerking na akkoord op de geregistreerde uren, tenzij anders contractueel afgesproken.',
          'Bij afwijkingen meldt u dit via uw coördinator; wij begeleiden correctie met de opdrachtgever.',
        ],
      },
    ],
  },

  'fl-veiligheid-certificering': {
    eyebrow: 'Freelancers',
    title: 'Jouw certificering',
    lead: 'We roosteren alleen mensen die passen bij de risico’s en compliance-eisen van de locatie — voor uw veiligheid, die van collega’s en bezoekers.',
    sections: [
      {
        heading: 'Certificaten en vergunningen',
        paragraphs: [
          'Voor beveiligingswerk zijn geldige diploma’s en vergunningen verplicht. Voor hospitality-rollen kunnen extra eisen gelden (hygiëne, sociale hygiëne, BHV). U uploadt kopieën veilig in het onboardingtraject; wij controleren actualiteit.',
        ],
      },
      {
        heading: 'RI&E en locatie-instructies',
        paragraphs: [
          'U ontvangt voor aanvang informatie over calamiteitenroutes, meldpunten en specifieke locatieregels. Op onrustige events stemmen we bezetting en functiemix af op het risicoprofiel.',
        ],
      },
      {
        heading: 'Melden van incidenten',
        bullets: [
          'Incidenten en bijna-incidenten altijd direct melden aan de locatiecoördinator en H&B.',
          'We ondersteunen bij documentatie als de opdrachtgever rapportage vereist.',
        ],
      },
    ],
  },

  'fl-werkwijze': {
    eyebrow: 'Freelancers',
    title: 'Werkwijze',
    lead: 'Praktische afspraken over communicatie, planning en representativiteit op locatie.',
    sections: [
      {
        heading: 'Planning en beschikbaarheid',
        paragraphs: [
          'U geeft uw beschikbaarheid actueel door. Aanvragen worden gematcht op skills en voorkeur. Een bevestigde shift verwachten wij dat u op tijd bent, tenzij u tijdig afmeldt volgens de overeengekomen regels.',
        ],
      },
      {
        heading: 'Communicatie',
        paragraphs: [
          'Briefings en wijzigingen lopen via vaste kanalen — geen versnipperde apps zonder overzicht. Belangrijke updates worden herhaald tot aan aanvang van de shift.',
        ],
      },
      {
        heading: 'Representativiteit',
        bullets: [
          'Professioneel gedrag, juiste uniformen of dresscode, respectvolle omgang met gasten en collega’s.',
          'Alcohol- en drugsbeleid: nul tolerantie op locatie tenzij uitdrukkelijk anders afgestemd voor een functie.',
        ],
      },
    ],
  },

  'fl-aan-de-slag': {
    eyebrow: 'Freelancers',
    title: 'Aan de slag',
    lead: 'Klaar om mee te doen? Start met registratie en zet uw profiel klaar voor de eerste uitnodiging.',
    sections: [
      {
        heading: 'Stappen',
        bullets: [
          'Account aanmaken en registratieformulier invullen.',
          'Documenten uploaden en wachten op bevestiging vanuit H&B.',
          'Na goedkeuring: shifts bekijken en accepteren die bij u passen.',
        ],
      },
      {
        heading: 'Hulp nodig?',
        paragraphs: [
          'Neem contact op via de contactpagina of spreek uw coördinator aan als u al in onboarding zit. We denken mee over ontbrekende documenten of specifieke vragen over certificering.',
        ],
      },
    ],
    ctas: [{ to: '/freelancers/direct-aanmelden', label: 'Nu registreren', primary: true }],
  },

  'bv-vergelijk-professionals': {
    eyebrow: 'Bedrijven',
    title: 'Vergelijk professionals',
    lead: 'Objectieve selectie op basis van ervaring, certificaten en referenties — geen verrassingen achter de deur.',
    sections: [
      {
        heading: 'Profielen',
        paragraphs: [
          'U ziet per voorgestelde professional de relevante werkervaring, rolhistorie en actuele diploma’s. Waar mogelijk tonen we ook terugkerende inzet bij vergelijkbare events of locaties.',
        ],
      },
      {
        heading: 'Transparant rooster',
        paragraphs: [
          'Niets wordt bevestigd zonder uw akkoord op de namen en tijdslots. Wijzigingen door omstandigheden op een event begeleiden we met directe communicatie en, waar nodig, vervanging op gelijkwaardig niveau.',
        ],
      },
    ],
    ctas: [
      { to: '/bedrijven/personeel-aanvragen', label: 'Talent aanvragen', primary: true },
    ],
  },

  'bv-tarieven': {
    eyebrow: 'Bedrijven',
    title: 'Tarieven',
    lead: 'Heldere scopes en tariefkaarten per type inzet — afgestemd op duur, risicoklasse en doorlooptijd van het project.',
    indicativeEyebrow: 'INDICATIE',
    indicativeTitle: 'Indicatieve tarieven per rol',
    indicativeIntro:
      'Onderstaande bedragen zijn richtprijzen voor reguliere inzet (dagdienst, doordeweeks). Definitieve tarieven volgen in de offerte en zijn afhankelijk van duur, risicoklasse, doorlooptijd en eventuele toeslagen.',
    indicativeRates: [
      'Host / hostess — vanaf €29 per uur',
      'Bar & service — vanaf €29 per uur',
      'Portier / eventbeveiliging — vanaf €35 per uur',
      'Runner / productie — vanaf €27 per uur',
    ],
    indicativeSurcharge:
      'Toeslagen kunnen gelden voor nachturen, weekenddiensten, feestdagen, hoog-risico-events en spoedinzet binnen 72 uur.',
    quoteHeading: 'Offerte op maat',
    quoteBody:
      'Voor een concreet voorstel hebben wij inzicht nodig in data, bezetting, type rol (hospitality, beveiliging, podiumondersteuning), locatie en eventuele nacht- of feestdagentoeslagen. Vraag vrijblijvend capaciteit aan via het formulier voor personeelsaanvragen.',
    quoteCta: { to: '/bedrijven/personeel-aanvragen', label: 'Personeelsaanvraag indienen' },
    ctas: [{ to: '/bedrijven/personeel-aanvragen', label: 'Personeelsaanvraag indienen', primary: true }],
  },

  'bv-filters': {
    eyebrow: 'Bedrijven',
    title: 'Filters',
    lead: 'Verfijn uw zoekopdracht naar skills, talen, certificaten en beschikbaarheid — zodat het rooster naadloos op uw productie past.',
    sections: [
      {
        heading: 'Beschikbare filterdimensies',
        bullets: [
          'Rol en senioriteit (host, bar, beveiliging, algemeen event).',
          'Taal en gastgerichtheid.',
          'Certificering (SGHV, BHV, beveiliging, etc.).',
          'Beschikbaarheid en reisbereidheid binnen regio’s.',
        ],
      },
      {
        heading: 'Werken met uw coördinator',
        paragraphs: [
          'Complexe combinaties (bijvoorbeeld gemengde teams met vaste kern en flexibele opbouw) stemmen we persoonlijk met u af. Zo blijft overzicht in planning en compliance gewaarborgd.',
        ],
      },
    ],
  },

  'bv-sectoren': {
    eyebrow: 'Bedrijven',
    title: 'Sectoren',
    lead: 'Van festivalterrein tot zakelijke receptie: wij kennen het tempo en de risico’s van verschillende sectoren.',
    sections: [
      {
        heading: 'Sectorspecifieke compliance',
        paragraphs: [
          'Vergunningseisen en huisregels van de locatie verschillen per locatie. We stemmen roosters af op lokale eisen en de RI&E van uw productie, zodat vergunningen en verzekeringen niet onder druk komen.',
        ],
      },
    ],
  },

  'bv-flexpools': {
    eyebrow: 'Bedrijven',
    title: 'Flexpools',
    lead: 'Een vaste pool flexibele professionals die uw huisstijl en werkwijze kennen — klaar voor pieken, zonder dat u dagelijks opnieuw hoeft te briefen.',
    sections: [
      {
        heading: 'Opbouw van een pool',
        paragraphs: [
          'Samen definiëren we het profiel (skills, uniformen, voorkeursplanning). Wij werven en screenen kandidaten; u keurt de kern goed. Daarna plannen we vanuit die pool met voorrang op vertrouwdheid en prestaties.',
        ],
      },
      {
        heading: 'Voordelen',
        bullets: [
          'Snellere inzet bij last-minute wijzigingen — bekende mensen reageren sneller op spoedoproepen.',
          'Minder uitleg op locatie doordat teams uw locatie, huisregels en publiek kennen.',
          'Consistente service en herkenbaarheid voor terugkerende bezoekers.',
          'Lagere uitval doordat planners en medewerkers elkaar persoonlijk kennen.',
          'Voorspelbare kostenstructuur door langetermijnafspraken op tarief en bandbreedte.',
        ],
      },
    ],
    ctas: [{ to: '/contact', label: 'Flexpool bespreken', primary: true }],
  },

  'hb-wie-wij-zijn': {
    eyebrow: 'Over H&B Service Group',
    title: 'Wie wij zijn',
    lead: 'Planners en coördinatoren die het vak van live events serieus nemen — mensen die weten hoe laat de omschakeling begint en wat er op de vloer nodig is.',
    ctas: [{ to: '/over-hb/ons-verhaal', label: 'Lees meer over ons' }],
  },

  'hb-wat-wij-doen': {
    eyebrow: 'Over H&B Service Group',
    title: 'Wat wij doen',
    lead: 'Wij verbinden organisatoren van live events met gescreend hospitality- en beveiligingspersoneel — van eerste brief tot uitloop.',
    sections: [
      {
        heading: 'Wat wij voor u regelen',
        bullets: [
          'Werving, screening en onboarding van nieuwe mensen voor uw programma.',
          'Controle op diploma’s, geldigheid van passen en certificeringen.',
          'Roosterwijzigingen en vervanging bij uitval, ook in het weekend en in de avond.',
          'Mutatie- en urenadministratie volgens afspraak met uw financiële afdeling.',
          'Communicatie met dienstdoende managers en productie tijdens het event.',
          'Naleving van WPBR, Waadi, Wet DBA en AVG vanuit onze kant — gedocumenteerd.',
        ],
      },
    ],
    ctas: [
      { to: '/bedrijven/functies', label: 'Functies & diensten', primary: true },
      { to: '/freelancers/openstaande-opdrachten', label: 'Werken via H&B' },
    ],
  },

  'hb-nieuws': {
    eyebrow: 'OVER H&B SERVICE GROUP',
    title: 'Nieuws',
    lead: 'Updates over samenwerkingen, platformverbeteringen en kijk achter de schermen bij H&B.',
  },

  'hb-chat': {
    eyebrow: 'Over H&B Service Group',
    title: 'Chat',
    lead: 'Snel contact tijdens events en planning — zo bereikt u ons het beste.',
    sections: [
      {
        heading: 'Kanalen',
        bullets: [
          'Tijdens lopende opdrachten: gebruik het telefoonnummer van uw vaste coördinator uit uw briefing.',
          'Algemene vragen en niet-dringende onderwerpen: via het contactformulier of e-mail.',
        ],
      },
      {
        heading: 'Live chat (binnenkort)',
        paragraphs: [
          'We werken aan een chatfunctie in het portaal voor statusvragen over planning en documenten. Tot die tijd reageert ons team binnen één werkdag op geschreven berichten, en sneller bij actieve shifts.',
        ],
      },
    ],
    ctas: [{ to: '/contact', label: 'Naar contact' }],
  },

  'hb-netwerk': {
    eyebrow: 'Over H&B Service Group',
    title: 'Netwerk',
    lead: 'H&B is verbonden met locaties, producers en een groot freelancerbestand in Nederland — gebouwd op herhaalde samenwerking, niet op eenmalige transacties.',
    sections: [
      {
        heading: 'Professionals',
        paragraphs: [
          'Ons netwerk groeit door aanbeveling en gerichte werving. We zorgen voor balans tussen nieuw talent en ervaren krachten, zodat elk team een mix heeft van frisse energie en routiniers.',
        ],
      },
      {
        heading: 'Opdrachtgevers',
        paragraphs: [
          'Langdurige relaties met locaties en bureaus geven ons inzicht in specifieke werkwijzen — kennis die we meenemen naar elke nieuwe briefing.',
        ],
      },
    ],
    ctas: [{ to: '/freelancers/direct-aanmelden', label: 'Word onderdeel van het netwerk' }],
  },

  'hb-beleid': {
    eyebrow: 'Over H&B Service Group',
    title: 'Beleid',
    lead: 'Kaders voor privacy, gedrag, gelijke behandeling en veiligheid — in lijn met Nederlandse wet- en regelgeving.',
    sections: [
      {
        heading: 'Privacy (AVG)',
        paragraphs: [
          'Persoonsgegevens worden uitsluitend verwerkt voor matching, planning, facturatie en wettelijke bewaarplicht. Op verzoek informeren we u over verwerkers en bewaartermijnen.',
        ],
      },
      {
        heading: 'Gedrag en integriteit',
        bullets: [
          'Nultolerantie voor discriminatie, intimidatie en geweld op locatie.',
          'Meldingen worden serieus opgevolgd en waar nodig gedeeld met de opdrachtgever volgens afspraak.',
        ],
      },
      {
        heading: 'Wijzigingen',
        paragraphs: [
          'Beleidsupdates publiceren we op deze site en informeren actieve professionals en partners per e-mail bij materiële wijzigingen.',
        ],
      },
    ],
  },

  'bv-ons-aanbod': {
    eyebrow: 'Bedrijven',
    title: 'Ons aanbod',
    lead: 'Hospitality en beveiliging uit één hand: van korte piek tot vaste pool — altijd met voorgecontroleerde professionals en één coördinator.',
    sections: [
      {
        heading: 'Hoe we leveren',
        paragraphs: [
          'We combineren briefing, rooster en nazorg. U kiest het profiel; wij leveren namen die passen bij uw merk, vergunningen en planning — transparant tot aan uitbetaling.',
        ],
      },
    ],
    ctas: [
      { to: '/bedrijven/personeel-aanvragen', label: 'Personeel aanvragen', primary: true },
      { to: '/bedrijven/tarieven', label: 'Tarieven op aanvraag' },
    ],
  },

  'hb-vergunningen': {
    eyebrow: 'OVER H&B SERVICE GROUP',
    title: 'Vergunningen & compliance',
    lead: 'We roosteren volgens geldende wet- en locatie-eisen — met traceerbare documentatie voor uw verzekeraar en vergunningverlener.',
    sections: [
      {
        heading: 'Waar we op sturen naast het wettelijke kader',
        bullets: [
          'Recht om te werken en identiteit.',
          'Diploma’s en registraties voor beveiligingsrollen.',
          'Aanvullende certificaten (BHV, sociale hygiëne) die uw locatie voorschrijft.',
        ],
      },
      {
        heading: 'Samen met uw locatie',
        paragraphs: [
          'We stemmen bezetting af op RI&E en huisregels. Wijzigingen in beleidsregels communiceren we actief door naar teams vóór aanvang.',
        ],
      },
    ],
    ctas: [{ to: '/contact', label: 'Compliance bespreken' }],
  },

  'legal-privacy': {
    eyebrow: 'Juridisch',
    title: 'Privacyverklaring',
    lead: 'H&B Service Group verwerkt persoonsgegevens zorgvuldig, in lijn met de AVG.',
    sections: [
      {
        heading: 'Verwerkingsdoelen',
        bullets: [
          'Aanmelding en matching van freelancers.',
          'Uitvoering van opdrachten en facturatie.',
          'Wettelijke bewaarplicht en geschilafhandeling.',
        ],
      },
      {
        heading: 'Rechten',
        paragraphs: [
          'U kunt bezwaar maken, inzage vragen of verwijdering aanvragen voor zover dat wettelijk kan. Neem contact op via het adres op onze contactpagina — wij beantwoorden binnen de wettelijke termijn.',
        ],
      },
    ],
    ctas: [{ to: '/contact', label: 'Contact' }],
  },

  'legal-cookies': {
    eyebrow: 'Juridisch',
    title: 'Cookiebeleid',
    lead: 'Deze site gebruikt functionele cookies die nodig zijn voor gebruik en beveiliging. Analytische cookies worden alleen geplaatst met jouw toestemming via de cookiebalk.',
    sections: [
      {
        heading: 'Beheer',
        paragraphs: [
          'Via je browser kun je cookies beheren of verwijderen. Zonder strikt noodzakelijke cookies kan deel van het portaal beperkt werken. Je keuze in de cookiebalk kun je later wijzigen door je browsercookies voor deze site te wissen.',
        ],
      },
    ],
  },

  'legal-voorwaarden': {
    eyebrow: 'Juridisch',
    title: 'Algemene voorwaarden',
    lead: 'Hier vindt u de algemene voorwaarden voor dienstverlening door H&B Service Group. Definitieve teksten worden bij contract ondertekend of per offerte bevestigd.',
    sections: [
      {
        heading: 'Toepasselijkheid',
        paragraphs: [
          'Voor elk project geldt de schriftelijke opdrachtbevestiging met tarieven, annuleringsvoorwaarden en aansprakelijkheid. Bij tegenstrijdigheid prevaleert de getekende overeenkomst.',
        ],
      },
    ],
    ctas: [{ to: '/contact', label: 'Vraag een offerte aan' }],
  },
}
