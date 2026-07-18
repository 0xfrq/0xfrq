import styles from "./Bio.module.css";

export default function Bio() {
  return (
    <div className={styles.bio}>
      <p>
        I&apos;m <strong>Fariq</strong>, a Computer Science undergraduate and
        developer from Indonesia. I work across low-level systems, AI/ML,
        automation tools, and experimental projects.
      </p>
      <p>
        I&apos;m interested in the space between an idea and the thing that
        makes it real — especially when that means building the underlying
        system myself.
      </p>
      <p>
        These days I&apos;m going deeper into <em>operating systems</em>,
        <em> computer architecture</em>, and the craft of developer tooling.
      </p>
    </div>
  );
}
