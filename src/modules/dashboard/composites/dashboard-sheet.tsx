import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/common/components/ui/sheet";

import { type DialogProps } from "@radix-ui/react-dialog";
import type React from "react";

type DashboardSheetProps = React.PropsWithChildren & {
  title: React.ReactNode;
  description: React.ReactNode;
} & DialogProps;

export default function DashboardSheet({
  children,
  title,
  description,
  ...props
}: DashboardSheetProps) {
  return (
    <Sheet {...props}>
      <SheetContent className="w-full space-y-6 rounded-l-md border bg-card sm:max-w-screen-md">
        <SheetHeader className="space-y-1">
          <SheetTitle className="font-extrabold">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
