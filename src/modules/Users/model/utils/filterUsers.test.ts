import { filterUsers } from "./filterUsers";

describe("filterUsers", () => {
  const users = [
    {
      id: "1",
      profile: {
        first_name: "John",
        last_name: "Doe",
      },
    },
    {
      id: "2",
      profile: {
        first_name: "Jane",
        last_name: "Smith",
      },
    },
    {
      id: "3",
      profile: null,
    },
  ];

  it("should return all users for empty search", () => {
    const result = filterUsers(users as never, "");

    expect(result).toEqual(users);
  });

  it("should filter users by first name", () => {
    const result = filterUsers(users as never, "john");

    expect(result).toEqual([users[0]]);
  });

  it("should filter users by last name", () => {
    const result = filterUsers(users as never, "smith");

    expect(result).toEqual([users[1]]);
  });

  it("should filter users by full name", () => {
    const result = filterUsers(users as never, "john doe");

    expect(result).toEqual([users[0]]);
  });

  it("should be case insensitive", () => {
    const result = filterUsers(users as never, "JOHN");

    expect(result).toEqual([users[0]]);
  });

  it("should return empty array when no matches", () => {
    const result = filterUsers(users as never, "unknown");

    expect(result).toEqual([]);
  });

  it("should handle users without profile", () => {
    const result = filterUsers(users as never, "john");

    expect(result).not.toContain(users[2]);
  });
});
