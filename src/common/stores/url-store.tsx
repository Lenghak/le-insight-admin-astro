import { env } from "@/core/env";
import { atom, onMount, onSet} from "nanostores";

export const $urlStore = atom(
  new URL(
    globalThis.self !== undefined
      ? window.location.toString()
      : "/" + env.PUBLIC_ORIGIN,
  ),
);
export const setURLStore = (url: URL) => $urlStore.set(new URL(url));

onMount($urlStore, () => {
  setURLStore(new URL(window.location.toString()));
});
onSet($urlStore, ({ newValue }) => {
  if (newValue && globalThis.self !== undefined) {
    window.history.pushState(undefined, "", newValue);
  }
});
