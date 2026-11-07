import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oficios Vecinos - Servicios de Proximidad",
  description: "Conectá con profesionales y oficios de confianza en tu propio barrio.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1764AE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${roboto.variable} ${robotoMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased selection:bg-[#1764AE] selection:text-white">
        {children}
      </body>
    </html>
  );
}
