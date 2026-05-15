import clsx from "clsx";
import { icons, IconName } from "./icons";
import styles from "./Icon.module.css";

type Props = {
  name: IconName;
  className?: string;
  size?: number;
};

export const Icon = ({ name, className, size = 20 }: Props) => {
  const Component = icons[name];

  return (
    <Component
      className={clsx(styles.icon, className)}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};
