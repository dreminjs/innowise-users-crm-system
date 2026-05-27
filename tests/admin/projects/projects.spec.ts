import { expect, test } from "@playwright/test";
test("admin can create edit and delete projects", async ({ page }) => {
  const projectName = "ProjectTest";
  const updatedProjectName = "UpdatedProject";
  await page.goto("/projects");
  await expect(page).toHaveURL(/projects/);
  await page.getByTestId("add-new-btn").click();
  const createDialog = page.getByRole("dialog");
  await expect(createDialog).toBeVisible();
  await createDialog.getByTestId("project-name").fill(projectName);
  await createDialog.getByTestId("domain").fill("Finance");
  await createDialog.getByTestId("textarea").fill("Project description");
  await createDialog.getByTestId("startDate").click();
  await page
    .locator(".react-datepicker__day")
    .filter({ hasText: "1" })
    .first()
    .click();
  await createDialog.getByRole("combobox").click();
  await page.locator('[role="option"]').first().click();
  await createDialog.getByTestId("confirm-btn").click();
  await page.getByTestId("search-input").fill(projectName);
  const createdRow = page
    .locator("tbody tr")
    .filter({
      hasText: projectName,
    })
    .first();
  await expect(createdRow).toBeVisible({
    timeout: 15000,
  });
  await createdRow.locator('button[data-part="trigger"]').click();
  const popover = page.locator('[data-part="content"][role="dialog"]').last();
  await expect(popover).toBeVisible();
  await expect(popover.getByTestId("button")).toBeVisible();
  await expect(popover.getByTestId("button-danger")).toBeVisible();
  await popover.getByTestId("button").click();
  const editDialog = page.getByRole("dialog");
  await expect(editDialog).toBeVisible();
  const projectInput = editDialog.getByTestId("project-name");
  await projectInput.clear();
  await projectInput.fill(updatedProjectName);
  await editDialog.getByTestId("domain").clear();
  await editDialog.getByTestId("domain").fill("Healthcare");
  await editDialog.getByTestId("textarea").clear();
  await editDialog.getByTestId("textarea").fill("Updated description");
  await editDialog.getByTestId("confirm-btn").click();
  await page.getByTestId("search-input").clear();
  await page.getByTestId("search-input").fill(updatedProjectName);
  const updatedRow = page
    .locator("tbody tr")
    .filter({
      hasText: updatedProjectName,
    })
    .first();
  await expect(updatedRow).toBeVisible({
    timeout: 10000,
  });
  await updatedRow.locator('button[data-part="trigger"]').click();
  const updatedPopover = page
    .locator('[data-part="content"][role="dialog"]')
    .last();
  await expect(updatedPopover).toBeVisible();
  await updatedPopover.getByTestId("button-danger").click();
  await page.getByTestId("search-input").clear();
  await page.getByTestId("search-input").fill(updatedProjectName);
  const deletedRow = page.locator("tbody tr").filter({
    hasText: updatedProjectName,
  });
  await expect(deletedRow).toHaveCount(0);
});
