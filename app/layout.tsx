import type { Metadata, Viewport } from "next";
import { Outfit, Lato } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Footer from "./shared/footer";
import HeaderWrapper from "./shared/headerWrapper";
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
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Learn Technique | Expert-Led Electrical & Trade Training",
  description:
    "Industry-recognised electrical and trade courses. World-class facilities and accredited programmes to advance your career.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${lato.variable} ${nohemi.variable} antialiased`}
      >
        <NavigationProgress />
        <HeaderWrapper />
        {children}
        <Footer />
        {/* <Script
          src="https://app.fastbots.ai/embed.js"
          strategy="afterInteractive"
          data-bot-id="cmngr6lld06s4pa1pd85pyg8m"
        /> */}
        {/* <Script
  id="chtl-config"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `window.chtlConfig = { chatbotId: "1597339393" }`,
  }}
/>
<Script
  async
  data-id="1597339393"
  id="chtl-script"
  strategy="afterInteractive"
  src="https://chatling.ai/js/embed.js"
/> */}
      </body>
    </html>
  );
}
