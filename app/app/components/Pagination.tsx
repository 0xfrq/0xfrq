import Link from "next/link";
import styles from "./Pagination.module.css";

type Props = {
  basePath: string;
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ basePath, currentPage, totalPages }: Props) {
  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {currentPage > 1 ? (
        <Link href={`${basePath}?page=${currentPage - 1}`} className={styles.step}>
          ← prev
        </Link>
      ) : (
        <span className={styles.step} aria-disabled="true">
          ← prev
        </span>
      )}

      <span className={styles.count}>
        {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={`${basePath}?page=${currentPage + 1}`} className={styles.step}>
          next →
        </Link>
      ) : (
        <span className={styles.step} aria-disabled="true">
          next →
        </span>
      )}
    </nav>
  );
}
