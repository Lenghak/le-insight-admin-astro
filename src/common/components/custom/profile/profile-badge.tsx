import { cn } from "@/common/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { Muted } from "@ui/muted";

import { useIsClient } from "@uidotdev/usehooks";

type ProfileBadgeProps = {
  className?: string;
  avatarClassName?: string;
  avatarFallBackClassName?: string;
  imageClassName?: string;
  imageURL?: string;
  firstName?: string;
  lastName?: string;
  metaClassName?: string;
  meta?: string;
};

export default function ProfileBadge({
  className,
  imageClassName,
  avatarClassName,
  avatarFallBackClassName,
  metaClassName,
  meta,
  firstName,
  imageURL,
  lastName,
}: ProfileBadgeProps) {
  const isClient = useIsClient();

  return (
    <div className={cn("flex items-center gap-4", className)}>
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

      <div className={cn("flex flex-col justify-between", metaClassName)}>
        <span className="line-clamp-1 overflow-ellipsis whitespace-nowrap font-bold">{`${firstName} ${lastName}`}</span>
        <Muted className="line-clamp-1 overflow-ellipsis whitespace-nowrap font-medium">
          {meta}
        </Muted>
      </div>
    </div>
  );
}
