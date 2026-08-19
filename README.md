# HRSphere - Complete HR Management Platform

A full-stack workforce management platform with employee management, attendance tracking, leave management, payroll processing, onboarding workflows, dashboards, and AI assistance.

## 🚀 Quick Start

### Windows Users:
```bash
start.bat
```

### macOS/Linux Users:
```bash
bash start.sh
```

Then open: **http://localhost:5173**

---

## 📋 Manual Setup

### Backend (Terminal 1)
```bash
cd backend
pip install -r requirements.txt
python init_db.py
python run.py
```
Backend runs on: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

### Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 🎯 Features

### Dashboard
- 📊 Overview statistics (employees, attendance, leaves, payroll)
- 📈 Recent activities tracker with timestamps
- 🎨 Beautiful metrics display with cards

### Employee Management
- 👥 Complete employee directory
- 📝 Employee details (name, email, department, role, join date, status)
- ➕ Add new employees
- ✏️ Edit employee information
- 🗑️ Remove employees
- **6 Sample Employees Pre-loaded**

### Attendance System
- 📅 Daily attendance tracking
- ⏰ Check-in/Check-out times
- ⏱️ Hours worked calculation
- 📊 Attendance status (Present, Late, Absent, On Leave)
- **Real-time attendance records**

### Leave Management
- 📋 Leave request workflow
- 📅 Multiple leave types (Annual, Sick, Casual, Maternity)
- ✅ Approval/Rejection system
- 📊 Leave tracking and history
- **6 Sample Leave Requests**

### Payroll Management
- 💰 Salary processing
- 📊 Salary breakdown (Basic, Allowances, Deductions)
- 📈 Net salary calculation
- 🔄 Monthly payroll runs
- **6 Employees with complete salary data**

### Onboarding Workflow
- 🎓 New hire onboarding stages
- 📄 Document tracking
- ✅ Stage management
- 📊 Onboarding status tracking
- **6 Candidates in various onboarding stages**

### AI Assistant
- 🤖 HR support chatbot
- 💬 Company policy queries
- 📚 Knowledge base assistance
- 🔗 Optional OpenAI integration

---

## 🎨 UI/UX Features

### Modern Dark Theme
- 🌙 Professional dark mode
- 💜 Indigo and green accent colors
- ✨ Glassmorphism effects

### Colorful Tables
Each row in tables has a distinct color:
- 🔵 Row 1: Indigo Blue
- 🟢 Row 2: Emerald Green
- 🔷 Row 3: Sky Blue
- 🟠 Row 4: Amber Orange
- 🟣 Row 5: Purple Violet
- 🌸 Row 6: Pink Magenta

### Professional Elements
- 📊 Grid layout with proper spacing
- 🎯 Column separators with vertical lines
- 🏷️ Color-coded status badges
- 🖱️ Smooth hover animations
- 📱 Responsive design

---

## 🗄️ Database Models

### Users
- Email, Password Hash, Full Name, Role

### Employees  
- Employee ID, Name, Email, Phone, Department
- Designation, Employment Type, Status, Joining Date

### Attendance
- Employee ID, Date, Check-in, Check-out
- Status, Hours Worked

### Leave Requests
- Employee ID, Leave Type, Dates, Days
- Reason, Status

### Payroll
- Employee ID, Month, Gross Salary
- Allowances, Deductions, Net Salary, Status

### Onboarding
- Employee ID, Stage, Documents
- Joining Date, Notes, Status

---

## 📁 Project Structure

```
HR/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── auth.py
│   │   │   │   ├── employees.py
│   │   │   │   ├── attendance.py
│   │   │   │   ├── leaves.py
│   │   │   │   ├── payroll.py
│   │   │   │   ├── onboarding.py
│   │   │   │   ├── dashboard.py
│   │   │   │   └── ai_assistant.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── core/
│   │   ├── db/
│   │   └── utils/
│   ├── init_db.py
│   ├── run.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── EmployeesPage.jsx
│   │   │   ├── AttendancePage.jsx
│   │   │   ├── LeavesPage.jsx
│   │   │   ├── PayrollPage.jsx
│   │   │   ├── OnboardingPage.jsx
│   │   │   └── AIPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── start.bat (Windows)
├── start.sh (Unix)
├── docker-compose.yml
├── SETUP.md
└── README.md
```

---

## 🔧 Tech Stack

### Backend
- **FastAPI** - Modern async web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Default database (upgradeable to PostgreSQL)
- **Pydantic** - Data validation
- **Python-Jose** - JWT authentication
- **Bcrypt** - Password hashing
- **OpenAI** - Optional AI features

