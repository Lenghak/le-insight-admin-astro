import DashboardTitle from "@dashboard/composites/dashboard-title";

import SensitivitiesCreateForm from "@sensitivities/composites/sensitivities-create-form";
import { SensitivitiesDelete } from "@sensitivities/composites/sensitivities-delete-form";
import SensitivitiesEditForm from "@sensitivities/composites/sensitivities-edit-form";
import SensitivitiesTable from "@sensitivities/presenters/sensitivities-table";

export default function SensitivitiesRoute() {
  return (
    <section className="flex h-full flex-col p-6 pb-4 pr-4">
      <div className="flex items-end justify-between">
        <DashboardTitle
          title="Sensitivities"
          spa
        />

        <div className="flex items-center justify-center gap-4">
          <SensitivitiesCreateForm />
        </div>
      </div>

      <SensitivitiesTable />

      <SensitivitiesEditForm />

      <SensitivitiesDelete />
    </section>
  );
}
