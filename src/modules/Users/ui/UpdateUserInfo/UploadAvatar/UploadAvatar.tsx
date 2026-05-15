import { FC, useState } from "react";
import { Avatar } from "./Avatar";
import { FileUpload } from "@chakra-ui/react";
import { useUploadAvatar } from "../../../model/hooks/useUploadAvatar";
import { useUserStore } from "@/application/store/user.store";
import { toBase64 } from "../../../model/utils/toBase64";
import styles from "../UpdateUserInfo.module.css";
import UploadAvatarIcon from "../../../../../../public/upload-avatar.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Icon } from "@/shared/ui/Icon/Icon";
interface IUploadAvatarProps {
  avatarUrl: string;
  firstLetter: string;
  isUploadAvailable: boolean;
}

export const UploadAvatar: FC<IUploadAvatarProps> = ({
  avatarUrl,
  firstLetter,
  isUploadAvailable,
}) => {
  const userId = useUserStore((state) => state.userId);
  const { onSubmit, loading } = useUploadAvatar(userId!);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const t = useTranslations("profile");
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    const base64 = await toBase64(file);
    await onSubmit({
      userId,
      base64,
      size: file.size,
      type: file.type,
    });
  };
  const handleClearAvatar = () => {
    setPreviewUrl(null);
  };
  return (
    <div className={styles.uploadAvatar}>
      <Avatar
        onClearAvatar={handleClearAvatar}
        avatarUrl={previewUrl || avatarUrl}
        firstLetter={firstLetter}
        isAvailable={isUploadAvailable}
      />
      {isUploadAvailable && (
        <FileUpload.Root accept={["image/png", "image/jpeg", "image/gif"]}>
          <FileUpload.HiddenInput onChange={handleFileChange} />
          <FileUpload.Trigger
            disabled={loading}
            className={styles.uploadAvatarTrigger}
          >
            <div className={styles.uploadAvatarInner}>
              <Icon name="upload" size={23} className={styles.avatarFallback} />
              <span className={styles.uploadAvatarText}>
                {t("uploadTitle")}
              </span>
            </div>
            <span className={styles.uploadAvatarSubtext}>
              {t("uploadDescription")}
            </span>
          </FileUpload.Trigger>
        </FileUpload.Root>
      )}
    </div>
  );
};
