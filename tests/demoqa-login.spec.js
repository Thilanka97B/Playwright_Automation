const { test, expect } = require('@playwright/test');
const fs = require('fs');
const LoginPage = require('../pages/loginPage');
const data = require('../data/testData.json');

// Ensure the directory for saving videos exists, if not create it
if (!fs.existsSync('./videos')) {
  fs.mkdirSync('./videos');
}

test('DemoQA Login Test - Valid and Invalid Credentials', async ({ browser }) => {
  const context = await browser.newContext({
    recordVideo: {
      dir: './videos/',
    },
  });

  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  for (const testData of data) {
    const { username, password } = testData;

    // Clear cookies and storage
    await context.clearCookies();
    await page.goto('https://demoqa.com/login');

    // Ensure on login page
    await expect(page).toHaveURL('https://demoqa.com/login');
    await expect(page.locator('#userName')).toBeVisible();

    // Perform login
    await loginPage.login(username, password);

    try {
      // Try verifying successful login
      await loginPage.verifyLogin(username);
      await page.screenshot({ path: `login-success-${username}.png` });
      console.log(`✅ Login passed for ${username}`);
    } catch (error) {
      // If verification fails, assume login failed
      const errorMessage = await page.locator('.mb-1').textContent();
      console.log(`❌ Login failed for ${username}: ${errorMessage.trim()}`);
      await page.screenshot({ path: `login-failed-${username}.png` });
    }
  }

  await page.close();
  await context.close();
});
