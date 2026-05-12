import { CvSkills } from "@/modules/Cvs/ui/CvSkills/CvSkills";

type Props = {
  params: Promise<{
    cvId: string;
  }>;
};

export default async function CvSkillsPage({ params }: Props) {
  const { cvId } = await params;
  return <CvSkills cvId={cvId} />;
}
