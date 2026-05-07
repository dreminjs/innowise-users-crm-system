import { Navigation } from "./Navigation";
import styles from "./AuthHeader.module.css";
import { usePathname } from "next/navigation";
export const AuthHeader = () => {
  const pathname = usePathname();
  if (pathname === "/auth/forgot-password") return null;
  return (
    <header className={styles.authHeader}>
      <Navigation />
    </header>
  );
};
