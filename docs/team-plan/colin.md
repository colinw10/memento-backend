# Colin's Tasks - Models, Database & Likes

## Overview

You're setting up the foundation: database connection, User model, and the like functionality.

**Total Time Estimate: 6-8 hours**

---

## Task 1: Database Connection (Small - 1-2 hours)

### Files to Edit:

- `config/db.js`

### What You're Building:

A function that connects to MongoDB using Mongoose.

**Pseudocode:**

```
function connectDB():
    try:
        // Get connection string from environment variable
        uri = process.env.MONGODB_URI

        // Connect to MongoDB
        connection = await mongoose.connect(uri)

        // Log success
        print "MongoDB Connected: " + connection.host

    catch error:
        // Log error and stop server
        print "Error: " + error.message
        exit process with code 1
```

### Code Pattern:

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Testing:

1. Make sure `.env` file has `MONGODB_URI`
2. Run `npm run dev`
3. Should see "MongoDB Connected: ..." in console
4. If error, check your connection string

---

## Task 2: User Model (Small - 1-2 hours)

### Files to Edit:

- `models/User.js`

### What You're Building:

The schema (blueprint) for User documents in MongoDB.

### Fields Needed:

| Field    | Type   | Rules                             |
| -------- | ------ | --------------------------------- |
| username | String | required, unique, trim            |
| email    | String | required, unique, lowercase, trim |
| password | String | required, min 6 chars             |

**Pseudocode:**

```
UserSchema:
    username:
        type: String
        required: true with message "Username is required"
        unique: true (no duplicates)
        trim: true (remove whitespace)

    email:
        type: String
        required: true with message "Email is required"
        unique: true
        lowercase: true (convert to lowercase)
        trim: true

    password:
        type: String
        required: true with message "Password is required"
        minlength: 6

    timestamps: true (auto-add createdAt, updatedAt)
```

### Code Pattern:

```javascript
const userSchema = new mongoose.Schema(
  {
    fieldName: {
      type: String,
      required: [true, "Error message here"],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);
```

### Testing:

Once Natalia's auth routes are done, try creating a user:

- Without username → should error
- With duplicate email → should error
- With password < 6 chars → should error

---

## Task 3: Like Functionality (Medium - 3-4 hours)

### Files to Edit:

- `routes/stories.js` (the PUT /:id/like route)

### What You're Building:

A toggle like/unlike feature. If user hasn't liked, add like. If already liked, remove like.

### Endpoint:

```
PUT /api/stories/:id/like
Authorization: Bearer <token>

RESPONSE:
{
  "_id": "...",
  "title": "...",
  "content": "...",
  "author": { "_id": "...", "username": "john" },
  "likes": ["userId1", "userId2"],  // array of user IDs who liked
  "createdAt": "..."
}
```

**Pseudocode:**

```
function toggleLike(request, response):
    // 1. Find the story
    storyId = request.params.id
    story = find Story by storyId

    if story not found:
        return error 404 "Story not found"

    // 2. Get current user's ID (from protect middleware)
    userId = request.user._id

    // 3. Check if user already liked this story
    // story.likes is an array of user IDs
    alreadyLiked = check if userId is in story.likes array

    if alreadyLiked:
        // UNLIKE: Remove user's ID from likes array
        story.likes = filter out userId from story.likes
    else:
        // LIKE: Add user's ID to likes array
        push userId into story.likes

    // 4. Save and return
    save story
    populate author field
    return story
```

### How to Check if ID is in Array:

```javascript
// Option 1: some() with string comparison
const alreadyLiked = story.likes.some(
  (id) => id.toString() === req.user._id.toString()
);

// Option 2: includes() (may need toString())
const alreadyLiked = story.likes
  .map((id) => id.toString())
  .includes(req.user._id.toString());
```

### How to Add/Remove from Array:

```javascript
// Add to array
story.likes.push(req.user._id);

// Remove from array
story.likes = story.likes.filter(
  (id) => id.toString() !== req.user._id.toString()
);
```

### Testing:

```bash
# First, login to get a token
# Then like a story:
curl -X PUT http://localhost:3000/api/stories/STORY_ID/like \
  -H "Authorization: Bearer YOUR_TOKEN"

# Run again - should unlike (toggle)
```

---

## Key Concepts

### Mongoose Schema

A schema defines the structure of documents:

```javascript
const schema = new mongoose.Schema({
  field: {
    type: String, // Data type
    required: true, // Must have value
    unique: true, // No duplicates in collection
    default: "value", // Default if not provided
    trim: true, // Remove whitespace
    lowercase: true, // Convert to lowercase
    minlength: 6, // Minimum length
    maxlength: 100, // Maximum length
  },
});
```

### ObjectId

MongoDB's unique identifier type:

- Looks like: `507f1f77bcf86cd799439011`
- In Mongoose: `mongoose.Schema.Types.ObjectId`
- Compare with `.toString()` since types differ

### Array Fields in Mongoose

```javascript
// Array of ObjectIds (references)
likes: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
];

// This lets you do:
story.likes.push(userId);
story.likes.length;
story.likes.includes(userId);
```

---

## Checklist

- [ ] connectDB successfully connects to MongoDB
- [ ] Server logs "MongoDB Connected: ..." on start
- [ ] User schema has username, email, password fields
- [ ] User schema has proper validation (required, unique)
- [ ] User schema has timestamps
- [ ] Like route finds story correctly
- [ ] Like adds user ID to likes array
- [ ] Like again removes user ID (toggle)
- [ ] Like returns updated story with populated author
