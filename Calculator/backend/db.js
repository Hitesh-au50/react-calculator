
// Import Mongoose

const mongoose = require("mongoose");

// Connect to MongoDB Atlas

mongoose.connect(
  "mongodb+srv://calc:calc123@cluster0.pumzars.mongodb.net/calculator",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Get the default connection

const db = mongoose.connection;

// Handle MongoDB connection errors

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Log successful connection to MongoDB

db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Export the MongoDB connection

module.exports = db;

