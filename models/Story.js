/**
 * ===========================================
 * STORY MODEL - TITO's TASK
 * ===========================================
 *
 * The Story model represents a blog post/story in our app.
 * Stories have a title, content, author, and can be liked.
 *
 * YOUR TASKS:
 * 1. Define the Story schema with all fields
 * 2. Set up the author reference to User model
 * 3. Set up the likes array to track user IDs
 * 4. Add timestamps
 *
 * ESTIMATED TIME: 1-2 hours
 */

const mongoose = require("mongoose");

/**
 * Story Schema Definition
 *
 * REQUIRED FIELDS:
 * - title: String, required
 * - content: String, required
 * - author: Reference to User model (ObjectId)
 * - likes: Array of User ObjectIds (who liked this story)
 *
 * PSEUDOCODE:
 * 1. Create schema with title (String, required)
 * 2. Add content (String, required)
 * 3. Add author as a reference:
 *    author: {
 *      type: mongoose.Schema.Types.ObjectId,
 *      ref: 'User',
 *      required: true
 *    }
 * 4. Add likes as array of references:
 *    likes: [{
 *      type: mongoose.Schema.Types.ObjectId,
 *      ref: 'User'
 *    }]
 * 5. Add { timestamps: true }
 *
 * WHAT IS A REFERENCE?
 * - Instead of storing the whole user object, we store just their ID
 * - mongoose.Schema.Types.ObjectId is the type for MongoDB IDs
 * - ref: 'User' tells Mongoose which model this ID refers to
 * - This lets us use .populate('author') to get the full user data
 */

// TODO: Define the storySchema
const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    // TODO: Add title field
    // - type: String
    // - required: true
    // - trim: true
    // TODO: Add content field
    // - type: String
    // - required: true
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    // TODO: Add author field (reference to User)
    // - type: mongoose.Schema.Types.ObjectId
    // - ref: 'User'
    // - required: true
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    // TODO: Add likes field (array of User references)
    // - This is an array, so use [ ] around the object
    // - type: mongoose.Schema.Types.ObjectId
    // - ref: 'User'
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// Create and export the model
const Story = mongoose.model("Story", storySchema);

module.exports = Story;
