import styles from "./Avatar.module.css";

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
      <img className={styles.image} src={avatar} alt={firstName ?? "User"} />
    );
  }

  return <div className={styles.fallback}>{initials}</div>;
};
