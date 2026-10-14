class EmployeeApiClient {
  constructor(request) {
    this.request = request;
    this.baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2';
  }

  async getEmployee(empNumber, token) {
    if (!token) {
      throw new Error(
        'ORANGEHRM_API_TOKEN is not configured. Configure the token before running real API validation.'
      );
    }

    return this.request.get(`${this.baseUrl}/pim/employees/${empNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
  }
}

module.exports = { EmployeeApiClient };
