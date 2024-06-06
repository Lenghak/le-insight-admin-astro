import { Button } from "@/common/components/ui/button";

import { PlusIcon, SquareArrowOutUpRightIcon } from "lucide-react";

export default function DataButtons() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        className="items-center gap-1 bg-card"
        variant={"outline"}
        size={"sm"}
      >
        <span className="px-2 font-bold">Export</span>
        <SquareArrowOutUpRightIcon size={16} />
      </Button>
      <Button
        className="items-center gap-1"
        size={"sm"}
      >
        <PlusIcon size={16} />
        <span className="px-2 font-bold">Add data</span>
      </Button>
    </div>
  );
}
