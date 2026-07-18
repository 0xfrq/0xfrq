import type { CSSProperties } from "react";
import calendar from "@/data/github-contributions.json";
import styles from "./ContributionGraph.module.css";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type ContributionWeek = {
  days: ContributionDay[];
};

type ContributionCalendar = {
  source: "dummy" | "github";
  username: string;
  generatedAt: string;
  totalContributions: number;
  weeks: ContributionWeek[];
};

function clampLevel(level: number) {
  return Math.max(0, Math.min(4, Math.round(level || 0)));
}

export default function ContributionGraph() {
  const data = calendar as ContributionCalendar;
  const weeks = Array.isArray(data.weeks) ? data.weeks : [];

  return (
    <section className={styles.wrap} aria-label={`${data.username} GitHub contribution graph`}>
      <div className={styles.grid} aria-hidden="true">
        {weeks.map((week, weekIndex) => (
          <div className={styles.week} key={`${weekIndex}-${week.days?.[0]?.date ?? "week"}`}>
            {(week.days || []).map((day, dayIndex) => (
              <span
                className={styles.day}
                data-level={clampLevel(day.level)}
                data-count={day.count}
                key={day.date}
                style={{ "--cell-index": weekIndex * 7 + dayIndex } as CSSProperties}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
