import { Spinner } from "@chakra-ui/react";
import styles from "./Loading.module.css";
export const Loading = () => {
  return (
    <>
      <Spinner className={styles.loading} />
    </>
  );
};
