# AGENTS.md - Real Estate Marketplace Project Guide

## 📋 Project Overview

This is a full-stack MERN (MongoDB, Express, React, Node.js) real estate marketplace application. Users can browse, list, and search for properties (rent/sale), with features including authentication, image uploads, and real-time search functionality.

**Project Type:** Full-stack web application  
**Primary Language:** JavaScript (ES6+)  
**Architecture:** Client-Server with RESTful API

---

## 🛠️ Tech Stack

### Backend

- **Runtime:** Node.js (Express.js)
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (Cookie-based)
- **Security:** bcryptjs for password hashing
- **Environment:** dotenv for configuration

### Frontend

- **Framework:** React 18.2.0
- **Build Tool:** Vite 4.4.5
- **Routing:** React Router DOM 6.15.0
- **State Management:** Redux Toolkit with Redux Persist
- **Styling:** Tailwind CSS 3.3.3
- **UI Features:**
  - Swiper for image carousels
  - @dnd-kit for drag-and-drop functionality
  - react-icons for iconography
- **Authentication:** Firebase (OAuth integration)

### Development Tools

- **API Testing:** Nodemon for hot reload
- **Linting:** ESLint
- **Deployment:** Vercel (configured)

---

## 📁 Project Structure

```text
root/
├── api/                          # Backend server
│   ├── index.js                  # Express server entry point
│   ├── controllers/              # Business logic handlers
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── listing.controller.js # Property listing CRUD
│   │   └── user.controller.js    # User management
│   ├── models/                   # Mongoose schemas
│   │   ├── listing.model.js      # Property data model
│   │   └── user.model.js         # User data model
│   ├── routes/                   # API route definitions
│   │   ├── auth.route.js         # /api/auth/* endpoints
│   │   ├── listing.route.js      # /api/listing/* endpoints
│   │   └── user.route.js         # /api/user/* endpoints
│   └── utils/                    # Helper functions
│       ├── error.js              # Custom error handler
│       └── verifyUser.js         # JWT middleware
│
├── client/                       # Frontend application
│   ├── src/
│   │   ├── App.jsx               # Main app component with routes
│   │   ├── main.jsx              # React entry point
│   │   ├── firebase.js           # Firebase configuration
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Header.jsx        # Navigation bar
│   │   │   ├── OAuth.jsx         # Google OAuth button
│   │   │   ├── PrivateRoute.jsx  # Protected route wrapper
│   │   │   ├── Contact.jsx       # Contact landlord component
│   │   │   ├── ListingItem.jsx   # Property card component
│   │   │   └── DraggableImageList.jsx  # Image upload manager
│   │   ├── pages/                # Page-level components
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── About.jsx         # About page
│   │   │   ├── SignIn.jsx        # Login page
│   │   │   ├── SignUp.jsx        # Registration page
│   │   │   ├── Profile.jsx       # User profile & listings
│   │   │   ├── CreateListing.jsx # Create property form
│   │   │   ├── UpdateListing.jsx # Edit property form
│   │   │   ├── Listing.jsx       # Single property view
│   │   │   └── Search.jsx        # Search & filter page
│   │   ├── redux/                # State management
│   │   │   ├── store.js          # Redux store configuration
│   │   │   └── user/
│   │   │       └── userSlice.js  # User state slice
│   │   └── utils/
│   │       └── fetchAPI.js       # API request helper
│   └── public/                   # Static assets
│
├── .env                          # Environment variables (DO NOT COMMIT)
├── example.env                   # Environment template
├── package.json                  # Root dependencies
└── documentation.txt             # Development notes
```

---

## 🔄 Architecture Patterns

### Backend Patterns

1. **MVC Pattern:** Model-View-Controller separation
   - Models: Mongoose schemas in `api/models/`
   - Controllers: Business logic in `api/controllers/`
   - Routes: API endpoints in `api/routes/`

2. **Middleware Chain:**
   - CORS configuration for cross-origin requests
   - JSON body parser
   - Cookie parser for JWT tokens
   - Custom error handler (`errorHandler`)
   - JWT verification middleware (`verifyToken`)

