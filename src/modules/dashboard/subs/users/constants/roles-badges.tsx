import { Badge } from "@/common/components/ui/badge";

export const rolesBadges = {
  ADMIN: (
    <Badge
      variant={"fair"}
      colored={"amber"}
      className="font-bold uppercase"
    >
      Admin
    </Badge>
  ),
  USER: (
    <Badge
      variant={"fair"}
      colored={"emerald"}
      className="font-bold uppercase"
    >
      User
    </Badge>
  ),
  GUEST: (
    <Badge
      variant={"fair"}
      colored={"rose"}
      className="font-bold uppercase"
    >
      Guest
    </Badge>
  ),
};
