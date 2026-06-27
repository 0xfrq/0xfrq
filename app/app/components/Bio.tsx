import styles from "./Bio.module.css";

export default function Bio() {
  return (
    <div className={styles.bio}>
      <p>
        <b>Fariq</b> is a Computer Science undergraduate and a passionate developer
        from Indonesia, working across low-level systems, AI/ML, automation tools, and
        experimental projects. Unbounded to a single stack, Fariq works on everything
        from CLI utilities and operating system tinkering to hardware integrations and
        — occasionally —{" "}
        <a target="_blank" href="https://github.com/0xfrq">
          <u>weird projects that somehow involve Spotify</u>
        </a>
        .
      </p>
      <p>
        Some of <b>Fariq</b>&#39;s interests include{" "}
        <a target="_blank" href="https://github.com/0xfrq?tab=repositories">
          <u>systems programming</u>
        </a>
        ,{" "}
        <a target="_blank" href="https://github.com/0xfrq">
          <u>AI &amp; machine learning</u>
        </a>
        ,{" "}
        <a target="_blank" href="https://github.com/0xfrq">
          <u>developer tooling</u>
        </a>
        ,{" "}
        <a target="_blank" href="https://github.com/0xfrq">
          <u>backend development</u>
        </a>
        ,{" "}
        <a target="_blank" href="https://github.com/0xfrq">
          <u>embedded systems</u>
        </a>
        , and{" "}
        <a target="_blank" href="https://github.com/0xfrq">
          <u>technical writing</u>
        </a>{" "}
        among others.
      </p>
      <p>
        Fariq is currently diving deep into{" "}
        <a target="_blank" href="https://github.com/0xfrq">
          <u>
            <b>low-level programming</b>
          </u>
        </a>
        ,{" "}
        <a target="_blank" href="https://github.com/0xfrq">
          <u>
            <b>operating systems</b>
          </u>
        </a>
        , and{" "}
        <a target="_blank" href="https://github.com/0xfrq">
          <u>
            <b>computer architecture</b>
          </u>
        </a>
        , believing the best way to understand a system is to build it from scratch.
      </p>
      <div>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/muhammad-fariq-faqih-04219b195/"
        >
          <b>Fariq</b> is always open for collaboration and new opportunities.
        </a>
      </div>

      <div className={styles.nav}>
        <a href="/projects">
          <b>projects</b>
        </a>
        <span className={styles.sep}>/</span>
        <a href="/blog">
          <b>blog</b>
        </a>
      </div>
    </div>
  );
}