3. **Authentication Flow:**
   - JWT tokens stored in HTTP-only cookies
   - Middleware `verifyToken` validates tokens
   - Password hashing with bcryptjs before storage

### Frontend Patterns

1. **Component Structure:**
   - Pages for route-level components
   - Reusable components for shared UI
   - Private routes for authenticated pages

2. **State Management:**
   - Redux Toolkit for global state
   - Redux Persist for localStorage persistence
   - User slice manages authentication state

3. **API Communication:**
   - Centralized fetch wrapper in `utils/fetchAPI.js`
   - Credentials included in requests for cookie authentication

---

## 🔐 Authentication & Authorization

### Backend Authentication

- **Strategy:** JWT tokens stored in HTTP-only cookies
- **Token Generation:** On successful login/signup
- **Token Verification:** `verifyUser.js` middleware
- **Protected Routes:** Use `verifyToken` middleware

### Frontend Authentication

- **OAuth Provider:** Google (via Firebase)
- **State:** User data stored in Redux (`userSlice`)
- **Protected Routes:** `PrivateRoute` component checks authentication
- **Persistence:** Redux Persist keeps user logged in

### Environment Variables Required

```env
# Backend (.env at root)
PORT=3000
MONGODB_URI=mongodb://...
JWT_SECRET=your_jwt_secret

# Frontend (client/.env)
VITE_FIREBASE_API_KEY=...
```

---

## 🗄️ Database Schema

### User Model

```javascript
{
  username: String (unique, required)
  email: String (unique, required)
  password: String (required, hashed)
  avatar: String (default profile image)
  timestamps: true (createdAt, updatedAt)
}
```

### Listing Model

```javascript
{
  name: String(required);
  description: String(required);
  address: String(required);
  regularPrice: Number(required);
  discountPrice: Number(required);
  bathrooms: Number(required);
  bedrooms: Number(required);
  furnished: Boolean(required);
  parking: Boolean(required);
  type: String(required); // 'rent' or 'sale'
  offer: Boolean(required);
  imageUrls: Array(required);
  userRef: ObjectId(required); // Reference to User
  timestamps: true;
}
```

---

## 🛣️ API Endpoints

