const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.userNameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
    this.userNameValue = page.locator('#userName-value');
  }

  async login(username, password) {
    console.log(`Trying to login with ${username}`);
    await this.userNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLogin(expectedUsername) {
    try {
      await this.page.waitForSelector('#userName-value', { timeout: 5000 });
      await expect(this.userNameValue).toHaveText(expectedUsername);
    } catch (e) {
      throw new Error('Login verification failed');
    }
  }
  
}

module.exports = LoginPage;
