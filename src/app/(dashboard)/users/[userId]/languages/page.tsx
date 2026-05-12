"use client";
import { LanguagesList } from "@/modules/Languages";
import { GET_PROFILE_LANGUAGES } from "@/modules/Languages/api/queries";
import { useQuery } from "@apollo/client/react";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  const userId = pathname.split("/")[2];
  const { data } = useQuery(GET_PROFILE_LANGUAGES, {
    variables: { userId },
  });
  return <>{data && <LanguagesList languagesData={data} />}</>;
}
