import { createContext, useContext } from 'react';

/** Lets `Header.Back` / `Header.Actions` know the header exists (compound parts must live inside it). */
export const HeaderContext = createContext(false);

export const useInHeader = (): boolean => useContext(HeaderContext);
