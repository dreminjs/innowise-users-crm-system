import { GetCvQuery } from "@/graphql/graphql";

import styles from "./PreviewHeader.module.css";

type Props = {
  cv: GetCvQuery["cv"];
};

export const PreviewHeader = ({ cv }: Props) => {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.name}>
          {cv.user?.profile?.full_name ?? "Unknown User"}
        </h1>
        <p className={styles.position}>{cv.user?.position?.name ?? ""}</p>
      </div>
      <div className={styles.info}>
        <div>
          <h3>Education</h3>
          <p>{cv.education ?? "-"}</p>
        </div>
        <div>
          <h3>{cv.name}</h3>
          <p>{cv.description}</p>
        </div>
      </div>
    </header>
  );
};
