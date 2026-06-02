import { expect, test } from "@playwright/test";

test("admin can create edit and delete skills", async ({ page }) => {
  const skillName = `skill_${Date.now()}`;
  const updatedSkillName = `skill_updated_${Date.now()}`;
  const searchInput = page.getByTestId("search-input");
  const findRow = (name: string) =>
    page.locator("tbody tr").filter({ hasText: name });
  const openDialog = () =>
    page.locator('[role="dialog"][data-scope="dialog"][data-state="open"]');
  const openPopover = () =>
    page.locator('[role="dialog"][data-part="content"][data-state="open"]');
  await page.goto("/skills");
  await expect(page).toHaveURL(/skills/);
  await page.getByTestId("add-new-btn").click();
  const createDialog = openDialog();
  await expect(createDialog).toBeVisible({ timeout: 10000 });
  await createDialog.getByTestId("skills-name").fill(skillName);
  await createDialog.getByTestId("skills-category").click();
  const createCategory = page
    .getByRole("option")
    .filter({ hasText: "Data visualization" });
  await expect(createCategory).toBeVisible();
  await createCategory.click();
  await createDialog.getByTestId("confirm-btn").click();
  await expect(createDialog).toBeHidden({ timeout: 10000 });
  await searchInput.fill(skillName);
  await expect(findRow(skillName)).toHaveCount(1);
  const row = findRow(skillName).first();
  await row.locator('button[data-part="trigger"]').click();
  const popover = openPopover();
  await expect(popover).toBeVisible();
  await expect(popover.getByTestId("button")).toBeVisible();
  await expect(popover.getByTestId("button-danger")).toBeVisible();
  await popover.getByTestId("button").click();
  const editDialog = openDialog();
  await expect(editDialog).toBeVisible({ timeout: 10000 });
  const skillInput = editDialog.getByTestId("skills-name");
  await skillInput.clear();
  await skillInput.fill(updatedSkillName);
  await editDialog.getByTestId("skills-category").click();
  const editCategory = page
    .getByRole("option")
    .filter({ hasText: "Programming languages" });
  await expect(editCategory).toBeVisible();
  await editCategory.click();
  await editDialog.getByTestId("confirm-btn").click();
  await expect(editDialog).toBeHidden({ timeout: 10000 });
  await searchInput.clear();
  await searchInput.fill(updatedSkillName);
  await expect(findRow(updatedSkillName)).toHaveCount(1);
  const updatedRow = findRow(updatedSkillName).first();
  await updatedRow.locator('button[data-part="trigger"]').click();
  const deletePopover = openPopover();
  await expect(deletePopover).toBeVisible();
  await deletePopover.getByTestId("button-danger").click();
  await expect(findRow(updatedSkillName)).toHaveCount(0, {
    timeout: 10000,
  });
});
