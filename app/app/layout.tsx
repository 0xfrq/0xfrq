import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
    <html lang="en" className="fonts-loaded" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem("theme");
                  if (t === "dark") {
                    document.documentElement.setAttribute("data-theme", "dark");
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
