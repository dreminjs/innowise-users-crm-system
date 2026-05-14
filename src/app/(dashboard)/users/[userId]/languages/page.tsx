"use client";
import { useUserStore } from "@/application/store/user.store";
import { LanguagesList } from "@/modules/Languages";
import { GET_PROFILE_LANGUAGES } from "@/modules/Languages/api/queries";
import { Loading } from "@/shared/ui/Loading";
import { useQuery } from "@apollo/client/react";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  const currentUserId = useUserStore((state) => state.userId);
  const languagesUserId = pathname.split("/")[2];
  const { data, loading, error } = useQuery(GET_PROFILE_LANGUAGES, {
    variables: { userId: languagesUserId },
  });
  if (loading) return <Loading />;

  if (error) return <div>Error: {error.message}</div>;

  if (!data?.profile.languages) return <div>Empty :(</div>;
  return (
    <>
      {data && (
        <LanguagesList
          languagesData={data}
          isAvailableToChange={currentUserId === languagesUserId}
        />
      )}
    </>
  );
}
