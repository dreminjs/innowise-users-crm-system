import { processProjects } from "./processProjects";

describe("processProjects utility", () => {
  const mockProjects: any[] = [
    {
      id: "1",
      name: "Alpha Project",
      domain: "zulu.com",
      start_date: "2023-01-01",
      end_date: "2023-12-31",
    },
    {
      id: "2",
      name: "Bravo App",
      domain: "xray.com",
      start_date: "2022-05-10",
      end_date: null,
    },
    {
      id: "3",
      name: "Charlie Site",
      domain: null,
      start_date: "2024-02-20",
      end_date: "2025-01-01",
    },
  ];

  describe("Filtering functionality", () => {
    it("should return all projects when the search string is empty", () => {
      const result = processProjects(mockProjects, "", "name", "asc");
      expect(result.length).toBe(3);
    });

    it("should filter projects by name (case-insensitive)", () => {
      const result = processProjects(mockProjects, "alpha", "name", "asc");
      expect(result.length).toBe(1);
      expect(result[0].name).toBe("Alpha Project");
    });

    it("should filter projects by domain (case-insensitive)", () => {
      const result = processProjects(mockProjects, "XRAY", "name", "asc");
      expect(result.length).toBe(1);
      expect(result[0].domain).toBe("xray.com");
    });

    it("should gracefully handle filtering when a project has no domain", () => {
      const result = processProjects(mockProjects, "site", "name", "asc");
      expect(result.length).toBe(1);
      expect(result[0].name).toBe("Charlie Site");
    });
  });

  describe("Sorting functionality", () => {
    it("should sort by name ascending", () => {
      const result = processProjects(mockProjects, "", "name", "asc");
      expect(result[0].name).toBe("Alpha Project");
      expect(result[1].name).toBe("Bravo App");
      expect(result[2].name).toBe("Charlie Site");
    });

    it("should sort by name descending", () => {
      const result = processProjects(mockProjects, "", "name", "desc");
      expect(result[0].name).toBe("Charlie Site");
      expect(result[1].name).toBe("Bravo App");
      expect(result[2].name).toBe("Alpha Project");
    });

    it("should sort by domain ascending, treating null domains as empty strings", () => {
      const result = processProjects(mockProjects, "", "domain", "asc");
      expect(result[0].name).toBe("Charlie Site");
      expect(result[1].name).toBe("Bravo App"); // xray.com
      expect(result[2].name).toBe("Alpha Project"); // zulu.com
    });

    it("should sort by start_date ascending", () => {
      const result = processProjects(mockProjects, "", "start_date", "asc");
      expect(result[0].name).toBe("Bravo App");
      expect(result[1].name).toBe("Alpha Project");
      expect(result[2].name).toBe("Charlie Site");
    });

    it("should sort by start_date descending", () => {
      const result = processProjects(mockProjects, "", "start_date", "desc");
      expect(result[0].name).toBe("Charlie Site");
      expect(result[1].name).toBe("Alpha Project");
      expect(result[2].name).toBe("Bravo App");
    });

    it("should sort by end_date ascending, treating null dates as the distant future (9999-12-31)", () => {
      const result = processProjects(mockProjects, "", "end_date", "asc");
      expect(result[0].name).toBe("Alpha Project");
      expect(result[1].name).toBe("Charlie Site");
      expect(result[2].name).toBe("Bravo App");
    });

    it("should sort by end_date descending", () => {
      const result = processProjects(mockProjects, "", "end_date", "desc");
      expect(result[0].name).toBe("Bravo App");
      expect(result[1].name).toBe("Charlie Site");
      expect(result[2].name).toBe("Alpha Project");
    });
  });

  describe("Combined Filter and Sort", () => {
    it("should correctly filter and then sort the results", () => {
      const result = processProjects(mockProjects, "e", "start_date", "desc");

      expect(result.length).toBe(2);
      expect(result[0].name).toBe("Charlie Site");
      expect(result[1].name).toBe("Alpha Project");
    });
  });
});
