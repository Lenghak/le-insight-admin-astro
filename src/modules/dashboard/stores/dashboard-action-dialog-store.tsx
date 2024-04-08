import { atom, map } from "nanostores";

type DashboardDialogType = {
  isOpen: boolean;
  id: string;
};
export const $dashboardDialogStore = map<DashboardDialogType>({
  id: "",
  isOpen: false,
});
export const $dashboardDialogID = atom<string>("");

export const setDashboardDialogID = (id: string) => $dashboardDialogID.set(id);
export const setDashboardDialogOpen = ({ id, isOpen }: DashboardDialogType) =>
  $dashboardDialogStore.set({ id, isOpen });
