export const articleKeys = {
  all: ["articles"] as const,
  lists: () => [...articleKeys.all, "list"] as const,
  list: (...filters: string[]) => [...articleKeys.lists(), ...filters] as const,
  details: () => [...articleKeys.all, "detail"] as const,
  detail: (id: unknown) => [...articleKeys.details(), id] as const,
};
