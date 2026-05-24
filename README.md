# DevPulse Issue Tracker

## 🌐 Live URL
[https://assignment-2-liard-alpha.vercel.app/](https://assignment-2-liard-alpha.vercel.app) *(Update this with your actual deployed URL)*

## 🚀 Features
- **User Authentication:** Secure JWT-based signup and login.
- **Role-Based Access Control:** Two distinct roles (`contributor` and `maintainer`) with specific permissions.
- **Issue Tracking:** Create, read, update, and delete issues (bugs and feature requests).
- **Filtering & Sorting:** Filter issues by type and status, and sort them by date.
- **Raw SQL Queries:** Direct database interaction without ORMs for maximum performance and control.
- **Error Handling:** Global error handling middleware for consistent and structured API responses.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL (NeonDB)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt

## ⚙️ Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rimi-1234/assignment_2
   cd Assignment_2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   DATABASE_URL="your_postgresql_connection_string"
   JWT_SECRET="your_jwt_secret"
   JWT_EXPIRES_IN="1d"
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`.

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

## 📡 API Endpoints

### Authentication
| Method | Endpoint             | Description                | Access |
|--------|----------------------|----------------------------|--------|
| POST   | `/api/auth/signup`   | Register a new user        | Public |
| POST   | `/api/auth/login`    | Login and get JWT token    | Public |

### Issues
| Method | Endpoint             | Description                                      | Access                                       |
|--------|----------------------|--------------------------------------------------|----------------------------------------------|
| POST   | `/api/issues`        | Create a new issue                               | Authenticated (`contributor`, `maintainer`)  |
| GET    | `/api/issues`        | Get all issues (supports `type`, `status`, `sort`)| Public                                       |
| GET    | `/api/issues/:id`    | Get a single issue by ID                         | Public                                       |
| PATCH  | `/api/issues/:id`    | Update an issue (title, description, type, status)| Maintainer (any) OR Contributor (own, open)  |
| DELETE | `/api/issues/:id`    | Delete an issue                                  | Maintainer only                              |

## 🗄️ Database Schema Summary

### `users` Table
- `id`: Primary Key (Serial)
- `name`: String
- `email`: String (Unique)
- `password`: String (Hashed)
- `role`: Enum (`contributor`, `maintainer`)
- `created_at`: Timestamp

### `issues` Table
- `id`: Primary Key (Serial)
- `title`: String (Max 150 chars)
- `description`: Text (Min 20 chars)
- `type`: Enum (`bug`, `feature_request`)
- `status`: Enum (`open`, `in_progress`, `resolved`)
- `reporter_id`: Foreign Key (References `users.id`)
- `created_at`: Timestamp
- `updated_at`: Timestamp
