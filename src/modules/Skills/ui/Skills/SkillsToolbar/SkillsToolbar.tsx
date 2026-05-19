import { SearchToolbar } from "@/shared/ui/SearchToolbar/SearchToolbar";

export const SkillsToobar = () => {
  return (
    <SearchToolbar
      value={""}
      changeAction={function (value: string): void {
        throw new Error("Function not implemented.");
      }}
      buttonLabel="CREATE SKILL"
      createAction={() => console.log("Hello")}
    />
  );
};
