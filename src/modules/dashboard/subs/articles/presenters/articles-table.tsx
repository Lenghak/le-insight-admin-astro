import { articlesColumns } from "@articles/composites/articles-columns";
import ArticlesDataTable from "@articles/composites/articles-data-table";

import { Fragment } from "react/jsx-runtime";

export default function ArticlesTable() {
  return (
    <Fragment>
      <ArticlesDataTable
        columns={articlesColumns}
        data={[]}
        className="mt-4 w-full"
        meta={undefined}
      />
    </Fragment>
  );
}
