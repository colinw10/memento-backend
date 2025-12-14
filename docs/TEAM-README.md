# Memento Backend - Team Guide

## Project Tree

```
memento-backend/
│
├── server.js                 # Entry point
├── package.json
├── .env.example              # Copy to .env and fill in values
├── .gitignore
│
├── config/
│   └── db.js                 # 🔵 COLIN - Database connection
│
├── models/
│   ├── index.js              # Exports all models
│   ├── User.js               # 🔵 COLIN - User schema
│   ├── Story.js              # 🟣 TITO - Story schema
│   └── Comment.js            # 🟣 TITO - Comment schema
│
├── routes/
│   ├── auth.js               # 🟢 NATALIA - Signup, Login, Verify
│   ├── stories.js            # 🟢 NATALIA - CRUD  |  🔵 COLIN - Like
│   └── comments.js           # 🟣 TITO - Comment endpoints
│
├── middleware/
│   └── auth.js               # 🟢 NATALIA - JWT protect middleware
│
└── docs/
    ├── TEAM-README.md        # You are here!
    └── team-plan/
        ├── natalia.md        # 🟢 Detailed tasks + pseudocode
        ├── colin.md          # 🔵 Detailed tasks + pseudocode
        ├── tito.md           # 🟣 Detailed tasks + pseudocode
        ├── crystal.md        # 🟠 (See frontend repo)
        └── pablo.md          # 🔴 Detailed tasks + pseudocode
```

---

## Team Assignments

| Color | Name        | Files                                                        | Tasks                        |
| ----- | ----------- | ------------------------------------------------------------ | ---------------------------- |
| 🟢    | **NATALIA** | `routes/auth.js`, `routes/stories.js`, `middleware/auth.js`  | Auth system + Story CRUD     |
| 🔵    | **COLIN**   | `config/db.js`, `models/User.js`, `routes/stories.js` (like) | Database + User model + Like |
| 🟣    | **TITO**    | `models/Story.js`, `models/Comment.js`, `routes/comments.js` | Models + Comment routes      |
| 🟠    | **CRYSTAL** | _Frontend repo_                                              | Frontend components          |
| 🔴    | **PABLO**   | `server.js`, CSS, testing                                    | Server setup, styling, QA    |

---

## Getting Started

### 1. Fork & Clone

```bash
git clone <your-fork-url>
cd memento-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### 4. Create Your Branch

```bash
git checkout -b feature/your-name-task
# Example: feature/natalia-auth
```

### 5. Run the Server

```bash
npm run dev
```

---

## Your Task Files

Each person has a detailed task file in `docs/team-plan/`:

- **Natalia** → Read `docs/team-plan/natalia.md`
- **Colin** → Read `docs/team-plan/colin.md`
- **Tito** → Read `docs/team-plan/tito.md`
- **Crystal** → Read `docs/team-plan/crystal.md`
- **Pablo** → Read `docs/team-plan/pablo.md`

These files contain:

- Step-by-step instructions
- Pseudocode for each function
- Code patterns to follow
- Testing commands
- Checklists

---

## Workflow

1. Read your task file in `docs/team-plan/`
2. Find the TODO comments in your assigned files
3. Implement the code following the pseudocode
4. Test with Postman or curl
5. Commit and push your branch
6. Create a Pull Request

---

## Need Help?

1. Check your task file for pseudocode
2. Read the TODO comments in the code
3. Google the error message
4. Ask a teammate in Slack/Discord
