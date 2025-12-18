/**
 * ===========================================
 * COMMENT ROUTES - TITO's TASK
 * ===========================================
 *
 * These routes handle creating, reading, and deleting comments on stories.
 *
 * ENDPOINTS:
 * - GET /api/stories/:storyId/comments - Get all comments for a story
 * - POST /api/stories/:storyId/comments - Create comment on a story
 * - DELETE /api/comments/:id - Delete a comment (own only)
 *
 * YOUR TASKS:
 * 1. Implement all three routes
 * 2. Use protect middleware for create/delete
 * 3. Populate author username in responses
 * 4. Only allow users to delete their own comments
 *
 * ESTIMATED TIME: 3-4 hours
 */

const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Story = require("../models/Story");
const { protect } = require("../middleware/auth");

/**
 * @route   GET /api/stories/:storyId/comments
 * @desc    Get all comments for a specific story
 * @access  Public
 *
 * PSEUDOCODE:
 * 1. Get storyId from req.params.storyId
 * 2. Find all comments where story field matches storyId
 *    - Comment.find({ story: storyId })
 * 3. Populate author to get username
 * 4. Sort by newest first
 * 5. Return array of comments
 */
router.get("/stories/:storyId/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ story: req.params.storyId })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /api/stories/:storyId/comments
 * @desc    Create a comment on a story
 * @access  Private
 *
 * PSEUDOCODE:
 * 1. Get storyId from params, content from body
 * 2. Verify the story exists (404 if not)
 * 3. Create comment with:
 *    - content from req.body
 *    - author from req.user._id
 *    - story from req.params.storyId
 * 4. Populate author before returning
 * 5. Return created comment with 201 status
 */
router.post("/stories/:storyId/comments", protect, async (req, res) => {
  try {
    // First verify the story exists
    const story = await Story.findById(req.params.storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    const comment = await Comment.create({
      content: req.body.content,
      author: req.user._id,
      story: req.params.storyId,
    });

    await comment.populate("author", "username");

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   DELETE /api/comments/:id
 * @desc    Delete a comment
 * @access  Private (owner only)
 *
 * PSEUDOCODE:
 * 1. Find comment by ID
 * 2. Check if exists (404 if not)
 * 3. Check if req.user._id matches comment.author (403 if not)
 * 4. Delete the comment
 * 5. Return success message
 *
 * NOTE: This route is at /api/comments/:id (not nested under stories)
 * because we just need the comment ID to delete it
 */
router.delete("/comments/:id", protect, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check ownership
    if (comment.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();

    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
