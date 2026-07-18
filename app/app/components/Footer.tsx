export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner">
        <h2>Let&apos;s make something useful.</h2>
        <div className="site-footer__grid">
          <div>
            <span className="site-footer__label">Email</span>
            <a href="mailto:hitme@fariqdoing.tech">hitme@fariqdoing.tech</a>
          </div>
          <div className="site-footer__links">
            <a href="https://github.com/0xfrq" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/muhammad-fariq-faqih-04219b195/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </div>
          <p className="site-footer__quote">The best way to understand a system is to build it from scratch.</p>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Fariq</span>
          <span>Based in Indonesia</span>
        </div>
      </div>
    </footer>
  );
}
