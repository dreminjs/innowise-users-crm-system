import { test, expect } from "@playwright/test";

test("add a language to the profile", async ({ page }) => {
  await page.goto("http://localhost:3000/users/616/languages");
  await expect(page.getByTestId("add-new-btn")).toBeVisible();
  await page.getByTestId("add-new-btn").click({ force: true });
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByTestId("language-name").click();
  await expect(page.getByTestId("option-language-name-0")).toBeVisible();
  await page.getByTestId("option-language-name-0").click();
  await page.getByTestId("proficiency").click();
  await expect(page.getByTestId("option-proficiency-0")).toBeVisible();
  await page.getByTestId("option-proficiency-0").click();
  const responsePromise = page.waitForResponse(async (res) => {
    if (!res.url().includes("/graphql")) return false;
    const body = res.request().postDataJSON();
    return body?.operationName === "addProfileLanguage";
  });
  await page.getByTestId("confirm-btn").click();
  const response = await responsePromise;
  const data = await response.json();
  expect(data.errors).toBeUndefined();
  expect(data).toHaveProperty("data.addProfileLanguage");
});

test("edit language to the profile", async ({ page }) => {
  await page.goto("http://localhost:3000//users/616/languages");
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

test("remove a language from the profile", async ({ page }) => {
  await page.goto("http://localhost:3000//users/616/languages");
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
