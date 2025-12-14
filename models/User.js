/**
 * ===========================================
 * USER MODEL - COLIN's TASK
 * ===========================================
 *
 * The User model represents a user account in our app.
 * It stores their credentials and profile info.
 *
 * YOUR TASKS:
 * 1. Define the User schema with required fields
 * 2. Add validation (email format, required fields)
 * 3. Add timestamps for createdAt/updatedAt
 *
 * ESTIMATED TIME: 1-2 hours
 */

const mongoose = require("mongoose");

/**
 * User Schema Definition
 *
 * REQUIRED FIELDS:
 * - username: String, required, unique
 * - email: String, required, unique
 * - password: String, required (will store hashed password)
 *
 * PSEUDOCODE:
 * 1. Create a new mongoose.Schema with the fields above
 * 2. Add validation:
 *    - username: required, unique, trim whitespace
 *    - email: required, unique, lowercase, trim
 *    - password: required, minimum length 6
 * 3. Add { timestamps: true } as second argument to auto-add createdAt/updatedAt
 *
 * EXAMPLE SCHEMA PATTERN:
 * const mySchema = new mongoose.Schema({
 *   fieldName: {
 *     type: String,
 *     required: [true, 'Error message if missing'],
 *     unique: true
 *   }
 * }, { timestamps: true });
 */

// TODO: Define the userSchema
const userSchema = new mongoose.Schema(
  {
    // TODO: Add username field
    // - type: String
    // - required: true (with error message)
    // - unique: true
    // - trim: true (removes whitespace)
    // TODO: Add email field
    // - type: String
    // - required: true (with error message)
    // - unique: true
    // - lowercase: true (converts to lowercase)
    // - trim: true
    // TODO: Add password field
    // - type: String
    // - required: true (with error message)
    // - minlength: 6
  },
  { timestamps: true }
);

// Create and export the model
const User = mongoose.model("User", userSchema);

module.exports = User;
