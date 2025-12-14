# Tito's Tasks - Comments (Full Stack) & Models

## Overview

You're building the comment system - both backend routes AND the Story/Comment models.

**Total Time Estimate: 8-10 hours**

---

## Task 1: Story Model (Small - 1-2 hours)

### Files to Edit:

- `models/Story.js`

### What You're Building:

The schema for Story documents. Stories have a title, content, author, and likes.

### Fields Needed:

| Field   | Type       | Description                 |
| ------- | ---------- | --------------------------- |
| title   | String     | required, trimmed           |
| content | String     | required                    |
| author  | ObjectId   | reference to User, required |
| likes   | [ObjectId] | array of User references    |

**Pseudocode:**

```
StorySchema:
    title:
        type: String
        required: true
        trim: true

    content:
        type: String
        required: true

    author:
        type: ObjectId (reference to User model)
        ref: 'User'
        required: true

    likes:
        type: Array of ObjectIds (references to User model)
        ref: 'User'
        default: empty array

    timestamps: true
```

### Code Pattern for References:

```javascript
// Single reference (author)
author: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}

// Array of references (likes)
likes: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
}]
```

---

## Task 2: Comment Model (Small - 1-2 hours)

### Files to Edit:

- `models/Comment.js`

### What You're Building:

The schema for Comment documents. Comments belong to a story and have an author.

### Fields Needed:

| Field   | Type     | Description                      |
| ------- | -------- | -------------------------------- |
| content | String   | required, the comment text       |
| author  | ObjectId | reference to User who wrote it   |
| story   | ObjectId | reference to Story it belongs to |

**Pseudocode:**

```
CommentSchema:
    content:
        type: String
        required: true

    author:
        type: ObjectId (reference to User)
        ref: 'User'
        required: true

    story:
        type: ObjectId (reference to Story)
        ref: 'Story'
        required: true

    timestamps: true
```

---

## Task 3: Comment Routes (Medium - 3-4 hours)

### Files to Edit:

- `routes/comments.js`

### Endpoints:

#### GET /api/stories/:storyId/comments

Get all comments for a specific story.

```
RESPONSE (200):
[
  {
    "_id": "...",
    "content": "Great story!",
    "author": { "_id": "...", "username": "jane" },
    "story": "...",
    "createdAt": "..."
  }
]
```

**Pseudocode:**

```
function getComments(request, response):
    storyId = request.params.storyId

    // Find all comments for this story
    comments = find Comment where story equals storyId
               populate 'author' with 'username'
               sort by createdAt descending (newest first)

    return comments
```

#### POST /api/stories/:storyId/comments

Create a new comment on a story.

```
REQUEST:
{
  "content": "Great story!"
}

RESPONSE (201):
{
  "_id": "...",
  "content": "Great story!",
  "author": { "_id": "...", "username": "jane" },
  "story": "...",
  "createdAt": "..."
}
```

**Pseudocode:**

```
function createComment(request, response):
    storyId = request.params.storyId
    content = request.body.content
    authorId = request.user._id  // from protect middleware

    // First, verify the story exists
    story = find Story by storyId
    if story not found:
        return error 404 "Story not found"

    // Create the comment
    comment = create Comment with:
        content: content
        author: authorId
        story: storyId

    // Populate author before returning
    populate comment.author with 'username'

    return status 201 with comment
```

#### DELETE /api/comments/:id

Delete a comment (owner only).

```
RESPONSE (200):
{
  "message": "Comment deleted"
}
```

**Pseudocode:**

```
function deleteComment(request, response):
    commentId = request.params.id
    userId = request.user._id  // from protect middleware

    // Find the comment
    comment = find Comment by commentId
    if comment not found:
        return error 404 "Comment not found"

    // Check ownership - only author can delete
    if comment.author.toString() !== userId.toString():
        return error 403 "Not authorized to delete this comment"

    // Delete it
    delete comment

    return { message: "Comment deleted" }
```

---

## Task 4: Comment Component (Frontend - Medium 3-4 hours)

**Note:** This task is in the FRONTEND repo, not backend!

### Files to Create/Edit:

- `src/components/CommentSection/CommentSection.jsx`
- `src/components/CommentSection/CommentSection.css`
- `src/services/commentService.js`

See the frontend repo docs for details on this task.

---

## Testing Your Code

```bash
# First login to get a token

# Get comments for a story
curl http://localhost:3000/api/stories/STORY_ID/comments

# Create a comment
curl -X POST http://localhost:3000/api/stories/STORY_ID/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"content":"This is my comment!"}'

# Delete a comment
curl -X DELETE http://localhost:3000/api/comments/COMMENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Key Concepts

### References (Foreign Keys)

In MongoDB/Mongoose, we link documents using ObjectId references:

```javascript
// Comment references both User and Story
{
  content: "Great!",
  author: ObjectId("507f1f..."),  // points to a User
  story: ObjectId("608f2g...")    // points to a Story
}
```

### Why Two References?

- `author` - Know WHO wrote the comment
- `story` - Know WHICH story the comment belongs to

This lets us query:

- "All comments by user X" → `Comment.find({ author: userId })`
- "All comments on story Y" → `Comment.find({ story: storyId })`

### populate()

Replaces ObjectId with actual document data:

```javascript
// Before populate
{ content: "Great!", author: "507f1f..." }

// After populate('author', 'username')
{ content: "Great!", author: { _id: "507f1f...", username: "jane" } }
```

### Ownership Check Pattern

Always verify users can only modify their own content:

```javascript
// Convert both to strings for comparison
if (comment.author.toString() !== req.user._id.toString()) {
  return res.status(403).json({ message: "Not authorized" });
}
```

---

## Checklist

### Models

- [ ] Story schema has title, content, author, likes
- [ ] Story author is ObjectId ref to User
- [ ] Story likes is array of ObjectId refs to User
- [ ] Comment schema has content, author, story
- [ ] Comment author is ObjectId ref to User
- [ ] Comment story is ObjectId ref to Story
- [ ] Both have timestamps: true

### Routes

- [ ] GET comments returns array for story
- [ ] GET comments populates author username
- [ ] POST comment creates with correct author/story
- [ ] POST comment returns 404 if story doesn't exist
- [ ] DELETE comment works for owner
- [ ] DELETE comment returns 403 for non-owner
- [ ] DELETE comment returns 404 if not found
