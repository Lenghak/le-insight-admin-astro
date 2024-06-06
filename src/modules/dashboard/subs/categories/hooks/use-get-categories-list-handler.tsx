import useGetCategoriesListService from "@categories/hooks/use-get-categories-list-service";

import { useSearchParams } from "react-router-dom";

import type { CategoriesStatusType } from "@/common/types/categories-type";

type DateRange = string | Date | null | undefined;

export default function useCategoriesListHandler() {
  const [searchParams] = useSearchParams();

  const page = Number.parseInt(searchParams.get("page") ?? "1");
  const limit = Number.parseInt(searchParams.get("limit") ?? "50");
  const q = searchParams.get("q") ?? undefined;
  const status = searchParams.get("status") ?? undefined;

  let rfrom: DateRange = searchParams.get("from") ?? undefined;
  let rto: DateRange = searchParams.get("to") ?? undefined;

  try {
    rfrom = rfrom ? new Date(rfrom) : undefined;
    rto = rto ? new Date(rto) : undefined;
  } catch (_err) {
    rfrom = undefined;
    rto = undefined;
  }

  return useGetCategoriesListService({
    page,
    limit,
    q,
    from: (rfrom as Date)?.toISOString(),
    to: (rto as Date)?.toISOString(),
    status: status === "ALL" ? undefined : (status as CategoriesStatusType),
  });
}
