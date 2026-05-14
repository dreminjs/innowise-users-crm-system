import { GetCvQuery } from "@/graphql/graphql";
import styles from "./PreviewHeader.module.css";

type Props = {
  cv: GetCvQuery["cv"];
};

export const PreviewHeader = ({ cv }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div>
          <h1 className={styles.name}>
            {cv.user?.profile?.full_name ?? "Unknown User"}
          </h1>
          <p className={styles.position}>{cv.user?.position?.name ?? ""}</p>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoBlock}>
          <div className={styles.infoSection}>
            <h3>Education</h3>

            <p>{cv.education ?? "-"}</p>
          </div>
        </div>
        <div className={styles.infoBlock}>
          <div className={styles.infoSection}>
            <h3>{cv.name}</h3>
            <p className={styles.description}>{cv.description}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
