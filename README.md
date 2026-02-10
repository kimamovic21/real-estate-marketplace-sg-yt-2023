# 🏡 Real Estate Marketplace

A full-stack MERN (MongoDB, Express, React, Node.js) real estate marketplace application where users can browse, list, search, and manage properties for rent or sale. The platform features secure authentication, image uploads with drag-and-drop functionality, advanced search filters, and a modern, responsive user interface.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)

## ✨ Features

### 🔐 Authentication & Authorization

- Secure user registration and login with JWT tokens
- Google OAuth integration via Firebase
- Password encryption with bcryptjs
- HTTP-only cookie-based session management
- Protected routes and API endpoints

### 🏠 Property Management

- Create, read, update, and delete property listings
- Drag-and-drop image upload with reordering capability
- Support for both rent and sale listings
- Property details: bedrooms, bathrooms, parking, furnished status
- Regular and discounted pricing options
- Property image carousel with Swiper

### 🔍 Advanced Search

- Search by property name, address, or description
- Filter by property type (rent/sale)
- Filter by amenities (parking, furnished)
- Sort by price, creation date
- Real-time search results with pagination

### 👤 User Features

- Personal profile management with avatar upload
- View and manage personal listings
- Contact property owners directly
- Responsive design for mobile, tablet, and desktop

## 🛠️ Tech Stack

### Backend

- **Runtime:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs for password hashing, cookie-parser
- **CORS:** Configured for cross-origin requests

### Frontend

- **Framework:** React 18.2.0
- **Build Tool:** Vite 4.4.5
- **Routing:** React Router DOM 6.15.0
- **State Management:** Redux Toolkit with Redux Persist
- **Styling:** Tailwind CSS 3.3.3
- **UI Components:**
  - Swiper for image carousels
  - @dnd-kit for drag-and-drop functionality
  - react-icons for iconography
- **OAuth:** Firebase Authentication

### Development Tools

- **Backend:** Nodemon for hot reload
- **Linting:** ESLint with React plugins
- **Deployment:** Vercel-ready configuration

## 📁 Project Structure

```text
real-estate-marketplace/
├── api/                          # Backend server
│   ├── index.js                  # Express server entry point
│   ├── controllers/              # Business logic
│   │   ├── auth.controller.js    # Authentication handlers
│   │   ├── listing.controller.js # Property CRUD operations
│   │   └── user.controller.js    # User management
│   ├── models/                   # Mongoose schemas
│   │   ├── listing.model.js      # Property data model
│   │   └── user.model.js         # User data model
│   ├── routes/                   # API endpoints
│   │   ├── auth.route.js         # Auth routes
│   │   ├── listing.route.js      # Listing routes
│   │   └── user.route.js         # User routes
│   └── utils/                    # Helper functions
│       ├── error.js              # Error handler
│       └── verifyUser.js         # JWT middleware
│
├── client/                       # Frontend application
│   ├── src/
│   │   ├── App.jsx               # Main app with routes
│   │   ├── main.jsx              # React entry point
│   │   ├── firebase.js           # Firebase config
│   │   ├── components/           # Reusable components
│   │   │   ├── Header.jsx        # Navigation bar
│   │   │   ├── OAuth.jsx         # Google OAuth
│   │   │   ├── PrivateRoute.jsx  # Route protection
│   │   │   ├── Contact.jsx       # Contact form
│   │   │   ├── ListingItem.jsx   # Property card
│   │   │   └── DraggableImageList.jsx  # Image manager
│   │   ├── pages/                # Page components
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── About.jsx         # About page
│   │   │   ├── SignIn.jsx        # Login page
│   │   │   ├── SignUp.jsx        # Registration page
│   │   │   ├── Profile.jsx       # User profile
│   │   │   ├── CreateListing.jsx # Create property
│   │   │   ├── UpdateListing.jsx # Edit property
│   │   │   ├── Listing.jsx       # Property details
│   │   │   └── Search.jsx        # Search & filter
│   │   ├── redux/                # State management
│   │   │   ├── store.js          # Redux store
│   │   │   └── user/
│   │   │       └── userSlice.js  # User state
│   │   └── utils/
│   │       └── fetchAPI.js       # API helper
│   └── public/                   # Static assets
│
├── .env                          # Environment variables (not in repo)
├── example.env                   # Environment template
├── package.json                  # Root dependencies
├── vercel.json                   # Deployment config
├── AGENTS.md                     # AI agent guide
└── documentation.txt             # Development notes
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kimamovic21/real-estate-marketplace-sg-yt-2023.git
   cd real-estate-marketplace-sg-yt-2023
   ```

2. **Install root dependencies**

   ```bash
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Create `.env` file in the root directory:

   ```bash
   cp example.env .env
   ```

   Add your environment variables:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ```

   Create `.env` file in the client directory:

   ```bash
   cd client
   cp example.env .env
   ```

   Add your Firebase and API configuration:

   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_API_URL=http://localhost:3000
   ```

5. **Set up MongoDB**
   - Create a MongoDB Atlas account or use local MongoDB
   - Create a new database
   - Copy the connection string to `.env` file

6. **Set up Firebase (for Google OAuth)**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Google Authentication
   - Copy your Firebase config values to `client/.env`

## 🏃‍♂️ Running the Application

### Development Mode

Open two terminal windows:

**Terminal 1 - Backend Server:**

```bash
npm run dev
```

Server will run on `http://localhost:3000`

