const { expect } = require('@playwright/test');

class PIMPage {
  constructor(page) {
    this.page = page;

    // Sidebar PIM
    this.pimMenu = page.getByRole('link', {
      name: 'PIM',
      exact: true
    });

    // Add Employee
    this.addEmployeeLink = page.getByRole('link', {
      name: 'Add Employee',
      exact: true
    });

    // Employee Information heading
    this.employeeInformationHeading = page.getByRole('heading', {
      name: 'Employee Information'
    });

    // Employee ID input
    // Locate the form row containing "Employee Id"
    this.employeeIdInput = page
      .locator('.oxd-form-row')
      .filter({
        hasText: 'Employee Id'
      })
      .locator('input.oxd-input');

    // Search button
    this.searchButton = page.getByRole('button', {
      name: 'Search',
      exact: true
    });

    // Employee table rows
    this.employeeRows = page.locator(
      '.oxd-table-body .oxd-table-row'
    );
  }

  // -----------------------------------------
  // Open PIM
  // -----------------------------------------
  async openPIM() {
    if (!this.page.url().includes('/pim/viewEmployeeList')) {
      await this.pimMenu.click();
    }

    await expect(this.page).toHaveURL(
      /\/web\/index\.php\/pim\/viewEmployeeList/
    );

    await expect(
      this.employeeInformationHeading
    ).toBeVisible();

    await expect(
      this.addEmployeeLink
    ).toBeVisible();
  }

  // -----------------------------------------
  // Open Add Employee
  // -----------------------------------------
  async openAddEmployee() {
    await expect(
      this.addEmployeeLink
    ).toBeVisible();

    await this.addEmployeeLink.click();

    await expect(this.page).toHaveURL(
      /\/web\/index\.php\/pim\/addEmployee/
    );

    await expect(
      this.page.getByRole('heading', {
        name: 'Add Employee'
      })
    ).toBeVisible();
  }

  // -----------------------------------------
  // Search Employee by Employee ID
  // -----------------------------------------
  async searchByEmployeeId(employeeId) {

    // Verify Employee Information page
    await expect(
      this.employeeInformationHeading
    ).toBeVisible({
      timeout: 30000
    });

    // Verify Employee ID input
    await expect(
      this.employeeIdInput
    ).toBeVisible({
      timeout: 30000
    });

    // Clear existing value and enter Employee ID
    await this.employeeIdInput.fill(
      String(employeeId)
    );

    // Click Search ONCE
    await this.searchButton.click();

    // Wait for search result
    await expect(
      this.employeeRows.first()
    ).toBeVisible({
      timeout: 30000
    });
  }

  // -----------------------------------------
  // Open first employee result
  // -----------------------------------------
  async openFirstResult() {

    const row = this.employeeRows.first();

    await expect(row).toBeVisible({
      timeout: 30000
    });

    await row.click();
  }

  // -----------------------------------------
  // Search and Open Employee
  // -----------------------------------------
  async searchAndOpenEmployee(employeeId) {

    await this.searchByEmployeeId(employeeId);

    await this.openFirstResult();
  }

  // -----------------------------------------
  // Get employee row by Employee ID
  // -----------------------------------------
  getEmployeeRow(employeeId) {

    return this.employeeRows.filter({
      hasText: String(employeeId)
    });
  }

  // -----------------------------------------
  // Verify Employee Exists
  // -----------------------------------------
  async verifyEmployeeExists(employeeId) {

    const row = this.getEmployeeRow(employeeId);

    await expect(row).toBeVisible({
      timeout: 30000
    });
  }

  // -----------------------------------------
  // Verify Employee Deleted
  // -----------------------------------------
  async verifyEmployeeDeleted(employeeId) {

    const row = this.getEmployeeRow(employeeId);

    await expect(row).not.toBeVisible({
      timeout: 30000
    });
  }
}

module.exports = {
  PIMPage
};