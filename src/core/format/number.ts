/** Western digits with thousands separators, regardless of device locale. */
export function formatNumber(value: number, maxFraction = 2): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: maxFraction }).format(value);
}

export function clampPercent(value: number | null | undefined): number {
  if (value === null || value === undefined || Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}
