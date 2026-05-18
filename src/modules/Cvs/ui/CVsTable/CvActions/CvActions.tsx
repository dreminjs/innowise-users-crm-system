"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { useDeleteCv } from "@/modules/Cvs/hooks/useDeleteCv";
import { ActionsMenu } from "@/shared/ui/ActionsMenu/ActionsMenu";

interface Props {
  cvId: string;
}

export const CvActions: FC<Props> = ({ cvId }) => {
  const [deleteCv] = useDeleteCv();
  const t = useTranslations("CvActions");
  return (
    <ActionsMenu
      width="140px"
      items={[
        {
          type: "link",
          label: `${t("edit")}`,
          href: `/cvs/${cvId}`,
        },
        {
          type: "button",
          label: `${t("delete")}`,
          variant: "danger",
          onClick: async () => {
            await deleteCv({
              variables: {
                cv: {
                  cvId,
                },
              },
            });
          },
        },
      ]}
    />
  );
};
