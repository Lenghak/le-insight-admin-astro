export const sensitivitiesKeys = {
  all: ["sensitivities"] as const,
  lists: () => [...sensitivitiesKeys.all, "list"] as const,
  list: (...filters: string[]) =>
    [...sensitivitiesKeys.lists(), ...filters] as const,
  details: () => [...sensitivitiesKeys.all, "detail"] as const,
  detail: (id: unknown) => [...sensitivitiesKeys.details(), id] as const,
};
