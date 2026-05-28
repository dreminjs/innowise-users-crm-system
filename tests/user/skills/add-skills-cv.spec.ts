import { test, expect } from "@playwright/test";

test("add skills to cv", async ({ page }) => {
  await page.goto("http://localhost:3000/skills");
  await expect(page.getByTestId("add-new-btn")).toBeVisible();
  await page.getByTestId("add-new-btn").click({ force: true });
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByTestId("skill-name").click();
  await expect(page.getByTestId("option-skill-name-0")).toBeVisible();
  await page.getByTestId("option-skill-name-0").click();
  await page.getByTestId("mastery").click();
  await expect(page.getByTestId("option-mastery-0")).toBeVisible();
  await page.getByTestId("option-mastery-0").click();

  const responsePromise = page.waitForResponse(async (res) => {
    if (!res.url().includes("/graphql")) return false;
    const body = res.request().postDataJSON();
    return body?.operationName === "addProfileSkill";
  });

  await page.getByTestId("confirm-btn").click();

  const response = await responsePromise;
  const data = await response.json();

  expect(data.errors).toBeUndefined();
  expect(data).toHaveProperty("data.addProfileSkill");
});
