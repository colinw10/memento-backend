# Memento Backend

Express.js REST API for the Memento microblog application.

## Tech Stack

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:

- `PORT` - Server port (default 3000)
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens

### 3. Run the Server

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

## API Endpoints

### Auth

| Method | Endpoint         | Description       | Auth Required |
| ------ | ---------------- | ----------------- | ------------- |
| POST   | /api/auth/signup | Register new user | No            |
| POST   | /api/auth/login  | Login user        | No            |
| GET    | /api/auth/verify | Verify token      | Yes           |

### Stories

| Method | Endpoint              | Description      | Auth Required |
| ------ | --------------------- | ---------------- | ------------- |
| GET    | /api/stories          | Get all stories  | Yes           |
| GET    | /api/stories/:id      | Get single story | No            |
| POST   | /api/stories          | Create story     | Yes           |
| PUT    | /api/stories/:id      | Update story     | Yes (owner)   |
| DELETE | /api/stories/:id      | Delete story     | Yes (owner)   |
| PUT    | /api/stories/:id/like | Toggle like      | Yes           |

### Comments

| Method | Endpoint                  | Description        | Auth Required |
| ------ | ------------------------- | ------------------ | ------------- |
| GET    | /api/stories/:id/comments | Get story comments | No            |
| POST   | /api/stories/:id/comments | Create comment     | Yes           |
| DELETE | /api/comments/:id         | Delete comment     | Yes (owner)   |

## Project Structure

```
├── server.js          # Entry point
├── config/
│   └── db.js          # Database connection
├── models/
│   ├── User.js        # User schema
│   ├── Story.js       # Story schema
│   └── Comment.js     # Comment schema
├── routes/
│   ├── auth.js        # Auth endpoints
│   ├── stories.js     # Story endpoints
│   └── comments.js    # Comment endpoints
└── middleware/
    └── auth.js        # JWT verification
```

## Team Assignments

See `docs/team-plan/` for detailed task breakdowns:

- **Natalia** - Auth routes + Story CRUD
- **Colin** - User model + DB setup + Like functionality
- **Tito** - Comment routes + Story/Comment models

## Testing with Postman/curl

### Signup

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Create Story (with token)

```bash
curl -X POST http://localhost:3000/api/stories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"My Story","content":"Story content here"}'
```
