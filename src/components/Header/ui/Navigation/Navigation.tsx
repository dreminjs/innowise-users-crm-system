import { usePathname } from "next/navigation";
import { NavigationItem } from "./NavigationItem";
import { useDynamicSegment } from "@/application/store/dynamicSegment.store";
import { Fragment } from "react/jsx-runtime";
import { getLabel } from "../../model/getLabel";
import NavigationArrow from "../../../../../public/nav-arrow.svg";
import styles from "./Navigation.module.css";
import Image from "next/image";

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
