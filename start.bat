@echo off
REM HRSphere Full Application Startup Script for Windows

echo.
echo 🚀 HRSphere - Full Application Startup
echo ========================================
echo.

REM Check if database exists
if not exist "backend\hrsphere.db" (
    echo 📦 Initializing database...
    cd backend
    python init_db.py
    cd ..
    echo ✅ Database initialized!
    echo.
)

REM Start backend in a new window
echo 🔧 Starting Backend Server...
cd backend
start "HRSphere Backend" python run.py
echo ✅ Backend started
echo 📍 Backend URL: http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo.

timeout /t 3 /nobreak

REM Start frontend in a new window
echo 🎨 Starting Frontend Server...
cd ..\frontend
start "HRSphere Frontend" npm run dev
echo ✅ Frontend started
echo 📍 Frontend URL: http://localhost:5173
echo.

echo ========================================
echo ✨ HRSphere is running!
echo.
echo 🌐 Access the application at: http://localhost:5173
echo.
echo Close the backend and frontend windows to stop the application.
echo ========================================
echo.
pause
