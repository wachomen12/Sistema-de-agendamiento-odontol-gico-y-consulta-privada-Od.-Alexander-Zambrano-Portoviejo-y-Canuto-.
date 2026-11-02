import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://od-alexander-zambrano.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#141413",
};

export const metadata: Metadata = {
  title: "Od. Alexander Zambrano | Odontólogo en Portoviejo y Canuto",
  description:
    "Agenda tu cita con el Od. Alexander Zambrano. Rehabilitación oral y estética dental en Portoviejo y Canuto, Manabí.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Od. Alexander Zambrano | Rehabilitación Oral y Estética",
    description:
      "Atención odontológica integral bajo cita previa en Portoviejo y Canuto.",
    url: siteUrl,
    siteName: "Od. Alexander Zambrano",
    type: "website",
    locale: "es_EC",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Od. Alexander Zambrano — Rehabilitación Oral y Estética",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Od. Alexander Zambrano | Odontólogo en Portoviejo y Canuto",
    description:
      "Atención odontológica integral bajo cita previa en Portoviejo y Canuto.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${dmSans.variable} ${jetbrains.variable} overflow-x-hidden scroll-smooth`}
    >
      <body className="font-sans bg-[#141413] text-[#F2EFE9] antialiased overflow-x-hidden max-w-[100vw] selection:bg-[#C5A059] selection:text-[#141413]">
        {children}
      </body>
    </html>
  );
}