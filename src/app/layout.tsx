import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Visionair Velfair | AI-konsulentvirksomhed",
    template: "%s | Visionair Velfair",
  },
  description: "Vi hjælper offentlige og private organisationer med at implementere AI på en ansvarlig og effektiv måde.",
  keywords: ["AI", "kunstig intelligens", "konsulent", "offentlig sektor", "implementering", "velfærd"],
  authors: [{ name: "Andreas Lausen" }],
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: "https://phugl.dk",
    siteName: "Visionair Velfair",
    title: "Visionair Velfair | AI-konsulentvirksomhed",
    description: "Vi hjælper organisationer med at implementere AI ansvarligt og effektivt.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visionair Velfair",
    description: "AI-konsulentvirksomhed med fokus på offentlig sektor",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
