import { test, expect } from "@playwright/test";

test("edit skills", async ({ page }) => {
  await page.goto("http://localhost:3000/skills");
  expect(page.getByTestId("skill-item").first()).toBeVisible();
  page.getByTestId("skill-item").first().click({ force: true });
  expect(page.getByRole("dialog")).toBeVisible();
  await page.getByTestId("mastery").click();
  await expect(page.getByTestId("option-mastery-0")).toBeVisible();
  await page.getByTestId("option-mastery-0").click();

  const responsePromise = page.waitForResponse(async (res) => {
    if (!res.url().includes("/graphql")) return false;
    const body = res.request().postDataJSON();
    return body?.operationName === "updateProfileSkill";
  });

  await page.getByTestId("confirm-btn").click();

  const response = await responsePromise;
  const data = await response.json();

  expect(data.errors).toBeUndefined();
  expect(data).toHaveProperty("data.updateProfileSkill");
});
