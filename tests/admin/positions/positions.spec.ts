import { expect, test } from "@playwright/test";
test("admin can create edit and delete positions", async ({ page }) => {
  const positionName = "test_position";
  const updatedPositionName = "test_position2";
  await page.goto("/positions");
  await expect(page).toHaveURL(/positions/);
  await page.getByTestId("add-new-btn").click();
  const createDialog = page.getByRole("dialog");
  await expect(createDialog).toBeVisible();
  await createDialog.getByTestId("position-name").fill(positionName);
  await createDialog.getByTestId("confirm-btn").click();
  await expect(createDialog).not.toBeVisible();
  await page.getByTestId("search-input").fill(positionName);
  await expect(
    page.locator("tbody tr").filter({
      hasText: positionName,
    }),
  ).toHaveCount(1);
  const row = page
    .locator("tbody tr")
    .filter({
      hasText: positionName,
    })
    .first();
  await row.locator('button[data-part="trigger"]').click();
  const popover = page.locator('[data-part="content"][role="dialog"]').last();
  await expect(popover.getByTestId("button")).toBeVisible();
  await expect(popover.getByTestId("button-danger")).toBeVisible();
  await popover.getByTestId("button").click();
  const editDialog = page.getByRole("dialog");
  await expect(editDialog).toBeVisible();
  const positionInput = editDialog.getByTestId("position-name");
  await positionInput.clear();
  await positionInput.fill(updatedPositionName);
  await editDialog.getByTestId("confirm-btn").click();
  await expect(editDialog).not.toBeVisible();
  await page.getByTestId("search-input").clear();
  await page.getByTestId("search-input").fill(updatedPositionName);
  await expect(
    page.locator("tbody tr").filter({
      hasText: updatedPositionName,
    }),
  ).toHaveCount(1);
  const updatedRow = page
    .locator("tbody tr")
    .filter({
      hasText: updatedPositionName,
    })
    .first();
  await updatedRow.locator('button[data-part="trigger"]').click();
  const updatedPopover = page
    .locator('[data-part="content"][role="dialog"]')
    .last();
  await updatedPopover.getByTestId("button-danger").click();
  await page.getByTestId("search-input").clear();
  await page.getByTestId("search-input").fill(updatedPositionName);
  await expect(
    page.locator("tbody tr").filter({
      hasText: updatedPositionName,
    }),
  ).toHaveCount(0);
});
