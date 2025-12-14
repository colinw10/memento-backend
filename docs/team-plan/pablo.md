# Pablo's Tasks - Integration & Styling

## Overview

As co-lead, my role is integration, testing, and styling. I'm here to help connect everyone's work together and assist teammates whenever needed.

**Total Time Estimate: 7-8+ hours**

---

## My Responsibilities

### 1. Full-Stack Integration

- Help connect frontend to backend
- Assist with integration issues between team members' code
- Ensure data flows correctly end-to-end

### 2. End-to-End Testing

- Test complete user flows:
  - Signup → Login → Create Story → Like → Comment → Logout
- Verify auth works across page refreshes
- Test error states and edge cases

### 3. Bug Fixes

- Debug issues that span frontend/backend
- Fix merge conflicts
- Resolve API mismatches

### 4. Styling & Polish

- CSS framework setup
- Consistent styling across components
- Responsive layout
- Loading states, error messages, empty states

### 5. Deployment Prep

- Environment configuration
- Build optimization
- Documentation updates

---

## Integration Checklist

### Auth Flow

- [ ] Signup creates user and stores token
- [ ] Login works and stores token
- [ ] Token persists across refresh (localStorage)
- [ ] Protected routes redirect to login
- [ ] Logout clears token and redirects

### Story Flow

- [ ] Stories load on home page
- [ ] Can create new story
- [ ] Can view single story
- [ ] Can edit own stories
- [ ] Can delete own stories
- [ ] Cannot edit/delete others' stories

### Like Flow

- [ ] Can like a story
- [ ] Like toggles (like/unlike)
- [ ] Like count updates in UI
- [ ] Like state shows correctly (filled/unfilled)

### Comment Flow

- [ ] Comments load on story page
- [ ] Can add comment
- [ ] Comment appears immediately
- [ ] Can delete own comments
- [ ] Cannot delete others' comments

---

## Common Integration Issues

### CORS Errors

Frontend can't reach backend:

```javascript
// Backend server.js - make sure this is there:
app.use(cors());
```

### Token Not Sent

API calls failing with 401:

```javascript
// Check that axios interceptor adds token:
config.headers.Authorization = `Bearer ${token}`;
```

### ObjectId Comparison

Backend ownership checks failing:

```javascript
// Always use toString() when comparing IDs
if (story.author.toString() !== req.user._id.toString())
```

### Populate Not Working

Author showing as ID instead of username:

```javascript
// Make sure to call populate
.populate('author', 'username')
```

---

## Testing Commands

```bash
# Run backend
cd memento-backend && npm run dev

# Run frontend (separate terminal)
cd memento-frontend && npm run dev

# Test API directly
curl http://localhost:3000/api/stories
```

---

## When Merging PRs

1. Pull their branch locally
2. Test their feature works
3. Check for conflicts
4. Merge to main
5. Test main still works
6. Deploy if ready
