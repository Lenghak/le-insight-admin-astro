import { atom, map } from "nanostores";

type DashboardDialogType = {
  isOpen: boolean;
  id: string;
  meta?: unknown;
};
export const $dashboardDialogStore = map<DashboardDialogType>({
  id: "",
  isOpen: false,
  meta: undefined,
});
export const $dashboardDialogID = atom<string>("");

export const setDashboardDialogID = (id: string) => $dashboardDialogID.set(id);
export const setDashboardDialogOpen = ({
  id,
  isOpen,
  meta,
}: DashboardDialogType) => $dashboardDialogStore.set({ id, isOpen, meta });
