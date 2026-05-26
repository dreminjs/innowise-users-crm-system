import { test, expect } from "@playwright/test";

test("unauthorized user is redirected to signin and can login", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
  });
  await page.goto("/");
  await expect(page).toHaveURL(/auth\/signin/);
  await page.locator('input[name="email"]').fill("123@mail.com");
  await page.locator('input[name="password"]').fill("123456");
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/users/);
});
