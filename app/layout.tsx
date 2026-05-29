import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "meglertipsene – Finn den beste eiendomsmegleren",
  description:
    "Sammenlign de beste eiendomsmeglerne nær deg. Få tilbud fra flere meglere gratis og uforpliktende.",
  openGraph: {
    title: "meglertipsene – Finn den beste eiendomsmegleren",
    description:
      "Sammenlign de beste eiendomsmeglerne nær deg. Få tilbud fra flere meglere gratis og uforpliktende.",
    locale: "nb_NO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
