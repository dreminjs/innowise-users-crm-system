import { usePathname } from "next/navigation";
import { NavigationItem } from "./NavigationItem";
import { useDynamicSegment } from "@/application/store/dynamicSegment.store";
import { Fragment } from "react/jsx-runtime";
import NavigationArrow from "../../../../../public/nav-arrow.svg";
import styles from "./Navigation.module.css";
import Image from "next/image";
import { getLabel } from "../../model/getLabel";

export const Navigation = () => {
  const pathname = usePathname();
  const segment = useDynamicSegment((state) => state.segment);
  return (
    <nav>
      <ul className={styles.navigationList}>
        {pathname
          .split("/")
          .filter((el) => el !== "")
          .map((el, idx) => (
            <Fragment key={idx}>
              {idx === 1}
              <NavigationItem
                label={getLabel(idx, el, segment)}
                href={idx === 1 ? `` : `/${el}`}
                isActive={idx === 1}
                payload={{
                  type: "employee",
                  id: 0,
                }}
              />
              {el[idx + 1] && (
                <Image
                  src={NavigationArrow}
                  alt="Navigation arrow"
                  width={7}
                  height={10}
                />
              )}
            </Fragment>
          ))}
      </ul>
    </nav>
  );
};
