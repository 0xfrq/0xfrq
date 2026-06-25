import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      &copy; {new Date().getFullYear()} Fariq. All rights reserved.
    </div>
  );
}
