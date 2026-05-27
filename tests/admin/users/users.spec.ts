import { test, expect } from "@playwright/test";
test("admin can create edit and delete user", async ({ page }) => {
  const firstName = "John";
  const updatedFirstName = "Mike";
  const email = `user${Date.now()}@test.com`;
  await page.goto("/users");
  await expect(page).toHaveURL(/users/);
  await page.getByTestId("add-new-btn").click();
  const createDialog = page.getByRole("dialog");
  await expect(createDialog).toBeVisible();
  await createDialog.locator('input[name="email"]').fill(email);
  await createDialog.locator('input[name="password"]').fill("123456");
  await createDialog.locator('input[name="firstName"]').fill(firstName);
  await createDialog.locator('input[name="lastName"]').fill("Doe");
  await createDialog.getByTestId("department-select").click();
  await page
    .getByRole("option", {
      name: "React",
      exact: true,
    })
    .click();
  await createDialog.getByTestId("position-select").click();
  await page
    .getByRole("option", {
      name: "Software Engineer",
      exact: true,
    })
    .click();
  await createDialog.getByTestId("confirm-btn").click();
  await page.getByTestId("search-input").fill(firstName);
  const createdRow = page
    .locator("tbody tr")
    .filter({
      hasText: email,
    })
    .first();
  await expect(createdRow).toBeVisible({
    timeout: 15000,
  });
  await createdRow.locator('button[data-part="trigger"]').click();
  const popover = page.locator('[data-part="content"][role="dialog"]:visible');
  await expect(popover.getByTestId("menu-link")).toBeVisible();
  await expect(popover.getByTestId("edit-btn")).toBeVisible();
  await expect(popover.getByTestId("delete-btn")).toBeVisible();
  await popover.getByTestId("edit-btn").click();
  const editDialog = page.getByRole("dialog");
  const firstNameInput = editDialog.locator('input[name="firstName"]');
  await firstNameInput.clear();
  await firstNameInput.fill(updatedFirstName);
  const lastNameInput = editDialog.locator('input[name="lastName"]');
  await lastNameInput.clear();
  await lastNameInput.fill("Smith");
  await editDialog.getByTestId("confirm-btn").click();
  await page.getByTestId("search-input").clear();
  await page.getByTestId("search-input").fill(updatedFirstName);
  const updatedRow = page
    .locator("tbody tr")
    .filter({
      hasText: updatedFirstName,
    })
    .first();
  await expect(updatedRow).toBeVisible({
    timeout: 10000,
  });
  await updatedRow.locator('button[data-part="trigger"]').click();
  const updatedPopover = page.locator(
    '[data-part="content"][role="dialog"]:visible',
  );
  await updatedPopover.getByTestId("delete-btn").click();
  await page.getByTestId("search-input").clear();
  await page.getByTestId("search-input").fill(updatedFirstName);
  const deletedRow = page.locator("tbody tr").filter({
    hasText: updatedFirstName,
  });
  await expect(deletedRow).toHaveCount(0);
});
