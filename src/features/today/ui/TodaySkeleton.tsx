import { Skeleton, Stack, Surface } from '@/components';

/** Placeholder with the shape of the day's blocks while the first load runs. */
export function TodaySkeleton() {
  return (
    <Stack gap="lg">
      <Skeleton height={22} width={140} />
      <Surface gap="md"><Skeleton height={20} width={180} /><Skeleton height={14} /><Skeleton height={14} width={220} /></Surface>
      <Surface gap="md"><Skeleton height={20} width={180} /><Skeleton height={14} /><Skeleton height={14} width={220} /></Surface>
      <Skeleton height={22} width={140} />
      <Surface gap="md"><Skeleton height={14} /><Skeleton height={14} width={200} /></Surface>
    </Stack>
  );
}
