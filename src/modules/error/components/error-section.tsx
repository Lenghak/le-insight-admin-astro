import { H3 } from "@/common/components/ui/h3";
import { Muted } from "@/common/components/ui/muted";

import { cn } from "@/common/lib/utils";

import { type HTMLAttributes } from "react";

interface ErrorSectionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  img?: React.ReactNode;
  title?: React.ReactNode;
  description: React.ReactNode;
  action?: React.ReactNode;
}

export default function ErrorSection({
  img,
  title,
  description,
  action,
  className,
  ...props
}: ErrorSectionProps) {
  return (
    <section
      className={cn(
        "flex h-full w-full flex-col items-center justify-center",
        className,
      )}
      {...props}
    >
      {/* image */}
      {img ?? (
        <img
          src={"/svg/data-error.svg"}
          alt="Error"
          className="w-48 object-cover"
        />
      )}

      {/* title message */}
      {typeof title !== "string" ? (
        title
      ) : (
        <H3 className="text-center font-extrabold">Something went wrong!</H3>
      )}

      <Muted className="mt-4 w-80 max-w-screen-xs text-center">
        {description}
      </Muted>

      {action ? (
        <div className="flex items-center justify-center gap-4">{action}</div>
      ) : null}
    </section>
  );
}
