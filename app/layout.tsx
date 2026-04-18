import type { Metadata, Viewport } from "next";
import { Outfit, Lato } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./shared/footer";
import HeaderWrapper from "./shared/headerWrapper";
import { ConditionalFooter } from "./shared/ConditionalFooter";
import {
  TrackingHeadScripts,
  TrackingNoScripts,
} from "./shared/trackingScripts";
import { NavigationProgress } from "./navigation-progress";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const nohemi = localFont({
  src: [
    { path: "./fonts/Nohemi-Regular.ttf", weight: "400" },
    { path: "./fonts/Nohemi-Medium.ttf", weight: "500" },
    { path: "./fonts/Nohemi-SemiBold.ttf", weight: "600" },
    { path: "./fonts/Nohemi-Bold.ttf", weight: "700" },
  ],
  variable: "--font-nohemi",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const SITE_URL = "https://www.learntechnique.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Learn Technique | Expert-Led Electrical & Trade Training",
    template: "%s | Technique Learning Solutions",
  },
  description:
    "Industry-recognised electrical, HVAC, and PLC trade courses at world-class facilities. City & Guilds and EAL accredited programmes to advance your career. Training centres in Chesterfield and Stirling.",
  keywords: [
    "electrical courses",
    "electrician training",
    "HVAC training",
    "PLC courses",
    "trade courses UK",
    "City and Guilds electrical",
    "EAL accredited courses",
    "18th Edition course",
    "AM2 assessment",
    "electrical career change",
    "air conditioning training",
    "refrigeration courses",
    "F-Gas certification",
    "Technique Learning Solutions",
  ],
  authors: [{ name: "Technique Learning Solutions" }],
  creator: "Technique Learning Solutions",
  publisher: "Technique Learning Solutions",
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Technique Learning Solutions",
    title: "Learn Technique | Expert-Led Electrical & Trade Training",
    description:
      "Industry-recognised electrical, HVAC, and PLC trade courses at world-class facilities. City & Guilds and EAL accredited programmes to advance your career.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Technique | Expert-Led Electrical & Trade Training",
    description:
      "Industry-recognised electrical, HVAC, and PLC trade courses at world-class facilities. Accredited programmes to advance your career.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Technique Learning Solutions",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Industry-recognised electrical, HVAC, and PLC trade courses at world-class facilities with City & Guilds and EAL accreditation.",
    telephone: "08001123310",
    email: "info@learntechnique.com",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Technique Tower Business Park, High Street, Clay Cross",
        addressLocality: "Chesterfield",
        addressRegion: "Derbyshire",
        postalCode: "S45 9EA",
        addressCountry: "GB",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Stirling Business Centre, Wellgreen Road",
        addressLocality: "Stirling",
        addressRegion: "Scotland",
        postalCode: "FK8 2DZ",
        addressCountry: "GB",
      },
    ],
    sameAs: [
      "https://www.facebook.com/learntechnique",
      "https://www.instagram.com/learntechnique",
      "https://www.linkedin.com/company/learntechnique",
      "https://www.youtube.com/@learntechnique",
    ],
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${lato.variable} ${nohemi.variable} antialiased`}
      >
        <TrackingNoScripts />
        <TrackingHeadScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <NavigationProgress />
        <HeaderWrapper />
        {children}
        <ConditionalFooter>
          <Footer />
        </ConditionalFooter>
        <script src="//code.tidio.co/xfa1nuadygc0qsxfrhtjddlktnyppeeu.js" async></script>
      </body>
    </html>
  );
}
