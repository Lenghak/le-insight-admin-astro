import DashboardTitle from "@dashboard/composites/dashboard-title";

import { Fragment } from "react";

export default function ArticlesRoute() {
  return (
    <Fragment>
      <div className="flex items-end justify-between">
        <DashboardTitle
          title="Articles"
          spa
        />

        <div className="flex items-center justify-center gap-4">
          {/* <UsersCreateForm /> */}
        </div>
      </div>
    </Fragment>
  );
}
