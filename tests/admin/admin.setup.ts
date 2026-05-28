import { test as setup, expect } from "@playwright/test";

setup("authenticate", async ({ page }) => {
  await page.goto("/auth/signin");
  await page.locator('input[name="email"]').fill("123@mail.com");
  await page.locator('input[name="password"]').fill("123456");
  await Promise.all([
    page.waitForURL(/users/),
    page.locator('button[type="submit"]').click(),
  ]);
  await expect(page).toHaveURL(/users/);
  await page.context().storageState({
    path: "playwright/.auth/admin.json",
  });
});
