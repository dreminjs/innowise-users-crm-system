import { FC, useState } from "react";
import { Avatar } from "./Avatar";
import { FileUpload } from "@chakra-ui/react";
import Image from "next/image";
import styles from "./UpdateUserInfo.module.css";
import UploadAvatarIcon from "../../../../../public/upload-avatar.svg";
import { useMutation } from "@apollo/client/react";
import { UPLOAD_AVATAR } from "../../api/mutations";
import { useUploadAvatar } from "../../model/hooks/useUploadAvatar";
import { useUserStore } from "@/application/store/user.store";
import { toBase64 } from "../../model/utils/toBase64";
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
  const { onSubmit } = useUploadAvatar();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    const base64 = await toBase64(file);
    console.log(base64);
    onSubmit({
      userId,
      base64,
      size: file.size,
      type: file.type,
    });
  };

  return (
    <div className={styles.uploadAvatar}>
      <Avatar avatarUrl={previewUrl || avatarUrl} firstLetter={firstLetter} />
      {isUploadAvailable && (
        <FileUpload.Root accept={["image/png"]}>
          <FileUpload.HiddenInput onChange={handleFileChange} />
          <FileUpload.Trigger className={styles.uploadAvatarTrigger}>
            <div className={styles.uploadAvatarInner}>
              <Image
                src={UploadAvatarIcon}
                alt="avatar"
                width={23}
                height={23}
              />
              <span className={styles.uploadAvatarText}>
                Upload avatar image
              </span>
            </div>
            <span className={styles.uploadAvatarSubtext}>
              png, jpg or gif no more than 0.5MB
            </span>
          </FileUpload.Trigger>
        </FileUpload.Root>
      )}
    </div>
  );
};
