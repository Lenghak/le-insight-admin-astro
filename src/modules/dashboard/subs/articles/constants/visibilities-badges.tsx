import { Badge } from "@ui/badge";

import type React from "react";

import type { ArticlesVisiblityEnumType } from "@/common/types/articles-type";

export const visibiltiesBadges: Record<
	ArticlesVisiblityEnumType,
	React.ReactNode
> = {
	DRAFT: (
		<Badge variant={"dot"} colored={"yellow"} className="text-sm font-bold">
			Draft
		</Badge>
	),
	ARCHIVED: (
		<Badge variant={"dot"} colored={"rose"} className="text-sm font-bold">
			Archived
		</Badge>
	),
	PRIVATE: (
		<Badge variant={"dot"} colored={"purple"} className="text-sm font-bold">
			Private
		</Badge>
	),
	PREMIUM: (
		<Badge variant={"dot"} colored={"fuchsia"} className="text-sm font-bold">
			Premium
		</Badge>
	),
	PUBLIC: (
		<Badge variant={"dot"} colored={"emerald"} className="text-sm font-bold">
			Public
		</Badge>
	),
};
