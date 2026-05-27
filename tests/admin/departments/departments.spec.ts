import { expect, test } from "@playwright/test";
test("admin can create edit and delete departments", async ({ page }) => {
  const departmentName = "test_department";
  const updatedDepartmentName = "test_department2";
  await page.goto("/departments");
  await expect(page).toHaveURL(/departments/);
  await page.getByTestId("add-new-btn").click();
  const createDialog = page.getByRole("dialog");
  await expect(createDialog).toBeVisible();
  await createDialog.getByTestId("department-name").fill(departmentName);
  await createDialog.getByTestId("confirm-btn").click();
  await expect(createDialog).not.toBeVisible();
  await page.getByTestId("search-input").fill(departmentName);
  await expect(
    page.locator("tbody tr").filter({
      hasText: departmentName,
    }),
  ).toHaveCount(1);
  const row = page
    .locator("tbody tr")
    .filter({
      hasText: departmentName,
    })
    .first();
  await row.locator('button[data-part="trigger"]').click();
  const popover = page.locator('[data-part="content"][role="dialog"]').last();
  await expect(popover.getByTestId("button")).toBeVisible();
  await expect(popover.getByTestId("button-danger")).toBeVisible();
  await popover.getByTestId("button").click();
  const editDialog = page.getByRole("dialog");
  await expect(editDialog).toBeVisible();
  const departmentInput = editDialog.getByTestId("department-name");
  await departmentInput.clear();
  await departmentInput.fill(updatedDepartmentName);
  await editDialog.getByTestId("confirm-btn").click();
  await expect(editDialog).not.toBeVisible();
  await page.getByTestId("search-input").clear();
  await page.getByTestId("search-input").fill(updatedDepartmentName);
  await expect(
    page.locator("tbody tr").filter({
      hasText: updatedDepartmentName,
    }),
  ).toHaveCount(1);
  const updatedRow = page
    .locator("tbody tr")
    .filter({
      hasText: updatedDepartmentName,
    })
    .first();
  await updatedRow.locator('button[data-part="trigger"]').click();
  const updatedPopover = page
    .locator('[data-part="content"][role="dialog"]')
    .last();
  await updatedPopover.getByTestId("button-danger").click();
  await page.getByTestId("search-input").clear();
  await page.getByTestId("search-input").fill(updatedDepartmentName);
  await expect(
    page.locator("tbody tr").filter({
      hasText: updatedDepartmentName,
    }),
  ).toHaveCount(0);
});
