const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;

    this.dashboardHeading = page.getByRole('heading', {
      name: 'Dashboard',
      exact: true
    });
  }

  async verifyDisplayed() {
    await expect(this.dashboardHeading).toBeVisible({
      timeout: 15000
    });
  }
}

module.exports = { DashboardPage };