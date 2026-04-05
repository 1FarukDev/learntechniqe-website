import type { Metadata } from "next";
import { Outfit, Lato } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Footer from "./shared/footer";
import HeaderWrapper from "./shared/headerWrapper";
import { NavigationProgress } from "./navigation-progress";

/** Docuyond widget loader — defers https://docuyond.com/embed.js until window load. */
const DOCUYOND_INIT = `(function(){if(!window.docuyond || !window.__docuyond_loaded){window.docuyond=(...args)=>{if(!window.docuyond.q){window.docuyond.q=[];}window.docuyond.q.push(args);};window.docuyond=new Proxy(window.docuyond,{get(target,prop){if(prop==='q'){return target.q;}return(...args)=> target(prop,...args);},});}const config={"widgetId":"4e647207-eccd-498f-b6cd-d238d90e2a3b","logo":null};const onLoad=function(){window.__docuyond_config=config;const embedScript=document.createElement('script');embedScript.src='https://docuyond.com/embed.js';embedScript.onerror=()=>{console.error('Docuyond:Failed to load embed script');};document.body.appendChild(embedScript);};if(document.readyState==='complete'){onLoad();}else{window.addEventListener('load',onLoad);}})();`;

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
        <Script id="docuyond-init" strategy="afterInteractive">
          {DOCUYOND_INIT}
        </Script>
      </body>
    </html>
  );
}
