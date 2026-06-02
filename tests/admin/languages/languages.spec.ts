import { expect, test } from "@playwright/test";

test("admin can create edit and delete languages", async ({ page }) => {
  const languageName = `test_${Date.now()}`;
  const updatedLanguageName = `TEST_${Date.now()}`;
  const searchInput = page.getByTestId("search-input");
  const findRow = (name: string) =>
    page.locator("tbody tr").filter({ hasText: name });
  const openDialog = () =>
    page.locator('[role="dialog"][data-scope="dialog"][data-state="open"]');
  const openPopover = () =>
    page.locator('[role="dialog"][data-part="content"][data-state="open"]');
  await page.goto("/languages");
  await expect(page).toHaveURL(/languages/);
  await page.getByTestId("add-new-btn").click();
  const createDialog = openDialog();
  await expect(createDialog).toBeVisible({ timeout: 10000 });
  await createDialog.getByTestId("language-name").fill(languageName);
  await createDialog.getByTestId("language-native-name").fill(languageName);
  await createDialog.getByTestId("iso2").fill("ts");
  await createDialog.getByTestId("confirm-btn").click();
  await expect(createDialog).toBeHidden({ timeout: 10000 });
  await searchInput.fill(languageName);
  await expect(findRow(languageName)).toHaveCount(1);
  const row = findRow(languageName).first();
  await row.locator('button[data-part="trigger"]').click();
  const popover = openPopover();
  await expect(popover).toBeVisible();
  await expect(popover.getByTestId("button")).toBeVisible();
  await expect(popover.getByTestId("button-danger")).toBeVisible();
  await popover.getByTestId("button").click();
  const editDialog = openDialog();
  await expect(editDialog).toBeVisible({ timeout: 10000 });
  await editDialog.getByTestId("language-name").clear();
  await editDialog.getByTestId("language-name").fill(updatedLanguageName);
  await editDialog.getByTestId("language-native-name").clear();
  await editDialog
    .getByTestId("language-native-name")
    .fill(updatedLanguageName);
  await editDialog.getByTestId("iso2").clear();
  await editDialog.getByTestId("iso2").fill("TS");
  await editDialog.getByTestId("confirm-btn").click();
  await expect(editDialog).toBeHidden({ timeout: 10000 });
  await searchInput.clear();
  await searchInput.fill(updatedLanguageName);
  await expect(findRow(updatedLanguageName)).toHaveCount(1);
  const updatedRow = findRow(updatedLanguageName).first();
  await updatedRow.locator('button[data-part="trigger"]').click();
  const deletePopover = openPopover();
  await expect(deletePopover).toBeVisible();
  await deletePopover.getByTestId("button-danger").click();
  await expect(findRow(updatedLanguageName)).toHaveCount(0, {
    timeout: 10000,
  });
});
