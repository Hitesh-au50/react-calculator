
// Import required dependencies

const express = require("express");
const CalculatorHistory = require("./calculatorHistory");

// Create an instance of Express Router

const router = express.Router();

// Define the POST route to save calculator history


router.post("/history", async (req, res) => {
  try {

    // Retrieve expression and result from the request body

    const { expression, result } = req.body;

    // Create a new CalculatorHistory instance

    const history = new CalculatorHistory({
      expression,
      result,
    });

    // Save the history item to the database

    await history.save();

    // Send success status code

    res.sendStatus(201);
  } catch (error) {

    // Log and send error status code

    console.error(error);
    res.sendStatus(500);
  }
});

// Define the DELETE route to delete calculator history by ID

router.delete('/history/:index', (req, res) => {

  // Retrieve the ID parameter from the request

  const { index } = req.params;

  // Find and delete the history item by ID

  CalculatorHistory.findByIdAndDelete(index)


  // Send success status code

  res.sendStatus(200);
});

// Define the PUT route to update calculator history by ID

router.put("/history/:index", async (req, res) => {

  // Retrieve the ID parameter and updated calculation from the request

  try {
    const index = req.params.index;
    const updatedCalculation = req.body;

    // Find the history item by ID and update it

    const updatedItem = await CalculatorHistory.findByIdAndUpdate(
      index,
      updatedCalculation,
      { new: true }
    );

    // If the item is not found, send a 404 status code

    if (!updatedItem) {
      return res.status(404).json({ error: "Calculation not found" });
    }

    // Send the updated item as JSON response

    return res.json(updatedItem);
  } catch (error) {

    // Log and send error status code

    console.error(error);
    res.sendStatus(500);
  }


});

// Export the router

module.exports = router;

