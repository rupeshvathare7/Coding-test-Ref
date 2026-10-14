# OrangeHRM Employee Lifecycle - Playwright JavaScript

## Technology
- JavaScript
- Playwright Test
- Page Object Model (POM)
- JSON data-driven testing
- Playwright HTML Report
- Screenshot on failure
- Video recording
- APIRequestContext hook

## Application
https://opensource-demo.orangehrmlive.com/

## Credentials
Username: Admin
Password: admin123

## Setup

Install Node.js 18+.

```bash
npm install
npx playwright install
```

Copy `.env.example` to `.env` if you want custom settings.

## Run

Headless:
```bash
npm test
```

Headed:
```bash
npm run test:headed
```

Debug:
```bash
npm run test:debug
```

Open report:
```bash
npm run report
```

## Dynamic Employee ID

The test generates a new numeric Employee ID for every execution.

- Exactly 10 digits
- No `Date.now()`
- No `System.currentTimeMillis()`
- OrangeHRM's default value such as `0552` is selected and cleared first.
- The test verifies the field is empty before entering the generated ID.
- If the application reports that the Employee ID already exists, a new 10-digit ID is generated and the save is retried.

Example:
`5837219046`

## Framework structure

```text
orangehrm-playwright-javascript-final/
├── package.json
├── playwright.config.js
├── .env.example
├── README.md
├── src/
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── DashboardPage.js
│   │   ├── PIMPage.js
│   │   ├── AddEmployeePage.js
│   │   └── EmployeeDetailsPage.js
│   └── utils/
│       ├── employeeIdGenerator.js
│       ├── testData.js
│       └── apiClient.js
├── tests/
│   └── employeeLifecycle.spec.js
└── test-data/
    └── employeeData.json
```

## Assessment flow

Login
-> Dashboard validation
-> PIM
-> Add Employee
-> Clear default Employee ID
-> Generate dynamic 10-digit Employee ID
-> Upload profile picture
-> Save
-> Verify employee
-> Search employee
-> Edit Job Title and Employment Status
-> API validation hook
-> Delete employee
-> API deletion validation hook
-> Logout
-> Verify login page/session invalidation

## API note

The current OrangeHRM demo's internal API requires authentication and an internal employee number (`empNumber`). The framework includes an API client without fake responses. Configure `ORANGEHRM_API_TOKEN` and supply the actual internal employee number if API assertions are enabled against the current demo environment.

## Reports

After execution:
`playwright-report/index.html`

Open:
```bash
npm run report
```

Videos and traces are stored under:
`test-results/`
