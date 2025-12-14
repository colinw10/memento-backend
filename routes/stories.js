/**
 * ===========================================
 * STORY ROUTES - NATALIA's TASK (CRUD) + COLIN's TASK (Likes)
 * ===========================================
 *
 * These routes handle creating, reading, updating, and deleting stories.
 * Also includes the like/unlike functionality.
 *
 * ENDPOINTS:
 * - GET /api/stories - Get all stories (NATALIA)
 * - GET /api/stories/:id - Get single story (NATALIA)
 * - POST /api/stories - Create story (NATALIA)
 * - PUT /api/stories/:id - Update story (NATALIA)
 * - DELETE /api/stories/:id - Delete story (NATALIA)
 * - PUT /api/stories/:id/like - Toggle like (COLIN)
 *
 * ESTIMATED TIME:
 * - NATALIA: 3-4 hours for CRUD
 * - COLIN: 3-4 hours for like functionality
 */

const express = require("express");
const router = express.Router();
const Story = require("../models/Story");
const { protect } = require("../middleware/auth");

/**
 * @route   GET /api/stories
 * @desc    Get all stories
 * @access  Private
 *
 * NATALIA's TASK
 *
 * PSEUDOCODE:
 * 1. Find all stories: Story.find()
 * 2. Populate the author field to get username (not just ID)
 *    - .populate('author', 'username')
 * 3. Sort by newest first: .sort({ createdAt: -1 })
 * 4. Return the array of stories
 *
 * WHAT IS POPULATE?
 * - Stories store author as just an ID (ObjectId)
 * - populate() replaces that ID with the actual User document
 * - Second argument 'username' means only get the username field
 */
router.get("/", protect, async (req, res) => {
  // TODO: Implement get all stories (NATALIA)

  // const stories = await Story.find()
  //   .populate('author', 'username')
  //   .sort({ createdAt: -1 });
  //
  // res.json(stories);

  res.json({ message: "TODO: Implement get all stories" });
});

/**
 * @route   GET /api/stories/:id
 * @desc    Get single story by ID
 * @access  Public
 *
 * NATALIA's TASK
 *
 * PSEUDOCODE:
 * 1. Get ID from req.params.id
 * 2. Find story by ID and populate author
 * 3. If not found, return 404
 * 4. Return the story
 */
router.get("/:id", async (req, res) => {
  // TODO: Implement get single story (NATALIA)

  // const story = await Story.findById(req.params.id)
  //   .populate('author', 'username');
  //
  // if (!story) {
  //   return res.status(404).json({ message: 'Story not found' });
  // }
  //
  // res.json(story);

  res.json({ message: "TODO: Implement get single story" });
});

/**
 * @route   POST /api/stories
 * @desc    Create a new story
 * @access  Private
 *
 * NATALIA's TASK
 *
 * PSEUDOCODE:
 * 1. Get title, content from req.body
 * 2. Create story with author set to req.user._id (from protect middleware)
 * 3. Save and populate author before returning
 * 4. Return created story with 201 status
 */
router.post("/", protect, async (req, res) => {
  // TODO: Implement create story (NATALIA)

  // const { title, content } = req.body;
  //
  // const story = await Story.create({
  //   title,
  //   content,
  //   author: req.user._id
  // });
  //
  // // Populate author for the response
  // await story.populate('author', 'username');
  //
  // res.status(201).json(story);

  res.json({ message: "TODO: Implement create story" });
});

/**
 * @route   PUT /api/stories/:id
 * @desc    Update a story
 * @access  Private (owner only)
 *
 * NATALIA's TASK
 *
 * PSEUDOCODE:
 * 1. Find story by ID
 * 2. Check if story exists (404 if not)
 * 3. Check if req.user._id matches story.author (403 if not)
 * 4. Update title and/or content
 * 5. Save and return updated story
 *
 * SECURITY NOTE:
 * - Users should only update their OWN stories
 * - Compare IDs using .toString() since one is ObjectId, one is string
 */
router.put("/:id", protect, async (req, res) => {
  // TODO: Implement update story (NATALIA)

  // const story = await Story.findById(req.params.id);
  //
  // if (!story) {
  //   return res.status(404).json({ message: 'Story not found' });
  // }
  //
  // // Check ownership
  // if (story.author.toString() !== req.user._id.toString()) {
  //   return res.status(403).json({ message: 'Not authorized to update this story' });
  // }
  //
  // // Update fields
  // story.title = req.body.title || story.title;
  // story.content = req.body.content || story.content;
  //
  // await story.save();
  // await story.populate('author', 'username');
  //
  // res.json(story);

  res.json({ message: "TODO: Implement update story" });
});

/**
 * @route   DELETE /api/stories/:id
 * @desc    Delete a story
 * @access  Private (owner only)
 *
 * NATALIA's TASK
 *
 * PSEUDOCODE:
 * 1. Find story by ID
 * 2. Check if exists (404 if not)
 * 3. Check ownership (403 if not owner)
 * 4. Delete using story.deleteOne() or Story.findByIdAndDelete()
 * 5. Return success message
 */
router.delete("/:id", protect, async (req, res) => {
  // TODO: Implement delete story (NATALIA)

  // const story = await Story.findById(req.params.id);
  //
  // if (!story) {
  //   return res.status(404).json({ message: 'Story not found' });
  // }
  //
  // if (story.author.toString() !== req.user._id.toString()) {
  //   return res.status(403).json({ message: 'Not authorized to delete this story' });
  // }
  //
  // await story.deleteOne();
  //
  // res.json({ message: 'Story deleted' });

  res.json({ message: "TODO: Implement delete story" });
});

/**
 * ===========================================
 * @route   PUT /api/stories/:id/like
 * @desc    Toggle like on a story
 * @access  Private
 *
 * COLIN's TASK
 * ===========================================
 *
 * PSEUDOCODE:
 * 1. Find story by ID
 * 2. Check if exists (404 if not)
 * 3. Check if user already liked (user ID in likes array)
 *    - If yes: REMOVE their ID (unlike)
 *    - If no: ADD their ID (like)
 * 4. Save story
 * 5. Return updated story with populated author
 *
 * HOW TO CHECK IF USER LIKED:
 * - story.likes is an array of ObjectIds
 * - Use .includes() but convert to strings first
 * - Or use .some() with toString() comparison
 *
 * HOW TO ADD/REMOVE FROM ARRAY:
 * - Add: story.likes.push(req.user._id)
 * - Remove: story.likes = story.likes.filter(id => id.toString() !== req.user._id.toString())
 *
 * ESTIMATED TIME: 3-4 hours
 */
router.put("/:id/like", protect, async (req, res) => {
  // TODO: Implement toggle like (COLIN)

  // const story = await Story.findById(req.params.id);
  //
  // if (!story) {
  //   return res.status(404).json({ message: 'Story not found' });
  // }
  //
  // // Check if already liked
  // const alreadyLiked = story.likes.some(
  //   id => id.toString() === req.user._id.toString()
  // );
  //
  // if (alreadyLiked) {
  //   // Unlike: remove user ID from likes array
  //   story.likes = story.likes.filter(
  //     id => id.toString() !== req.user._id.toString()
  //   );
  // } else {
  //   // Like: add user ID to likes array
  //   story.likes.push(req.user._id);
  // }
  //
  // await story.save();
  // await story.populate('author', 'username');
  //
  // res.json(story);

  res.json({ message: "TODO: Implement toggle like" });
});

module.exports = router;
