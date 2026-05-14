import { CvPreviewPage } from "@/modules/CvsPreview/pages/CvPreviewPage";

type Props = {
  params: Promise<{
    cvId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { cvId } = await params;
  return <CvPreviewPage cvId={cvId} />;
}
