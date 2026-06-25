import styles from "./AsciiArt.module.css";

export default function AsciiArt() {
  return (
    <div className={styles.art}>
      <pre>{` .----.
| o o |
|  v  |
'-----'`}</pre>
    </div>
  );
}
