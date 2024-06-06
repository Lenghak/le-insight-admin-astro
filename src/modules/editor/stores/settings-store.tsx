import { KEY_SINGLE_LINE } from "@udecode/plate-break";
import { createZustandStore } from "@udecode/plate-common";
import { KEY_NORMALIZE_TYPES } from "@udecode/plate-normalizers";
import { KEY_SELECT_ON_BACKSPACE } from "@udecode/plate-select";

export const getDefaultCheckedPlugins = () => {
  return {
    [KEY_NORMALIZE_TYPES]: false,
    [KEY_SINGLE_LINE]: false,
    [KEY_SELECT_ON_BACKSPACE]: false,
    list: false,
  } as Record<string, boolean>;
};

export const getDefaultCheckedComponents = () => {
  return {} as Record<string, boolean>;
};

export type SettingsStoreValue = {
  showSettings: boolean;
  loadingSettings: boolean;
  showComponents: boolean;
  homeTab: string;
  customizerTab: string;
  valueId: string;
  checkedPluginsNext: Record<string, boolean>;
  checkedPlugins: Record<string, boolean>;
  checkedComponents: Record<string, boolean>;
};

const initialState: SettingsStoreValue = {
  showSettings: false,
  loadingSettings: true,
  showComponents: true,
  homeTab: "playground",
  // homeTab: 'installation',
  customizerTab: "plugins",

  valueId: "",

  checkedPluginsNext: getDefaultCheckedPlugins(),

  checkedPlugins: getDefaultCheckedPlugins(),
  checkedComponents: getDefaultCheckedComponents(),
};

export const settingsStore = createZustandStore("settings")(initialState)
  .extendActions((set) => ({
    resetPlugins: ({
      exclude,
    }: {
      exclude?: string[];
    } = {}) => {
      set.state((draft) => {
        draft.checkedPluginsNext = getDefaultCheckedPlugins();

        if (exclude)
          for (const item of exclude) {
            draft.checkedPluginsNext[item] = false;
          }
      });
    },
    resetComponents: ({
      exclude,
    }: {
      exclude?: string[];
    } = {}) => {
      set.state((draft) => {
        draft.checkedComponents = getDefaultCheckedComponents();

        if (exclude)
          for (const item of exclude) {
            draft.checkedComponents[item] = false;
          }
      });
    },
    setCheckedIdNext: (id: string | string[], checked: boolean) => {
      set.state((draft) => {
        draft.checkedPluginsNext = { ...draft.checkedPluginsNext };

        draft.checkedPluginsNext[id as string] = checked;
      });
    },
    setCheckedComponentId: (id: string | string[], checked: boolean) => {
      set.state((draft) => {
        draft.checkedComponents[id as string] = checked;
      });
    },
    syncChecked: () => {
      set.state((draft) => {
        draft.checkedPlugins = { ...draft.checkedPluginsNext };
      });
    },
  }))
  .extendSelectors((get) => ({
    checkedIdNext: (id: string) => get.checkedPluginsNext[id],
    checkedId: (id: string) => get.checkedPlugins[id],
    checkedComponentId: (id: string) => get.checkedComponents[id],
  }));
