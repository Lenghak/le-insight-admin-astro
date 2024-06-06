import { cn } from "@/common/lib/utils";

import EditorSubmitForm from "@editor/components/editor-submit-form";

type FooterToolbarProps = {
  className?: string;
};

export default function SubmitToolbar({ className }: FooterToolbarProps) {
  return (
    <footer
      className={cn(
        "flex items-center overflow-y-visible px-4 pb-4",
        className,
      )}
    >
      <EditorSubmitForm className="flex w-full items-center overflow-visible rounded-xl bg-card p-1 shadow-sm" />
    </footer>
  );
}
