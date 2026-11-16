/** More tab: only the logout confirmation is page state (the profile comes from the session). */
export interface MoreState {
  logoutOpen: boolean;
  isSigningOut: boolean;
  openLogout: () => void;
  closeLogout: () => void;
  setSigningOut: (value: boolean) => void;
}
