import { test, expect } from "@playwright/test";
test("user can search users", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/auth\/signin/);
  await page.locator('input[name="email"]').fill("123@mail.com");
  await page.locator('input[name="password"]').fill("123456");
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/users/);
  await page.getByTestId("search-input").fill("Mak");
  await expect(page.locator("tbody tr")).toHaveCount(2);
});
test("user can create new user", async ({ page }) => {
  await page.goto("/auth/signin");
  await page.locator('input[name="email"]').fill("123@mail.com");
  await page.locator('input[name="password"]').fill("123456");
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/users/);
  await page.getByTestId("add-new-btn").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.locator('input[name="email"]').last().fill("newuser@test.com");
  await page.locator('input[name="password"]').fill("123456");
  await page.locator('input[name="firstName"]').fill("John");
  await page.locator('input[name="lastName"]').fill("Doe");
  await page.getByTestId("department-select").click();
  await page
    .getByRole("option", {
      name: "React",
      exact: true,
    })
    .click();

  await page.getByTestId("position-select").click();
  await page
    .getByRole("option", {
      name: "Software Engineer",
      exact: true,
    })
    .click();
  await page.getByTestId("confirm-btn").click();
  await expect(page.getByText("John")).toBeVisible();
});
