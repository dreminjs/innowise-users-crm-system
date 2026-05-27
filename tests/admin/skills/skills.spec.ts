import { expect, test } from "@playwright/test";
test("admin can create edit and delete skills", async ({ page }) => {
  const skillName = "html51";
  const updatedSkillName = "HTML5";
  await page.goto("/skills");
  await expect(page).toHaveURL(/skills/);
  await page.getByTestId("add-new-btn").click();
  const createDialog = page.getByRole("dialog");
  await expect(createDialog).toBeVisible();
  await createDialog.getByTestId("skills-name").fill(skillName);
  await createDialog.getByTestId("skills-category").click();
  await page
    .locator('[role="option"]')
    .filter({ hasText: "Data visualization" })
    .click();
  await createDialog.getByTestId("confirm-btn").click();
  await expect(createDialog).not.toBeVisible();
  await page.getByTestId("search-input").fill(skillName);
  await expect(
    page.locator("tbody tr").filter({
      hasText: skillName,
    }),
  ).toHaveCount(1);
  const row = page
    .locator("tbody tr")
    .filter({
      hasText: skillName,
    })
    .first();
  await row.locator('button[data-part="trigger"]').click();
  const popover = page.locator('[data-part="content"][role="dialog"]').last();
  await expect(popover.getByTestId("button")).toBeVisible();
  await expect(popover.getByTestId("button-danger")).toBeVisible();
  await popover.getByTestId("button").click();
  const editDialog = page.getByRole("dialog");
  await expect(editDialog).toBeVisible();
  const skillInput = editDialog.getByTestId("skills-name");
  await skillInput.clear();
  await skillInput.fill(updatedSkillName);
  await editDialog.getByTestId("skills-category").click();
  await page
    .locator('[role="option"]')
    .filter({ hasText: "Programming languages" })
    .click();
  await editDialog.getByTestId("confirm-btn").click();
  await expect(editDialog).not.toBeVisible();
  await page.getByTestId("search-input").clear();
  await page.getByTestId("search-input").fill(updatedSkillName);
  await expect(
    page.locator("tbody tr").filter({
      hasText: updatedSkillName,
    }),
  ).toHaveCount(1);
  const updatedRow = page
    .locator("tbody tr")
    .filter({
      hasText: updatedSkillName,
    })
    .first();
  await updatedRow.locator('button[data-part="trigger"]').click();
  const updatedPopover = page
    .locator('[data-part="content"][role="dialog"]')
    .last();
  await updatedPopover.getByTestId("button-danger").click();
  await page.getByTestId("search-input").clear();
  await page.getByTestId("search-input").fill(updatedSkillName);
  await expect(
    page.locator("tbody tr").filter({
      hasText: updatedSkillName,
    }),
  ).toHaveCount(0);
});
