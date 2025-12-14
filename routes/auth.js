/**
 * ===========================================
 * AUTH ROUTES - NATALIA's TASK
 * ===========================================
 *
 * These routes handle user registration, login, and token verification.
 *
 * ENDPOINTS TO IMPLEMENT:
 * - POST /api/auth/signup - Register a new user
 * - POST /api/auth/login - Login and get token
 * - GET /api/auth/verify - Verify token is valid
 *
 * YOUR TASKS:
 * 1. Import required modules (express, jwt, bcrypt, User model)
 * 2. Create router
 * 3. Implement signup route (hash password, save user, return token)
 * 4. Implement login route (find user, compare password, return token)
 * 5. Implement verify route (protected, return user data)
 *
 * ESTIMATED TIME: 5-6 hours
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

/**
 * HELPER: Generate JWT Token
 *
 * This creates a token containing the user's ID.
 * The token expires in 30 days.
 *
 * ALREADY IMPLEMENTED FOR YOU:
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 *
 * PSEUDOCODE:
 * 1. Get username, email, password from req.body
 * 2. Check if user already exists (by email)
 *    - If exists, return 400 error "User already exists"
 * 3. Hash the password using bcrypt
 *    - const salt = await bcrypt.genSalt(10);
 *    - const hashedPassword = await bcrypt.hash(password, salt);
 * 4. Create new user with hashed password
 *    - const user = await User.create({ username, email, password: hashedPassword });
 * 5. Generate token and return user data + token
 *    - Return: { user: { id, username, email }, token }
 *
 * ERROR HANDLING:
 * - Wrap in try/catch
 * - Return appropriate status codes (400 for bad request, 500 for server error)
 */
router.post("/signup", async (req, res) => {
  // TODO: Implement signup

  // Step 1: Destructure from req.body
  // const { username, email, password } = req.body;

  // Step 2: Check if user exists
  // const userExists = await User.findOne({ email });
  // if (userExists) {
  //   return res.status(400).json({ message: 'User already exists' });
  // }

  // Step 3: Hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);

  // Step 4: Create user
  // const user = await User.create({
  //   username,
  //   email,
  //   password: hashedPassword
  // });

  // Step 5: Return user + token
  // res.status(201).json({
  //   user: {
  //     id: user._id,
  //     username: user.username,
  //     email: user.email
  //   },
  //   token: generateToken(user._id)
  // });

  res.json({ message: "TODO: Implement signup route" });
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return token
 * @access  Public
 *
 * PSEUDOCODE:
 * 1. Get email, password from req.body
 * 2. Find user by email
 *    - If not found, return 401 "Invalid credentials"
 * 3. Compare password with stored hash
 *    - const isMatch = await bcrypt.compare(password, user.password);
 *    - If no match, return 401 "Invalid credentials"
 * 4. Generate token and return user data + token
 *
 * SECURITY NOTE:
 * - Always say "Invalid credentials" not "User not found" or "Wrong password"
 * - This prevents attackers from knowing which emails are registered
 */
router.post("/login", async (req, res) => {
  // TODO: Implement login

  // Step 1: Get credentials
  // const { email, password } = req.body;

  // Step 2: Find user
  // const user = await User.findOne({ email });
  // if (!user) {
  //   return res.status(401).json({ message: 'Invalid credentials' });
  // }

  // Step 3: Check password
  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   return res.status(401).json({ message: 'Invalid credentials' });
  // }

  // Step 4: Return user + token
  // res.json({
  //   user: {
  //     id: user._id,
  //     username: user.username,
  //     email: user.email
  //   },
  //   token: generateToken(user._id)
  // });

  res.json({ message: "TODO: Implement login route" });
});

/**
 * @route   GET /api/auth/verify
 * @desc    Verify token and return user data
 * @access  Private (requires token)
 *
 * PSEUDOCODE:
 * 1. This route uses the 'protect' middleware (already added)
 * 2. If we get here, token was valid and req.user is set
 * 3. Just return the user data
 *
 * NOTE: The protect middleware does the heavy lifting!
 */
router.get("/verify", protect, async (req, res) => {
  // TODO: Implement verify

  // This one is simple - if we get past 'protect' middleware,
  // the token is valid and req.user contains the user

  // res.json({
  //   user: {
  //     id: req.user._id,
  //     username: req.user.username,
  //     email: req.user.email
  //   }
  // });

  res.json({ message: "TODO: Implement verify route" });
});

module.exports = router;
