import { test, expect } from "@playwright/test";

test.describe("Create Board Modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("button", { name: /create board/i }).click();
  });

  test("should display modal with correct heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Create Board" })
    ).toBeVisible();
  });

  test("should display all input fields and labels", async ({ page }) => {
    await expect(page.locator("input")).toHaveCount(3);
  });

  test("should display a disabled Create button initially", async ({
    page,
  }) => {
    const createButton = page.getByRole("button", { name: /^create$/i });
    await expect(createButton).toBeVisible();
    await expect(createButton).toBeDisabled();
  });
});
