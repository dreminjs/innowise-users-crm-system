import { useQuery } from "@apollo/client/react";
import { GET_PROFILE_LANGUAGES } from "../api/queries";
import { MenagementLanguages } from "./MenagementLanguages/MenagementLanguages";
import { FC } from "react";
import { Loading } from "@/shared/ui/Loading";
import { LanguagesList } from "@/modules/Languages";
import { Empty } from "@/shared/ui/Empty";

interface ILanguagesProps {
  usersLanguagesId: string;
  currentUserId: string;
}
export const Languages: FC<ILanguagesProps> = ({
  usersLanguagesId,
  currentUserId,
}) => {
  const { data, loading, error } = useQuery(GET_PROFILE_LANGUAGES, {
    variables: {
      userId: usersLanguagesId,
    },
  });
  const isEditable = currentUserId === usersLanguagesId;
  if (loading) return <Loading />;
  if (error || !data?.profile) {
    return <Empty />;
  }
  const languages = data.profile.languages ?? [];
  return (
    <section>
      {languages.length > 0 ? (
        <LanguagesList languagesData={data} isAvailableToChange={true} />
      ) : (
        <Empty />
      )}
      <MenagementLanguages userId={usersLanguagesId} />
    </section>
  );
};
