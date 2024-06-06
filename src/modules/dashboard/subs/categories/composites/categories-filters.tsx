import { DataTableViewOptions } from "@custom/table";
import { DateTableDatePicker } from "@custom/table/data-table-date-range-picker";
import DataTableSearch from "@custom/table/data-table-search";

import type { Table } from "@tanstack/react-table";

interface CategoriesFiltersProps<TData> {
  table: Table<TData>;
}

export default function CategoriesFilters<TData>({
  table,
}: CategoriesFiltersProps<TData>) {
  return (
    <div className="flex w-fit items-center gap-4">
      {/* Search Query */}
      <DataTableSearch />

      {/* Date */}
      <DateTableDatePicker />

      <DataTableViewOptions table={table} />
    </div>
  );
}
