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
    <div className={styles.wrap} role="img" aria-label={`${data.username} GitHub contribution graph`}>
      {/* rtl scroller starts at the most recent week on narrow screens; the grid itself reads ltr. */}
      <div className={styles.scroller}>
        <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${weeks.length || 1}, minmax(0, 1fr))` }}>
          {weeks.map((week, weekIndex) => (
            <div className={styles.week} key={`${weekIndex}-${week.days?.[0]?.date ?? "week"}`}>
              {(week.days || []).map((day) => (
                <span className={styles.day} data-level={clampLevel(day.level)} key={day.date} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
