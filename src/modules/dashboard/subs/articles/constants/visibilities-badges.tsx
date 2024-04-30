import { Badge } from "@ui/badge";

import type React from "react";

import type { ArticlesVisiblityEnumType } from "@/common/types/articles-type";

export const visibiltiesBadges: Record<
  ArticlesVisiblityEnumType,
  React.ReactNode
> = {
  DRAFT: (
    <Badge
      variant={"fair"}
      colored={"yellow"}
      className="font-bold"
    >
      Draft
    </Badge>
  ),
  ARCHIVED: (
    <Badge
      variant={"fair"}
      colored={"rose"}
      className="font-bold"
    >
      Archived
    </Badge>
  ),
  PRIVATE: (
    <Badge
      variant={"fair"}
      colored={"purple"}
      className="font-bold"
    >
      Private
    </Badge>
  ),
  PREMIUM: (
    <Badge
      variant={"fair"}
      colored={"emerald"}
      className="font-bold"
    >
      Premium
    </Badge>
  ),
  PUBLIC: (
    <Badge
      variant={"fair"}
      colored={"emerald"}
      className="font-bold"
    >
      Public
    </Badge>
  ),
};
