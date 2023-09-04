import { DM_Sans, DM_Serif_Display } from "next/font/google";

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${dm_sans.variable} ${dm_serif_display.variable}`}>
      {children}
    </div>
  );
}
