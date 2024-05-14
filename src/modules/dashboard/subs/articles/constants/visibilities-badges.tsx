import { Badge } from "@ui/badge";

import type React from "react";

import type { ArticlesVisiblityEnumType } from "@/common/types/articles-type";

export const visibiltiesBadges: Record<
  ArticlesVisiblityEnumType,
  React.ReactNode
> = {
  DRAFT: (
    <Badge
      variant={"dot"}
      colored={"yellow"}
      className="font-bold text-sm"
    >
      Draft
    </Badge>
  ),
  ARCHIVED: (
    <Badge
      variant={"dot"}
      colored={"rose"}
      className="font-bold text-sm"
    >
      Archived
    </Badge>
  ),
  PRIVATE: (
    <Badge
      variant={"dot"}
      colored={"purple"}
      className="font-bold text-sm"
    >
      Private
    </Badge>
  ),
  PREMIUM: (
    <Badge
      variant={"dot"}
      colored={"fuchsia"}
      className="font-bold text-sm"
    >
      Premium
    </Badge>
  ),
  PUBLIC: (
    <Badge
      variant={"dot"}
      colored={"emerald"}
      className="font-bold text-sm"
    >
      Public
    </Badge>
  ),
};
