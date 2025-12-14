/**
 * ===========================================
 * DATABASE CONNECTION - COLIN's TASK
 * ===========================================
 *
 * This file handles connecting to MongoDB using Mongoose.
 *
 * YOUR TASKS:
 * 1. Import mongoose
 * 2. Create an async function that connects to MongoDB
 * 3. Use the MONGODB_URI from environment variables
 * 4. Handle connection errors gracefully
 * 5. Log success/failure messages
 *
 * ESTIMATED TIME: 1-2 hours
 */

const mongoose = require("mongoose");

/**
 * Connect to MongoDB database
 *
 * PSEUDOCODE:
 * 1. Get the MongoDB URI from process.env.MONGODB_URI
 * 2. Try to connect using mongoose.connect()
 * 3. If successful, log "MongoDB Connected: " + the host name
 * 4. If error, log the error message and exit the process
 *
 * HINTS:
 * - mongoose.connect() returns a promise, use async/await
 * - The connection object has a .connection.host property
 * - Use process.exit(1) to stop the server if DB fails
 */
const connectDB = async () => {
  // TODO: Implement database connection
  //
  // Step 1: Wrap everything in try/catch for error handling
  //
  // Step 2: Call mongoose.connect() with process.env.MONGODB_URI
  //         const conn = await mongoose.connect(...)
  //
  // Step 3: Log success message
  //         console.log(`MongoDB Connected: ${conn.connection.host}`)
  //
  // Step 4: In catch block, log error and exit
  //         console.error(`Error: ${error.message}`)
  //         process.exit(1)

  console.log("TODO: Implement connectDB function");
};

module.exports = connectDB;
