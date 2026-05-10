import { useQuery } from "@apollo/client/react";
import { GET_PROFILE_LANGUAGES } from "../api/queries";
import { MenagementLanguages } from "./MenagementLanguages/MenagementLanguages";
import { FC } from "react";
import { Loading } from "@/shared/ui/Loading";
import { LanguagesList } from "./LanguagesList/LanguagesList";

interface ILanguagesProps {
  currentUserId: string;
}

export const Languages: FC<ILanguagesProps> = ({ currentUserId }) => {
  const { data, loading } = useQuery(GET_PROFILE_LANGUAGES, {
    variables: {
      userId: currentUserId,
    },
  });

  if (loading) return <Loading />;

  return (
    <section>
      {!loading && data && (
        <>
          <LanguagesList languagesData={data} />
          <MenagementLanguages />
        </>
      )}
    </section>
  );
};
