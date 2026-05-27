import { expect, test } from "@playwright/test";
test("admin can create edit and delete skills", async ({ page }) => {
  const skillName = "html51";
  const updatedSkillName = "HTML5";
  await page.goto("/auth/signin");
  await page.locator('input[name="email"]').fill("123@mail.com");
  await page.locator('input[name="password"]').fill("123456");
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/users/);
  await page.getByTestId("/skills").click();
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
  await page.getByTestId("search-input").fill(skillName);
  await expect(page.locator("tbody tr")).toHaveCount(1);
  const row = page.locator("tbody tr").first();
  await row.locator('button[data-part="trigger"]').click();
  const popover = page.locator('[data-part="content"][role="dialog"]:visible');
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
  await page.getByTestId("search-input").clear();
  await page.getByTestId("search-input").fill(updatedSkillName);
  await expect(page.getByText(updatedSkillName)).toBeVisible();
  const updatedRow = page.locator("tbody tr").first();
  await updatedRow.locator('button[data-part="trigger"]').click();
  const updatedPopover = page.locator(
    '[data-part="content"][role="dialog"]:visible',
  );
  await updatedPopover.getByTestId("button-danger").click();
  await page.getByTestId("search-input").clear();
  await page.getByTestId("search-input").fill(updatedSkillName);
  await expect(page.locator("tbody tr")).toHaveCount(0);
});
