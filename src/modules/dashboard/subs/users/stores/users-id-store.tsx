import { atom } from "nanostores";

export const $userIDStore = atom<string | undefined>(undefined);
export const setUserID = (ID: string) => $userIDStore.set(ID);
