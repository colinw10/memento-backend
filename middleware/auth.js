/**
 * ===========================================
 * AUTH MIDDLEWARE - NATALIA's TASK
 * ===========================================
 *
 * This middleware protects routes that require authentication.
 * It checks for a valid JWT token in the request header.
 *
 * YOUR TASKS:
 * 1. Extract the token from the Authorization header
 * 2. Verify the token using jwt.verify()
 * 3. Attach the user data to the request object
 * 4. Call next() to continue, or return 401 if invalid
 *
 * ESTIMATED TIME: Included in Auth Routes task
 */

const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Protect Middleware
 *
 * HOW IT WORKS:
 * 1. Frontend sends request with header: "Authorization: Bearer <token>"
 * 2. We extract the token from this header
 * 3. We verify the token is valid and not expired
 * 4. We find the user and attach to req.user
 * 5. Route handler can then access req.user
 *
 * PSEUDOCODE:
 * 1. Get the Authorization header from req.headers.authorization
 * 2. Check if it exists AND starts with 'Bearer '
 * 3. Extract the token (split by space, take second part)
 * 4. Try to verify with jwt.verify(token, process.env.JWT_SECRET)
 * 5. The decoded token contains { id: <user_id> }
 * 6. Find the user: await User.findById(decoded.id)
 * 7. Attach to request: req.user = user
 * 8. Call next() to proceed to the route
 * 9. If any step fails, return 401 Unauthorized
 */
const protect = async (req, res, next) => {
  // TODO: Implement authentication middleware

  // Step 1: Initialize token variable
  let token;

  // Step 2: Check for Authorization header with Bearer token
  // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  //   // Extract token: "Bearer abc123" -> "abc123"
  //   token = req.headers.authorization.split(' ')[1];
  // }

  // Step 3: If no token, return 401
  // if (!token) {
  //   return res.status(401).json({ message: 'Not authorized, no token' });
  // }

  // Step 4: Try to verify the token
  // try {
  //   // Verify returns the decoded payload (what we put in when signing)
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //
  //   // Find user by ID from token, exclude password from result
  //   req.user = await User.findById(decoded.id).select('-password');
  //
  //   // Continue to the next middleware/route
  //   next();
  // } catch (error) {
  //   return res.status(401).json({ message: 'Not authorized, token failed' });
  // }

  // TEMPORARY: Remove this when you implement the above
  console.log("TODO: Implement protect middleware");
  next();
};

module.exports = { protect };
