import type { Metadata } from "next";
import { Outfit, Lato } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Footer from "./shared/footer";
import HeaderWrapper from "./shared/headerWrapper";
import { NavigationProgress } from "./navigation-progress";

const INTERCOM_APP_ID = "h5ef2sie";

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
        <Script id="intercom" strategy="afterInteractive">
          {`
window.intercomSettings = {
  api_base: "https://api-iam.intercom.io",
  app_id: "${INTERCOM_APP_ID}",
};
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${INTERCOM_APP_ID}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
          `.trim()}
        </Script>
      </body>
    </html>
  );
}
