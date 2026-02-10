# Claude.md - AI Assistant Instructions

> Quick reference guide for AI assistants working on this real estate marketplace project

## 🎯 Project Context

This is a **full-stack MERN real estate marketplace** where users can list, browse, search, and contact landlords about properties for rent or sale.

**Stack:** MongoDB + Express + React (Vite) + Node.js  
**Auth:** JWT cookies + Firebase OAuth  
**Styling:** Tailwind CSS  
**State:** Redux Toolkit with Redux Persist

## 📂 Project Layout

```text
root/
├── api/              # Backend (Express server, port 3000)
│   ├── index.js      # Server entry point
│   ├── controllers/  # Business logic
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API endpoints
│   └── utils/        # Helpers (JWT verification, error handler)
└── client/           # Frontend (React + Vite, port 5173)
    └── src/
        ├── components/  # Reusable UI components
        ├── pages/       # Route pages
        ├── redux/       # Redux store & slices
        └── utils/       # API fetch wrapper
```

## 🚨 Critical Rules

### DO ✅

- **Always** use existing patterns from the codebase
- **Read relevant files** before making changes
- **Follow MVC pattern** for backend (Model-Controller-Route)
- **Use Redux** for global state management
- **Include error handling** with try-catch and `next(error)`
- **Use JWT middleware** (`verifyToken`) for protected routes
- **Use Tailwind classes** for styling (no custom CSS unless necessary)
- **Test changes** by running both dev servers
- **Use absolute paths** for file operations
- **Keep responses concise** - confirm completion briefly

### DON'T ❌

- **Never** hardcode credentials or API keys
- **Never** commit `.env` files (use `example.env` as template)
- **Never** use inline styles or CSS modules
- **Never** bypass JWT authentication on protected routes
- **Never** expose sensitive user data in responses
- **Never** use `&&` in PowerShell commands (use `;` instead)
- **Never** create unnecessary files or boilerplate
- **Never** modify database schemas without considering migrations

## 🔑 Key Patterns

### Backend API Pattern

```javascript
// Controller (api/controllers/resource.controller.js)
export const myFunction = async (req, res, next) => {
  try {
    const data = await Model.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// Route (api/routes/resource.route.js)
import { verifyToken } from '../utils/verifyUser.js';
router.post('/endpoint', verifyToken, myFunction);

// Register in api/index.js
import resourceRouter from './routes/resource.route.js';
app.use('/api/resource', resourceRouter);
```

### Frontend API Call Pattern

```javascript
import { fetchAPI } from '../utils/fetchAPI';

const data = await fetchAPI('/api/endpoint', {
  method: 'POST',
  body: JSON.stringify(payload),
});
```

### Protected Route Pattern

```javascript
// In App.jsx
<Route element={<PrivateRoute />}>
  <Route path='/protected-page' element={<ProtectedPage />} />
</Route>
```

### Redux Pattern

```javascript
// In component
import { useSelector, useDispatch } from 'react-redux';
import { myAction } from '../redux/feature/featureSlice';

const { data } = useSelector((state) => state.feature);
const dispatch = useDispatch();
dispatch(myAction(payload));
```

## 🛣️ API Endpoints Quick Reference

### Auth (`/api/auth/*`)

- `POST /signup` - Register user
- `POST /signin` - Login user
- `POST /google` - Google OAuth
- `GET /signout` - Logout

### User (`/api/user/*`)

- `POST /update/:id` 🔒 - Update profile
- `DELETE /delete/:id` 🔒 - Delete account
- `GET /listings/:id` 🔒 - Get user listings
- `GET /:id` - Get user by ID

### Listing (`/api/listing/*`)

- `POST /create` 🔒 - Create listing
- `DELETE /delete/:id` 🔒 - Delete listing
- `POST /update/:id` 🔒 - Update listing
- `GET /get/:id` - Get single listing
- `GET /get` - Search listings

🔒 = Requires JWT token in cookie

## 📝 Database Schemas

### User Model

```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed with bcryptjs),
  avatar: String (default URL)
}
```

