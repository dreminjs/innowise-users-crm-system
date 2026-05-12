import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useTheme } from "next-themes";

const options = [
  {
    label: "Device settings",
    value: "Device settings",
  },
  {
    label: "Dark",
    value: "dark",
  },
  {
    label: "Light",
    value: "light",
  },
];

export const Appearance = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <CustomSelect
        label={"Appearance"}
        options={options}
        value={theme || "light"}
        onChange={(value) => setTheme(value)}
      />
    </>
  );
};
