import { Navigation } from "@/components/Navigation";
import { userNavigation } from "@/modules/Users";

export const UsersNavigation = () => {
  return <Navigation items={userNavigation} />;
};
