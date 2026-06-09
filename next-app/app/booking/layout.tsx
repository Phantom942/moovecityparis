import type { Metadata } from "next";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Devis gratuit — Transport avec chauffeur Paris",
  description:
    "Demandez un devis gratuit pour votre transport, déménagement ou livraison express à Paris et en Île-de-France. Réponse sous 5 minutes, intervention dans l'heure.",
  alternates: {
    canonical: "/booking",
  },
  openGraph: {
    title: "Devis gratuit transport avec chauffeur | Moove City",
    description:
      "Formulaire de devis gratuit — transport, déménagement et livraison express à Paris et IDF.",
    url: `${SITE_URL}/booking`,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Moove City transport Paris" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devis gratuit | Moove City Paris",
    description: "Transport avec chauffeur à Paris — devis gratuit en ligne.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
