import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "phugl | AI, der letter din hverdag",
    template: "%s | phugl",
  },
  description: "phugl gør AI brugbart og trygt i hverdagen – så arbejdet bliver lettere. Implementering, arbejdsgange, governance og kvalitetssikring.",
  keywords: ["AI", "kunstig intelligens", "implementering", "governance", "arbejdsgange", "automatisering"],
  authors: [{ name: "Andreas Hedelund Lausen" }],
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: "https://phugl.dk",
    siteName: "phugl",
    title: "phugl | AI, der letter din hverdag",
    description: "phugl gør AI brugbart og trygt i hverdagen – så arbejdet bliver lettere.",
  },
  twitter: {
    card: "summary_large_image",
    title: "phugl",
    description: "AI, der letter din hverdag. Trygt, konkret og uden hype.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body className={`${inter.variable} ${dmSans.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
