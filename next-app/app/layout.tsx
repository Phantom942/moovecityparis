import type { Metadata } from "next";
import Script from "next/script";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "../lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Moove City — Camion avec chauffeur Paris | Dès 50€",
    template: "%s | Moove City",
  },
  description:
    "Transport avec chauffeur à Paris et Île-de-France. Offre Paris intramuros à 50€ TTC sans manutention. Déménagement, livraison express, courses urgentes. Devis gratuit, intervention dans l'heure.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Moove City — Transport avec chauffeur Paris",
    description:
      "Camion avec chauffeur à Paris et IDF. Offre forfait 50€ Paris intramuros. Déménagement, livraison express, 24h/24.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Moove City — transport avec chauffeur Paris" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moove City — Camion avec chauffeur Paris",
    description: "Transport, déménagement et livraison express à Paris. Devis gratuit.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "transport",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com https://www.googletagmanager.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com https://maps.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://maps.googleapis.com https://maps.gstatic.com https://api-adresse.data.gouv.fr https://www.googletagmanager.com https://*.google-analytics.com https://region1.google-analytics.com https://cdn.jsdelivr.net; frame-ancestors 'self';"
        />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" type="image/svg+xml" href="/brand/moove-city-logo.svg" />
        <link rel="shortcut icon" href="/brand/moove-city-logo.svg" />
        <link rel="apple-touch-icon" href="/brand/moove-city-logo.svg" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="/css/global.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/pages.css" />
      </head>
      <body>
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-WC9EEBKP2E" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WC9EEBKP2E');
          `}
        </Script>
      </body>
    </html>
  );
}
