"use client";
import { AuthHeader } from "@/components/AuthHeader";
import { useCheckAuth } from "@/modules/Auth/";
import styles from "./layout.module.css";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useCheckAuth(false);
  return (
    <div className={styles.layout}>
      <AuthHeader />
      <main className={styles.container}>{children}</main>
    </div>
  );
}
