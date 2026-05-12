import { CvDetailsPage } from "@/modules/Cvs/pages/CvDetailsPage/CvDetailsPage";

type Props = {
  params: Promise<{
    cvId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { cvId } = await params;

  return <CvDetailsPage cvId={cvId} />;
}
