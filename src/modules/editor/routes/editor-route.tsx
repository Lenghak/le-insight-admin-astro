import EditorSkeleton from "@editor/components/editor-skeleton";

import React, { Fragment, Suspense } from "react";

const Editor = React.lazy(
  () => import("@/modules/editor/presenters/plate-editor"),
);

export default function EditorRoute() {
  return (
    <Fragment>
      <section className="flex h-full items-center gap-0 rounded-none p-0">
        <Suspense fallback={<EditorSkeleton />}>
          <Editor />
        </Suspense>
      </section>
    </Fragment>
  );
}
