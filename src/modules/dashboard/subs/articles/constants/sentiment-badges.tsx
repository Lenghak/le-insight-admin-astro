import type { SensitivitiesSentimentType } from "@/common/types/sensitivities-type";

export const sentimentalBadge: Record<
  SensitivitiesSentimentType,
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
  MIXED: {
    color: "purple" as const,
  },
  NEGATIVE: {
    color: "pink" as const,
  },
  NEUTRAL: {
    color: "cyan" as const,
  },
  POSITIVE: {
    color: "emerald" as const,
  },
};
