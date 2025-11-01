require("dotenv").config(); // Load environment variables from .env file

const express = require("express"); // Import Express framework
const app = express(); // Create Express application instance
app.use(express.json()); // Middleware to parse JSON request bodies

let expenses = [
  // In-memory array to store expense data
  { id: 1, amount: 200, category: "Education", date: "17-03-2025" },
  { id: 2, amount: 234, category: "House", date: "12-11-2025" },
];

// Home route
app.get("/", (req, res) => {
  // Handle GET requests to root path
  res.status(200).send(
    // Send HTML response with 200 status
    "<h1>GROUP 3 PROJECT WORK</h1>"
  );
});

app.get("/api/", (req, res) => {
  // Handle GET requests to /api path
  res.status(200).json({
    // Send JSON response with 200 status
    message: "Welcome To Expenses",
    version: "1.0",
  });
});

// Get all expenses
app.get("/api/expenses", (req, res) => {
  // Handle GET all expenses
  res.status(200).json(expenses); // Return all expenses as JSON
});

// Get a single Expenses
app.get("/api/expenses/:id", (req, res) => {
  // Handle GET single expense by ID
  const Id = parseInt(req.params.id); // Convert URL parameter to integer
  const expense = expenses.find((t) => t.id === Id); // Find expense by ID
  if (!expense) return res.status(400).json({ message: "Not found" }); // Return if not found
  res.status(200).json(expense); // Return found expense
});

// Add a new expenses
app.post("/api/expenses", (req, res) => {
  // Handle POST to create new expense
  const { amount, category, date } = req.body; // Extract data from request body
  if (!amount || !category || !date === undefined)
    // Check if required fields exist
    return res.status(400).json({ message: "Missing fields" }); // Return error if missing
  const newExpenses = { id: expenses.length + 1, amount, category, date }; // Create new expense object
  expenses.push(newExpenses); // Add new expense to array
  res.status(201).json(newExpenses); // Return created expense with 201 status
});

// Update expenses
app.patch("/api/expenses/:id", (req, res) => {
  // Handle PATCH to update expense
  const Id = parseInt(req.params.id); // Convert URL parameter to integer
  const expense = expenses.find((t) => t.id === Id); // Find expense by ID
  if (!expense) return res.status(404).json({ message: "Expenses to found" }); // Return if not found
  Object.assign(expense, req.body); // Update expense with new data from request body
  res.status(200).json(expense); // Return updated expense
});

//Delete existing expenses
app.delete("/api/expenses/:id", (req, res) => {
  // Handle DELETE to remove expense
  const Id = parseInt(req.params.id); // Convert URL parameter to integer
  const initiallength = expenses.length; // Store initial array length
  expenses = expenses.filter((t) => t.id !== Id); // Filter out expense with matching ID
  if (expenses.length === initiallength)
    // Check if array length changed
    return res.status(404).json({ error: "Not found" }); // Return error if no expense was deleted
  res.status(204).send(); // Return success with no content (204 status)
});
// Global error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Server error!" }); // Handle any uncaught errors
});

const PORT = process.env.PORT || 7000; // Get port from environment or use default 7000
app.listen(PORT, () => console.log(`Server on port ${PORT}`)); // Start server on specified port
