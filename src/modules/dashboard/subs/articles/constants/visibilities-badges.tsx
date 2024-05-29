import type { ArticlesVisiblityEnumType } from "@/common/types/articles-type";

export const visibiltiesBadges: Record<
	ArticlesVisiblityEnumType,
	{
		color:
			| "amber"
			| "emerald"
			| "cyan"
			| "pink"
			| "rose"
			| "purple"
			| "red"
			| "orange"
			| "yellow"
			| "lime"
			| "green"
			| "teal"
			| "sky"
			| "blue"
			| "indigo"
			| "violet"
			| "fuchsia"
			| null
			| undefined;
	}
> = {
	DRAFT: {
		color: "fuchsia" as const,
	},
	ARCHIVED: {
		color: "rose" as const,
	},
	PRIVATE: {
		color: "purple" as const,
	},
	PREMIUM: {
		color: "yellow" as const,
	},
	PUBLIC: {
		color: "emerald" as const,
	},
};
