# Car Rental App - Backend & Frontend Connection Guide

## Architecture Overview

### Backend (Server)
- **Port**: 9000 (default, configurable via `PORT` env var)
- **Base URL**: `http://localhost:9000`
- **Framework**: Express.js
- **Database**: MongoDB Atlas

### Frontend (Client)
- **Port**: 5173 (Vite default)
- **Base URL**: `http://localhost:9000` (configured in `.env`)
- **Framework**: React + Vite

---

## API Endpoints

### User Routes (`/api/users`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | No | Register new user |
| POST | `/login` | No | Login user |
| GET | `/data` | Yes | Get logged-in user data |
| GET | `/cars` | No | Get all cars |

### Owner Routes (`/api/owners`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/change-role` | Yes | Change user role to owner |
| POST | `/add-car` | Yes | Add new car (with image upload) |
| GET | `/cars` | Yes | Get owner's cars |
| POST | `/delete-car` | Yes | Delete a car |
| GET | `/toggle-car` | Yes | Toggle car availability |
| GET | `/dashboard` | Yes | Get dashboard data |
| POST | `/update-image` | Yes | Update user profile image |

### Booking Routes (`/api/bookings`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/check-availability` | No | Check car availability for dates |
| POST | `/create` | Yes | Create a booking |
| GET | `/user` | Yes | Get user's bookings |
| GET | `/owner` | Yes | Get owner's bookings |
| POST | `/change-status` | Yes | Change booking status |

---

## Environment Configuration

### Backend (.env)
```
MONGODB_URI=mongodb://username:password@...
JWT_SECRET=carRentalSecretKey
IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
IMAGEKIT_URL_ENDPOINT=...
PORT=9000 (optional)
```

### Frontend (.env)
```
VITE_BASE_URL=http://localhost:9000
VITE_CURRENCY=$
```

---

## How to Run

### Terminal 1 - Start Backend
```bash
cd server
npm install
npm start
# Server runs on http://localhost:9000
```

### Terminal 2 - Start Frontend
```bash
cd client
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## Authentication Flow

1. User logs in via `/api/users/login`
2. Server returns JWT token
3. Token stored in localStorage
4. Frontend adds token to Axios header: `Authorization: <token>`
5. All protected endpoints verify token via `protect` middleware

---

## Key Integration Points

✅ **CORS Enabled** - Server accepts requests from frontend
✅ **Axios Configured** - Client uses axios with dynamic base URL
✅ **Token Management** - JWT tokens handled in AppContext
✅ **Protected Routes** - Auth middleware protects sensitive endpoints
✅ **Environment Variables** - Proper .env files configured

---

## Fixed Issues
- ✅ Endpoint paths aligned (`/api/users`, `/api/owners`)
- ✅ Booking route missing slash fixed (`/check-availability`)
- ✅ Frontend API calls updated to correct endpoints
