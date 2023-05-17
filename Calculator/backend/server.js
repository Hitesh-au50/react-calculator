
// Import required dependencies

const express = require("express");
const cors = require("cors");
const db = require("./db");
const routes = require("./routes");

// Create an instance of Express

const app = express();
const port = 5000;

// Enable Cross-Origin Resource Sharing

app.use(cors());

// Parse JSON request bodies

app.use(express.json());

// Use the defined routes

app.use(routes);

// Start the server and listen on the specified port

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
