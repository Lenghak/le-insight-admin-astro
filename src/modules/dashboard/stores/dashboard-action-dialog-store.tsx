import { atom } from "nanostores";


export const $dashboardDialogStore = atom<boolean>(false);

export const setDashboardDialogOpen = (isOpen: boolean) =>
  $dashboardDialogStore.set(isOpen);