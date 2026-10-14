const { expect } = require('@playwright/test');

class EmployeeDetailsPage {
  constructor(page) {
    this.page = page;

    // Employee heading
    this.employeeHeading = page.getByRole('heading', {
      name: /.+/,
      level: 6
    });

    // Job tab
    this.jobTab = page.getByRole('link', {
      name: 'Job',
      exact: true
    });

    // Job Title dropdown
    this.jobTitleDropdown = page.locator(
      '.oxd-input-group:has(.oxd-label:has-text("Job Title")) .oxd-select-text'
    );

    // Employment Status dropdown
    this.employmentStatusDropdown = page.locator(
      '.oxd-input-group:has(.oxd-label:has-text("Employment Status")) .oxd-select-text'
    );

    // Save button on Job page
    this.saveButton = page.getByRole('button', {
      name: 'Save',
      exact: true
    });
  }

  // ------------------------------------------------
  // Verify employee details page is opened
  // ------------------------------------------------
  async verifyEmployeeCreated(employeeId) {
    await expect(this.page.getByRole('heading', {
      name: /Rupesh Automation/
    })).toBeVisible({
      timeout: 30000
    });

    console.log(`Employee ${employeeId} created successfully`);
  }

  // ------------------------------------------------
  // Update Job Title and Employment Status
  // ------------------------------------------------
  async updateJobDetails(jobTitle, employmentStatus) {

    // Open Job tab
    await expect(this.jobTab).toBeVisible({
      timeout: 30000
    });

    await this.jobTab.click();

    // Wait for Job page to load
    await expect(this.page).toHaveURL(
      /\/web\/index\.php\/pim\/viewJobDetails/
    );

    // -----------------------------
    // Job Title
    // -----------------------------
    await expect(this.jobTitleDropdown).toBeVisible({
      timeout: 30000
    });

    await this.jobTitleDropdown.click();

   const jobOption = this.page.getByRole('option', {
  name: jobTitle,
  exact: true
});

await expect(jobOption).toBeVisible({
  timeout: 10000
});

await jobOption.click();

    // -----------------------------
    // Employment Status
    // -----------------------------
    await expect(this.employmentStatusDropdown).toBeVisible({
      timeout: 30000
    });

    await this.employmentStatusDropdown.click();

    const statusOption = this.page.getByRole('option', {
  name: employmentStatus,
  exact: true
});
await expect(statusOption).toBeVisible({
  timeout: 10000
});

await statusOption.click();


    // -----------------------------
    // Verify selected values
    // -----------------------------
    await expect(this.jobTitleDropdown).toContainText(jobTitle);

    await expect(this.employmentStatusDropdown).toContainText(
      employmentStatus
    );

    // -----------------------------
    // Save
    // -----------------------------
    await this.saveButton.click();

    // Wait for save confirmation
    await expect(
      this.page.getByText('Successfully Updated', {
        exact: false
      })
    ).toBeVisible({
      timeout: 15000
    });

    // Final validation
    await expect(this.jobTitleDropdown).toContainText(jobTitle);
    await expect(this.employmentStatusDropdown).toContainText(
      employmentStatus
    );

    console.log(
      `Job details updated: ${jobTitle} | ${employmentStatus}`
    );
  }

  // ------------------------------------------------
  // Logout
  // ------------------------------------------------
  async logout() {

    const profileMenu = this.page.locator(
      '.oxd-userdropdown-tab'
    );

    await profileMenu.click();

    await this.page.getByRole('menuitem', {
      name: 'Logout'
    }).click();

    await expect(
      this.page.getByRole('heading', {
        name: 'Login'
      })
    ).toBeVisible({
      timeout: 30000
    });
  }
}

module.exports = {
  EmployeeDetailsPage
};