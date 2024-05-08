import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@ui/sheet";

import type React from "react";

type ArticlesThumbnailFormProps = {
  trigger?: React.ReactNode;
};

export default function ArticlesThumbnailForm({
  trigger,
}: ArticlesThumbnailFormProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="h-full flex items-center justify-center gap-6 sm:max-w-screen-lg bg-card">



      </SheetContent>
    </Sheet>
  );
}
