# CP Toolkit 🏆

A full-stack competitive programming reference platform built with **React + Vite**, **Node.js + Express**, and **MongoDB**. Designed for ICPC, Codeforces, and LeetCode competitors who want a single place to reference algorithms, track solved problems, and bookmark resources.

**Live Demo:** _coming soon_

---

## Features

- **Algorithm Library** — 50+ algorithms across Sorting, Graph, DP, String, and Search categories with code in JavaScript, C++, and Python
- **Data Structures Reference** — Operation complexity tables for Stack, Queue, Heap, Segment Tree, Trie, and Union-Find
- **Code Templates** — Contest-ready templates for C++, Python, and Java with one-click copy
- **Complexity Analyzer** — Interactive Big-O calculator comparing how algorithms scale with input size n
- **Problem Set** — Curated LeetCode and Codeforces problems filterable by difficulty and topic
- **User Auth** — JWT-based register/login with bcrypt password hashing
- **Progress Tracking** — Mark problems as solved, bookmark algorithms, view stats on your dashboard

---

## Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React 18 + Vite | SPA framework and dev server |
| React Router v6 | Client-side routing |
| Axios | HTTP client with JWT interceptor |
| React Hot Toast | Notifications |
| Lucide React | Icons |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JSON Web Tokens | Stateless authentication |
| bcryptjs | Password hashing |
| Helmet + Compression | Security and performance |
| Morgan | Request logging |

---

## Project Structure

```
cp-toolkit/
├── backend/
│   ├── server.js              # Express app entry point
│   ├── .env                   # Environment variables (not committed)
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema with bcrypt hooks
│   │   ├── Algorithm.js       # Algorithm schema with text index
│   │   └── Problem.js         # Problem schema
│   ├── routes/
│   │   ├── auth.js            # /api/auth — register, login, me
│   │   ├── algorithms.js      # /api/algorithms — CRUD + bookmark
│   │   ├── problems.js        # /api/problems — list + mark solved
│   │   └── user.js            # /api/user — dashboard stats
│   ├── middleware/
│   │   └── auth.js            # JWT protect middleware
│   └── seed/
│       └── seed.js            # Database seeder
└── frontend/
    ├── vite.config.js         # Vite config with API proxy
    └── src/
        ├── App.jsx            # Routes and providers
        ├── api/axios.js       # Axios instance with interceptors
        ├── context/
        │   └── AuthContext.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   └── ProtectedRoute.jsx
        └── pages/
            ├── Home.jsx
            ├── Algorithms.jsx
            ├── DataStructures.jsx
            ├── Templates.jsx
            ├── Complexity.jsx
            ├── Problems.jsx
            ├── Dashboard.jsx
            ├── Login.jsx
            └── Register.jsx
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- A [MongoDB Atlas](https://mongodb.com/cloud/atlas) free account (or local MongoDB)

### 1. Clone the repo

```bash
git clone https://github.com/divyank0203/cp-toolkit.git
cd cp-toolkit
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/cptoolkit
JWT_SECRET=your_super_secret_key_min_32_characters
JWT_EXPIRE=7d
NODE_ENV=development
```

Seed the database:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
# Running on http://localhost:5000
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
npm run dev
# Running on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> The Vite dev server proxies all `/api` requests to `http://localhost:5000` automatically — no CORS issues.

---

## API Reference

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/auth/me` | Yes | Get current user with populated data |

### Algorithms

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/algorithms` | No | List all — supports `?category=`, `?difficulty=`, `?search=`, `?page=`, `?limit=` |
| GET | `/api/algorithms/:id` | No | Get single algorithm |
| POST | `/api/algorithms/:id/bookmark` | Yes | Toggle bookmark |

### Problems

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/problems` | No | List all — supports `?difficulty=`, `?tag=`, `?platform=` |
| POST | `/api/problems/:id/solve` | Yes | Toggle solved status |

### User

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/user/dashboard` | Yes | Stats + solved problems + bookmarks |

### Complexity

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/complexity/calculate` | No | Body: `{ n, complexities[] }` → returns computed values |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default 5000) |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret key for signing JWTs (min 32 chars) |
| `JWT_EXPIRE` | No | Token expiry (default `7d`) |
| `NODE_ENV` | No | `development` or `production` |

---

## Deployment

### Backend → Railway

1. Push code to GitHub
2. New project on [Railway](https://railway.app) → Deploy from GitHub
3. Add all environment variables from `.env`
4. Railway auto-detects Node and runs `npm start`

### Frontend → Vercel

1. Import the `frontend/` folder on [Vercel](https://vercel.com)
2. Set build command: `npm run build`, output dir: `dist`
3. Add environment variable: `VITE_API_URL=https://your-railway-backend.up.railway.app`
4. Update `frontend/src/api/axios.js` baseURL to use `import.meta.env.VITE_API_URL`

---

## Roadmap

- [ ] Judge0 integration — run code directly in the browser
- [ ] Admin panel — add/edit algorithms and problems via UI
- [ ] Contest timer with Socket.io
- [ ] Learning paths with milestone tracking
- [ ] Dark/light mode toggle

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## Author

**Divyank** — [GitHub](https://github.com/divyank0203) · [Codeforces](https://codeforces.com/profile/fruitborce) · [CodeChef](https://www.codechef.com/users/sanji_cpp)

---

