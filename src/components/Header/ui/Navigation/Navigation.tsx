import { usePathname } from "next/navigation";
import { NavigationItem } from "./NavigationItem";
import { useDynamicSegment } from "@/application/store/dynamicSegment.store";
import { Fragment } from "react/jsx-runtime";
import { Icon } from "@/shared/ui/Icon/Icon";
import { useTranslations } from "next-intl";
import styles from "./Navigation.module.css";
import clsx from "clsx";
import UserIcon from "../../../../../public/user-icon.svg";
export const Navigation = () => {
  const pathname = usePathname();
  const segment = useDynamicSegment((state) => state.segment);
  const pathSegments = pathname.split("/").filter((el) => el !== "");
  const t = useTranslations("Navigation");
  return (
    <nav>
      <ul className={styles.navigationList}>
        {pathSegments.map((el, idx, array) => {
          const href = `/${array.slice(0, idx + 1).join("/")}`;
          return (
            <Fragment key={href}>
              {idx === 1 && <UserIcon />}
              <NavigationItem
                label={t.has(el) ? t(el) : el}
                href={idx === 1 ? "" : href}
                isActive={idx === 1}
              />
              {array[idx + 1] && (
                <Icon name="arrow" size={10} className={clsx(styles.arrow)} />
              )}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};
