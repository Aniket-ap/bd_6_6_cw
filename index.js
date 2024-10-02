const express = require('express');
const app = express();
const { getAllEmployees, getEmployeeById } = require('./employees');
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to BD_6.6_CW")
});


app.get('/employees', (req, res) => {
  const employees = getAllEmployees();
  if (employees.length > 0) {
    res.status(200).json({ employees });
  } else {
    res.status(404).json({ error: 'No employees found' });
  }
});

app.get('/employees/details/:id', (req, res) => {
  const employee = getEmployeeById(parseInt(req.params.id, 10));
  if (employee) {
    res.status(200).json({ employee });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

module.exports = { app };
