import { test, expect } from "@playwright/test";

test("edit language to the CV", async ({ page }) => {
  await page.goto("http://localhost:3000/languages");
  await expect(page.getByTestId("languages-item").first()).toBeVisible();
  await page.getByTestId("languages-item").first().click({ force: true });
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByTestId("proficiency").click();
  await expect(page.getByTestId("option-proficiency-0")).toBeVisible();
  await page.getByTestId("option-proficiency-0").click();
  const responsePromise = page.waitForResponse(async (res) => {
    if (!res.url().includes("/graphql")) return false;
    const body = res.request().postDataJSON();
    return body?.operationName === "updateProfileLanguage";
  });

  await page.getByTestId("confirm-btn").click();

  const response = await responsePromise;
  const data = await response.json();

  expect(data.errors).toBeUndefined();
  expect(data).toHaveProperty("data.updateProfileLanguage");
});
