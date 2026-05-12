import Link from "next/link";
import Image from "next/image";
import { GetCvsQuery } from "@/graphql/graphql";
import { getCvUserName } from "../../model/lib/getCvUserName";
import styles from "./CVsTable.module.css";
type Props = {
  cv: GetCvsQuery["cvs"][number];
};

export const CVsTableRow = ({ cv }: Props) => {
  return (
    <>
      <tr className={styles.metaRow}>
        <td className={styles.name}>{cv.name}</td>
        <td className={styles.education}>{cv.education ?? "-"}</td>
        <td className={styles.employee}>{getCvUserName(cv)}</td>
        <td className={styles.actions}>
          <Link href={`/cvs/${cv.id}`}>
            <Image src="/dots.svg" alt="Actions" width={16} height={16} />
          </Link>
        </td>
      </tr>
      <tr className={styles.descriptionRow}>
        <td colSpan={4} className={styles.description}>
          {cv.description}
        </td>
      </tr>
    </>
  );
};
