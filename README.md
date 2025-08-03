# LinkedIn Clone - Full Stack Social Platform

A modern, full-stack social media platform inspired by LinkedIn, built with React, Node.js, Express, and MongoDB.

## 🚀 Features

### Authentication & Security
- JWT-based authentication with secure password hashing (bcrypt)
- Protected routes and middleware
- Persistent login state with localStorage
- Input validation and sanitization

### Core Social Features
- User registration and login
- Create and view posts in a real-time feed
- User profiles with editable information
- Professional LinkedIn-inspired design
- Responsive mobile-first UI

### Technical Highlights
- RESTful API with comprehensive documentation (Swagger UI)
- Server-side rendering (SSR) support
- Error handling with user-friendly notifications
- MongoDB data persistence
- Modern React with hooks and context

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **express-validator** - Input validation
- **Swagger** - API documentation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library with hooks
- **Vite** - Build tool and dev server
- **React Router v7** - File-based routing with SSR
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## 📁 Project Structure

```
linkedin-clone/
├── server/                 # Backend (Express API)
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth & error middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── utils/            # Helper functions
│   ├── server.js         # Entry point
│   └── package.json      # Dependencies
├── client/               # Frontend (React app)
│   ├── app/
│   │   ├── components/   # Reusable components
│   │   ├── context/      # React context providers
│   │   ├── routes/       # Page components
│   │   ├── utils/        # API helpers
│   │   └── root.tsx      # App root
│   ├── package.json      # Dependencies
│   └── vite.config.ts    # Vite configuration
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd linkedin-clone
```

### 2. Backend Setup
```bash
cd server
npm install

# Create environment file
cp .env.example .env

# Edit .env with your values:
# NODE_ENV=development
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/linkedin_clone
# JWT_SECRET=your-super-secret-jwt-key

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../client
npm install

# Start the frontend dev server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Database Setup
- Install MongoDB locally or use MongoDB Atlas
- The app will automatically create the database and collections
- Use MongoDB Compass to view your data at `mongodb://localhost:27017`

## 📚 API Documentation

Visit `http://localhost:5000/api-docs` for interactive Swagger documentation.

### Main Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

#### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update profile (protected)
- `GET /api/users/:id/posts` - Get user's posts

#### Posts
- `POST /api/posts` - Create post (protected)
- `GET /api/posts` - Get all posts (paginated)

## 🎨 Features Demo

1. **Register/Login**: Create an account or sign in
2. **Home Feed**: View and create posts
3. **Profile**: View and edit user profiles
4. **Navigation**: Seamless routing between pages

## 🔧 Development

### Backend Commands
```bash
cd server
npm run dev    # Development with nodemon
npm start      # Production
```

### Frontend Commands
```bash
cd client
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## 🚀 Deployment

### Backend Deployment Options

#### 1. Railway/Render/Heroku
1. Connect your GitHub repository
2. Set environment variables:
   - `NODE_ENV=production`
   - `MONGO_URI=<your-mongodb-atlas-uri>`
   - `JWT_SECRET=<your-secret>`
   - `PORT=5000`
3. Deploy from main branch

#### 2. Manual VPS Deployment
```bash
# On your server
git clone <your-repo>
cd linkedin-clone/server
npm install --production
pm2 start server.js --name linkedin-backend
```

### Frontend Deployment Options

#### 1. Netlify/Vercel
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variable: `VITE_API_URL=<your-backend-url>`

#### 2. Manual Static Hosting
```bash
cd client
npm run build
# Upload dist/ folder to your static host
```

## 🔐 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/linkedin_clone
JWT_SECRET=your-super-secret-jwt-key-here
```

### Frontend (optional)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally
   - Check MONGO_URI in .env file
   - Verify database permissions

2. **CORS Issues**
   - Backend includes CORS middleware
   - Check frontend API base URL

3. **JWT Token Issues**
   - Ensure JWT_SECRET is set in .env
   - Check token expiration (30 days default)

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the API documentation at `/api-docs`
3. Open an issue on GitHub

---

Built with ❤️ using modern web technologies
