import Link from "next/link";

type Props = {
  basePath: string;
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ basePath, currentPage, totalPages }: Props) {
  if (totalPages <= 1) return null;

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        marginTop: "1.5rem",
        fontSize: "0.875rem",
      }}
    >
      {currentPage > 1 ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          style={{ color: "var(--text-muted)" }}
        >
          ← prev
        </Link>
      ) : (
        <span style={{ color: "var(--text-footer)", cursor: "default" }}>
          ← prev
        </span>
      )}

      <span style={{ color: "var(--text-muted)" }}>
        {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          style={{ color: "var(--text-muted)" }}
        >
          next →
        </Link>
      ) : (
        <span style={{ color: "var(--text-footer)", cursor: "default" }}>
          next →
        </span>
      )}
    </nav>
  );
}
