import { Header } from "@/components/Header/ui/Header";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  );
}
