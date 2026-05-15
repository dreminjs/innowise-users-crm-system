"use client";

import { FC } from "react";
import { useDeleteCv } from "@/modules/Cvs/hooks/useDeleteCv";
import { ActionsMenu } from "@/shared/ui/ActionsMenu/ActionsMenu";

interface Props {
  cvId: string;
}

export const CvActions: FC<Props> = ({ cvId }) => {
  const [deleteCv] = useDeleteCv();

  return (
    <ActionsMenu
      width="140px"
      items={[
        {
          type: "link",
          label: "Edit CV",
          href: `/cvs/${cvId}`,
        },
        {
          type: "button",
          label: "Delete CV",
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
