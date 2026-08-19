# HRSphere - Workforce Management Platform

Complete setup instructions for the HRSphere HR management application.

## 📋 Project Structure

```
├── backend/               # FastAPI backend server
├── frontend/              # React frontend application
└── docker-compose.yml     # Docker configuration
```

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # On Windows
   # or
   source venv/bin/activate      # On macOS/Linux
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize the database:**
   ```bash
   python init_db.py
   ```

5. **Start the backend server:**
   ```bash
   python run.py
   ```

Backend will run on: `http://localhost:8000`
API Documentation: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

Frontend will run on: `http://localhost:5173`

## 📊 Available Features

### Dashboard
- **Overview Cards**: Total employees, attendance rate, pending leaves, monthly payroll
- **Recent Activities**: Track employee actions with timestamps and status

### Employees
- **Employee Directory**: View all employees with complete details
- **Columns**: Name, Email, Department, Role, Join Date, Status
- **6 Sample Employees**: Pre-populated with realistic data

### Attendance
- **Daily Tracking**: Mark and view employee attendance
- **Columns**: Name, Date, Check In, Check Out, Hours Worked, Status
- **Detailed Logs**: Track work hours and attendance patterns

### Leaves
- **Leave Management**: Submit and approve leave requests
- **Columns**: Employee, Type, Start Date, End Date, Days, Reason, Status
- **Types Supported**: Annual, Sick, Casual, Maternity

### Payroll
- **Salary Management**: Process and track payroll
- **Columns**: Employee, Month, Basic Salary, Allowances, Deductions, Net Salary, Status
- **6 Employees**: Complete salary information

### Onboarding
- **New Hire Management**: Track onboarding progress
- **Columns**: Candidate Name, Position, Department, Start Date, Current Stage, Status
- **6 Candidates**: Various stages of onboarding

### AI Assistant
- **HR Support**: Ask questions about HR policies and procedures
- **OpenAI Integration**: Optional GPT-powered responses

## 🎨 UI Features

- **Dark Theme**: Modern dark mode with indigo and green accents
- **Responsive Design**: Works on desktop and tablet
- **Colorful Tables**: 
  - Row 1: Indigo Blue
  - Row 2: Emerald Green
  - Row 3: Sky Blue
  - Row 4: Amber Orange
  - Row 5: Purple Violet
  - Row 6: Pink Magenta
- **Column Separators**: Clear vertical lines between columns
- **Status Badges**: Color-coded status indicators
- **Hover Effects**: Interactive row highlighting

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user

### Employees
- `GET /api/v1/employees/` - List all employees
- `POST /api/v1/employees/` - Create new employee
- `GET /api/v1/employees/{id}` - Get employee details
- `PUT /api/v1/employees/{id}` - Update employee
- `DELETE /api/v1/employees/{id}` - Delete employee

### Attendance
- `GET /api/v1/attendance/` - List attendance records
- `POST /api/v1/attendance/` - Create attendance record

### Leave Requests
- `GET /api/v1/leaves/` - List leave requests
- `POST /api/v1/leaves/` - Create leave request
- `PUT /api/v1/leaves/{id}` - Approve/Reject leave

### Payroll
- `GET /api/v1/payroll/` - List payroll records
- `POST /api/v1/payroll/` - Create payroll entry

### Onboarding
- `GET /api/v1/onboarding/` - List onboarding records
- `POST /api/v1/onboarding/` - Create onboarding record

### Dashboard
- `GET /api/v1/dashboard/` - Get dashboard statistics

### AI Assistant
- `POST /api/v1/ai/` - Ask AI question

## 📦 Technology Stack

### Backend
- **FastAPI**: Modern web framework
- **SQLAlchemy**: ORM for database
- **SQLite**: Default database (can switch to PostgreSQL)
- **Pydantic**: Data validation
- **Python-Jose**: JWT token handling
- **OpenAI**: Optional AI features

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Recharts**: Data visualization
- **Vite**: Build tool

## 🗄️ Database Models

### User
- Email, Password Hash, Full Name, Role

### Employee
- Employee ID, Name, Email, Phone, Department, Designation
- Employment Type, Status, Joining Date

### Attendance
- Employee ID, Date, Check-in Time, Check-out Time
- Status, Hours Worked

### Leave Request
- Employee ID, Leave Type, Dates, Days, Reason, Status

### Payroll
- Employee ID, Month, Gross Salary, Deductions, Net Salary, Status

### Onboarding
- Employee ID, Stage, Documents Submitted, Joining Date, Notes, Status

## 🔐 Environment Variables

Create a `.env` file in the backend directory:

```
APP_NAME=HRSphere
APP_ENV=development
DEBUG=True
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
DATABASE_URL=sqlite:///./hrsphere.db
DB_ECHO=False
OPENAI_API_KEY=your-openai-key-here
OPENAI_MODEL=gpt-4o-mini
GOOGLE_SHEETS_ENABLED=False
```

## 🐳 Docker Setup (Optional)

```bash
docker-compose up
```

This will start both backend and frontend services.

## 📝 Sample Data

The application comes with 6 pre-populated employees:
1. Aisha Khan - Frontend Developer
2. Daniel Rao - HR Manager
3. Priya Nair - Accountant
4. Sanjay Verma - Backend Developer
5. Maya Singh - Marketing Executive
6. Rajesh Kumar - Operations Lead

## ✅ Troubleshooting

### Backend Won't Start
1. Ensure Python 3.8+ is installed
2. Check that all dependencies are installed: `pip install -r requirements.txt`
3. Verify port 8000 is not in use
4. Initialize database: `python init_db.py`

### Frontend Won't Start
1. Ensure Node.js is installed
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check that port 5173 is not in use

### Database Issues
1. Delete `hrsphere.db` file
2. Run `python init_db.py` to reinitialize
3. Restart backend server

## 📞 Support

For issues or questions, check:
- Backend logs in terminal where `python run.py` is running
- Frontend console in browser DevTools
- API documentation at `http://localhost:8000/docs`

## 📄 License

This project is proprietary and confidential.

---

**HRSphere** - Simplifying HR Management
