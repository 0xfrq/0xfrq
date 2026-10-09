import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className="shell">
        <div className={styles.grid}>
          <h2 className={styles.statement}>Let&apos;s make something useful.</h2>
          <div className={styles.contact}>
            <div>
              <span className={styles.label}>Email</span>
              <a href="mailto:hitme@fariqdoing.tech" className={styles.email}>
                hitme@fariqdoing.tech
              </a>
            </div>
            <div className={styles.links}>
              <a href="https://github.com/0xfrq" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/muhammad-fariq-faqih-04219b195/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>
          <p className={styles.quote}>The best way to understand a system is to build it from scratch.</p>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Fariq</span>
          <span>Based in Indonesia</span>
        </div>
      </div>
    </footer>
  );
}
