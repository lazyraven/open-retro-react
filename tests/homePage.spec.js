import { test, expect } from "@playwright/test";

test.describe("Home Page UI", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display logo text 'Open Retro'", async ({ page }) => {
    await expect(page.locator("text=Open Retro")).toBeVisible();
  });

  test("should display 'Create Board' button", async ({ page }) => {
    const createBoardButton = page.getByRole("button", {
      name: /create board/i,
    });
    await expect(createBoardButton).toBeVisible();
  });

  test("should open modal when 'Create Board' button is clicked", async ({
    page,
  }) => {
    const createBoardButton = page.getByRole("button", {
      name: /create board/i,
    });
    await createBoardButton.click();
    await expect(
      page.getByRole("heading", { name: "Create Board" })
    ).toBeVisible();
  });
});
