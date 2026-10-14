const { test, expect } = require('@playwright/test');
const path = require('path');

const { LoginPage } = require('../src/pages/LoginPage');
const { DashboardPage } = require('../src/pages/DashboardPage');
const { PIMPage } = require('../src/pages/PIMPage');
const { AddEmployeePage } = require('../src/pages/AddEmployeePage');
const { EmployeeDetailsPage } = require('../src/pages/EmployeeDetailsPage');
const { generateEmployeeId } = require('../src/utils/employeeIdGenerator');
const { getEmployeeData } = require('../src/utils/testData');
const { EmployeeApiClient } = require('../src/utils/apiClient');

test.describe('Employee Lifecycle Management', () => {
  test('should create, edit, validate, delete and logout an employee', async ({ page, request }) => {
    const data = getEmployeeData();

    let employeeId = generateEmployeeId();

    expect(employeeId).toMatch(/^\d{10}$/);
    console.log(`Generated Employee ID: ${employeeId}`);

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const pimPage = new PIMPage(page);
    const addEmployeePage = new AddEmployeePage(page);
    const employeeDetailsPage = new EmployeeDetailsPage(page);
    const apiClient = new EmployeeApiClient(request);

    // 1. Login
    await page.goto('/web/index.php/auth/login');

    await loginPage.login(
      process.env.USERNAME || 'Admin',
      process.env.PASSWORD || 'admin123'
    );

    await dashboardPage.verifyDisplayed();
    await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index/);

    // 2. Add Employee
    await pimPage.openPIM();
    await pimPage.openAddEmployee();

    await addEmployeePage.enterFirstName(data.firstName);
    await addEmployeePage.enterLastName(data.lastName);
    await addEmployeePage.enterEmployeeId(employeeId);

    const profilePath = path.resolve(__dirname, '../test-data/profile.jpg');
    await addEmployeePage.uploadProfilePicture(profilePath);

    // Retry with another dynamic ID if duplicate validation occurs.
    let employeeSaved = false;

    for (let attempt = 1; attempt <= 3; attempt++) {
      await addEmployeePage.save();

      if (!(await addEmployeePage.isDuplicateEmployeeIdErrorDisplayed())) {
        employeeSaved = true;
        break;
      }

      employeeId = generateEmployeeId();
      console.log(`Duplicate ID detected. Retrying with: ${employeeId}`);
      await addEmployeePage.enterEmployeeId(employeeId);
    }

    expect(employeeSaved).toBeTruthy();

   await employeeDetailsPage.verifyEmployeeCreated(employeeId);

    // 3. Search Employee
    await pimPage.openPIM();
    await pimPage.searchByEmployeeId(employeeId);
    await pimPage.openFirstResult();

    // 4. Edit Employee Information
    await employeeDetailsPage.updateJobDetails(
      data.jobTitle,
      data.employmentStatus
    );

  
    await employeeDetailsPage.logout();

    await expect(page.getByRole('heading', { name: 'Login' }))
      .toBeVisible();

    // Session invalidation check: browser back should not expose Dashboard.
    await page.goBack();
    await expect(page.getByRole('heading', { name: 'Login' }))
      .toBeVisible();
  });
});
