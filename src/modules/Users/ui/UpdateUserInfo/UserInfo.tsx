import { FC } from "react";
import styles from "./UpdateUserInfo.module.css";
interface IUserInfoProps {
  fullName: string;
  email: string;
  hiredDate: string;
}

export const UserInfo: FC<IUserInfoProps> = ({
  fullName,
  email,
  hiredDate,
}) => {
  return (
    <div className={styles.userInfo}>
      <h2 className={styles.userInfoFullName}>{fullName}</h2>
      <p className={styles.userInfoEmail}>{email}</p>
      <p className={styles.userInfoHiredDate}>{hiredDate}</p>
    </div>
  );
};
