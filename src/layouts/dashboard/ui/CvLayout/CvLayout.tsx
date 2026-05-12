"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./CvLayout.module.css";
import { tabs } from "@/shared/config/tabs";

type Props = {
  cvId: string;
  children: React.ReactNode;
};

export const CvLayout = ({ cvId, children }: Props) => {
  const pathname = usePathname();
  return (
    <section className={styles.page}>
      <nav className={styles.tabs}>
        {tabs.map((tab) => {
          const href = `/cvs/${cvId}${tab.href}`;
          const isActive = pathname === href;
          return (
            <Link
              key={tab.label}
              href={href}
              className={`${styles.tab} ${isActive ? styles.active : ""}`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
      <div className={styles.content}>{children}</div>
    </section>
  );
};
