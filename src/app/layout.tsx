import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import { clinic } from "@/config/clinic";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://od-alexander-zambrano.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#141413" },
    { media: "(prefers-color-scheme: light)", color: "#141413" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Od. Alexander Zambrano | Rehabilitación Oral y Estética en Portoviejo y Canuto",
    template: "%s | Od. Alexander Zambrano",
  },
  description:
    "Consulta odontológica privada con el Od. Alexander Zambrano. Especialista en rehabilitación oral, estética dental, ortodoncia y cirugía en Portoviejo y Canuto, Manabí.",
  keywords: [
    "Odontólogo en Portoviejo",
    "Odontólogo en Canuto",
    "Alexander Zambrano Odontólogo",
    "Ortodoncia Portoviejo",
    "Rehabilitación oral Manabí",
    "Estética dental Portoviejo",
    "Limpieza dental Canuto",
    "Consulta odontológica Manabí",
  ],
  authors: [{ name: "Od. Alexander Zambrano" }],
  creator: "Od. Alexander Zambrano",
  publisher: "Od. Alexander Zambrano",
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: SITE_URL,
    siteName: "Od. Alexander Zambrano — Consulta Privada",
    title: "Od. Alexander Zambrano | Rehabilitación Oral y Estética",
    description:
      "Reserve su turno odontológico en nuestras sedes de Portoviejo y Canuto. Atención personalizada bajo cita previa.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Od. Alexander Zambrano — Rehabilitación Oral y Estética en Portoviejo y Canuto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Od. Alexander Zambrano | Rehabilitación Oral y Estética",
    description:
      "Atención odontológica integral bajo cita previa en Portoviejo y Canuto, Manabí.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE_URL}/#dentist`,
    name: clinic.name,
    description: clinic.description,
    url: SITE_URL,
    image: `${SITE_URL}/logo.jpg`,
    medicalSpecialty: ["Dentistry", "Orthodontics", "OralRehabilitation"],
    priceRange: "$$",
    areaServed: [
      { "@type": "City", name: "Portoviejo" },
      { "@type": "City", name: "Canuto" },
      { "@type": "AdministrativeArea", name: "Manabí" },
    ],
    department: clinic.locations.map((loc) => ({
      "@type": "DentalClinic",
      name: `${clinic.name} — Sede ${loc.name}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: loc.name,
        addressRegion: "Manabí",
        addressCountry: "EC",
      },
    })),
    availableService: clinic.treatments.map((item) => ({
      "@type": "MedicalProcedure",
      name: item.name,
      description: item.detail,
    })),
  };

  return (
    <html
      lang="es-EC"
      className={`${cormorant.variable} ${dmSans.variable} ${jetbrains.variable} overflow-x-hidden scroll-smooth`}
    >
      <body className="max-w-[100vw] overflow-x-hidden bg-[#141413] font-sans text-[#F2EFE9] antialiased selection:bg-[#C5A059] selection:text-[#141413]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}