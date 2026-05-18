import EmployeesIcon from "../../../../public/Employees.svg";
import SkillsIcon from "../../../../public/Skills.svg";
import LanguagesIcon from "../../../../public/Languages.svg";
import CVsIcon from "../../../../public/CVs.svg";
import ArrowIcon from "../../../../public/nav-arrow.svg";
import TrashIcon from "../../../../public/trash-icon.svg";
import AccountIcon from "../../../../public/account.svg";
import SettingsIcon from "../../../../public/settings.svg";
import LogoutIcon from "../../../../public/logout.svg";
import UploadIcon from "../../../../public/upload-avatar.svg";
import PasswordIcon from "../../../../public/password-eye.svg";
import SearchIcon from "../../../../public/search.svg";

export const icons = {
  employees: EmployeesIcon,
  skills: SkillsIcon,
  languages: LanguagesIcon,
  cvs: CVsIcon,
  arrow: ArrowIcon,
  trash: TrashIcon,
  account: AccountIcon,
  settings: SettingsIcon,
  logout: LogoutIcon,
  upload: UploadIcon,
  password: PasswordIcon,
  search: SearchIcon,
};

export type IconName = keyof typeof icons;
