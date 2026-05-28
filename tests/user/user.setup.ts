import { test as setup, expect } from "@playwright/test";

setup("auth setup", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin");
  await page.locator('input[name="email"]').fill("dremin@gmail.com");
  await page.locator('input[name="password"]').fill("23072007");
  const responsePromise = page.waitForResponse(async (res) => {
    if (!res.url().includes("/graphql")) return false;
    const body = res.request().postDataJSON();
    return body?.operationName === "login";
  });

  await page.locator('button[type="submit"]').click();
  const response = await responsePromise;
  const body = await response.json();
  expect(body.errors).toBeUndefined();
  await page.context().storageState({ path: "playwright/.auth/user.json" });
});
