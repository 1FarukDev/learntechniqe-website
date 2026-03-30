import type { Metadata } from "next";
import { Outfit, Lato } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Footer from "./shared/footer";
import HeaderWrapper from "./shared/headerWrapper";
import { NavigationProgress } from "./navigation-progress";

const ZOHO_SALESIQ_WIDGET_SRC =
  "https://salesiq.zohopublic.com/widget?wc=siq96d6ea5797968c1914bee7c1f951d031af7aceac7e0c1795b0fc07b69ef5655a";

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
        <Script id="zoho-salesiq-init" strategy="afterInteractive">
          {`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
        </Script>
        <Script
          id="zsiqscript"
          src={ZOHO_SALESIQ_WIDGET_SRC}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
