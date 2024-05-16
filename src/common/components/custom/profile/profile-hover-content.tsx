import useGetUserService from "@users/hooks/use-get-user-service";

import { Button } from "@ui/button";
import { Muted } from "@ui/muted";

import ProfileBadge from "@custom/profile/profile-badge";

import { Separator } from "@/common/components/ui/separator";
import { Skeleton } from "@/common/components/ui/skeleton";

import { cn } from "@/common/lib/utils";

import { type PropsWithChildren } from "react";

type ProfileHoverProps = {
  className?: string;
  userID: string | undefined;
} & PropsWithChildren;

export function ProfileHoverSkeleton() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <div className="flex w-full items-center justify-between gap-6">
        <div className="flex items-center justify-start gap-4">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-4 w-24 rounded-full" />
        </div>

        <Skeleton className="h-10 w-24 rounded-full" />
      </div>

      <div className="line-clamp-3 h-full w-full space-y-2">
        <Skeleton className="h-4 w-1/2 rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
      </div>

      <Separator className="animate-pulse" />

      <Skeleton className="h-10 w-full rounded-full" />
    </div>
  );
}

export default function ProfileHoverContent({
  className,
  userID,
}: ProfileHoverProps) {
  const { data: res, isLoading } = useGetUserService({
    userID,
  });
  const profile = res?.data.included?.at(0);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center",
        className,
      )}
    >
      {isLoading ? (
        <ProfileHoverSkeleton />
      ) : (
        <div className="flex w-full flex-col items-start justify-start gap-4">
          <div className="flex w-full items-center justify-between gap-6">
            <ProfileBadge
              firstName={profile?.attributes.first_name}
              lastName={profile?.attributes.last_name}
              imageURL={profile?.attributes.image_url ?? ""}
              avatarClassName="size-8"
              avatarFallBackClassName="bg-accent"
              metaClassName="text-sm"
            />

            <Button
              className="px-6 font-bold"
              size={"sm"}
            >
              Follow
            </Button>
          </div>

          <div className="line-clamp-3 h-full w-full">
            {profile?.attributes.bio ?? (
              <Muted className="whitespace-pre-wrap text-sm italic">
                " This author has not decided to leave some wisdom yet. "
              </Muted>
            )}
          </div>

          <Separator />

          <Button
            variant={"secondary"}
            className="w-full font-bold hover:underline"
            size={"sm"}
          >
            View Profile
          </Button>
        </div>
      )}
    </div>
  );
}
