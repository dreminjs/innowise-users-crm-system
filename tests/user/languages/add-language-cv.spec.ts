import { test, expect } from "@playwright/test";

test("add a language to the CV", async ({ page }) => {
  const responsePromise = page.waitForResponse(async (res) => {
    if (!res.url().includes("/graphql")) return false;

    const data = await res.json();

    return data.addProfileLanguage !== undefined;
  });
  await page.goto("http://localhost:3000/languages");
  await expect(page.getByTestId("add-new-btn")).toBeVisible();
  await page.getByTestId("add-new-btn").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByTestId("language-name").click();
  await expect(page.getByTestId("option-language-name-0")).toBeVisible();
  await page.getByTestId("option-language-name-0").click();
  await page.getByTestId("proficiency-name").click();
  await expect(page.getByTestId("option-proficiency-name-0")).toBeVisible();
  await page.getByTestId("confirm-btn").click();
  const request = await responsePromise;
  const data = await request.json();
  expect(data).toHaveProperty("data.addLanguageToCV");
});
