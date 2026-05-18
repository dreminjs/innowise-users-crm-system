import { FC, useState } from "react";
import { Popover } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { UserAction } from "./UserAction";
import styles from "./UserAction.module.css";

interface IUserActionsProps {
  userId: string;
}

export const UserActions: FC<IUserActionsProps> = ({ userId }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const t = useTranslations("UserActions");
  return (
    <Popover.Root
      open={isPopoverVisible}
      onOpenChange={(e) => setIsPopoverVisible(e.open)}
    >
      <Popover.Trigger>⋮</Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content width={100} className={styles.actionContainer}>
          <Popover.CloseTrigger />
          <ul>
            <UserAction to={`users/${userId}`}>{t("profile")}</UserAction>
            <UserAction to={`users/${userId}/edit`}>{t("edit")}</UserAction>
          </ul>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};
