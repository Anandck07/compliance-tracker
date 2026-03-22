# ⚖️ Mini Compliance Tracker

A full-stack MERN web app to track compliance tasks across multiple clients — built for LedgersCFO.

---

## 🚀 Live Demo

> **Frontend (Vercel):** _Add your Vercel URL here_
> **Backend (Render):** _Add your Render URL here_

---

## 🌐 Deployment Guide

### Backend → Render (free)

1. Push code to GitHub
2. Go to [https://render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo, set **Root Directory** to `server`
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
5. Add **Environment Variables**:
   ```
   MONGO_URI = <your MongoDB Atlas connection string>
   PORT      = 5000
   CLIENT_URL = <your Vercel frontend URL>
   ```
6. Click **Deploy** — copy the Render URL (e.g. `https://your-app.onrender.com`)

> 💡 Use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier) for cloud database.

### Frontend → Vercel

1. Go to [https://vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo, set **Root Directory** to `client`
3. Add **Environment Variable**:
   ```
   REACT_APP_API_URL = https://your-app.onrender.com/api
   ```
4. Click **Deploy** — your app is live!

---

## 📁 Project Structure

```
MINI/
├── client/                  # React frontend (CRA)
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── AddClientModal.js
│       │   ├── AddTaskForm.js
│       │   ├── ClientList.js
│       │   ├── TaskList.js
│       │   └── TaskPanel.js
│       ├── api.js           # Axios API calls
│       ├── App.js
│       └── App.css
└── server/                  # Express + MongoDB backend
    ├── models/
    │   ├── Client.js
    │   └── Task.js
    ├── routes/
    │   ├── clients.js
    │   └── tasks.js
    ├── index.js             # Entry point
    ├── seed.js              # Sample data seeder
    └── .env                 # Environment variables
```

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React 19 (CRA), Axios   |
| Backend   | Node.js, Express 5      |
| Database  | MongoDB, Mongoose       |
| Styling   | Plain CSS (Inter font)  |
| Dev Tools | concurrently            |

---

## ⚙️ Setup & Run Locally

### Prerequisites

- Node.js >= 16
- MongoDB running locally on `mongodb://localhost:27017`

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd MINI
```

### 2. Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Seed sample data

```bash
cd server
npm run seed
```

This inserts 3 sample clients and 7 tasks (including overdue ones) into MongoDB.

### 4. Run both frontend & backend together

```bash
cd server
npm run dev:all
```

| Service   | URL                    |
|-----------|------------------------|
| Frontend  | http://localhost:3000  |
| Backend   | http://localhost:5000  |

> The React app proxies all `/api` requests to the backend automatically.

---

## 📡 API Endpoints

| Method  | Endpoint                | Description              |
|---------|-------------------------|--------------------------|
| GET     | `/api/clients`          | Get all clients          |
| POST    | `/api/clients`          | Create a new client      |
| GET     | `/api/tasks/:clientId`  | Get tasks for a client   |
| POST    | `/api/tasks`            | Create a new task        |
| PATCH   | `/api/tasks/:id`        | Update task status       |

### Request Bodies

**POST `/api/clients`**
```json
{
  "company_name": "Acme Corp",
  "country": "USA",
  "entity_type": "LLC"
}
```

**POST `/api/tasks`**
```json
{
  "client_id": "<mongoId>",
  "title": "Q1 Tax Filing",
  "description": "File quarterly taxes",
  "category": "Tax",
  "due_date": "2025-03-31",
  "status": "Pending",
  "priority": "High"
}
```

**PATCH `/api/tasks/:id`**
```json
{ "status": "Completed" }
```

---

## ✨ Features

- **Client sidebar** — list all clients with avatar initials, add new clients via modal
- **Task panel** — view all tasks for a selected client
- **Add task** — inline form with title, description, category, priority, due date
- **Status updates** — one-click transition between Pending → In Progress → Completed
- **Overdue highlighting** — red background + ⚠ warning on tasks past due date and not completed
- **Filters** — filter tasks by status and category
- **Search** — search tasks by title in real time
- **Summary stats** — total / pending / in progress / completed / overdue counts
- **Seed data** — 3 clients and 7 tasks pre-loaded for demo

---

## 🎨 UI Highlights

- Inter font, indigo gradient header
- Color-coded priority borders: 🔴 High · 🟡 Medium · 🟢 Low
- Status badges: Pending (amber) · In Progress (blue) · Completed (green)
- Hover lift animation on task cards
- Slide-up modal with backdrop blur
- Thin custom scrollbar

---

## ⚖️ Tradeoffs & Assumptions

### Tradeoffs

| Decision | Reason |
|----------|--------|
| CRA over Vite | Faster setup for this scope |
| No authentication | Assumed single-user internal tool |
| No pagination | Task counts per client expected to be small |
| PATCH updates `status` only | Full task editing not in scope |
| Plain CSS over Tailwind/MUI | Zero config, full control, minimal bundle |

### Assumptions

- **Overdue** = `due_date` is in the past AND `status` is not `Completed`
- **Priority** is informational (color-coded) and not enforced by workflow
- **Entity types** are free-text (LLC, Ltd, Pvt Ltd, etc.) rather than a fixed enum
- **Categories** are a fixed set: Tax, Audit, Legal, Payroll, Other

---

## 🌱 Seed Data

Running `npm run seed` creates:

**Clients:** Acme Corp (USA), GlobalTech Ltd (UK), Sunrise Ventures (India)

**Tasks include:**
- Overdue pending tasks (Q1 Tax Filing, VAT Submission, ROC Filing)
- In-progress tasks (Annual Audit)
- Completed tasks (GST Return)
- Future tasks (Board Meeting Minutes, TDS Payment)

---

## 📦 Environment Variables

Create `server/.env`:

```env
MONGO_URI=mongodb://localhost:27017/compliance_tracker
PORT=5000
```

---

## 📜 Scripts Reference

| Command | Location | Description |
|---------|----------|-------------|
| `npm run dev:all` | `server/` | Start backend + frontend together |
| `npm start` | `server/` | Start backend only |
| `npm run seed` | `server/` | Seed sample data |
| `npm start` | `client/` | Start frontend only |
| `npm run build` | `client/` | Production build |