### Frontend
- **React 18** - UI library
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **CSS3** - Modern styling with gradients and animations

---

## 🔌 API Endpoints

### Auth
- `POST /api/v1/auth/register` - Register
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Current user

### Employees
- `GET /api/v1/employees/` - List all
- `POST /api/v1/employees/` - Create
- `GET /api/v1/employees/{id}` - Get one
- `PUT /api/v1/employees/{id}` - Update
- `DELETE /api/v1/employees/{id}` - Delete

### Attendance
- `GET /api/v1/attendance/` - List
- `POST /api/v1/attendance/` - Create

### Leaves
- `GET /api/v1/leaves/` - List
- `POST /api/v1/leaves/` - Create
- `PUT /api/v1/leaves/{id}` - Update

### Payroll
- `GET /api/v1/payroll/` - List
- `POST /api/v1/payroll/` - Create

### Onboarding
- `GET /api/v1/onboarding/` - List
- `POST /api/v1/onboarding/` - Create

### Dashboard
- `GET /api/v1/dashboard/` - Stats

### AI
- `POST /api/v1/ai/ask` - Ask question
- `GET /api/v1/ai/insights` - Get insights

---

## ⚙️ Configuration

### Environment Variables (`.env` in backend/)
```env
APP_NAME=HRSphere
APP_ENV=development
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///./hrsphere.db
OPENAI_API_KEY=optional
```

---

## 🧪 Testing

### API Testing
1. Go to: `http://localhost:8000/docs`
2. Use Swagger UI to test all endpoints
3. No authentication needed for demo

### Frontend Testing
1. Access: `http://localhost:5173`
2. Navigate through all pages
3. View pre-loaded sample data

---

## 📦 Dependencies

### Backend (requirements.txt)
- fastapi==0.115.0
- uvicorn[standard]==0.30.6
- sqlalchemy==2.0.35
- pydantic==2.9.2
- python-jose[cryptography]==3.3.0
- bcrypt==4.1.2
- openai==1.43.0
- python-dotenv==1.0.1

### Frontend (package.json)
- react@^18.3.1
- react-router-dom@^6.28.0
- axios@^1.7.5
- recharts@^2.12.7
- vite@^5.4.8

---

## 🚀 Deployment

### Docker Compose
```bash
docker-compose up
```

Starts:
- Backend on port 8000
- Frontend on port 5173
- PostgreSQL database

---

## ✅ Success Indicators

After startup, verify:
- ✅ Backend running (`http://localhost:8000`)
- ✅ Frontend running (`http://localhost:5173`)
- ✅ API docs accessible (`http://localhost:8000/docs`)
- ✅ All 7 pages load properly
- ✅ Sample data displays in tables
- ✅ Tables show colorful rows
- ✅ Sidebar navigation works

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Reinstall dependencies
cd backend
pip install --upgrade pip
pip install -r requirements.txt

# Reset database
rm hrsphere.db
python init_db.py
```

### Frontend won't start
```bash
# Clear cache and reinstall
cd frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Port already in use
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8000
kill -9 <PID>
```

---

## 📞 Support

- **API Docs**: http://localhost:8000/docs
- **Frontend**: http://localhost:5173
- **GitHub Issues**: Create an issue for bugs

---

## 📝 License

This project is proprietary and confidential.

---

## 🎉 Ready to Go!

Your complete HR management platform is now ready!

**Start with:** `start.bat` (Windows) or `bash start.sh` (Unix)

**Enjoy HRSphere!** 🚀

## Project Structure

```text
HR/
├── backend/
│   ├── app/
│   ├── alembic/
│   ├── .env.example
│   ├── alembic.ini
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── .env.example
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

> The default local setup uses SQLite so it runs on a standard developer machine without PostgreSQL client libraries. For production, you can switch `DATABASE_URL` to PostgreSQL.

## Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

## Default Admin Credentials

Create a default admin using the auth endpoint or seed script during setup.

## Core Features

- Role-based access for Admin, HR, and Employee
- Employee directory and employee profile management
- Attendance tracking and summaries
- Leave request workflow with approval/rejection
- Payroll records and salary visibility
- Onboarding pipeline tracking
- AI assistant for HR queries
- Dashboard analytics

## Environment Variables

Use the sample files as a starting point and replace values with your actual configuration.
#   h r - s p h e r e  
 #   h r - s p h e r e  
 #   h r - s p h e r e  
 