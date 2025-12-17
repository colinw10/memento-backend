/**
 * ===========================================
 * COMMENT MODEL - TITO's TASK
 * ===========================================
 *
 * The Comment model represents a comment on a story.
 * Comments belong to both a story and a user (author).
 *
 * YOUR TASKS:
 * 1. Define the Comment schema
 * 2. Set up references to both User and Story models
 * 3. Add timestamps
 *
 * ESTIMATED TIME: 1-2 hours
 */

const mongoose = require("mongoose");

/**
 * Comment Schema Definition
 *
 * REQUIRED FIELDS:
 * - content: String, required (the comment text)
 * - author: Reference to User model
 * - story: Reference to Story model
 *
 * PSEUDOCODE:
 * 1. Create schema with content (String, required)
 * 2. Add author as reference to User
 * 3. Add story as reference to Story
 * 4. Add { timestamps: true }
 *
 * WHY TWO REFERENCES?
 * - author: So we know WHO wrote the comment
 * - story: So we know WHICH story this comment belongs to
 * - This lets us query "all comments for story X" or "all comments by user Y"
 */

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
}, { timestamps: true });


// Create and export the model
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
