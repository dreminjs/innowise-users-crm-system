"use client";
import { useGetProfile } from "@/modules/Users";
import { GET_USERS } from "@/modules/Users/api/queries";
import { useQuery } from "@apollo/client/react";
import { usePathname } from "next/navigation";

export default function Page({ params }: { params: { userId: string } }) {
  const pathname = usePathname();
  const { data } = useGetProfile(1);

  const {} = useQuery(GET_USERS);

  return <div></div>;
}
