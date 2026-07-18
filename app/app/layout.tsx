import type { Metadata } from "next";
import { Fraunces, Inter, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "./components/ThemeProvider";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";
import SiteNav from "./components/SiteNav";
import SmoothScroll from "./components/SmoothScroll";
import Footer from "./components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fariq",
  description:
    "Fariq is a CS undergraduate and a passionate developer from Indonesia.",
  openGraph: {
    title: "Fariq",
    description:
      "Fariq is a CS undergraduate and a passionate developer from Indonesia.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@0xfrqq",
  },
  appleWebApp: {
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${robotoMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var t = localStorage.getItem("theme");
                document.documentElement.setAttribute(
                  "data-theme",
                  t === "light" ? "light" : "dark"
                );
              } catch(e) {
                document.documentElement.setAttribute("data-theme", "dark");
              }
            })();
          `}
        </Script>
      </head>
      <body>
        <ThemeProvider>
          <IntroAnimation />
          <CustomCursor />
          <SmoothScroll />
          <SiteNav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
