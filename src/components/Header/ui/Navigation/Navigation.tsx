import { usePathname } from "next/navigation";
import { NavigationItem } from "./NavigationItem";
import { useDynamicSegment } from "@/application/store/dynamicSegment.store";
import NavigationArrow from "../../../../../public/navigation-arrow.svg";
import styles from "./Navigation.module.css";
import { Fragment } from "react/jsx-runtime";
export const Navigation = () => {
  const pathname = usePathname();
  const segment = useDynamicSegment((state) => state.segment);
  console.log(pathname);
  return (
    <nav>
      <ul className={styles.navigationList}>
        {pathname
          .split("/")
          .filter((el) => el !== "")
          .map((el, idx) => (
            <Fragment key={idx}>
              <NavigationItem
                label={idx === 1 ? segment : el === "users" ? "Employees" : el}
                href={""}
                isActive={idx === 1}
                payload={{
                  type: "employee",
                  id: 0,
                }}
              />
              {el[idx + 1] && <NavigationArrow />}
            </Fragment>
          ))}
      </ul>
    </nav>
  );
};
