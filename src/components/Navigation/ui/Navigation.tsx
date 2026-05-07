import { FC } from "react";
import { INavigationItem } from "../model/navigation.interface";
import { NavigationItem } from "./NavigationItem";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";
interface INavigationProps {
  items: INavigationItem[];
}

export const Navigation: FC<INavigationProps> = ({ items }) => {
  const pathname = usePathname();
  return (
    <nav>
      <ul className={styles.navigationList}>
        {items.map((el, idx) => (
          <NavigationItem
            key={idx}
            isActive={pathname.includes(el.to)}
            label={el.label}
            to={el.to}
          />
        ))}
      </ul>
    </nav>
  );
};
