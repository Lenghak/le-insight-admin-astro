import { DateTableDatePicker } from "@custom/table/data-table-date-range-picker";
import DataTableSearch from "@custom/table/data-table-search";

export default function ArticlesFilters() {
  return (
    <div className="flex w-fit items-center gap-4">
      {/* Search Query */}
      <DataTableSearch />

      {/* Date */}
      <DateTableDatePicker />
    </div>
  );
}
