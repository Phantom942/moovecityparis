export const metadata = {
  title: "Moove City — Camion avec Chauffeur Paris",
  description:
    "Transport avec chauffeur à Paris et Île-de-France. Déménagement, livraison urgente, course urgente, tournées entreprises. 6 à 20 m³.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="/css/global.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
