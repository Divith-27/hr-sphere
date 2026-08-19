#!/bin/bash
# HRSphere Full Application Startup Script

echo "🚀 HRSphere - Full Application Startup"
echo "========================================"
echo ""

# Check if backend is already initialized
if [ ! -f "backend/hrsphere.db" ]; then
    echo "📦 Initializing database..."
    cd backend
    python init_db.py
    cd ..
    echo "✅ Database initialized!"
    echo ""
fi

# Start backend in the background
echo "🔧 Starting Backend Server..."
cd backend
python run.py &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
echo "📍 Backend URL: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""

# Wait a moment for backend to start
sleep 3

# Start frontend in the background
echo "🎨 Starting Frontend Server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"
echo "📍 Frontend URL: http://localhost:5173"
echo ""

echo "========================================"
echo "✨ HRSphere is running!"
echo ""
echo "To stop the application:"
echo "  Press Ctrl+C here, or"
echo "  kill $BACKEND_PID (backend)"
echo "  kill $FRONTEND_PID (frontend)"
echo ""
echo "🌐 Access the application at: http://localhost:5173"
echo "========================================"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
