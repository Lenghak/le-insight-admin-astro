import { rolesBadges } from "@users/constants/roles-badges";

import { COLOR_VARIANTS } from "@/common/constants/color-constants";
import { UserCheck, UserCogIcon, UserIcon } from "lucide-react";

import { UserRoleSchema } from "@/common/types/users-type";

export const rolesFields = [
  {
    value: UserRoleSchema.Values.ADMIN,
    label: UserRoleSchema.Values.ADMIN.toLowerCase(),
    icon: UserCogIcon,
    description: "Manage all data and settings throughout the application.",
    className: COLOR_VARIANTS[rolesBadges["ADMIN"].color],
  },
  {
    value: UserRoleSchema.Values.USER,
    label: UserRoleSchema.Values.USER.toLowerCase(),
    icon: UserCheck,
    description:
      "Can view, comment, post, and manage their own accounts and settings",
    className: COLOR_VARIANTS[rolesBadges["USER"].color],
  },
  {
    value: UserRoleSchema.Values.GUEST,
    label: UserRoleSchema.Values.GUEST.toLowerCase(),
    icon: UserIcon,
    description:
      "Can only read others limited data with limited actions and settings.",
    className: COLOR_VARIANTS[rolesBadges["GUEST"].color],
  },
];
