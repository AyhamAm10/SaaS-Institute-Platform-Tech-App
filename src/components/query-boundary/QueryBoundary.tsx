import type { ReactNode } from 'react';
import { ErrorState } from '../error-state';

/** The slice of a TanStack query this component needs (no import of the library here). */
export interface BoundaryQuery<T> {
  data: T | undefined;
  isPending: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => unknown;
}

interface Props<T> {
  query: BoundaryQuery<T>;
  /** Shown while the first load is pending. */
  skeleton: ReactNode;
  children: (data: T) => ReactNode;
}

/** Loading (skeleton) / error (with retry) / data switch for one query. */
export function QueryBoundary<T>({ query, skeleton, children }: Props<T>) {
  if (query.isPending) return <>{skeleton}</>;
  if (query.isError || query.data === undefined) {
    return <ErrorState error={query.error} onRetry={() => void query.refetch()} />;
  }
  return <>{children(query.data)}</>;
}
