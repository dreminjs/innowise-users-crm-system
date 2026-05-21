"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "./not-found.module.css";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.description}>{t("description")}</p>
        <Link href="/" className={styles.button}>
          {t("button")}
        </Link>
      </div>
    </main>
  );
}
