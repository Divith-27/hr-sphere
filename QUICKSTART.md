# HRSphere - Quick Start Guide

## ⚡ Fastest Way to Get Running (2 minutes)

### Step 1: Database Setup (First Time Only)
```bash
cd backend
python init_db.py
```

### Step 2: Start Backend
```bash
cd backend
python run.py
```
**You'll see:** `Uvicorn running on http://127.0.0.1:8000`

### Step 3: Start Frontend (New Terminal)
```bash
cd frontend
npm run dev
```
**You'll see:** `Local: http://localhost:5173`

### Step 4: Access Application
Open browser: **http://localhost:5173**

✅ **Done!** Application is running.

---

## 📍 URLs to Remember

- **Application:** http://localhost:5173
- **API Docs:** http://localhost:8000/docs
- **Backend API:** http://localhost:8000

---

## 🎯 What You'll See

### Dashboard Page
- 📊 4 stat cards showing counts
- 📋 Recent activities table with 6 rows
- Each row has a different color

### Employees Page
- 👥 Table of 6 sample employees
- Columns: Name, Email, Department, Role, Join Date, Status
- Colorful rows cycling through 6 colors

### Attendance Page
- 📅 Table of 6 attendance records
- Columns: Name, Date, Check In, Check Out, Hours, Status
- All dated 2026-08-18

### Leaves Page
- 📋 Table of 6 leave requests
- Columns: Employee, Type, Start Date, End Date, Days, Reason, Status
- Shows Pending and Approved statuses

### Payroll Page
- 💰 Table of 6 payroll entries
- Columns: Employee, Month, Basic Salary, Allowances, Deductions, Net Salary, Status
- Shows Processed and Pending statuses

### Onboarding Page
- 🎓 Table of 6 onboarding records
- Columns: Candidate Name, Position, Department, Start Date, Stage, Status
- Shows various onboarding stages

### AI Assistant Page
- 🤖 Simple chat interface for testing
- Demo responses for questions

---

## 🎨 Visual Features

✨ **Dark Theme**
- Professional dark mode (black & indigo backgrounds)
- Easy on the eyes for long work sessions

🌈 **Colorful Tables**
- Each row has a distinct color
- Makes data easy to scan visually
- Color cycling: Indigo → Green → Blue → Orange → Purple → Pink

📦 **Styled Cards & Boxes**
- 2px borders around all major sections
- Subtle shadows for depth
- Hover effects (cards scale slightly)

📊 **Column Separators**
- Vertical lines between table columns
- Makes data organized and readable

🏷️ **Status Badges**
- Color-coded status indicators
- Green for "Active/Approved"
- Red for "Inactive/Rejected"
- Amber for "Pending"

---

## 🔐 Demo Credentials

You can register a new account at the login screen, or use the API:

```bash
# Register
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hrsphere.com",
    "password": "password123",
    "full_name": "Admin User",
    "role": "admin"
  }'

# Login
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@hrsphere.com&password=password123"
```

---

## 🚀 One-Command Startup (Windows)

If you want both servers to start automatically:

```bash
start.bat
```

This will:
1. ✅ Initialize database (if needed)
2. ✅ Start backend in a new window
3. ✅ Start frontend in a new window
4. ✅ Show you the URLs

---

## 🔍 Testing the API

### Via Swagger UI (Easiest)
1. Go to: http://localhost:8000/docs
2. Click any endpoint
3. Click "Try it out"
4. Click "Execute"
5. See the response!

### Example: Get All Employees
1. Open: http://localhost:8000/docs
2. Find: `GET /api/v1/employees/`
3. Click "Try it out"
4. Click "Execute"
5. See 6 sample employees returned!

---

## 📱 Sample Data Included

### 6 Employees
1. Aisha Khan - Frontend Developer
2. Daniel Rao - HR Manager
3. Priya Nair - Accountant
4. Sanjay Verma - Backend Developer
5. Maya Singh - Marketing Executive
6. Rajesh Kumar - Operations Lead

### 6 Attendance Records
- All on 2026-08-18
- Mix of Present, Late, Absent, On Leave statuses

### 6 Leave Requests
- Various types: Annual, Sick, Casual, Maternity
- Different approval statuses: Pending, Approved

### 6 Payroll Entries
- Month data
- Salary breakdown
- Processed and Pending statuses

### 6 Onboarding Records
- Various stages: Offer Accepted, Documents Verification, etc.
- Different completion statuses

---

## ⚠️ Common Issues

### "Backend not running"
Make sure you ran `python run.py` in the backend folder and see the "Uvicorn running" message.

### "Frontend blank page"
1. Check http://localhost:5173 loads
2. Open Developer Console (F12)
3. Check for errors
4. If error about connection, make sure backend is running

### "Port already in use"
Another app is using the port. Either:
1. Kill the other app
2. Change port in `vite.config.js` (frontend) or `run.py` (backend)

### "No sample data visible"
Run `python init_db.py` again to reset the database.

---

## 📚 Documentation Files

- **README.md** - Full project overview
- **SETUP.md** - Detailed setup instructions
- **API Docs** - http://localhost:8000/docs (Swagger UI)

---

## 🎓 Learning Path

1. **Start here:** Access http://localhost:5173
2. **Explore each page:** Dashboard → Employees → Attendance → Leaves → Payroll → Onboarding → AI
3. **Check the API:** Visit http://localhost:8000/docs
4. **Edit code:** Modify files in `frontend/src/pages/` to customize
5. **Add features:** Use the API to add new employees, attendance, etc.

---

## 🌟 Customization Ideas

### Easy Customization
- Change colors in `frontend/src/styles.css` (CSS variables at top)
- Add new pages in `frontend/src/pages/`
- Modify sample data in each page component

### Moderate Customization
- Add new database models in `backend/app/models/`
- Create new API endpoints in `backend/app/api/v1/endpoints/`
- Add new React components

### Advanced Customization
- Switch database from SQLite to PostgreSQL
- Add authentication/login flow
- Deploy to cloud (AWS, Heroku, Vercel)
- Add more AI features

---

## ✅ Verification Checklist

After startup, verify:
- [ ] Backend running at http://localhost:8000
- [ ] Frontend running at http://localhost:5173
- [ ] Application loads without errors
- [ ] Can see Dashboard page with 4 stat cards
- [ ] Can see colorful Employees table with 6 rows
- [ ] Can navigate to all 7 pages via sidebar
- [ ] Table rows have different colors
- [ ] API Docs accessible at http://localhost:8000/docs

If all checked ✅ - **You're ready to go!**

---

## 🆘 Still Having Issues?

1. **Check terminal output** for error messages
2. **Reinstall dependencies:**
   ```bash
   # Backend
   cd backend
   pip install --upgrade pip
   pip install -r requirements.txt
   
   # Frontend
   cd frontend
   npm cache clean --force
   npm install
   ```
3. **Reset database:**
   ```bash
   cd backend
   rm hrsphere.db
   python init_db.py
   ```
4. **Check ports are free:**
   - Backend needs: 8000
   - Frontend needs: 5173

---

## 🎉 You're All Set!

Your complete HR management platform is ready!

**Next Step:** Open http://localhost:5173 in your browser

**Enjoy HRSphere!** 🚀
