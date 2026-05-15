import { usePathname } from "next/navigation";
import { NavigationItem } from "./NavigationItem";
import { useDynamicSegment } from "@/application/store/dynamicSegment.store";
import { Fragment } from "react/jsx-runtime";
import { getLabel } from "../../model/getLabel";
import styles from "./Navigation.module.css";
import { Icon } from "@/shared/ui/Icon/Icon";
import clsx from "clsx";

export const Navigation = () => {
  const pathname = usePathname();
  const segment = useDynamicSegment((state) => state.segment);
  const pathSegments = pathname.split("/").filter((el) => el !== "");
  return (
    <nav>
      <ul className={styles.navigationList}>
        {pathSegments.map((el, idx, array) => (
          <Fragment key={idx}>
            <NavigationItem
              label={getLabel(idx, el, segment)}
              href={idx === 1 ? `` : `/${el}`}
              isActive={idx === 1}
            />
            {array[idx + 1] && (
              <Icon name="arrow" size={10} className={clsx(styles.arrow)} />
            )}
          </Fragment>
        ))}
      </ul>
    </nav>
  );
};
