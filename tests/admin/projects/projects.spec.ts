import { expect, test } from "@playwright/test";

test("admin can create edit and delete projects", async ({ page }) => {
  const projectName = `Project_${Date.now()}`;
  const updatedProjectName = `UpdatedProject_${Date.now()}`;
  const searchInput = page.getByTestId("search-input");
  const findRow = (name: string) =>
    page.locator("tbody tr").filter({ hasText: name });
  const openDialog = () =>
    page.locator('[role="dialog"][data-scope="dialog"][data-state="open"]');
  const openPopover = () =>
    page.locator('[role="dialog"][data-part="content"][data-state="open"]');
  await page.goto("/projects");
  await expect(page).toHaveURL(/projects/);
  await page.getByTestId("add-new-btn").click();
  const createDialog = openDialog();
  await expect(createDialog).toBeVisible({ timeout: 10000 });
  await createDialog.getByTestId("project-name").fill(projectName);
  await createDialog.getByTestId("domain").fill("Finance");
  await createDialog.getByTestId("textarea").fill("Project description");
  await createDialog.getByTestId("startDate").click();
  await page
    .locator(
      ".react-datepicker__day:not(.react-datepicker__day--outside-month)",
    )
    .first()
    .click();
  await createDialog.getByRole("combobox").click();
  const firstOption = page.getByRole("option").first();
  await expect(firstOption).toBeVisible();
  await firstOption.click();
  await createDialog.getByTestId("confirm-btn").click();
  await searchInput.fill(projectName);
  const createdRow = findRow(projectName).first();
  await expect(createdRow).toBeVisible({
    timeout: 15000,
  });
  await createdRow.locator('button[data-part="trigger"]').click();
  const popover = openPopover();
  await expect(popover).toBeVisible();
  await expect(popover.getByTestId("button")).toBeVisible();
  await expect(popover.getByTestId("button-danger")).toBeVisible();
  await popover.getByTestId("button").click();
  const editDialog = openDialog();
  await expect(editDialog).toBeVisible({
    timeout: 10000,
  });
  await editDialog.getByTestId("project-name").clear();
  await editDialog.getByTestId("project-name").fill(updatedProjectName);
  await editDialog.getByTestId("domain").clear();
  await editDialog.getByTestId("domain").fill("Healthcare");
  await editDialog.getByTestId("textarea").clear();
  await editDialog.getByTestId("textarea").fill("Updated description");
  await editDialog.getByTestId("confirm-btn").click();
  await searchInput.clear();
  await searchInput.fill(updatedProjectName);
  const updatedRow = findRow(updatedProjectName).first();
  await expect(updatedRow).toBeVisible({
    timeout: 15000,
  });
  await updatedRow.locator('button[data-part="trigger"]').click();
  const deletePopover = openPopover();
  await expect(deletePopover).toBeVisible();
  await deletePopover.getByTestId("button-danger").click();
  await expect(findRow(updatedProjectName)).toHaveCount(0, {
    timeout: 15000,
  });
});
