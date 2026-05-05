import { Navigation } from "./Navigation";
import styles from "./AuthHeader.module.css";
export const AuthHeader = () => {
  return (
    <header className={styles.authHeader}>
      <Navigation />
    </header>
  );
};
