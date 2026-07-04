# Theme Park Booking

A full-stack web app for browsing theme park rides and booking ride time slots. Built with Node.js, Express, and SQLite, with session-based authentication.

## Features

- **User accounts** — register and log in with a hashed password (bcrypt) and server-side sessions
- **Ride catalog** — browse all rides with descriptions, duration, and minimum height requirements
- **Ride time slots** — each ride has multiple bookable time slots
- **Booking system** — logged-in users can book a ride time slot, view their bookings, and cancel them
- **Protected dashboard** — `/dashboard` and all booking routes require an active login session
- **SQLite storage** — rides, ride times, users, and bookings are persisted locally in `themepark.db`

## Tech Stack

- **Backend:** Node.js, Express 5
- **Database:** SQLite3 (via `sqlite3`), with Mongoose listed as a dependency for potential MongoDB support
- **Auth:** express-session (server-side sessions), bcryptjs (password hashing)
- **Frontend:** Static HTML/CSS/JS served from `public/`

## Project Structure

```
theme-park-booking/
├── server.js               # Express app entrypoint and all routes
├── database/
│   └── db.js                # SQLite connection and table setup
├── middleware/
│   └── authMiddleware.js     # Guards routes that require login
├── models/
│   ├── User.js
│   ├── Ride.js
│   └── Booking.js
├── public/                  # Static frontend
│   ├── index.html
│   ├── rides.html
│   ├── booking.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── mybookings.html
│   ├── about.html
│   ├── contact.html
│   ├── css/
│   ├── js/
│   └── images/
└── themepark.db             # SQLite database file (created on first run)
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone <your-repo-url>
cd theme-park-booking
npm install
```

### Running the app

```bash
npm start
```

The server runs on **http://localhost:3000**.

### Seeding sample ride data

Visit **http://localhost:3000/seed** once after starting the server to populate the database with sample rides (Thunder Coaster, Sky Wheel, Pirate Adventure, Haunted Mansion) and their time slots.

## API Endpoints

| Method | Route                  | Description                                  | Auth required |
|--------|-------------------------|-----------------------------------------------|----------------|
| GET    | `/api/rides`             | List all rides                                | No             |
| GET    | `/api/rides/details`     | List rides with their available time slots    | No             |
| POST   | `/register`              | Create a new user account                     | No             |
| POST   | `/login`                 | Log in and start a session                    | No             |
| GET    | `/logout`                | Destroy the current session                   | No             |
| GET    | `/session-status`        | Check current login status                    | No             |
| GET    | `/dashboard`             | View the user dashboard                       | Yes            |
| POST   | `/api/bookings`          | Create a new ride booking                     | Yes            |
| GET    | `/api/bookings`          | List the current user's bookings              | Yes            |
| DELETE | `/api/bookings/:id`      | Cancel a booking                              | Yes            |

## Notes

- This project uses a hardcoded session secret in `server.js` for local development — replace it with an environment variable (see `.env`) before deploying anywhere public.
- `themepark.db` is created automatically on first run; delete it if you want a completely fresh database.

## License

ISC
