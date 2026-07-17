import type { Metadata } from "next";
import { Schibsted_Grotesk, Piazzolla } from "next/font/google";
import "./globals.css";

// DESIGN.md Section 3 (locked): Schibsted Grotesk = UI/chrome voice, Piazzolla = content voice.
const fontUi = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui",
  display: "swap",
});

const fontContent = Piazzolla({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-content",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FallowOS — Eashwar Siddha",
  description: "A portfolio styled as an AI-first desktop OS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontUi.variable} ${fontContent.variable}`}>
      <body>{children}</body>
    </html>
  );
}
