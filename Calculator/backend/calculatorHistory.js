
// Import Mongoose

const mongoose = require("mongoose");

// Define the calculator history schema

const calculatorHistorySchema = new mongoose.Schema({
  expression: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the CalculatorHistory model using the schema

const CalculatorHistory = mongoose.model(
  "CalculatorHistory",
  calculatorHistorySchema
);

// Export the CalculatorHistory model

module.exports = CalculatorHistory;
