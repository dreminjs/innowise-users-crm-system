import { test as setup, expect } from "@playwright/test";

setup("auth setup", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin");
  await page.locator('input[name="email"]').fill("dremin@gmail.com");
  await page.locator('input[name="password"]').fill("23072007");
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/http:\/\/localhost:3000\/users/);
  await page.context().storageState({ path: "playwright/.auth/user.json" });
});
