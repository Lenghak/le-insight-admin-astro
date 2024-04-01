import { DateTableDatePicker } from "@/common/components/custom/table/data-table-date-range-picker";
import DataTableSearch from "@/common/components/custom/table/data-table-search";

export default function UsersFilters() {
  return (
    <div className="flex w-fit items-center gap-4">
      {/* Search Query */}
      <DataTableSearch />

      {/* Date */}
      <DateTableDatePicker  />
    </div>
  );
}
