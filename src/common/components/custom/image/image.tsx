import { Skeleton } from "@/common/components/ui/skeleton";

import { cn } from "@/common/lib/utils";

import { Fragment, type HTMLAttributes, useState } from "react";

type ImageProps = HTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

export default function Image({ className, ...props }: ImageProps) {
  const [isImageLoaded, setImageLoaded] = useState<boolean>(false);
  console.log(isImageLoaded);
  return (
    <Fragment>
      <img
        className={cn(
          "transition-all",
          !isImageLoaded ? "invisible !max-h-0" : "visible",
          className,
        )}
        {...props}
        onLoad={(e) => {
          setImageLoaded(true);
          props.onLoad && props.onLoad(e);
        }}
      />

      {!isImageLoaded && (
        <Skeleton className={cn("h-full w-full rounded-none", className)} />
      )}
    </Fragment>
  );
}
