"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import styles from "./CvLayout.module.css";
import { tabs } from "@/shared/config/tabs";
import { NavigationItem } from "@/components/Navigation";

type Props = {
  cvId: string;
  children: React.ReactNode;
};

export const CvLayout = ({ cvId, children }: Props) => {
  const pathname = usePathname();
  const t = useTranslations("CvTabs");
  return (
    <section className={styles.page}>
      <nav className={styles.tabs}>
        {tabs.map((tab) => {
          const href = `/cvs/${cvId}${tab.href}`;
          return (
            <NavigationItem
              key={tab.label}
              to={href}
              label={t(tab.label)}
              isActive={pathname === href}
            />
          );
        })}
      </nav>
      <div className={styles.content}>{children}</div>
    </section>
  );
};
