import { expect, test } from "@playwright/test";
test("admin can create edit and delete languages", async ({ page }) => {
  const languageName = "test";
  const updatedLanguageName = "TEST";
  await page.goto("/auth/signin");
  await page.locator('input[name="email"]').fill("123@mail.com");
  await page.locator('input[name="password"]').fill("123456");
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/users/);
  await page.getByTestId("/languages").click();
  await expect(page).toHaveURL(/languages/);
  await page.getByTestId("add-new-btn").click();
  const createDialog = page.getByRole("dialog");
  await expect(createDialog).toBeVisible();
  await createDialog.getByTestId("language-name").fill(languageName);
  await createDialog.getByTestId("language-native-name").fill(languageName);
  await createDialog.getByTestId("iso2").fill("ts");
  await createDialog.getByTestId("confirm-btn").click();
  await page.getByTestId("search-input").fill(languageName);
  await expect(
    page.locator("tbody tr").filter({
      hasText: languageName,
    }),
  ).toHaveCount(1);
  const row = page
    .locator("tbody tr")
    .filter({
      hasText: languageName,
    })
    .first();
  await row.locator('button[data-part="trigger"]').click();
  const popover = page.locator('[data-part="content"][role="dialog"]').last();
  await expect(popover).toBeVisible();
  await expect(popover.getByTestId("button")).toBeVisible();
  await expect(popover.getByTestId("button-danger")).toBeVisible();
  await popover.getByTestId("button").click();
  const editDialog = page.getByRole("dialog");
  await expect(editDialog).toBeVisible();
  const languageInput = editDialog.getByTestId("language-name");
  await languageInput.clear();
  await languageInput.fill(updatedLanguageName);
  const nativeNameInput = editDialog.getByTestId("language-native-name");
  await nativeNameInput.clear();
  await nativeNameInput.fill(updatedLanguageName);
  const iso2Input = editDialog.getByTestId("iso2");
  await iso2Input.clear();
  await iso2Input.fill("TS");
  await editDialog.getByTestId("confirm-btn").click();
  await expect(editDialog).not.toBeVisible();
  await page.getByTestId("search-input").clear();
  await page.getByTestId("search-input").fill(updatedLanguageName);
  await expect(
    page.locator("tbody tr").filter({
      hasText: updatedLanguageName,
    }),
  ).toHaveCount(1);
  const updatedRow = page
    .locator("tbody tr")
    .filter({
      hasText: updatedLanguageName,
    })
    .first();
  await updatedRow.locator('button[data-part="trigger"]').click();
  const updatedPopover = page
    .locator('[data-part="content"][role="dialog"]')
    .last();
  await expect(updatedPopover).toBeVisible();
  await updatedPopover.getByTestId("button-danger").click();
  await page.getByTestId("search-input").clear();
  await page.getByTestId("search-input").fill(updatedLanguageName);
  await expect(
    page.locator("tbody tr").filter({
      hasText: updatedLanguageName,
    }),
  ).toHaveCount(0);
});
