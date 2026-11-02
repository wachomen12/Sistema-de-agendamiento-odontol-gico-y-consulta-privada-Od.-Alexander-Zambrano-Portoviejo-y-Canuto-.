import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600"]
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"]
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  title: "Od. Alexander Zambrano | Odontólogo en Portoviejo y Canuto",
  description:
    "Agenda tu cita con el Od. Alexander Zambrano. Rehabilitación oral y estética dental en Portoviejo y Canuto, Manabí.",
  metadataBase: new URL("https://alexanderzambrano.com"),
  openGraph: {
    title: "Od. Alexander Zambrano | Odontólogo en Portoviejo y Canuto",
    description:
      "Atención odontológica integral bajo cita previa en Portoviejo y Canuto.",
    type: "website",
    locale: "es_EC",
    images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "Od. Alexander Zambrano" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Od. Alexander Zambrano | Odontólogo en Portoviejo y Canuto",
    images: ["/logo.jpg"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
