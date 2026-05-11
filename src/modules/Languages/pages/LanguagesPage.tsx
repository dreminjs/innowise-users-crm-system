import { useUserStore } from "@/application/store/user.store";
import { Languages } from "../ui/Langauges";

export const LanguagesPage = () => {
  const currentUserId = useUserStore((state) => state.userId);
  return (
    <main>{currentUserId && <Languages currentUserId={currentUserId} />}</main>
  );
};
