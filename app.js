import express from "express";
import employees from "./db/employees.js";

const app = express();

// GET / sends the string "Hello employees!"
app.get("/", (req, res) => {
  res.status(200).send("Hello employees!");
});

// GET /employees sends the array of employees
app.get("/employees", (req, res) => {
  res.status(200).json(employees);
});

// GET /employees/random sends a random employee from the array
app.get("/employees/random", (req, res) => {
  if (!employees.length) {
    return res.status(404).json({ message: "No employees found" });
  }
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.status(200).json(employees[randomIndex]);
});

// GET /employees/:id sends the employee with the given id
app.get("/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find((e) => e.id === id);
  if (!employee) {
    return res.status(404).json({ message: `No employee found with id ${id}` });
  }
  res.status(200).json(employee);
});

export default app;
