import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/ui/avatar";
import { Muted } from "@/common/components/ui/muted";

import { cn } from "@/common/lib/utils";

import { useIsClient } from "@uidotdev/usehooks";

type ProfileBadgeProps = {
  className?: string;
  imageURL?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
};

export default function ProfileBadge({
  className,
  email,
  firstName,
  imageURL,
  lastName,
}: ProfileBadgeProps) {
  const isClient = useIsClient();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Avatar className="cursor-pointer">
        <AvatarImage src={imageURL} />
        <AvatarFallback className="bg-background">
          {isClient && (firstName ? firstName[0] : "?")}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col justify-between">
        <span className="line-clamp-1 font-bold">{`${firstName} ${lastName}`}</span>
        <Muted className="line-clamp-1 font-medium">{email}</Muted>
      </div>
    </div>
  );
}
