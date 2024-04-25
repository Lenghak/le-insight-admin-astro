import useGetCategoriesListService from "@/modules/dashboard/subs/categories/hooks/use-get-categories-list-service";

import { useSearchParams } from "react-router-dom";

type DateRange = string | Date | null | undefined;

export default function useCategoriesListHandler() {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "50");
  const q = searchParams.get("q") ?? undefined;

  let rfrom: DateRange = searchParams.get("from") ?? undefined;
  let rto: DateRange = searchParams.get("to") ?? undefined;

  try {
    rfrom = rfrom ? new Date(rfrom) : undefined;
    rto = rto ? new Date(rto) : undefined;
  } catch (err) {
    rfrom = undefined;
    rto = undefined;
  }

  return useGetCategoriesListService({
    page,
    limit,
    q,
    from: (rfrom as Date)?.toISOString(),
    to: (rto as Date)?.toISOString(),
  });
}