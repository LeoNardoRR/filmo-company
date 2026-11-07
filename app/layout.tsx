import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import AnimatedFavicon from "./animated-favicon";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://filmocompany.com.br"),
  title: "Filmo Company | Foto e vídeo para Instagram em Americana, SP",
  description:
    "Fotografia, Reels e vídeos verticais para marcas, profissionais e eventos em Americana, SP.",
  openGraph: {
    title: "Filmo Company | Conteúdo que faz sua marca parar o scroll",
    description: "Fotografia, Reels e vídeos verticais para marcas, profissionais e eventos em Americana, SP.",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/og.png",
        width: 1729,
        height: 910,
        alt: "Filmo Company: histórias reais. Imagens com intenção.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Filmo Company | Conteúdo que faz sua marca parar o scroll",
    description: "Fotografia, Reels e vídeos verticais para marcas, profissionais e eventos em Americana, SP.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link data-filmo-favicon="true" rel="icon" href="/filmo-o.png" type="image/png" sizes="64x64" />
        <link data-filmo-favicon="true" rel="shortcut icon" href="/filmo-o.png" type="image/png" />
      </head>
      <body className={`${geistSans.variable} ${plexMono.variable} ${instrumentSerif.variable}`}>
        <AnimatedFavicon />
        {children}
      </body>
    </html>
  );
}
