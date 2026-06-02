import { expect, test } from "@playwright/test";

test("admin can create edit and delete positions", async ({ page }) => {
  const positionName = `test_position_${Date.now()}`;
  const updatedPositionName = `test_position_updated_${Date.now()}`;
  const searchInput = page.getByTestId("search-input");
  const findRow = (name: string) =>
    page.locator("tbody tr").filter({ hasText: name });
  const openDialog = () =>
    page.locator('[role="dialog"][data-scope="dialog"][data-state="open"]');
  const openPopover = () =>
    page.locator('[role="dialog"][data-part="content"][data-state="open"]');
  await page.goto("/positions");
  await expect(page).toHaveURL(/positions/);
  await page.getByTestId("add-new-btn").click();
  const createDialog = openDialog();
  await expect(createDialog).toBeVisible({ timeout: 10000 });
  await createDialog.getByTestId("position-name").fill(positionName);
  await createDialog.getByTestId("confirm-btn").click();
  await expect(createDialog).toBeHidden({ timeout: 10000 });
  await searchInput.fill(positionName);
  await expect(findRow(positionName)).toHaveCount(1);
  const row = findRow(positionName).first();
  await row.locator('button[data-part="trigger"]').click();
  const popover = openPopover();
  await expect(popover).toBeVisible();
  await expect(popover.getByTestId("button")).toBeVisible();
  await expect(popover.getByTestId("button-danger")).toBeVisible();
  await popover.getByTestId("button").click();
  const editDialog = openDialog();
  await expect(editDialog).toBeVisible({ timeout: 10000 });
  const positionInput = editDialog.getByTestId("position-name");
  await positionInput.clear();
  await positionInput.fill(updatedPositionName);
  await editDialog.getByTestId("confirm-btn").click();
  await expect(editDialog).toBeHidden({ timeout: 10000 });
  await searchInput.clear();
  await searchInput.fill(updatedPositionName);
  await expect(findRow(updatedPositionName)).toHaveCount(1);
  const updatedRow = findRow(updatedPositionName).first();
  await updatedRow.locator('button[data-part="trigger"]').click();
  const deletePopover = openPopover();
  await expect(deletePopover).toBeVisible();
  await deletePopover.getByTestId("button-danger").click();
  await expect(findRow(updatedPositionName)).toHaveCount(0, {
    timeout: 10000,
  });
});
