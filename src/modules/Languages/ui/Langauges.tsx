import { useQuery } from "@apollo/client/react";
import { GET_PROFILE_LANGUAGES } from "../api/queries";
import { MenagementLanguages } from "./MenagementLanguages/MenagementLanguages";
import { FC } from "react";
import { Loading } from "@/shared/ui/Loading";
import { LanguagesList } from "@/modules/Languages";
import { Empty } from "@/shared/ui/Empty";
import { useUserStore } from "@/application/store/user.store";
import { UserRole } from "@/generated/graphql";

interface ILanguagesProps {
  usersLanguagesId: string;
}
export const Languages: FC<ILanguagesProps> = ({ usersLanguagesId }) => {
  const currentUserId = useUserStore((state) => state.userId);
  const role = useUserStore((state) => state.role);
  const { data, loading, error } = useQuery(GET_PROFILE_LANGUAGES, {
    variables: {
      userId: usersLanguagesId,
    },
  });
  const isEditable =
    currentUserId === usersLanguagesId || role === UserRole.Admin;
  if (loading) return <Loading />;
  if (error || !data?.profile) {
    return <Empty />;
  }
  const languages = data.profile.languages ?? [];
  return (
    <section>
      {languages.length > 0 ? (
        <LanguagesList languagesData={data} isAvailableToChange={isEditable} />
      ) : (
        <Empty />
      )}
      {isEditable && <MenagementLanguages userId={usersLanguagesId} />}
    </section>
  );
};
