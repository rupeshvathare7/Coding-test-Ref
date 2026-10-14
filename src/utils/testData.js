const fs = require('fs');
const path = require('path');

function getEmployeeData() {
  const filePath = path.join(__dirname, '../../test-data/employeeData.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

module.exports = { getEmployeeData };
