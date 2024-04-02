import UsersSexFilter from "@/modules/dashboard/subs/users/composites/users-sex-filter";

import { DataTableViewOptions } from "@/common/components/custom/table";
import { DateTableDatePicker } from "@/common/components/custom/table/data-table-date-range-picker";
import DataTableSearch from "@/common/components/custom/table/data-table-search";

import type { Table } from "@tanstack/react-table";

interface UsersFiltersProps<TData> {
  table: Table<TData>;
}

export default function UsersFilters<TData>({
  table,
}: UsersFiltersProps<TData>) {
  return (
    <div className="flex w-fit items-center gap-4">
      {/* Search Query */}
      <DataTableSearch />

      <UsersSexFilter
        label="Sex"
        trigger={"Sex"}
      />

      {/* Date */}
      <DateTableDatePicker />

      <DataTableViewOptions table={table} />
    </div>
  );
}
