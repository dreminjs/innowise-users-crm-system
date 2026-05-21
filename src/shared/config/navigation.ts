import { IoLanguageSharp } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import { AiOutlineRise } from "react-icons/ai";
import { RiFileUserFill } from "react-icons/ri";

export const navigationItems = [
  {
    label: "employees",
    href: "/users",
    icon: HiUsers,
  },
  {
    label: "skills",
    href: "/skills",
    icon: AiOutlineRise,
  },
  {
    label: "languages",
    href: "/languages",
    icon: IoLanguageSharp,
  },
  {
    label: "cvs",
    href: "/cvs",
    icon: RiFileUserFill,
  },
  {
    label: "departments",
    href: "/departments",
    icon: "settings",
  },
  {
    label: "positions",
    href: "/positions",
    icon: "employees",
  },
  {
    label: "projects",
    href: "/projects",
    icon: "search",
  },
];
