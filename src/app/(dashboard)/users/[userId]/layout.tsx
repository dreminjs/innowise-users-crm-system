"use client";
import { Navigation, NavigationItem } from "@/components/Navigation";
import { userNavigation } from "@/modules/Users/model/user.navigation";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const userId = pathname.split("/")[2];
  return (
    <>
      <Navigation>
        {userNavigation.map((el, idx) => (
          <NavigationItem
            key={idx}
            isActive={
              !isNaN(Number(pathname.split("/").pop())) &&
              pathname.split("/")[1] === "users"
                ? el.to === "/"
                : pathname.split("/").pop() === el.to
            }
            label={el.label}
            to={`/users/${userId}/${el.to}`}
          />
        ))}
      </Navigation>
      <div className={styles.layout}>{children}</div>
    </>
  );
}
