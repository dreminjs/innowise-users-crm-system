"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { Popover } from "@chakra-ui/react";
import styles from "./ActionsMenu.module.css";

type ActionItem =
  | {
      type: "link";
      label: string;
      href: string;
      testId?: string;
    }
  | {
      type: "button";
      label: string;
      variant?: "default" | "danger";
      onClick: () => void | Promise<void>;
      testId?: string;
    };
interface Props {
  items: ActionItem[];
  width?: string;
}

export const ActionsMenu: FC<Props> = ({ items, width = "160px" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleAction = async (callback: () => void | Promise<void>) => {
    await callback();
    setIsOpen(false);
  };
  return (
    <Popover.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={styles.trigger}
          data-testid="actions-trigger"
        >
          ⋮
        </button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content width={width} className={styles.content}>
          <div className={styles.menu}>
            {items.map((item) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.item}
                    data-testid="menu-link"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <button
                  key={item.label}
                  type="button"
                  data-testid={
                    item.testId ??
                    item.type + (item.variant ? "-" + item.variant : "")
                  }
                  onClick={() => handleAction(item.onClick)}
                  className={`${styles.item} ${
                    item.variant === "danger" ? styles.danger : ""
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};
