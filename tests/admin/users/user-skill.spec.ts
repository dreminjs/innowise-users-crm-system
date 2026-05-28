import { test, expect } from "@playwright/test";
test("add edit and remove skill from profile", async ({ page }) => {
  await page.goto("/users/616/skills");
  await expect(page.getByTestId("add-new-btn")).toBeVisible();
  await page.getByTestId("add-new-btn").click({
    force: true,
  });
  const createDialog = page.getByRole("dialog");
  await expect(createDialog).toBeVisible();
  await page.getByTestId("select-skill").click();
  await page.getByTestId("option-select-skill-1").click();
  const masteryCombobox = createDialog.getByTestId("select-mastery");
  await expect(masteryCombobox).toBeVisible();
  await expect(masteryCombobox).toBeEnabled({
    timeout: 10000,
  });
  await masteryCombobox.click();
  await page.getByTestId("option-select-mastery-0").click();
  const addResponsePromise = page.waitForResponse(async (res) => {
    if (!res.url().includes("/graphql")) {
      return false;
    }
    const body = res.request().postDataJSON();
    return body?.operationName === "addProfileSkill";
  });
  await page.getByTestId("confirm-btn").click();
  const addResponse = await addResponsePromise;
  const addData = await addResponse.json();
  expect(addData.errors).toBeUndefined();
  expect(addData).toHaveProperty("data.addProfileSkill");
  const createdSkill = page.getByTestId("skill-item-React");
  await expect(createdSkill).toBeVisible();
  await createdSkill.click();
  const editDialog = page.getByRole("dialog");
  await expect(editDialog).toBeVisible({
    timeout: 10000,
  });
  const updatedMasteryCombobox = editDialog.getByTestId("select-mastery");
  await expect(updatedMasteryCombobox).toBeVisible();
  await updatedMasteryCombobox.click();
  await page.getByTestId("option-select-mastery-1").click();
  const updateResponsePromise = page.waitForResponse(async (res) => {
    if (!res.url().includes("/graphql")) {
      return false;
    }
    const body = res.request().postDataJSON();
    return body?.operationName === "updateProfileSkill";
  });
  await page.getByTestId("confirm-btn").click();
  const updateResponse = await updateResponsePromise;
  const updateData = await updateResponse.json();
  expect(updateData.errors).toBeUndefined();
  expect(updateData).toHaveProperty("data.updateProfileSkill");
  await expect(page.getByTestId("remove-item-button")).toBeVisible();
  await page.getByTestId("remove-item-button").click();
  await expect(page.getByTestId("remove-skill-button")).not.toBeVisible();
  await createdSkill.click();
  await expect(page.getByTestId("remove-skill-button")).toBeVisible();
  const deleteResponsePromise = page.waitForResponse(async (res) => {
    if (!res.url().includes("/graphql")) {
      return false;
    }
    const body = res.request().postDataJSON();
    return body?.operationName === "deleteProfileSkill";
  });
  await page.getByTestId("remove-skill-button").click();
  const deleteResponse = await deleteResponsePromise;
  const deleteData = await deleteResponse.json();
  expect(deleteData).toBeDefined();
  expect(deleteData.errors).toBeUndefined();
});
