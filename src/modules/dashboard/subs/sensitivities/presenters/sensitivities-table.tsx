import { sensitivitiesColumns } from "@sensitivities/composites/sensitivities-columns";
import SensitivitiesDataTable from "@sensitivities/composites/sensitivities-data-table";
import useSensitivitiesListHandler from "@sensitivities/hooks/use-get-sensitivities-list-handler";

import { Fragment } from "react/jsx-runtime";

export default function SensitivitiesTable() {
  const { data: res } = useSensitivitiesListHandler();

  return (
    <Fragment>
      <SensitivitiesDataTable
        columns={sensitivitiesColumns}
        data={res?.data.data ?? []}
        meta={res?.data?.meta}
        className="mt-4 w-full"
      />
    </Fragment>
  );
}
