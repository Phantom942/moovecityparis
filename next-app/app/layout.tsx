export const metadata = {
  title: "Moove City — Camion avec Chauffeur Paris",
  description:
    "Transport avec chauffeur à Paris et Île-de-France. Déménagement, livraison urgente, course urgente, tournées entreprises. 6 à 20 m³.",
  icons: {
    icon: [
      { url: "/brand/moove-city-logo.svg", type: "image/svg+xml" },
      { url: "/brand/moove-city-logo.svg", sizes: "any" },
    ],
    apple: "/brand/moove-city-logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Google Maps JS peut nécessiter eval ; sans 'unsafe-eval' la CSP bloque l’API (onglet Problèmes Chrome). */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com https://maps.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://maps.googleapis.com https://maps.gstatic.com https://www.googletagmanager.com https://*.google-analytics.com https://region1.google-analytics.com; frame-ancestors 'self';"
        />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" type="image/svg+xml" href="/brand/moove-city-logo.svg" />
        <link rel="shortcut icon" href="/brand/moove-city-logo.svg" />
        <link rel="apple-touch-icon" href="/brand/moove-city-logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="/css/global.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
