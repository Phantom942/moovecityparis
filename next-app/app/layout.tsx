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
