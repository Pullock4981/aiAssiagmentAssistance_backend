# Learner Analytics & Assignment Platform (Backend)

Welcome to the backend of the **Learner Analytics & Assignment Platform**, a robust and scalable solution designed to bridge the gap between technical instruction and student evaluation. This project is built as part of the **Technical Instructor Assessment** for **Programming Hero**.

## 🚀 Key Features

### For Instructors
- **Assignment Management:** Create, update, and delete structured assignments with defined difficulty levels.
- **Review System:** Comprehensive view of student submissions with the ability to provide feedback and update statuses (Accepted, Pending, Needs Improvement).
- **AI Smart Assist:** Integrated Google Gemini AI to refine assignment descriptions and generate preliminary feedback based on student notes.
- **Data Analytics:** Aggregated data endpoints for visual dashboards (Submission trends, difficulty distribution).

### For Students
- **Submission Portal:** Seamless assignment submission with URL and descriptive notes.
- **Progress Tracking:** Real-time access to assignment status and instructor feedback.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **AI Integration:** Google Gemini AI (1.5 Flash)
- **Security:** JWT (JSON Web Token), Bcrypt.js, Helmet, CORS
- **Architecture:** Layered Architecture (Controller-Service-Model)

## 🏗️ Architecture Overiew
The project follows a **Layered Architecture** to ensure clean code, scalability, and maintainability:
- **Models:** Defines the data structure using Mongoose schemas.
- **Services:** Contains the core business logic and database interactions.
- **Controllers:** Handles HTTP requests, input validation, and sends responses.
- **Routes:** Defines API endpoints and connects them to controllers.
- **Middleware:** Handles authentication, authorization, and global error handling.

## 🤖 The "Smart" Element (AI Implementation)
We have integrated **Google Gemini 1.5 Flash** to automate repetitive tasks for instructors:
- **Assignment Refiner:** Instructors can input rough drafts of assignments, and the AI optimizes them for clarity and professionalism.
- **Feedback Generator:** The AI analyzes student notes against assignment requirements to suggest a constructive feedback draft, significantly reducing manual grading time.

## 📡 API Endpoints (Quick Reference)

### Authentication
- `POST /api/auth/register` - Register a new user (Instructor/Student)
- `POST /api/auth/login` - Login and receive JWT

### Assignments
- `POST /api/assignments` - Create new assignment (Instructor Only)
- `GET /api/assignments` - View all assignments
- `PATCH /api/assignments/:id` - Update assignment (Owner Only)

### Submissions
- `POST /api/submissions` - Submit assignment (Student Only)
- `PATCH /api/submissions/:id/review` - Review submission (Owner Only)

### AI & Analytics
- `POST /api/ai/refine-assignment` - AI-powered description refiner
- `POST /api/ai/suggest-feedback` - AI-powered feedback generator
- `GET /api/analytics/instructor` - Global stats for instructors

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root and add:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the server:**
   ```bash
   # For development
   npm run dev

   # For production
   npm start
   ```

---
Built with  by **Technical Instructor Candidate** for **Programming Hero**.
