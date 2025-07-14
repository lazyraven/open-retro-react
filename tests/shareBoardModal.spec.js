import { test, expect } from "@playwright/test";

test.describe("Share Board Modal (direct URL)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/boards/fFvaeZcRVBJ2nK9XBXwN/retros?share=true");
  });

  test("should display modal with correct heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Share Board" })
    ).toBeVisible();
  });

  test("should display board link and copy button", async ({ page }) => {
    await expect(page.locator('input[type="text"]').first()).toBeVisible();
    await expect(page.getByRole("button", { name: /copy/i })).toBeVisible();
  });

  test("should display QR code image", async ({ page }) => {
    await expect(page.locator('img[src*="qrserver.com"]')).toBeVisible();
  });

  test("should display email input and send button", async ({ page }) => {
    await expect(page.getByPlaceholder("user@gmail.com")).toBeVisible();
    await expect(page.getByRole("button", { name: /send/i })).toBeVisible();
  });

  test("should disable send button for invalid email", async ({ page }) => {
    await page.getByPlaceholder("user@gmail.com").fill("invalid-email");
    const sendButton = page.getByRole("button", { name: /send/i });
    await expect(sendButton).toBeDisabled();
  });

  test("should enable send button for valid email", async ({ page }) => {
    await page.getByPlaceholder("user@gmail.com").fill("test@example.com");
    const sendButton = page.getByRole("button", { name: /send/i });
    await expect(sendButton).toBeEnabled();
  });
});
