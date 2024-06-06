export const categoriesKeys = {
  all: ["categories"] as const,
  lists: () => [...categoriesKeys.all, "list"] as const,
  list: (...filters: string[]) =>
    [...categoriesKeys.lists(), ...filters] as const,
  details: () => [...categoriesKeys.all, "detail"] as const,
  detail: (id: unknown) => [...categoriesKeys.details(), id] as const,
};
