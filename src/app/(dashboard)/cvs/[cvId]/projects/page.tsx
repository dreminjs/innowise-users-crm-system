import { ProjectsPage } from "@/modules/Projects/pages/ProjectsPage/ProjectsPage";
type Props = {
  params: Promise<{
    cvId: string;
  }>;
};
export default async function Page({ params }: Props) {
  const { cvId } = await params;
  return <ProjectsPage cvId={cvId} />;
}
