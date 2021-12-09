const { test, expect } = require("@playwright/test");
const baseUrl = "https://intense-plains-54261.herokuapp.com";

test.describe("App routing", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto(baseUrl);
  });

  test("Redirects to tab 1 if tab is not given", async ({ page }) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL(baseUrl + "/tabs/tab1");
  });

  test("Goes to tab 2 when Junat is clicked", async ({ page }) => {
    await page.click("text=TrainJunat >> path");
    await expect(page).toHaveURL(baseUrl + "/tabs/Tab2");
  });

  test("Goes to tab 1 when Etusivu is clicked", async ({ page }) => {
    await page.click("text=TrainJunat >> path");
    await expect(page).toHaveURL(baseUrl + "/tabs/Tab2");
    await page.click("text=CalendarEtusivu >> path");
    await expect(page).toHaveURL(baseUrl + "/tabs/Tab1");
  });

  test("Goes to tab 3 when a schedule row is clicked", async ({ page }) => {
    await page.click("text=TrainJunat >> path");
    await expect(page).toHaveURL(baseUrl + "/tabs/Tab2");
    await page.click('[placeholder="Hae asemaa"]');
    await page.fill('[placeholder="Hae asemaa"]', "Pasila");
    await page.click("text=Pasila asema >> button");
    await page.click('ion-col:has-text("Helsinki")');
    await expect(page).toHaveURL(/.*tab3.*/);
  });
});
