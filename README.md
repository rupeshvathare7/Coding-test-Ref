This project is created as part of the AI Driven Automation Engineer coding test. It uses Playwright with JavaScript to automate the employee management flow in OrangeHRM.

This automation covers the following Step :
  1.Login to OrangeHRM.
  2.Navigating to PIM Section.
  3.Adding a new employee.
  4.Verify the employee details.
  5.Edit employee information
  6.Validate the relevant API response.
  7.Delete the employee and verify the result
  8.Logout from the application

Tech Used : 
            JavaScript
            Playwright
            Page Object Model (POM)
            Playwright HTML Report
            Git and GitHub

Setup : 
Make sure Node.js and npm are installed.
Clone the repository and open the project folder.
git clone <your-github-repository-url>
cd orangehrm-playwright-javascript-final
npm ci
npx playwright install chromium

Add the required environment variables in a .env file based on .env.example.

Run Tests : 
npx plawright test
generate and view the HTML Report:
npx playwright show-report
