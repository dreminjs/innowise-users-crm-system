import { FC } from "react";
import { INavigationItem } from "../model/navigation.interface";
import { NavigationItem } from "./NavigationItem";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";
import { useDynamicSegment } from "@/application/store/dynamicSegment.store";
interface INavigationProps {
  items: INavigationItem[];
}

export const Navigation: FC<INavigationProps> = ({ items }) => {
  const pathname = usePathname();

  const segment = useDynamicSegment((state) => state.segment);

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
