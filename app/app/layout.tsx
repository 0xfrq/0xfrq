import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1015" },
  ],
};

// Runs before first paint so the saved (or OS) theme never flashes.
const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <SiteNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
