import { sortUsers } from "./sortUsers";

describe("sortUsers", () => {
  const users = [
    {
      id: "1",
      email: "john@test.com",
      department_name: "IT",
      position_name: "Developer",
      profile: {
        first_name: "John",
        last_name: "Doe",
      },
    },
    {
      id: "2",
      email: "anna@test.com",
      department_name: "HR",
      position_name: "Manager",
      profile: {
        first_name: "Anna",
        last_name: "Smith",
      },
    },
    {
      id: "3",
      email: "empty@test.com",
      department_name: "",
      position_name: "",
      profile: {
        first_name: "",
        last_name: "",
      },
    },
  ];

  it("should sort by first name asc", () => {
    const result = sortUsers(users as never, "first_name", "asc");
    expect(result[0].profile?.first_name).toBe("Anna");
    expect(result[1].profile?.first_name).toBe("John");
  });

  it("should sort by first name desc", () => {
    const result = sortUsers(users as never, "first_name", "desc");
    expect(result[0].profile?.first_name).toBe("John");
    expect(result[1].profile?.first_name).toBe("Anna");
  });

  it("should move empty first names to end", () => {
    const result = sortUsers(users as never, "first_name", "asc");
    expect(result[2].id).toBe("3");
  });

  it("should sort by last name asc", () => {
    const result = sortUsers(users as never, "last_name", "asc");
    expect(result[0].profile?.last_name).toBe("Doe");
    expect(result[1].profile?.last_name).toBe("Smith");
  });

  it("should move empty last names to end", () => {
    const result = sortUsers(users as never, "last_name", "asc");
    expect(result[2].id).toBe("3");
  });

  it("should sort by email asc", () => {
    const result = sortUsers(users as never, "email", "asc");
    expect(result[0].email).toBe("anna@test.com");
  });

  it("should sort by department asc", () => {
    const result = sortUsers(users as never, "department", "asc");
    expect(result[0].department_name).toBe("");
    expect(result[1].department_name).toBe("HR");
    expect(result[2].department_name).toBe("IT");
  });

  it("should sort by position desc", () => {
    const result = sortUsers(users as never, "position", "desc");
    expect(result[0].position_name).toBe("Manager");
  });

  it("should not mutate original array", () => {
    const original = [...users];
    sortUsers(users as never, "first_name", "asc");
    expect(users).toEqual(original);
  });
});
