import { createNavigation } from "next-intl/navigation";

export const { useRouter, usePathname, Link, redirect } = createNavigation({
  locales: ["en", "ru", "de"],
});
