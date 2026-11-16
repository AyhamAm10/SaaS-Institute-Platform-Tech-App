/** The institute week starts on Saturday; day numbers follow JS (0 = Sunday). */
export const WEEK_ORDER = [6, 0, 1, 2, 3, 4, 5] as const;

/** Day-of-week (0-6) of a `YYYY-MM-DD` date, computed in UTC so no time zone shifts it. */
export function dayOfWeekOf(ymd: string): number {
  return new Date(`${ymd}T00:00:00Z`).getUTCDay();
}

/** Minutes since midnight of an `HH:mm` string. */
export function toMinutes(hm: string): number {
  const [h, m] = hm.split(':').map(Number);
  return h * 60 + m;
}
