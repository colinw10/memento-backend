# Memento Backend – Project Tree

```
memento-backend/
│
├── server.js                    [ENTRY POINT - PABLO]
│   └── Mounts routes:
│       ├── /api/auth      → routes/auth.js
│       ├── /api/stories   → routes/stories.js
│       └── /api           → routes/comments.js (nested under /api)
│
├── config/
│   └── db.js                    [DATABASE - COLIN]
│       └── exports: connectDB()
│       └── Purpose: Connects to MongoDB via mongoose
│
├── middleware/
│   └── auth.js                  [AUTH MIDDLEWARE - NATALIA]
│       └── exports: { protect }
│       └── Purpose: JWT verification, attaches req.user
│
├── models/
│   ├── index.js                 [MODEL BARREL]
│   │   └── exports: { User, Story, Comment }
│   │
│   ├── User.js                  [USER MODEL - COLIN]
│   │   └── exports: User (mongoose model)
│   │   └── fields:
│   │       ├── username   (String, required, unique)
│   │       ├── email      (String, required, unique, lowercase)
│   │       ├── password   (String, required, minlength: 6)
│   │       └── timestamps (createdAt, updatedAt)
│   │
│   ├── Story.js                 [STORY MODEL - TITO]
│   │   └── exports: Story (mongoose model)
│   │   └── fields:
│   │       ├── title      (String, required)
│   │       ├── content    (String, required)
│   │       ├── author     (ObjectId → User, required)
│   │       ├── likes      ([ObjectId → User])
│   │       └── timestamps (createdAt, updatedAt)
│   │
│   └── Comment.js               [COMMENT MODEL - TITO]
│       └── exports: Comment (mongoose model)
│       └── fields:
│           ├── content    (String, required)
│           ├── author     (ObjectId → User, required)
│           ├── story      (ObjectId → Story, required)
│           └── timestamps (createdAt, updatedAt)
│
├── routes/
│   ├── auth.js                  [AUTH ROUTES - NATALIA]
│   │   └── exports: router (Express Router)
│   │   └── endpoints:
│   │       ├── POST   /api/auth/signup   → Register user (public)
│   │       ├── POST   /api/auth/login    → Login, returns JWT (public)
│   │       └── GET    /api/auth/verify   → Verify token (protected)
│   │
│   ├── stories.js               [STORY ROUTES - NATALIA + COLIN]
│   │   └── exports: router (Express Router)
│   │   └── endpoints:
│   │       ├── GET    /api/stories           → Get all stories (protected)
│   │       ├── GET    /api/stories/:id       → Get single story (public)
│   │       ├── POST   /api/stories           → Create story (protected)
│   │       ├── PUT    /api/stories/:id       → Update story (protected, owner)
│   │       ├── DELETE /api/stories/:id       → Delete story (protected, owner)
│   │       └── PUT    /api/stories/:id/like  → Toggle like (protected)
│   │
│   └── comments.js              [COMMENT ROUTES - TITO] ⚠️ TODO
│       └── exports: router (Express Router)
│       └── endpoints:
│           ├── GET    /api/stories/:storyId/comments  → Get comments (public) ⚠️ TODO
│           ├── POST   /api/stories/:storyId/comments  → Create comment (protected) ⚠️ TODO
│           └── DELETE /api/comments/:id               → Delete comment (protected, owner) ⚠️ TODO
│
├── scripts/
│   └── seed.js                  [SEED SCRIPT - PABLO]
│       └── Purpose: Seeds dev user into MongoDB
│       └── Run: npm run seed
│       └── Creates:
│           ├── username: devuser
│           ├── email:    dev@memento.com
│           └── password: devpass123
│
├── docs/
│   ├── TEAM-README.md           [TEAM ASSIGNMENTS]
│   └── team-plan/
│       ├── colin.md
│       ├── crystal.md
│       ├── natalia.md
│       ├── pablo.md
│       ├── tito.md
│       └── seed.md              [SEED/RUN INSTRUCTIONS]
│
├── .env.example                 [ENV TEMPLATE]
│   └── PORT, MONGODB_URI, JWT_SECRET
│
├── package.json
│   └── scripts:
│       ├── start  → node server.js
│       ├── dev    → nodemon server.js
│       └── seed   → node scripts/seed.js
│
└── README.md                    [PROJECT README]
```

---

## Route Summary

| Method | Path                           | Auth      | Handler File       | Status  |
| ------ | ------------------------------ | --------- | ------------------ | ------- |
| POST   | /api/auth/signup               | Public    | routes/auth.js     | ✅ Done |
| POST   | /api/auth/login                | Public    | routes/auth.js     | ✅ Done |
| GET    | /api/auth/verify               | Protected | routes/auth.js     | ✅ Done |
| GET    | /api/stories                   | Protected | routes/stories.js  | ✅ Done |
| GET    | /api/stories/:id               | Public    | routes/stories.js  | ✅ Done |
| POST   | /api/stories                   | Protected | routes/stories.js  | ✅ Done |
| PUT    | /api/stories/:id               | Protected | routes/stories.js  | ✅ Done |
| DELETE | /api/stories/:id               | Protected | routes/stories.js  | ✅ Done |
| PUT    | /api/stories/:id/like          | Protected | routes/stories.js  | ✅ Done |
| GET    | /api/stories/:storyId/comments | Public    | routes/comments.js | ⚠️ TODO |
| POST   | /api/stories/:storyId/comments | Protected | routes/comments.js | ⚠️ TODO |
| DELETE | /api/comments/:id              | Protected | routes/comments.js | ⚠️ TODO |

---

## Middleware

| Name    | File               | Purpose                                      |
| ------- | ------------------ | -------------------------------------------- |
| protect | middleware/auth.js | Verifies JWT, attaches `req.user` to request |

---

## Quick Start

```bash
npm install
cp .env.example .env   # fill in MONGODB_URI and JWT_SECRET
npm run seed           # creates dev user
npm run dev            # starts server at http://localhost:3000
```

---

## Dev User Credentials

| Field    | Value           |
| -------- | --------------- |
| Username | devuser         |
| Email    | dev@memento.com |
| Password | devpass123      |
