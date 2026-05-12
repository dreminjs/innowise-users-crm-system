import { ReactNode } from "react";
import { CvLayout } from "@/layouts/dashboard/ui/CvLayout/CvLayout";

type Props = {
  children: ReactNode;
  params: Promise<{
    cvId: string;
  }>;
};

export default async function Layout({ children, params }: Props) {
  const { cvId } = await params;

  return <CvLayout cvId={cvId}>{children}</CvLayout>;
}
