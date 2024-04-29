import { Badge } from "@ui/badge";

export const visibiltiesBadges = {
  ADMIN: (
    <Badge
      variant={"fair"}
      colored={"yellow"}
      className="font-bold"
    >
      Admin
    </Badge>
  ),
  USER: (
    <Badge
      variant={"fair"}
      colored={"amber"}
      className="font-bold"
    >
      User
    </Badge>
  ),
  GUEST: (
    <Badge
      variant={"fair"}
      colored={"lime"}
      className="font-bold"
    >
      Guest
    </Badge>
  ),
};
