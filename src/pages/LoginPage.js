const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.loginHeading = page.getByRole('heading', { name: 'Login' });
  }

 async login(username, password) {
  await this.username.fill(username);
await this.password.fill(password);

  await this.loginButton.click();

  await expect(
    this.page.getByRole('heading', { name: 'Dashboard', exact: true })
  ).toBeVisible();
}

  async isLoginPageDisplayed() {
    return await this.loginHeading.isVisible().catch(() => false);
  }
}

module.exports = { LoginPage };
