const { test, expect } = require("@playwright/test");
const baseUrl = "https://intense-plains-54261.herokuapp.com";

test.describe("Dark mode support", () => {
  test.use({ colorScheme: "dark" });
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Check that dark mode texts renders as light", async ({ page }) => {
    await expect(page.locator(".toolbar-title-default")).toHaveCSS(
      "color",
      "rgb(255, 255, 255)"
    );
  });
});

test.describe("Light mode", () => {
  test.use({ colorScheme: "light" });
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Check that light mode texts renders as dark", async ({ page }) => {
    await expect(page.locator(".toolbar-title-default")).toHaveCSS(
      "color",
      "rgb(66, 66, 66)"
    );
  });
});

test.describe("Geolocator button", () => {
  test.use({
    geolocation: { longitude: 24.8773, latitude: 60.1573 },
    permissions: ["geolocation"],
  });
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Check that geolocation takes you to train listing", async ({
    page,
  }) => {
    await page.click('text="Hae lähin asema" >> button');
    await expect(page).toHaveURL(baseUrl + "/tabs/tab2");
  });
});
