import { test, expect } from "@playwright/test";

test("edit language to the CV", async ({ page }) => {
  await page.goto("http://localhost:3000/languages");
  await expect(page.getByTestId("languages-item").first()).toBeVisible();
  await page.getByTestId("languages-item").first().click({ force: true });
  await expect(page.getByRole("dialog")).toBeVisible();
});
