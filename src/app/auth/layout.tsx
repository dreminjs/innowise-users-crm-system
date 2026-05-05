import { AuthHeader } from "@/components/AuthHeader";
import styles from "./layout.module.css";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <AuthHeader />
      <main className={styles.container}>{children}</main>
    </div>
  );
}
