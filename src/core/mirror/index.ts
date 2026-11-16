import { createContext, useContext } from 'react';
import { createStore, useStore, type StateCreator, type StoreApi } from 'zustand';

export type ControllerStore<S> = StoreApi<S>;

/** One isolated store per controller instance (core.md section 3): call inside `useState(() => ...)`. */
export function createControllerStore<S>(creator: StateCreator<S>): ControllerStore<S> {
  return createStore<S>(creator);
}

/**
 * Context + mirror hook of one controller. The store is provided by the controller;
 * `ui/` reads state ONLY through `useMirror(key)` (core.md section 3).
 */
export function createMirror<S>(name: string) {
  const Context = createContext<ControllerStore<S> | null>(null);
  function useMirror<K extends keyof S>(key: K): S[K] {
    const store = useContext(Context);
    if (!store) throw new Error(`use${name}Mirror must be used inside <${name}Controller>.`);
    return useStore(store, (state) => state[key]);
  }
  return { Context, useMirror };
}
