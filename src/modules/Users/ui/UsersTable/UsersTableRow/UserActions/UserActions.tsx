import { FC, useState } from "react";
import { Popover } from "@chakra-ui/react";
import { UserAction } from "./UserAction";
import styles from "./UserAction.module.css";
interface IUserActionsProps {
  userId: string;
}

export const UserActions: FC<IUserActionsProps> = ({ userId }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  return (
    <>
      <Popover.Root
        open={isPopoverVisible}
        onOpenChange={(e) => setIsPopoverVisible(e.open)}
      >
        <Popover.Trigger>⋮</Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content width={100} className={styles.actionContainer}>
            <Popover.CloseTrigger />
            <ul>
              <UserAction to={`users/${userId}`}>Profile</UserAction>
              <UserAction to={`users/${userId}/edit`}>Edit</UserAction>
            </ul>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </>
  );
};
