import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/common/components/ui/sheet";

export default function DashboardSheet() {
  return (
    <Sheet>
      <SheetContent className="rounded-l-md border bg-card">
        <SheetHeader>
          <SheetTitle>Detail</SheetTitle>
          <SheetDescription>Information about user in detail</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
