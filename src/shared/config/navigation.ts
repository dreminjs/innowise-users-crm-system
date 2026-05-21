import { IconName } from "@/shared/ui/Icon/icons";
import { UserRole } from "@/graphql/graphql";

export const navigationItems: {
  label: string;
  href: string;
  icon: IconName;
  roles: UserRole[];
}[] = [
  {
    label: "employees",
    href: "/users",
    icon: "employees",
    roles: ["Admin", "Employee"],
  },
  {
    label: "skills",
    href: "/skills",
    icon: "skills",
    roles: ["Admin", "Employee"],
  },
  {
    label: "languages",
    href: "/languages",
    icon: "languages",
    roles: ["Admin", "Employee"],
  },
  {
    label: "cvs",
    href: "/cvs",
    icon: "cvs",
    roles: ["Admin", "Employee"],
  },
  {
    label: "departments",
    href: "/departments",
    icon: "departments",
    roles: ["Admin"],
  },
  {
    label: "positions",
    href: "/positions",
    icon: "positions",
    roles: ["Admin"],
  },
  {
    label: "projects",
    href: "/projects",
    icon: "projects",
    roles: ["Admin"],
  },
];
