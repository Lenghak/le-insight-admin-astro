import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";

import { Image } from "@/common/components/custom/image";

import { cn } from "@/common/lib/utils";

import React from "react";

export default React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ArticlesCard({ className, ...props }, ref) {
  return (
    <Card
      ref={ref}
      className={cn(
        "grid w-full grid-cols-[auto,_1fr] grid-rows-1 items-center justify-center border-none shadow-none",
        className,
      )}
      {...props}
    >
      <CardHeader className="aspect-square max-h-full min-h-40 min-w-40 max-w-40 p-0">
        {/* Thumbnail */}
        <Image
          src="https://source.unsplash.com/user/c_v_r/800x800"
          alt="Article Thumbnail"
          className="aspect-square h-full w-full rounded-md object-cover"
        />
      </CardHeader>

      <CardContent className="flex h-full w-full flex-col space-y-4 py-0">
        <CardTitle className="line-clamp-2 font-black">
          Lorem ipsum dolor sit.
        </CardTitle>

        <CardDescription className="line-clamp-3 font-serif text-base font-semibold">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident
          soluta fugiat tempora accusamus officia pariatur harum saepe odio
          vitae eligendi?
        </CardDescription>

        <CardFooter className="flex w-full items-center gap-4">
          {/* Profile */}

          {/* Posted Date */}

          {/* Minutes Reads */}
        </CardFooter>
      </CardContent>
    </Card>
  );
});
