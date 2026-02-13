import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exquisite Corpse | AI Creature Creator",
  description:
    "Build a bizarre AI creature one body part at a time. Learn AI image prompting through play!",
  openGraph: {
    title: "Exquisite Corpse | AI Creature Creator",
    description: "Build a bizarre AI creature one body part at a time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} font-body antialiased`}>{children}</body>
    </html>
  );
}
