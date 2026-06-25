import { Spectral } from "next/font/google";
import ThemeToggle from "./components/ThemeToggle";
import AsciiArt from "./components/AsciiArt";
import Bio from "./components/Bio";
import Footer from "./components/Footer";
import homeStyles from "./page.module.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function Home() {
  return (
    <main
      className={`${spectral.className} ${homeStyles.main}`}
      style={{ fontWeight: 100 }}
    >
      <div className={homeStyles.card}>
        <ThemeToggle />
        <AsciiArt />
        <Bio />
      </div>
      <Footer />
    </main>
  );
}