### Listing Model

```javascript
{
  name, description, address: String,
  regularPrice, discountPrice: Number,
  bedrooms, bathrooms: Number,
  furnished, parking, offer: Boolean,
  type: 'rent' | 'sale',
  imageUrls: [String],
  userRef: ObjectId (references User)
}
```

## 🔧 Common Tasks

### Run Dev Servers

```powershell
# Terminal 1 (Backend)
npm run dev

# Terminal 2 (Frontend)
cd client; npm run dev
```

### Add New API Endpoint

1. Create controller function in `api/controllers/`
2. Add route in `api/routes/`
3. Register route in `api/index.js` (if new router)

### Add New Page

1. Create component in `client/src/pages/`
2. Add route in `client/src/App.jsx`
3. Add navigation link in `Header.jsx` (if needed)

### Add Redux State

1. Create slice in `client/src/redux/[feature]/[feature]Slice.js`
2. Add to store in `client/src/redux/store.js`

## 🎨 Styling Conventions

- **Use Tailwind utility classes**: `flex`, `gap-4`, `p-3`, `rounded-lg`, etc.
- **Responsive design**: Use `sm:`, `md:`, `lg:` prefixes
- **Consistent spacing**: Follow existing gap/padding patterns
- **Hover effects**: Add on interactive elements
- **Icons**: Use `react-icons` library

## 🔐 Environment Variables

### Backend (root `.env`)

```env
PORT=3000
MONGODB_URI=mongodb://...
JWT_SECRET=your_secret
```

### Frontend (`client/.env`)

```env
VITE_FIREBASE_API_KEY=...
```

## 🐛 Troubleshooting Quick Fixes

| Issue                     | Solution                                  |
| ------------------------- | ----------------------------------------- |
| CORS errors               | Check `corsOptions` includes frontend URL |
| JWT not working           | Ensure `credentials: 'include'` in fetch  |
| MongoDB connection failed | Check `MONGODB_URI` and IP whitelist      |
| Images not uploading      | Verify Firebase config                    |
| Redux not persisting      | Check localStorage enabled                |

## 📦 Important Dependencies

**Backend:** `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `cookie-parser`, `cors`  
**Frontend:** `react-router-dom`, `@reduxjs/toolkit`, `redux-persist`, `firebase`, `@dnd-kit/*`, `swiper`

## 🎯 File Naming Conventions

- **Components:** PascalCase (`Header.jsx`, `SignIn.jsx`)
- **Models:** camelCase + `.model.js` (`user.model.js`)
- **Routes:** camelCase + `.route.js` (`auth.route.js`)
- **Controllers:** camelCase + `.controller.js` (`user.controller.js`)
- **Utils:** camelCase (`verifyUser.js`, `fetchAPI.js`)

## 💡 When Making Changes

1. ✅ **Read before write** - Check existing implementations first
2. ✅ **Follow patterns** - Match coding style and architecture
3. ✅ **Test locally** - Run dev servers and verify functionality
4. ✅ **Handle errors** - Use try-catch and proper error responses
5. ✅ **Check console** - Ensure no errors in terminal or browser
6. ✅ **Update docs** - Modify AGENTS.md if adding new patterns

## 🚀 Workflow Tips for AI Assistants

- **Batch operations**: Use `multi_replace_string_in_file` for multiple edits
- **Parallel reads**: Read multiple files simultaneously when gathering context
- **Context first**: Always read relevant code before suggesting changes
- **Test paths**: Use absolute paths for file operations
- **Verify changes**: Check for errors after edits with `get_errors` tool
- **Be concise**: Keep responses short, confirm completion briefly

## 📚 Additional Context

For comprehensive project documentation, architecture details, and deployment info, refer to **AGENTS.md**.

For setup history and troubleshooting steps, refer to **documentation.txt**.

---

**Last Updated:** February 2026  
**Purpose:** Quick reference for AI coding assistants (Claude, Cursor, etc.)  
**Companion Docs:** AGENTS.md (comprehensive guide), documentation.txt (setup notes)
