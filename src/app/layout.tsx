import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Alex_Brush, Cormorant_Garamond, Figtree, Great_Vibes } from "next/font/google";
import { arabicFontStyle, arabicFontVariables } from "@/app/fonts-ar";
import DevtoolsGuard from "@/components/DevtoolsGuard";
import { LangProvider } from "@/components/i18n/LangProvider";
import MetaPixel from "@/components/MetaPixel";
import VisitTracker from "@/components/VisitTracker";
import { dirOf } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

// Self-hosted (was a render-blocking Google Fonts @import). Only the Botanical
// and Heritage templates use it, so it is not preloaded on every page.
const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | Wedding Invitation Websites`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "wedding invitations",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/logo.webp", sizes: "1254x1254", type: "image/webp" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Wedding Invitation Websites`,
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} logo`,
        type: "image/png",
      },
      {
        url: "/logo.webp",
        width: 1254,
        height: 1254,
        alt: `${siteConfig.name} logo`,
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Wedding Invitation Websites`,
    description: siteConfig.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ee",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
      email: siteConfig.email,
      sameAs: [siteConfig.instagramUrl, siteConfig.tiktokUrl],
      logo: `${siteUrl}/logo.webp`,
      image: `${siteUrl}/og.png`,
      description: siteConfig.description,
    },
    {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteUrl,
      email: siteConfig.email,
      sameAs: [siteConfig.instagramUrl, siteConfig.tiktokUrl],
      image: `${siteUrl}/logo.webp`,
      description: siteConfig.description,
      areaServed: "Worldwide",
      serviceType: [
        "Wedding invitation websites",
        "Invitation photos",
        "Invitation videos",
        "Custom couple logos",
        "Bespoke invitation sites",
      ],
    },
    {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteUrl,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        logo: `${siteUrl}/logo.webp`,
      },
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();

  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      data-scroll-behavior="smooth"
      className={`${figtree.variable} ${cormorant.variable} ${greatVibes.variable} ${alexBrush.variable} ${arabicFontVariables} h-full antialiased`}
      style={arabicFontStyle(lang, {
        "--font-figtree": ["sans", figtree],
        "--font-cormorant": ["serif", cormorant],
        "--font-great-vibes": ["script", greatVibes],
        "--font-alex-brush": ["script", alexBrush],
      })}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LangProvider lang={lang}>{children}</LangProvider>
        <VisitTracker />
        <DevtoolsGuard />
        <Analytics />
        {/* Real-visitor load timings (Core Web Vitals) in the Vercel dashboard. */}
        <SpeedInsights />
        {/* Meta Pixel for Instagram ads; off unless NEXT_PUBLIC_META_PIXEL_ID is set. */}
        <MetaPixel />
      </body>
    </html>
  );
}
