import styles from "./Empty.module.css";

export const Empty = () => {
  console.log("Empty!!");
  return <div className={styles.empty}>Empty :(</div>;
};
