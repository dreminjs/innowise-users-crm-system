import { test, expect } from "@playwright/test";

test("remove skills", async ({ page }) => {
  await page.goto("http://localhost:3000/skills");
  await expect(page.getByTestId("remove-item-button")).toBeVisible();
  await page.getByTestId("remove-item-button").click();
  await expect(page.getByTestId("remove-skills-button")).not.toBeVisible();
  await page
    .locator('[data-testid^="skill-item"]')
    .first()
    .click({ force: true });
  await expect(page.getByTestId("remove-skills-button")).toBeVisible();
  await expect(page.getByTestId("delete-confirm-button-amount")).toHaveText(
    "1",
  );
  const responsePromise = page.waitForResponse(async (res) => {
    if (!res.url().includes("/graphql")) return false;
    const body = res.request().postDataJSON();
    return body?.operationName === "deleteProfileSkill";
  });

  await page.getByTestId("remove-skills-button").click();
  const response = await responsePromise;
  const data = await response.json();

  expect(data.errors).toBeUndefined();
  expect(data).toHaveProperty("data.deleteProfileSkill");
});
