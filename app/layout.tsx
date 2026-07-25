import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AnimatedFavicon from "./animated-favicon";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://filmocompany.com.br"),
  title: "Filmo Company | Produção Audiovisual em Americana, SP",
  description:
    "Filmes, fotografia e conteúdo audiovisual para marcas, eventos e histórias que merecem ser lembradas.",
  openGraph: {
    title: "Filmo Company | Histórias reais, imagens com intenção",
    description: "Produção audiovisual para marcas, eventos e conteúdo digital em Americana, SP.",
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
    title: "Filmo Company | Histórias reais, imagens com intenção",
    description: "Produção audiovisual para marcas, eventos e conteúdo digital em Americana, SP.",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AnimatedFavicon />
        {children}
      </body>
    </html>
  );
}
