import { groupSkillsByCategory } from "./groupSkillsByCategory";

const makeCategory = (
  id: string,
  name: string,
  parent?: { id: string; name: string },
) => ({
  id,
  name,
  parent: parent ?? null,
});

const makeSkill = (
  name: string,
  mastery: string,
  categoryId?: string | null,
): Skill => ({
  name,
  mastery,
  categoryId,
});

type Skill = { name: string; mastery: string; categoryId?: string | null };

describe("groupSkillsByCategory", () => {
  describe("Basic grouping", () => {
    it("returns empty array when skills list is empty", () => {
      const categories = [makeCategory("cat-1", "Frontend")];
      expect(groupSkillsByCategory([], categories)).toEqual([]);
    });

    it("returns empty array when categories list is empty", () => {
      const skills = [makeSkill("TypeScript", "Advanced", "cat-1")];
      expect(groupSkillsByCategory(skills, [])).toEqual([]);
    });

    it("returns empty array when both skills and categories are empty", () => {
      expect(groupSkillsByCategory([], [])).toEqual([]);
    });

    it("groups a single skill into its category", () => {
      const categories = [makeCategory("cat-1", "Frontend")];
      const skills = [makeSkill("TypeScript", "Advanced", "cat-1")];
      const result = groupSkillsByCategory(skills, categories);
      expect(result).toEqual([
        {
          groupName: "Frontend",
          skills: [makeSkill("TypeScript", "Advanced", "cat-1")],
        },
      ]);
    });

    it("groups multiple skills into the same category", () => {
      const categories = [makeCategory("cat-1", "Frontend")];
      const skills = [
        makeSkill("TypeScript", "Advanced", "cat-1"),
        makeSkill("React", "Intermediate", "cat-1"),
      ];
      const result = groupSkillsByCategory(skills, categories);
      expect(result).toHaveLength(1);
      expect(result[0].skills).toHaveLength(2);
    });

    it("groups skills into separate categories", () => {
      const categories = [
        makeCategory("cat-1", "Frontend"),
        makeCategory("cat-2", "Backend"),
      ];
      const skills = [
        makeSkill("TypeScript", "Advanced", "cat-1"),
        makeSkill("Node.js", "Intermediate", "cat-2"),
      ];
      const result = groupSkillsByCategory(skills, categories);
      expect(result).toHaveLength(2);
    });
  });

  describe("Parent category grouping", () => {
    it("groups skill under parent category when category has a parent", () => {
      const parent = makeCategory("parent-1", "Engineering");
      const categories = [makeCategory("cat-1", "Frontend", parent)];
      const skills = [makeSkill("TypeScript", "Advanced", "cat-1")];
      const result = groupSkillsByCategory(skills, categories);
      expect(result).toEqual([
        {
          groupName: "Engineering",
          skills: [makeSkill("TypeScript", "Advanced", "cat-1")],
        },
      ]);
    });

    it("merges skills from different child categories under the same parent", () => {
      const parent = makeCategory("parent-1", "Engineering");
      const categories = [
        makeCategory("cat-1", "Frontend", parent),
        makeCategory("cat-2", "Backend", parent),
      ];
      const skills = [
        makeSkill("TypeScript", "Advanced", "cat-1"),
        makeSkill("Node.js", "Intermediate", "cat-2"),
      ];
      const result = groupSkillsByCategory(skills, categories);
      expect(result).toHaveLength(1);
      expect(result[0].groupName).toBe("Engineering");
      expect(result[0].skills).toHaveLength(2);
    });

    it("keeps correct groupName from parent when children have different names", () => {
      const parent = makeCategory("parent-1", "Engineering");
      const categories = [makeCategory("cat-1", "Frontend", parent)];
      const skills = [makeSkill("React", "Advanced", "cat-1")];
      const result = groupSkillsByCategory(skills, categories);
      expect(result[0].groupName).toBe("Engineering");
    });

    it("groups categories without parent under themselves", () => {
      const categories = [makeCategory("cat-1", "DevOps")];
      const skills = [makeSkill("Docker", "Intermediate", "cat-1")];
      const result = groupSkillsByCategory(skills, categories);
      expect(result[0].groupName).toBe("DevOps");
    });

    it("handles mix of skills with and without parent categories", () => {
      const parent = makeCategory("parent-1", "Engineering");
      const categories = [
        makeCategory("cat-1", "Frontend", parent),
        makeCategory("cat-2", "DevOps"),
      ];
      const skills = [
        makeSkill("TypeScript", "Advanced", "cat-1"),
        makeSkill("Docker", "Intermediate", "cat-2"),
      ];
      const result = groupSkillsByCategory(skills, categories);
      expect(result).toHaveLength(2);
      expect(result.map((r) => r.groupName)).toContain("Engineering");
      expect(result.map((r) => r.groupName)).toContain("DevOps");
    });
  });

  describe("Skill filtering", () => {
    it("skips skills without categoryId", () => {
      const categories = [makeCategory("cat-1", "Frontend")];
      const skills = [makeSkill("Unknown", "Beginner")];
      const result = groupSkillsByCategory(skills, categories);
      expect(result).toEqual([]);
    });

    it("skips skills with null categoryId", () => {
      const categories = [makeCategory("cat-1", "Frontend")];
      const skills = [makeSkill("Unknown", "Beginner", null)];
      const result = groupSkillsByCategory(skills, categories);
      expect(result).toEqual([]);
    });

    it("skips skills whose categoryId does not match any category", () => {
      const categories = [makeCategory("cat-1", "Frontend")];
      const skills = [makeSkill("TypeScript", "Advanced", "nonexistent-id")];
      const result = groupSkillsByCategory(skills, categories);
      expect(result).toEqual([]);
    });

    it("includes only skills with valid categoryId and ignores the rest", () => {
      const categories = [makeCategory("cat-1", "Frontend")];
      const skills = [
        makeSkill("TypeScript", "Advanced", "cat-1"),
        makeSkill("Unknown", "Beginner", null),
        makeSkill("Mystery", "Beginner", "nonexistent"),
      ];
      const result = groupSkillsByCategory(skills, categories);
      expect(result).toHaveLength(1);
      expect(result[0].skills).toHaveLength(1);
      expect(result[0].skills[0].name).toBe("TypeScript");
    });
  });

  describe("Result shape", () => {
    it("each group has groupName and skills array", () => {
      const categories = [makeCategory("cat-1", "Frontend")];
      const skills = [makeSkill("TypeScript", "Advanced", "cat-1")];
      const result = groupSkillsByCategory(skills, categories);
      expect(result[0]).toHaveProperty("groupName");
      expect(result[0]).toHaveProperty("skills");
      expect(Array.isArray(result[0].skills)).toBe(true);
    });

    it("preserves skill properties in result", () => {
      const categories = [makeCategory("cat-1", "Frontend")];
      const skill = makeSkill("TypeScript", "Advanced", "cat-1");
      const result = groupSkillsByCategory([skill], categories);
      expect(result[0].skills[0]).toEqual(skill);
    });

    it("preserves skill order within a group", () => {
      const categories = [makeCategory("cat-1", "Frontend")];
      const skills = [
        makeSkill("TypeScript", "Advanced", "cat-1"),
        makeSkill("React", "Intermediate", "cat-1"),
        makeSkill("CSS", "Beginner", "cat-1"),
      ];
      const result = groupSkillsByCategory(skills, categories);
      expect(result[0].skills.map((s) => s.name)).toEqual([
        "TypeScript",
        "React",
        "CSS",
      ]);
    });

    it("returns an array of group objects", () => {
      const categories = [makeCategory("cat-1", "Frontend")];
      const skills = [makeSkill("TypeScript", "Advanced", "cat-1")];
      const result = groupSkillsByCategory(skills, categories);
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
