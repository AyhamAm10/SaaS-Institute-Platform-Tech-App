import { Module, StatTile } from '@/components';
import type { MarkSheet } from '@/core/api/types';
import { formatNumber } from '@/core/format/number';
import { ar } from '@/core/strings/ar';

/** Statistics computed by the server (never from the rows on screen): updated after each save. */
export function MarksStats({ sheet }: { sheet: MarkSheet }) {
  const { stats } = sheet;
  return (
    <Module.Stats>
      <StatTile label={ar.marks.average} value={stats.average === null ? '—' : formatNumber(stats.average)} tone="accent" />
      <StatTile label={ar.marks.pending} value={formatNumber(stats.pending)} tone="neutral" />
      <StatTile label={ar.marks.passed} value={formatNumber(stats.passed)} tone="success" />
      <StatTile label={ar.marks.failed} value={formatNumber(stats.failed)} tone="danger" />
    </Module.Stats>
  );
}
