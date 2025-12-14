# Crystal's Tasks - Frontend

## Overview

Your tasks are in the **FRONTEND** repository, not this backend repo.

**Total Time Estimate: 7-9 hours**

---

## Your Tasks

### 1. API Service Layer (Small - 1-2 hours)

Set up Axios with base URL and auth headers.

### 2. Auth Forms (Medium - 3-4 hours)

Login and Signup form components.

### 3. Story Feed Component (Medium - 3-4 hours)

Display all stories from the API.

---

## Please See

Go to the **memento-frontend** repository and check:

- `docs/team-plan/crystal.md`

That file has all your detailed tasks, pseudocode, and checklists.

---

## Quick Note on Backend API

While working on frontend, you'll be calling these backend endpoints:

### Auth

```
POST /api/auth/signup   - { username, email, password }
POST /api/auth/login    - { email, password }
GET  /api/auth/verify   - (needs Authorization header)
```

### Stories

```
GET    /api/stories         - Get all stories
GET    /api/stories/:id     - Get one story
POST   /api/stories         - Create story (needs auth)
PUT    /api/stories/:id     - Update story (needs auth)
DELETE /api/stories/:id     - Delete story (needs auth)
PUT    /api/stories/:id/like - Toggle like (needs auth)
```

### Auth Header Format

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

The token comes from login/signup response. Store it in localStorage.
