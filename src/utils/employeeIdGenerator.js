function generateEmployeeId() {
  // Exactly 10 numeric digits. Intentionally does not use Date.now().
  const min = 1000000000;
  const max = 9999999999;
  return String(Math.floor(min + Math.random() * (max - min + 1)));
}

module.exports = { generateEmployeeId };