**Terminal 2 - Frontend Development Server:**

```bash
cd client
npm run dev
```

Client will run on `http://localhost:5173`

### Production Mode

Build and start the application:

```bash
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint            | Description        | Auth Required |
| ------ | ------------------- | ------------------ | ------------- |
| POST   | `/api/auth/signup`  | Register new user  | No            |
| POST   | `/api/auth/signin`  | Login user         | No            |
| POST   | `/api/auth/google`  | Google OAuth login | No            |
| GET    | `/api/auth/signout` | Logout user        | No            |

### User Routes (`/api/user`)

| Method | Endpoint                 | Description         | Auth Required |
| ------ | ------------------------ | ------------------- | ------------- |
| POST   | `/api/user/update/:id`   | Update user profile | Yes           |
| DELETE | `/api/user/delete/:id`   | Delete user account | Yes           |
| GET    | `/api/user/listings/:id` | Get user's listings | Yes           |
| GET    | `/api/user/:id`          | Get user by ID      | No            |

### Listing Routes (`/api/listing`)

| Method | Endpoint                  | Description            | Auth Required |
| ------ | ------------------------- | ---------------------- | ------------- |
| POST   | `/api/listing/create`     | Create new listing     | Yes           |
| DELETE | `/api/listing/delete/:id` | Delete listing         | Yes           |
| POST   | `/api/listing/update/:id` | Update listing         | Yes           |
| GET    | `/api/listing/get/:id`    | Get single listing     | No            |
| GET    | `/api/listing/get`        | Search/filter listings | No            |

### Health Check

| Method | Endpoint    | Description      |
| ------ | ----------- | ---------------- |
| GET    | `/api/test` | API health check |

## 📋 Database Schema

### User Model

```javascript
{
  username: String (unique, required)
  email: String (unique, required)
  password: String (required, hashed)
  avatar: String (default profile image)
  createdAt: Date
  updatedAt: Date
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
  createdAt: Date;
  updatedAt: Date;
}
```

## 🎨 Features in Detail

### Property Listing Creation

1. Fill in property details (name, description, address)
2. Set pricing (regular price and optional discount)
3. Specify property features (bedrooms, bathrooms, parking, furnished)
4. Upload multiple images with drag-and-drop reordering
5. Choose property type (rent or sale)

### Search Functionality

- Text search across property names, descriptions, and addresses
- Filter by property type (rent/sale)
- Filter by offer availability
- Filter by amenities (parking, furnished)
- Sort results by price or date
- Pagination support

### User Profile

- Update username and email
- Upload custom avatar
- View all personal listings
- Edit or delete listings
- Secure account deletion

## 🔒 Security Features

- JWT tokens stored in HTTP-only cookies
- Password hashing with bcryptjs (10 salt rounds)
- CORS configuration for secure cross-origin requests
- Protected routes on both frontend and backend
- Input validation and sanitization
- MongoDB injection prevention with Mongoose

## 🚢 Deployment

### Vercel Deployment

1. **Prepare for deployment**

   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel`
   - Follow the prompts

3. **Set environment variables in Vercel dashboard**
   - Add all variables from `.env` files
   - Ensure production MongoDB URI is set
   - Add production Firebase configuration

### Environment Variables Checklist

- ✅ `MONGODB_URI` - Production database connection
- ✅ `JWT_SECRET` - Strong secret key (use random string)
- ✅ `PORT` - Server port (optional)
- ✅ All Firebase configuration variables (client)

## 🧪 Testing

To test the API:

1. Ensure servers are running
2. Visit `http://localhost:3000/api/test`
3. Expected response: JSON object confirming API is working

For manual testing:

- Use [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/)
- Import API endpoints and test with authentication tokens

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code patterns and conventions
- Use ESLint for code quality
- Test thoroughly before submitting PR
- Update documentation if needed
- Ensure no console errors or warnings

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

### Kerim Imamović

- GitHub: [@kimamovic21](https://github.com/kimamovic21)

## 🙏 Acknowledgments

- Tutorial source: SG YouTube Channel 2023
- React and Vite documentation
- MongoDB and Mongoose documentation
- Redux Toolkit documentation
- Tailwind CSS community

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the [AGENTS.md](AGENTS.md) file for detailed development guide
- Review [documentation.txt](documentation.txt) for setup notes

## 🔮 Future Enhancements

Potential features to consider:

- [ ] Unit and integration tests
- [ ] Image upload to cloud storage (Cloudinary/AWS S3)
- [ ] Dark mode theme
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Admin dashboard
- [ ] Property comparison
- [ ] Map integration (Google Maps API)
- [ ] Real-time chat
- [ ] Property analytics
- [ ] Favorites/saved listings
- [ ] Advanced filtering (price range, square footage)

## 📊 Project Status

**Status:** Active Development  
**Version:** 1.0.0  
**Last Updated:** February 2026

---
