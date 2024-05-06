import { cn } from "@/common/lib/utils";
import EditorSubmitForm from "@editor/components/editor-submit-form";

type FooterToolbarProps = {
  className?: string
}

export default function FooterToolbar({ className }: FooterToolbarProps) {
  return (
    <footer className={cn("flex items-center overflow-y-visible px-4 pb-4", className)}>
      <EditorSubmitForm className="w-full flex items-center overflow-visible bg-card rounded-xl p-1 shadow-sm" />
    </footer>
  );
}
