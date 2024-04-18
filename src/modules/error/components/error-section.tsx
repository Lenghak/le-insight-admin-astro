import { H2 } from "@/common/components/ui/h2";
import { Muted } from "@/common/components/ui/muted";

import { cn } from "@/common/lib/utils";

import { type HTMLAttributes } from "react";

interface ErrorSectionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  img?: React.ReactNode;
  title?: React.ReactNode;
  description: React.ReactNode;
  action?: React.ReactNode;
  imgSrc?: string;
}

export default function ErrorSection({
  img,
  title,
  description,
  action,
  className,
  imgSrc,
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
          src={imgSrc ?? "/svg/data-error.svg"}
          alt="Error"
          className="w-48 object-cover"
        />
      )}

      {/* title message */}
      {typeof title !== "string" ? (
        title
      ) : (
        <H2 className="text-center font-extrabold">{title}</H2>
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
