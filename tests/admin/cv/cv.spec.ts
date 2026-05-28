import { test, expect } from "@playwright/test";

test("create edit and delete cv", async ({ page }) => {
  const cvName = "Playwright CV";
  const updatedCvName = "Updated Playwright CV";
  await page.goto("/cvs");
  await expect(page.getByTestId("add-new-btn")).toBeVisible();
  await page.getByTestId("add-new-btn").click();
  const createModal = page.getByTestId("create-cv-modal");
  await expect(createModal).toBeVisible();
  await createModal.getByTestId("cv-name-input").fill(cvName);
  await createModal.getByTestId("cv-education-input").fill("BSUIR");
  await createModal
    .getByTestId("cv-description-input")
    .fill("Playwright test description");
  const createResponsePromise = page.waitForResponse(async (res) => {
    if (!res.url().includes("/graphql")) {
      return false;
    }
    const body = res.request().postDataJSON();
    return body?.operationName === "CreateCv";
  });
  await createModal
    .locator('[data-testid="cv-submit-button"] button[type="submit"]')
    .click();
  const createResponse = await createResponsePromise;
  const createData = await createResponse.json();
  expect(createData.errors).toBeUndefined();
  await expect(createModal).not.toBeVisible();
  await page.getByTestId("search-input").fill(cvName);
  const createdCv = page.getByText(cvName).first();
  await expect(createdCv).toBeVisible();
  await page.locator('[data-testid^="actions-trigger"]').first().click();
  await page.getByTestId("menu-link").click();
  await expect(page).toHaveURL(/\/cvs\/\d+/);
  const editNameInput = page.getByTestId("cv-name-input");
  await expect(editNameInput).toBeVisible();
  await editNameInput.clear();
  await editNameInput.fill(updatedCvName);
  const updateResponsePromise = page.waitForResponse(async (res) => {
    if (!res.url().includes("/graphql")) {
      return false;
    }
    const body = res.request().postDataJSON();
    return body?.operationName === "UpdateCv";
  });
  await page.getByTestId("confirm-btn").click();
  const updateResponse = await updateResponsePromise;
  const updateData = await updateResponse.json();
  expect(updateData.errors).toBeUndefined();
  await page.goto("/cvs");
  await page.getByTestId("search-input").fill(updatedCvName);
  await expect(page.getByText(updatedCvName)).toBeVisible();
  await page.locator('[data-testid^="actions-trigger"]').first().click();
  const deleteResponsePromise = page.waitForResponse(async (res) => {
    if (!res.url().includes("/graphql")) {
      return false;
    }
    const body = res.request().postDataJSON();
    return body?.operationName === "DeleteCv";
  });
  await page.locator('[data-testid^="delete-cv-"]').first().click();
  const deleteResponse = await deleteResponsePromise;
  const deleteData = await deleteResponse.json();
  expect(deleteData.errors).toBeUndefined();
  await page.getByTestId("search-input").fill(updatedCvName);
  await expect(page.getByText(updatedCvName)).not.toBeVisible();
});
