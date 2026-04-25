# ⚙️ AIMS Backend - Intelligent API Engine

The core engine of the **AIMS** (AI-Powered Assignment Management System). This backend handles complex data orchestration, AI integrations, and real-time analytics calculations.

## 🤖 AI Smart Logic (Beyond Standard)

I have implemented a sophisticated **AI Review Engine** using **Google Gemini 1.5 Flash**. Unlike standard implementations, our logic includes:

- **Intelligent Feedback Loops:** The AI doesn't just generate text; it analyzes student inputs for gibberish, validates technical links, and provides structured constructive criticism.
- **Assignment Refiner:** A specialized tool for instructors to transform rough ideas into professional, well-structured assignment descriptions.
- **Automated Validation:** Backend logic that works alongside AI to verify submission integrity before processing.

## 📈 Advanced Analytics Engine

The backend provides a high-performance analytics endpoint (`/api/analytics/instructor`) that aggregates platform-wide data:
- **Difficulty Clustering:** Calculates the distribution of tasks across different skill levels platform-wide.
- **Submission Status Tracking:** Real-time counts of Accepted, Pending, and "Needs Improvement" submissions across all assignments.
- **Participation Metrics:** Global statistics for total assignments and student engagement.

## 🛠️ Tech Stack & Architecture
- **Runtime:** Node.js (Express.js)
- **Database:** MongoDB (Mongoose ODM)
- **AI Model:** Google Gemini 1.5 Flash
- **Security:** JWT, Bcrypt.js, CORS, Helmet
- **Structure:** Modular Layered Architecture (Controllers -> Services -> Models)

## 📡 Key API Reference

### 🔐 Authentication
- `POST /api/auth/register` - Create Instructor/Student accounts.
- `POST /api/auth/login` - Secure JWT-based entry.

### 📝 Assignments & Submissions
- `GET/POST /api/assignments` - Full CRUD for task management.
- `GET/POST /api/submissions` - Student portals and instructor review queues.
- `PATCH /api/submissions/:id` - Multi-status submission updates.

### 🧠 Intelligence & Stats
- `POST /api/ai/refine-assignment` - AI description optimization.
- `GET /api/analytics/instructor` - Data source for frontend charts.

## 🚦 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Create `.env` and add:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_key
   ```

3. **Run Server:**
   ```bash
   npm run dev
   ```

---
Built for performance, scalability, and intelligence.
