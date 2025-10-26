const express = require("express");
const app = express();
app.use(express.json());

let expenses = [
  { id: 1, amount: 200, category: "Education", date: "17-03-2025" },
  { id: 2, amount: 234, category: "House", date: "12-11-2025" },
];

app.get("/api/", (req, res) => {
  res.status(200).json({
    message: "Welcome To Expenses",
    version: "1.0",
  });
});

// Get all expenses
app.get("/api/expenses", (req, res) => {
  res.status(200).json(expenses);
});

// Get a single Expenses
app.get("/api/expense/:id", (req, res) => {
  const Id = parseInt(req.params.id);
  const expense = expenses.find((t) => t.id === Id);
  if (!expense) return res.status(200).json({ message: "Not found" });
  res.status(200).json(expense);
});
// Add a new expenses
app.post("/api/expenses", (req, res) => {
  const { amount, category, date } = req.body;
  if (!amount || !category || !date === undefined)
    return res.status(400).json({ message: "Missing fields" });
  const newExpenses = { id: expenses.length + 1, amount, category, date };
  expenses.push(newExpenses);
  res.status(201).json(newExpenses);
});

// Update expenses
app.patch("/api/expenses/:id", (req, res) => {
  const Id = parseInt(req.params.id);
  const expense = expenses.find((t) => t.id === Id);
  if (!expense) return res.status(404).json({ message: "Expenses to found" });
  Object.assign(expense, req.body);
  res.status(200).json(expense);
});

//Delete existing expenses
app.delete("/api/expenses/:id", (req, res) => {
  const Id = parseInt(req.params.id);
  const initiallength = expenses.length;
  expenses = expenses.filter((t) => t.id !== Id);
  if (expenses.length === initiallength)
    return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Server error!" });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
