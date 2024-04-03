import { atom } from "nanostores";

export const $dashboardSheetStore = atom<boolean>(false);

export const setDashboardSheetOpen = (isOpen: boolean) =>
  $dashboardSheetStore.set(isOpen);
