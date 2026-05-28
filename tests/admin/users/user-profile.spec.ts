import { test, expect } from "@playwright/test";
test("admin can update profile info", async ({ page }) => {
  const updatedFirstName = "Kirill";
  const updatedLastName = "Ivanov";
  await page.goto("/users/616");
  const form = page.locator("form");
  await expect(form).toBeVisible();
  const firstNameInput = form.locator('input[name="firstName"]');
  await firstNameInput.clear();
  await firstNameInput.fill(updatedFirstName);
  const lastNameInput = form.locator('input[name="lastName"]');
  await lastNameInput.clear();
  await lastNameInput.fill(updatedLastName);
  await form
    .locator('[data-scope="select"]')
    .nth(0)
    .locator('button[role="combobox"]')
    .click();
  await page
    .getByRole("option", {
      name: "Node",
      exact: true,
    })
    .click();
  await form
    .locator('[data-scope="select"]')
    .nth(1)
    .locator('button[role="combobox"]')
    .click();
  await page
    .getByRole("option", {
      name: "DevOps",
      exact: true,
    })
    .click();
  await form
    .getByRole("button", {
      name: "SUBMIT",
    })
    .click();
  await expect(firstNameInput).toHaveValue(updatedFirstName);
  await expect(lastNameInput).toHaveValue(updatedLastName);
  await expect(form.locator('[data-scope="select"]').nth(0)).toContainText(
    "Node",
  );
  await expect(form.locator('[data-scope="select"]').nth(1)).toContainText(
    "DevOps",
  );
});
