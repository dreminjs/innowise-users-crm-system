import { EditCvProjectPage } from "@/modules/Projects/pages/EditCvProjectPage/EditCvProjectPage";

type Props = {
  params: Promise<{
    cvId: string;
    projectId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { cvId, projectId } = await params;

  return <EditCvProjectPage cvId={cvId} projectId={projectId} />;
}
