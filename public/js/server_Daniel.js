// NOT USED IN THE FINAL APP, THIS IS JUST A TEST SERVER TO CHECK THE CONNECTION TO MONGODB



const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

// Create the Express application
const app = express();

// Enable CORS so the frontend can communicate with the server
app.use(cors());

app.use(express.json());

// MongoDB connection URL (local MongoDB server)
const uri = "mongodb://localhost:27017";

// Create a MongoDB client
const client = new MongoClient(uri);

// Variable that will hold the members collection
let membersCollection;

async function connectDB() {
  await client.connect();

  // Select the database called "gymDb"
  const db = client.db("gymDb");

  // Select the collection called "members"
  membersCollection = db.collection("members");

  // Display a message in the terminal confirming the connection
  console.log("Connected to MongoDB");
}

// Run the database connection function
connectDB();

// Create a POST route called "/register"
// This route receives the form data sent from register.js
app.post("/register", async (req, res) => {
  // Print the received data in the terminal for debugging
  console.log("Form received:");
  console.log(req.body);

  // Store the form data in a variable
  const member = req.body;

  // Insert the new member document into the MongoDB collection
  await membersCollection.insertOne(member);

  // Send a response back to the frontend confirming success
  res.json({ message: "Member registered successfully" });
});

// The frontend will send requests to this server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