### Authentication Routes (`/api/auth/*`)

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/signout` - Logout user

### User Routes (`/api/user/*`)

- `POST /api/user/update/:id` - Update user profile (Protected)
- `DELETE /api/user/delete/:id` - Delete user account (Protected)
- `GET /api/user/listings/:id` - Get user's listings (Protected)
- `GET /api/user/:id` - Get user by ID

### Listing Routes (`/api/listing/*`)

- `POST /api/listing/create` - Create new listing (Protected)
- `DELETE /api/listing/delete/:id` - Delete listing (Protected)
- `POST /api/listing/update/:id` - Update listing (Protected)
- `GET /api/listing/get/:id` - Get single listing
- `GET /api/listing/get` - Search/filter listings

**Note:** Protected routes require valid JWT token in cookie

---

## 🚀 Development Workflow

### Initial Setup

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Create environment files from examples
cp example.env .env
cp client/example.env client/.env
# Fill in your environment variables
```

### Running Development Servers

```bash
# Terminal 1 - Backend (from root)
npm run dev
# Server runs on http://localhost:3000

# Terminal 2 - Frontend (from client/)
cd client
npm run dev
# Client runs on http://localhost:5173
```

### Building for Production

```bash
# From root - builds both backend and frontend
npm run build

# Start production server
npm start
```

### Testing API Health

```bash
# Visit or curl
GET http://localhost:3000/api/test
```

---

## 🎯 Common Development Tasks

### Adding a New API Endpoint

1. **Create Controller Function** in `api/controllers/[resource].controller.js`

   ```javascript
   export const myNewFunction = async (req, res, next) => {
     try {
       // Your logic
       res.status(200).json({ data });
     } catch (error) {
       next(error);
     }
   };
   ```

2. **Add Route** in `api/routes/[resource].route.js`

   ```javascript
   import { verifyToken } from '../utils/verifyUser.js';
   router.post('/my-endpoint', verifyToken, myNewFunction);
   ```

3. **Register Route** in `api/index.js` (if new router)

   ```javascript
   import myRouter from './routes/my.route.js';
   app.use('/api/my', myRouter);
   ```

### Adding a New Page

1. **Create Page Component** in `client/src/pages/MyPage.jsx`

   ```javascript
   export default function MyPage() {
     return <div>My Page</div>;
   }
   ```

2. **Add Route** in `client/src/App.jsx`

   ```javascript
   import MyPage from './pages/MyPage';
   <Route path='/my-page' element={<MyPage />} />;
   ```

3. **Add Navigation Link** in `client/src/components/Header.jsx` (if needed)

### Adding Redux State

1. **Create Slice** in `client/src/redux/[feature]/[feature]Slice.js`
2. **Add to Store** in `client/src/redux/store.js`

   ```javascript
   const rootReducer = combineReducers({
     user: userReducer,
     myFeature: myFeatureReducer,
   });
   ```

### Working with Images

- Frontend uses drag-and-drop via `DraggableImageList` component
- Uses `@dnd-kit` library for reordering
- Image URLs stored as array in listing model
- Consider using Firebase Storage or similar for image hosting

---

## 🔍 Important Code Patterns

### Error Handling

All controllers use try-catch with `next(error)`:

```javascript
try {
  // operation
} catch (error) {
  next(error);
}
```

Custom error utility in `api/utils/error.js`:

```javascript
errorHandler(statusCode, message);
```

### API Fetch Pattern (Frontend)

```javascript
import { fetchAPI } from '../utils/fetchAPI';

const data = await fetchAPI('/api/endpoint', {
  method: 'POST',
  body: JSON.stringify(payload),
});
```

### Protected Route Pattern (Frontend)

```javascript
<Route element={<PrivateRoute />}>
  <Route path='/profile' element={<Profile />} />
</Route>
```

### Mongoose Queries

```javascript
// With user reference
const listing = await Listing.findById(listingId);

// With query parameters
const listings = await Listing.find({
  type: 'rent',
  offer: true,
}).limit(10);
```

---

## 🎨 Styling Conventions

### Tailwind CSS Usage

- Utility-first approach with Tailwind classes
- Responsive design with `sm:`, `md:`, `lg:` prefixes
- Custom colors and configuration in `tailwind.config.js`
- Dark mode not currently implemented (future feature)

### Component Styling Patterns

- Consistent spacing with Tailwind gap/padding utilities
- Flexbox for layouts (`flex flex-col`)
- Grid for property listings (`grid grid-cols-1 sm:grid-cols-2`)
- Hover effects on interactive elements

---

## 📦 Dependencies Guide

### Critical Backend Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cookie-parser` - Cookie handling
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables

### Critical Frontend Dependencies

- `react-router-dom` - Navigation
- `@reduxjs/toolkit` - State management
- `redux-persist` - Persist Redux state
- `firebase` - OAuth authentication
- `@dnd-kit/*` - Drag and drop functionality
- `swiper` - Image carousel
- `react-icons` - Icon library

---

## 🐛 Common Issues & Solutions

### Issue: CORS Errors

**Solution:** Check `corsOptions` in `api/index.js` includes your frontend URL

### Issue: JWT Token Not Being Sent

**Solution:** Ensure `credentials: 'include'` in fetch requests and CORS credentials enabled

### Issue: MongoDB Connection Failed

**Solution:** Check `MONGODB_URI` in `.env` and ensure IP whitelist in MongoDB Atlas

### Issue: Images Not Uploading

**Solution:** Verify Firebase configuration in `client/src/firebase.js`

### Issue: Redux State Not Persisting

**Solution:** Check browser localStorage is enabled and Redux Persist configuration

### Issue: Build Fails on Vercel

**Solution:** Ensure all environment variables are set in Vercel dashboard

---

## 🚢 Deployment Notes

### Vercel Configuration (`vercel.json`)

- Configured for serverless deployment
- Routes frontend requests to Vite build
- API routes handled by Express server

### Environment Variables Checklist

Before deploying, ensure these are set:

- ✅ `MONGODB_URI` - Production database
- ✅ `JWT_SECRET` - Strong secret key
- ✅ `VITE_FIREBASE_API_KEY` - Firebase credentials
- ✅ `PORT` - Server port (optional, defaults to 3000)

### Build Process

1. Root `npm run build` installs dependencies for both client and server
2. Client build generates static files in `client/dist`
3. Express serves client build in production

---

## 🔄 Git Workflow

### Branches

- `main` - Production-ready code
- Feature branches should be created from `main`

### Ignored Files (check `.gitignore`)

- `node_modules/`
- `.env` files (use `example.env` as template)
- Build artifacts (`dist/`, `build/`)

---

## 📝 Code Conventions

### File Naming

- Components: PascalCase (e.g., `Header.jsx`, `SignIn.jsx`)
- Models: camelCase with `.model.js` (e.g., `user.model.js`)
- Routes: camelCase with `.route.js` (e.g., `auth.route.js`)
- Controllers: camelCase with `.controller.js` (e.g., `user.controller.js`)
- Utils: camelCase (e.g., `verifyUser.js`, `fetchAPI.js`)

### Import/Export Patterns

- ES6 modules throughout (`import`/`export`)
- Named exports for utilities
- Default exports for components and models

### Variable Naming

- camelCase for variables and functions
- PascalCase for React components
- UPPER_CASE for constants and environment variables

---

## 🧪 Testing Recommendations

Currently, no testing framework is implemented. Consider adding:

- **Backend:** Jest + Supertest for API testing
- **Frontend:** Vitest + React Testing Library
- **E2E:** Playwright or Cypress

---

## 🎓 Learning Resources

If you're new to the stack:

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev)
- [MongoDB/Mongoose Docs](https://mongoosejs.com/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [React Router Docs](https://reactrouter.com/)

---

## 🤝 Contributing Guidelines

### Before Making Changes

1. Read this entire AGENTS.md file
2. Review `documentation.txt` for setup history
3. Ensure local development environment works
4. Check existing issues/features to avoid duplication

### When Adding Features

1. Follow existing code patterns and conventions
2. Update this AGENTS.md if adding new patterns
3. Test thoroughly in development
4. Ensure no console errors or warnings
5. Update `documentation.txt` with any new setup steps

### Code Review Checklist

- ✅ No hardcoded credentials or secrets
- ✅ Error handling implemented
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ JWT authentication working for protected routes
- ✅ Database queries optimized (indexes if needed)
- ✅ CORS and security headers configured
- ✅ No ESLint errors

---

## 📞 Getting Help

### For AI Agents

When working on this project:

1. Always read relevant file contents before making changes
2. Follow the established patterns shown in this document
3. Test changes by running development servers
4. Check for errors in both terminal and browser console
5. Refer to the API endpoints section for backend integration

### For Human Developers

1. Check `documentation.txt` for detailed setup steps
2. Review existing similar features for patterns
3. Use the "Common Development Tasks" section as a guide
4. Test API endpoints using `/api/test` health check first

---

## 🔮 Future Considerations

Potential improvements or features to consider:

- [ ] Unit and integration tests
- [ ] Image upload to cloud storage (Firebase/Cloudinary)
- [ ] Dark mode theme toggle
- [ ] Advanced search filters (price range, property features)
- [ ] User favorites/saved listings
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Admin dashboard
- [ ] Property comparison feature
- [ ] Map integration (Google Maps API)
- [ ] Real-time notifications
- [ ] Chat between buyers and sellers
- [ ] Property analytics dashboard

---

## 📋 Quick Reference Commands

```bash
# Development
npm run dev                    # Start backend dev server (root)
cd client && npm run dev       # Start frontend dev server

# Production Build
npm run build                  # Build entire application
npm start                      # Start production server

# Package Management
npm install                    # Install root dependencies
cd client && npm install       # Install client dependencies

# Database
# Connect to MongoDB Compass using MONGODB_URI from .env

# Linting
cd client && npm run lint      # Run ESLint on frontend
```

---

**Last Updated:** February 2026  
**Project Status:** Active Development  
**License:** ISC

---

_This AGENTS.md file is a living document. Update it as the project evolves to keep it accurate and helpful for all contributors._
