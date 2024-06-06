import { Badge } from "@ui/badge";

export const categoryStatus = {
  ACTIVE: (
    <Badge
      variant={"dot"}
      colored={"emerald"}
      className="font-bold uppercase"
    >
      ACTIVE
    </Badge>
  ),
  INACTIVE: (
    <Badge
      variant={"dot"}
      colored={"yellow"}
      className="font-bold uppercase"
    >
      Inactive
    </Badge>
  ),
  PENDING: (
    <Badge
      variant={"dot"}
      colored={"blue"}
      className="font-bold uppercase"
    >
      Pending
    </Badge>
  ),
  REVOKED: (
    <Badge
      variant={"dot"}
      colored={"red"}
      className="font-bold uppercase"
    >
      Revoked
    </Badge>
  ),
};
