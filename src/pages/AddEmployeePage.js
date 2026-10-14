const { expect } = require('@playwright/test');

class AddEmployeePage {
  constructor(page) {
    this.page = page;

    this.firstName = page.getByRole('textbox', {
      name: 'First name'
    });

    this.lastName = page.getByRole('textbox', {
      name: 'Last Name'
    });

    this.employeeId = page
      .locator('label:has-text("Employee Id")')
      .locator('xpath=following::input[1]');

    this.fileInput = page.locator('input[type="file"]');

    this.saveButton = page.getByRole('button', {
      name: 'Save',
      exact: true
    });

    // Duplicate Employee ID validation
    this.duplicateError = page.locator(
      'text=/Employee Id already exists|Employee Id already exist|already exists/i'
    );
  }

  async enterFirstName(value) {
    await this.firstName.fill(value);
  }

  async enterLastName(value) {
    await this.lastName.fill(value);
  }

  async enterEmployeeId(value) {
    await this.employeeId.fill(String(value));
  }

  async uploadProfilePicture(filePath) {
    await this.fileInput.setInputFiles(filePath);
  }

  async save() {
    await this.saveButton.click();

    // Wait for either success or duplicate validation
    await Promise.race([
      this.page.getByText('Successfully Saved', { exact: true })
        .waitFor({ state: 'visible' }),
      this.duplicateError.first()
        .waitFor({ state: 'visible' })
        .catch(() => {})
    ]);
  }

  async isDuplicateEmployeeIdErrorDisplayed() {
    return await this.duplicateError
      .first()
      .isVisible()
      .catch(() => false);
  }
}

module.exports = { AddEmployeePage };