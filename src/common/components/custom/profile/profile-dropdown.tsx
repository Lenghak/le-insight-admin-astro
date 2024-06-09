import useSessionService from "@auth/hooks/use-session-service";
import useSignOutService from "@auth/hooks/use-sign-out-service";

import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";

import ProfileBadge from "@custom/profile/profile-badge";

import { useIsClient } from "@uidotdev/usehooks";
import { InfoIcon, LogOut, Settings, UserIcon } from "lucide-react";

export default function ProfileDropdown() {
  const { mutate: signOut } = useSignOutService();
  const { data: session } = useSessionService();
  const user = session?.data?.user;
  const isClient = useIsClient();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={user?.image_url}
            alt={user?.first_name}
          />
          <AvatarFallback className="bg-background font-bold">
            {isClient && (user?.first_name[0] ?? "?")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-auto">
        <DropdownMenuGroup>
          <DropdownMenuItem className="px-3 py-2" disabled>
            <ProfileBadge
              meta={user?.email}
              firstName={user?.first_name}
              lastName={user?.last_name}
              imageURL={user?.image_url}
              className="gap-4"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem className="px-3 py-2" disabled>
            <UserIcon className="mr-4 h-4 w-4" />
            <span className="font-semibold">Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="px-3 py-2" disabled>
            <Settings className="mr-4 h-4 w-4" />
            <span className="font-semibold">Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="px-3 py-2" disabled>
            <InfoIcon className="mr-4 h-4 w-4" />
            <span className="font-semibold">Helps & Supports</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="px-3 py-2 text-destructive hover:!bg-destructive/5 hover:!text-destructive"
            onClick={() => signOut()}
          >
            <LogOut className="mr-4 h-4 w-4" />
            <span className="font-bold">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>{" "}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
