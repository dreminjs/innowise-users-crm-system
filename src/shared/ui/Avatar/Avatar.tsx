import styles from "./Avatar.module.css";
import Image from "next/image";
type Props = {
  firstName?: string | null;
  lastName?: string | null;
  avatar?: string | null;
};

export const Avatar = ({ firstName, lastName, avatar }: Props) => {
  const initials = `
    ${firstName?.[0] ?? ""}
    ${lastName?.[0] ?? ""}
  `;

  if (avatar) {
    return (
      <Image
        className={styles.image}
        src={avatar}
        alt={firstName ?? "User"}
        width={40}
        height={40}
      />
    );
  }

  return <div className={styles.fallback}>{initials}</div>;
};
