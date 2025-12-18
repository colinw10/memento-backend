# Memento Backend

Memento is a place to share the moments that matter - the stories you want to hold onto, the memories worth telling.
It's a microblog where you write, share, and connect through personal stories. Simple, clean, human.

## Project name

Memento

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
  - [Stories](#stories)
  - [Comments](#comments)
- [Project Structure](#project-structure)
- [Team Assignments](#team-assignments)
- [Testing with Postman](#testing-with-postman)

## Tech Stack

- **Express.js** - Web framework
- **Node.js** - Runtime enviornament
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **cors, dotenv**

## Getting Started

## Installation

1. Clone the repo  
   `git clone https://github.com/your-org/memento-backend.git && cd memento-backend`
2. Install dependencies  
   `npm install`
3. Set up environment variables (create a `.env` file)
4. Run the server locally

- Development: `npm run dev`
- Production: `npm start`

Server runs at `http://localhost:3000`

## Dev User Credentials

A dev user is already seeded in the shared database:

| Email | Password |
|-------|----------|
| `dev@memento.com` | `devpass123` |

Use this to login and test the app without creating a new account.

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

```text
.
├── config
│   └── db.js
├── docs
│   ├── team-plan
│   │   ├── colin.md
│   │   ├── crystal.md
│   │   ├── natalia.md
│   │   ├── pablo.md
│   │   ├── seed.md
│   │   └── tito.md
│   └── TEAM-README.md
├── middleware
│   └── auth.js
├── models
│   ├── Comment.js
│   ├── index.js
│   ├── Story.js
│   └── User.js
├── routes
│   ├── auth.js
│   ├── comments.js
│   └── stories.js
├── scripts
│   └── seed.js
├── package-lock.json
├── package.json
├── README.md
├── server.js
└── tree.txt

```

## Team Assignments

See `docs/team-plan/` for detailed task breakdowns:

- **Pablo** - Backend Architecture and team asistance
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

## Developed By

- Pablo Cordero
- Colin Weir
- Natalia Pricop
- Cristal Ruiz
- Tito Del Valle
