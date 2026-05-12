import { useQuery } from "@apollo/client/react";
import { GET_PROFILE_LANGUAGES } from "../api/queries";
import { MenagementLanguages } from "./MenagementLanguages/MenagementLanguages";
import { FC } from "react";
import { Loading } from "@/shared/ui/Loading";
import { LanguagesList } from "./LanguagesList/LanguagesList";
import { Empty } from "@/shared/ui/Empty";

interface ILanguagesProps {
  usersLanguagesId: string;
}

export const Languages: FC<ILanguagesProps> = ({ usersLanguagesId }) => {
  const { data, loading } = useQuery(GET_PROFILE_LANGUAGES, {
    variables: {
      userId: usersLanguagesId,
    },
  });

  if (loading) return <Loading />;

  return (
    <section>
      <>
        {data?.profile.languages.length ? (
          <LanguagesList languagesData={data} isAvailableToChange={true} />
        ) : (
          <Empty />
        )}
        <MenagementLanguages />
      </>
    </section>
  );
};
