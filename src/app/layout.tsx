import "./globals.css";
import type { Metadata } from "next";
import {
  Inter,
  PT_Serif,
  Roboto,
  Roboto_Condensed,
  Syne,
  Ultra,
  Archivo_Black,
} from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--dm-sans",
  weight: "variable",
});

const dm_serif_display = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--dm-serif-display",
  weight: ["400"],
});

const pt_serif = PT_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--pt-serif",
  weight: ["400", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--roboto",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
  weight: ["400", "700"],
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  display: "swap",
  variable: "--archivo-black",
  weight: ["400"],
});

const ultra = Ultra({
  subsets: ["latin"],
  display: "swap",
  variable: "--ultra",
  weight: ["400"],
});

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  variable: "--roboto-condensed",
  weight: ["400", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--syne",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  ...(process.env.NEXT_PUBLIC_APP_URL && {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  }),
  title: "Carousel Generator",
  description: "An open source carousel maker for LinkedIn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${dm_sans.variable} ${dm_serif_display.variable} ${pt_serif.variable} ${roboto.variable} ${roboto_condensed.variable} ${ultra.variable} ${inter.variable} ${syne.variable} ${archivoBlack.variable} flex flex-col`}
      >
        <MainNav items={[]} className="h-12 border-b px-6" />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
