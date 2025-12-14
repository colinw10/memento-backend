# Natalia's Tasks - Auth & Story CRUD

## Overview

You're building the authentication system and story CRUD operations. This is the core of the backend!

**Total Time Estimate: 8-10 hours**

---

## Task 1: Auth Routes & Controllers (Large - 5-6 hours)

### Files to Edit:

- `routes/auth.js`
- `middleware/auth.js`

### Endpoints:

#### POST /api/auth/signup

Register a new user.

```
REQUEST:
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}

RESPONSE (201):
{
  "user": { "id": "...", "username": "john", "email": "john@example.com" },
  "token": "eyJhbG..."
}
```

**Pseudocode:**

```
function signup(request, response):
    // 1. Get data from request body
    username = request.body.username
    email = request.body.email
    password = request.body.password

    // 2. Check if email already registered
    existingUser = find user in database where email matches
    if existingUser exists:
        return error 400 "User already exists"

    // 3. Hash the password (NEVER store plain text!)
    salt = generate random salt with bcrypt (10 rounds)
    hashedPassword = hash password with salt using bcrypt

    // 4. Create user in database
    newUser = create User with username, email, hashedPassword

    // 5. Generate JWT token
    token = sign { id: newUser._id } with JWT_SECRET

    // 6. Return user data and token
    return status 201 with { user: {...}, token }
```

#### POST /api/auth/login

Login existing user.

```
REQUEST:
{
  "email": "john@example.com",
  "password": "password123"
}

RESPONSE (200):
{
  "user": { "id": "...", "username": "john", "email": "john@example.com" },
  "token": "eyJhbG..."
}
```

**Pseudocode:**

```
function login(request, response):
    // 1. Get credentials
    email = request.body.email
    password = request.body.password

    // 2. Find user by email
    user = find user in database where email matches
    if user not found:
        return error 401 "Invalid credentials"

    // 3. Compare passwords
    passwordMatches = compare password with user.password using bcrypt
    if not passwordMatches:
        return error 401 "Invalid credentials"

    // 4. Generate token and return
    token = sign { id: user._id } with JWT_SECRET
    return { user: {...}, token }
```

#### GET /api/auth/verify

Check if token is valid (uses protect middleware).

**Pseudocode:**

```
function verify(request, response):
    // protect middleware already verified token and set req.user
    return { user: request.user }
```

### Middleware: protect (in middleware/auth.js)

**Pseudocode:**

```
function protect(request, response, next):
    // 1. Get token from header
    authHeader = request.headers.authorization
    if no authHeader or doesn't start with "Bearer ":
        return error 401 "No token"

    token = split authHeader by space, take second part

    // 2. Verify token
    try:
        decoded = verify token with JWT_SECRET
        user = find user by decoded.id, exclude password
        request.user = user
        call next() to continue
    catch:
        return error 401 "Invalid token"
```

---

## Task 2: Story CRUD Routes (Medium - 3-4 hours)

### Files to Edit:

- `routes/stories.js`

### Endpoints:

#### GET /api/stories

Get all stories (newest first).

**Pseudocode:**

```
function getAllStories(request, response):
    stories = find all Story documents
              populate 'author' field with just 'username'
              sort by createdAt descending (newest first)
    return stories
```

#### GET /api/stories/:id

Get single story.

**Pseudocode:**

```
function getStory(request, response):
    storyId = request.params.id
    story = find Story by id, populate author
    if not found:
        return error 404 "Story not found"
    return story
```

#### POST /api/stories

Create new story (protected).

**Pseudocode:**

```
function createStory(request, response):
    // request.user set by protect middleware
    title = request.body.title
    content = request.body.content
    author = request.user._id

    story = create Story with { title, content, author }
    populate author field
    return status 201 with story
```

#### PUT /api/stories/:id

Update story (owner only).

**Pseudocode:**

```
function updateStory(request, response):
    story = find Story by request.params.id
    if not found:
        return error 404

    // IMPORTANT: Check ownership
    if story.author.toString() !== request.user._id.toString():
        return error 403 "Not authorized"

    story.title = request.body.title or keep existing
    story.content = request.body.content or keep existing
    save story
    return updated story
```

#### DELETE /api/stories/:id

Delete story (owner only).

**Pseudocode:**

```
function deleteStory(request, response):
    story = find Story by request.params.id
    if not found:
        return error 404

    if story.author.toString() !== request.user._id.toString():
        return error 403 "Not authorized"

    delete story
    return { message: "Story deleted" }
```

---

## Testing Your Code

Use Postman or curl:

```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"natalia","email":"nat@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"nat@test.com","password":"test123"}'

# Create story (use token from login response)
curl -X POST http://localhost:3000/api/stories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"My First Story","content":"This is the content"}'
```

---

## Key Concepts

### Password Hashing

Never store passwords as plain text! bcrypt:

1. Generates a random "salt"
2. Combines password + salt
3. Hashes the result
4. Stores the hash (includes salt info)

### JWT Tokens

- JSON Web Token = encoded JSON with signature
- Contains user ID (payload)
- Signed with secret key (only server knows)
- Frontend stores it, sends with each request
- Server verifies signature to trust the data

### Mongoose populate()

Instead of storing whole objects, we store IDs:

```js
// Story document
{ title: "...", author: "507f1f77bcf86cd799439011" }

// After populate('author', 'username')
{ title: "...", author: { _id: "...", username: "john" } }
```

---

## Checklist

- [ ] Signup creates user with hashed password
- [ ] Signup returns token
- [ ] Login finds user and compares password
- [ ] Login returns token
- [ ] Verify returns user data with valid token
- [ ] protect middleware blocks invalid tokens
- [ ] Get all stories works
- [ ] Get single story works
- [ ] Create story requires auth
- [ ] Update story checks ownership
- [ ] Delete story checks ownership
