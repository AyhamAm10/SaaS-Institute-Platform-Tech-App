export type AmbientVariant = 'calm' | 'warm' | 'login';

/** Blob placement per variant (fractions of the window; sizes in dp). Data only. */
export interface BlobSpec { x: number; y: number; size: number; color: 'start' | 'mid' | 'end'; drift: number }

export const AMBIENT: Record<AmbientVariant, BlobSpec[]> = {
  calm: [
    { x: -0.25, y: -0.08, size: 220, color: 'start', drift: 26 },
    { x: 0.62, y: 0.55, size: 200, color: 'mid', drift: 22 },
  ],
  warm: [
    { x: -0.2, y: -0.06, size: 260, color: 'start', drift: 30 },
    { x: 0.6, y: 0.18, size: 190, color: 'mid', drift: 24 },
    { x: 0.1, y: 0.7, size: 210, color: 'end', drift: 28 },
  ],
  login: [
    { x: 0.1, y: 0.04, size: 300, color: 'mid', drift: 30 },
    { x: 0.55, y: 0.5, size: 240, color: 'end', drift: 26 },
  ],
};
