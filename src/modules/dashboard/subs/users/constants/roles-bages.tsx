import { Badge } from "@/common/components/ui/badge";

export const rolesBages = {
  ADMIN: (
    <Badge
      variant={"fair"}
      colored={"amber"}
      className="font-bold"
    >
      Admin
    </Badge>
  ),
  USER: (
    <Badge
      variant={"fair"}
      colored={"emerald"}
      className="font-bold"
    >
      User
    </Badge>
  ),
  GUEST: (
    <Badge
      variant={"fair"}
      colored={"cyan"}
      className="font-bold"
    >
      Guest
    </Badge>
  ),
};
