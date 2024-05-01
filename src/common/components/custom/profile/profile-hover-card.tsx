import { HoverCard, HoverCardContent, HoverCardTrigger } from "@ui/hover-card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/ui/avatar";

import { cn } from "@/common/lib/utils";

import { useIsClient } from "@uidotdev/usehooks";
import type { PropsWithChildren } from "react";

type ProfileHoverProps = {
  className?: string;
  avatarClassName?: string;
  avatarFallBackClassName?: string;
  hoverCardClassName?: string;
  imageClassName?: string;
  imageURL?: string;
  firstName?: string;
  asChild?: boolean;
} & PropsWithChildren;

export default function ProfileHoverCard({
  className,
  imageClassName,
  hoverCardClassName,
  avatarClassName,
  avatarFallBackClassName,
  firstName,
  imageURL,
  asChild,
  children,
}: ProfileHoverProps) {
  const isClient = useIsClient();

  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger className={cn(className)}>
        {asChild ? (
          children
        ) : (
          <Avatar className={cn("cursor-pointer", avatarClassName)}>
            <AvatarImage
              src={imageURL}
              className={imageClassName}
            />
            <AvatarFallback
              className={cn("bg-background font-bold", avatarFallBackClassName)}
            >
              {isClient && (firstName ? firstName[0] : "?")}
            </AvatarFallback>
          </Avatar>
        )}
      </HoverCardTrigger>
      <HoverCardContent className={cn(hoverCardClassName)}>
        The React Framework - created and maintained by @vercel.
      </HoverCardContent>
    </HoverCard>
  );
}
