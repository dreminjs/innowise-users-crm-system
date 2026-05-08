import { Navigation } from "@/components/Navigation";
import { userNavigation } from "../model/user.navigation";

export const UsersNavigation = () => {
  return <Navigation items={userNavigation} />;
};
