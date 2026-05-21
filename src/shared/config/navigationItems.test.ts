import { navigationItems } from "@/shared/config/navigation";

describe("navigationItems", () => {
  it("should contain items", () => {
    expect(navigationItems.length).toBeGreaterThan(0);
  });

  it("should contain employees item", () => {
    expect(navigationItems).toContainEqual({
      label: "employees",
      href: "/users",
      icon: "employees",
      roles: ["Admin", "Employee"],
    });
  });

  it("should contain admin only items", () => {
    const adminItems = navigationItems.filter(
      (item) => item.roles.length === 1,
    );

    expect(adminItems.every((item) => item.roles.includes("Admin"))).toBe(true);
  });

  it("should contain employee accessible items", () => {
    const employeeItems = navigationItems.filter((item) =>
      item.roles.includes("Employee"),
    );

    expect(employeeItems.length).toBeGreaterThan(0);
  });

  it("should have valid href", () => {
    navigationItems.forEach((item) => {
      expect(item.href.startsWith("/")).toBe(true);
    });
  });

  it("should have label", () => {
    navigationItems.forEach((item) => {
      expect(item.label).toBeTruthy();
    });
  });

  it("should have icon", () => {
    navigationItems.forEach((item) => {
      expect(item.icon).toBeTruthy();
    });
  });
});
