import { test, expect } from "@playwright/test";

test("remove a language from the CV", async ({ page }) => {
  await page.goto("http://localhost:3000/languages");
  expect(page.getByTestId("remove-item-button")).toBeVisible();
  await page.getByTestId("remove-item-button").click();
  await expect(page.getByTestId("remove-language-button")).not.toBeVisible();
  await page.getByTestId("languages-item").first().click();
  await expect(page.getByTestId("remove-language-button")).toBeVisible();
  await expect(page.getByTestId("delete-confirm-button-amount")).toHaveText(
    "1",
  );

  const responsePromise = page.waitForResponse(async (res) => {
    if (!res.url().includes("/graphql")) return false;
    const body = res.request().postDataJSON();
    return body?.operationName === "deleteProfileLanguage";
  });
  await page.getByTestId("remove-language-button").click();
  const response = await responsePromise;
  const data = await response.json();
  expect(data).toBeDefined();
  expect(data.errors).toBeUndefined();
});
