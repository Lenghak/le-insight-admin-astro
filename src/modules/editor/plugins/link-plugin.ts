import { LinkFloatingToolbar } from "@plate-ui/link-floating-toolbar";

import type { PlatePlugin, RenderAfterEditable } from "@udecode/plate-common";
import type { LinkPlugin } from "@udecode/plate-link";

export const linkPlugin: Partial<PlatePlugin<LinkPlugin>> = {
  renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
};
