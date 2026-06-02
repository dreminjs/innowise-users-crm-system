import { expect, test } from "@playwright/test";

test("admin can create edit and delete departments", async ({ page }) => {
  const departmentName = `test_department_${Date.now()}`;
  const updatedDepartmentName = `test_department_updated_${Date.now()}`;
  const searchInput = page.getByTestId("search-input");
  const findRow = (name: string) =>
    page.locator("tbody tr").filter({ hasText: name });
  const openDialog = () =>
    page.locator('[role="dialog"][data-scope="dialog"][data-state="open"]');
  const openPopover = () =>
    page.locator('[role="dialog"][data-part="content"][data-state="open"]');
  await page.goto("/departments");
  await expect(page).toHaveURL(/departments/);
  await expect(page.getByTestId("add-new-btn")).toBeVisible();
  await page.getByTestId("add-new-btn").click();
  const createDialog = openDialog();
  await expect(createDialog).toBeVisible({ timeout: 10000 });
  await createDialog.getByTestId("department-name").fill(departmentName);
  await createDialog.getByTestId("confirm-btn").click();
  await expect(createDialog).toBeHidden({ timeout: 10000 });
  await searchInput.fill(departmentName);
  await expect(findRow(departmentName)).toHaveCount(1);
  const row = findRow(departmentName).first();
  await row.locator('button[data-part="trigger"]').click();
  const popover = openPopover();
  await expect(popover).toBeVisible();
  await popover.getByTestId("button").click();
  const editDialog = openDialog();
  await expect(editDialog).toBeVisible({ timeout: 10000 });
  const departmentInput = editDialog.getByTestId("department-name");
  await departmentInput.clear();
  await departmentInput.fill(updatedDepartmentName);
  await editDialog.getByTestId("confirm-btn").click();
  await expect(editDialog).toBeHidden({ timeout: 10000 });
  await searchInput.clear();
  await searchInput.fill(updatedDepartmentName);
  await expect(findRow(updatedDepartmentName)).toHaveCount(1);
  const updatedRow = findRow(updatedDepartmentName).first();
  await updatedRow.locator('button[data-part="trigger"]').click();
  const deletePopover = openPopover();
  await expect(deletePopover).toBeVisible();
  await deletePopover.getByTestId("button-danger").click();
  await expect(findRow(updatedDepartmentName)).toHaveCount(0, {
    timeout: 10000,
  });
});
