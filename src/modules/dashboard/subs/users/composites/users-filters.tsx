import { SexesBages } from "@/modules/dashboard/subs/users/constants/sex-badge";

import { DataTableViewOptions } from "@/common/components/custom/table";
import DataTableCheckboxFilter from "@/common/components/custom/table/data-table-checkbox-filter";
import { DateTableDatePicker } from "@/common/components/custom/table/data-table-date-range-picker";
import DataTableSearch from "@/common/components/custom/table/data-table-search";

import type { Table } from "@tanstack/react-table";
import { FilterIcon } from "lucide-react";

interface UsersFiltersProps<TData> {
  table: Table<TData>;
}

const usersSexFilters = [
  {
    label: SexesBages.MALE,
    value: "MALE",
  },
  {
    label: SexesBages.FEMALE,
    value: "FEMALE",
  },
  {
    label: SexesBages.RNTS,
    value: "RNTS",
  },
];

export default function UsersFilters<TData>({
  table,
}: UsersFiltersProps<TData>) {
  return (
    <div className="flex w-fit items-center gap-4">
      {/* Search Query */}
      <DataTableSearch />

      <DataTableCheckboxFilter
        queryName="sex[]"
        checkboxes={usersSexFilters}
        label="Sex"
        trigger={
          <div className="flex items-center gap-4">
            <FilterIcon className="size-4 stroke-[3]" />
            <span>Sex</span>
          </div>
        }
        className="w-48"
      />

      {/* Date */}
      <DateTableDatePicker />

      <DataTableViewOptions table={table} />
    </div>
  );
}