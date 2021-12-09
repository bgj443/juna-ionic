const { test, expect } = require("@playwright/test");

test("Front page test", async ({ page }) => {
  await page.goto("https://intense-plains-54261.herokuapp.com");
  const title = page.locator("ion-toolbar .title-default");
  await expect(title).toHaveText("Etusivu");
});
