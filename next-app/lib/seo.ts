export const SITE_URL = "https://www.moovecity.fr";
export const SITE_NAME = "Moove City";
export const OG_IMAGE = `${SITE_URL}/images/hero-moove-city.jpg`;

export const HOME_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "Transport avec chauffeur à Paris et Île-de-France. Déménagement, livraison express, courses urgentes.",
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": ["LocalBusiness", "MovingCompany"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/moove-city-logo.svg`,
      image: OG_IMAGE,
      telephone: "+33648745668",
      email: "contact@moovecity.fr",
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Cash, Credit Card",
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "AdministrativeArea", name: "Île-de-France" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressRegion: "Île-de-France",
        addressCountry: "FR",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
      sameAs: [
        "https://www.facebook.com/profile.php?id=61585097790199",
        "https://www.instagram.com/moovecity/",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services Moove City",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Transport Paris intramuros sans manutention",
            description:
              "Forfait fixe 50€ TTC pour un transport avec chauffeur dans Paris (75), sans manutention, quelle que soit la distance intramuros.",
            price: "50",
            priceCurrency: "EUR",
            url: `${SITE_URL}/#offre-paris`,
            availability: "https://schema.org/InStock",
            eligibleRegion: { "@type": "City", name: "Paris" },
          },
          {
            "@type": "Offer",
            name: "Camion URBAN 6 m³ avec chauffeur",
            price: "40",
            priceCurrency: "EUR",
            url: `${SITE_URL}/urban.html`,
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Dans quels délais Moove City peut-il intervenir ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Intervention possible dans l'heure sur Paris et l'Île-de-France. Réponse sous 5 minutes.",
          },
        },
        {
          "@type": "Question",
          name: "Quelle est l'offre transport à 50€ sur Paris ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Moove City propose un forfait à 50€ TTC pour tout transport simple (camion + chauffeur, sans manutention) avec départ et arrivée dans Paris intramuros, quelle que soit la distance.",
          },
        },
        {
          "@type": "Question",
          name: "Quels moyens de paiement acceptez-vous ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Espèces et carte bancaire.",
          },
        },
        {
          "@type": "Question",
          name: "Comment obtenir un devis gratuit ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Via le formulaire en ligne sur moovecity.fr/booking ou par WhatsApp au 07 51 21 32 55.",
          },
        },
      ],
    },
  ],
});
